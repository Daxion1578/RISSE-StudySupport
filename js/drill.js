"use strict";

/* =========================================================
   科目A-2（旧午前II）過去問ドリル
   - 問題データは data/questions-a/*.js が window.QUESTIONS_A に、
     data/questions-a1/*.js（科目A-1・旧午前I）が window.QUESTIONS_A1 に積む
   - 履歴は state.drill[qid].attempts に記録し、Gist同期される
   - 3つの演習モード:
     ①クイック演習（弱点優先など） ②単元別ドリル ③本試験モード（1回分通し）
   - 単元別理解度 = 教材完了20点 + 網羅率20点 + 各問の最新解答での正答率60点
   ========================================================= */

let drillSession = null; // { qids, idx, chosen, correct, mode, unitId?, examLabel?, finished? }

function drillQuestions() { return (window.QUESTIONS_A || []).concat(window.QUESTIONS_A1 || []); }
function drillUnit(q) { return UNITS.find(u => u.id === q.unitId) || null; }

function drillQStats(qid) {
  const atts = (state.drill[qid] && state.drill[qid].attempts) || [];
  const ok = atts.filter(t => t.ok).length;
  return { tries: atts.length, ok, acc: atts.length ? ok / atts.length : null };
}

/* 出題の重み: 未解答は最優先、解答済みは正答率が低いほど・重要単元ほど出やすい */
function drillWeight(q, mode) {
  if (mode === "random") return 1;
  const trendFactor = { S: 1.5, A: 1.2, B: 1.0 }[(drillUnit(q) || {}).trend] || 1.0;
  const st = drillQStats(q.id);
  if (st.tries === 0) return trendFactor * 2.0;
  if (mode === "unseen") return trendFactor * 0.2;
  return trendFactor * (1.6 - st.acc); // acc=1でも0.6は残す（復習のため）
}

/* 重み付きランダム抽出（重複なし） */
function drillPickFrom(pool0, mode, count) {
  const picked = [];
  let pool = pool0.map(q => ({ q, w: drillWeight(q, mode) }));
  while (picked.length < count && pool.length > 0) {
    const total = pool.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * total;
    let i = 0;
    while (i < pool.length - 1 && (r -= pool[i].w) > 0) i++;
    picked.push(pool[i].q.id);
    pool.splice(i, 1);
  }
  return picked;
}

function startDrill(mode) {
  const cat = document.getElementById("drillCat").value;
  const count = Number(document.getElementById("drillCount").value);
  const pool = drillQuestions().filter(q => !cat || (drillUnit(q) || {}).cat === cat);
  const qids = drillPickFrom(pool, mode, count);
  if (!qids.length) { alert("この条件に合う問題がありません"); return; }
  drillSession = { qids, idx: 0, chosen: null, correct: 0, mode };
  render();
  window.scrollTo(0, 0);
}

/* 指定した問題idだけでセッションを開始（教材の小単元演習から使う） */
function startDrillForQids(qids, label) {
  if (!qids || !qids.length) return;
  drillSession = { qids: qids.slice(), idx: 0, chosen: null, correct: 0, mode: "section", label: label || "" };
  activeTab = "drill";
  animateNext = true;
  render();
  window.scrollTo(0, 0);
}

/* 単元別ドリル: その単元の過去問を弱点順に（最大15問） */
function startDrillForUnit(unitId) {
  const pool = drillQuestions().filter(q => q.unitId === unitId);
  if (!pool.length) { alert("この単元の過去問はまだ収録されていません。教材と診断で学習してください。"); return; }
  const qids = drillPickFrom(pool, "weak", Math.min(pool.length, 15));
  drillSession = { qids, idx: 0, chosen: null, correct: 0, mode: "unit", unitId };
  activeTab = "drill";
  animateNext = true;
  render();
  window.scrollTo(0, 0);
}

/* 本試験モード: 1回分（A-2は25問、A-1は30問）を問1から通しで解く */
function examSessions() {
  const map = new Map();
  drillQuestions().forEach(q => {
    const m = q.source.match(/出典: (令和\d+年度 [春秋]期)/);
    const kind = q.source.includes("午前II") ? "科目A-2（旧午前II）" : "科目A-1（旧午前I）";
    const label = m ? `${m[1]} ${kind}` : "その他";
    if (!map.has(label)) map.set(label, []);
    map.get(label).push(q.id);
  });
  return [...map.entries()];
}
function startExamSession() {
  const label = document.getElementById("examSession").value;
  const hit = examSessions().find(x => x[0] === label);
  if (!hit) return;
  drillSession = { qids: hit[1].slice(), idx: 0, chosen: null, correct: 0, mode: "exam", examLabel: label };
  render();
  window.scrollTo(0, 0);
}

function drillAnswer(choiceIdx) {
  const s = drillSession;
  if (!s || s.chosen !== null) return;
  const q = drillQuestions().find(x => x.id === s.qids[s.idx]);
  s.chosen = choiceIdx;
  const ok = choiceIdx === q.answer;
  if (ok) s.correct++;
  if (!state.drill[q.id]) state.drill[q.id] = { attempts: [] };
  state.drill[q.id].attempts.push({ at: new Date().toISOString(), ok });
  if (state.drill[q.id].attempts.length > DRILL_ATTEMPTS_CAP) {
    state.drill[q.id].attempts = state.drill[q.id].attempts.slice(-DRILL_ATTEMPTS_CAP);
  }
  saveState();
  render();
}

function drillNext() {
  const s = drillSession;
  if (s.idx + 1 >= s.qids.length) {
    const what = s.mode === "exam" ? `本試験モード（${s.examLabel}）`
      : s.mode === "unit" ? `単元別ドリル「${(UNITS.find(u => u.id === s.unitId) || {}).name}」`
      : s.mode === "review" ? "復習セッション（間隔反復）"
      : s.mode === "section" ? `小単元演習「${s.label || ""}」`
      : "科目Aドリル";
    addLog("drill", `${what}: ${s.qids.length}問中${s.correct}問正解`);
    saveState();
    s.finished = true;
  } else {
    s.idx++;
    s.chosen = null;
  }
  render();
  window.scrollTo(0, 0);
}

function endDrill() { drillSession = null; render(); }

/* ---------- 理解度・週次推移 ---------- */

/* 単元別の成績（延べ回数ベース） */
function drillUnitStats(unitId) {
  let tries = 0, ok = 0;
  drillQuestions().filter(q => q.unitId === unitId).forEach(q => {
    const st = drillQStats(q.id);
    tries += st.tries; ok += st.ok;
  });
  return { tries, ok, acc: tries ? ok / tries : null };
}

/* 理解度(0-100): 教材完了20 + 網羅率20 + 各問の「最新解答」での正答率60。過去問が無い単元はnull */
function understanding(unitId) {
  const qs = drillQuestions().filter(q => q.unitId === unitId);
  if (!qs.length) return null;
  let answered = 0, latestOk = 0;
  qs.forEach(q => {
    const atts = (state.drill[q.id] || {}).attempts || [];
    if (atts.length) { answered++; if (atts[atts.length - 1].ok) latestOk++; }
  });
  const coverage = answered / qs.length;
  const acc = answered ? latestOk / answered : 0;
  return Math.round((isDone(unitId) ? 20 : 0) + coverage * 20 + acc * 60);
}

/* 学習開始週の月曜（最初の解答履歴から自動判定） */
function studyStartMonday() {
  let min = null;
  Object.values(state.drill).forEach(d => (d.attempts || []).forEach(t => {
    if (!min || t.at < min) min = t.at;
  }));
  return min ? mondayOf(new Date(min)) : mondayOf(new Date());
}

/* 単元の週ごとの正答率推移: [{week:1, tries, pct}] */
function unitWeeklyTrend(unitId) {
  const start = studyStartMonday();
  const byWeek = new Map();
  drillQuestions().filter(q => q.unitId === unitId).forEach(q => {
    ((state.drill[q.id] || {}).attempts || []).forEach(t => {
      const w = Math.max(1, Math.floor((new Date(t.at) - start) / (7 * 86400000)) + 1);
      if (!byWeek.has(w)) byWeek.set(w, { tries: 0, ok: 0 });
      const s = byWeek.get(w); s.tries++; if (t.ok) s.ok++;
    });
  });
  return [...byWeek.entries()].sort((a, b) => a[0] - b[0])
    .map(([w, s]) => ({ week: w, tries: s.tries, pct: Math.round(100 * s.ok / s.tries) }));
}

function trendText(unitId) {
  const tr = unitWeeklyTrend(unitId).slice(-4);
  if (tr.length < 1) return "";
  return "推移: " + tr.map(t => `${t.week}週目 ${t.pct}%`).join(" → ");
}

/* ---------- 画面 ---------- */

const KANA = ["ア", "イ", "ウ", "エ"];

function renderDrill() {
  const qs = drillQuestions();
  if (!qs.length) {
    return `<div class="card"><h2>科目A-2 過去問ドリル</h2>
      <div class="notice">問題データがまだ収録されていません。データ追加後に利用できます。</div></div>`;
  }
  if (drillSession) return drillSession.finished ? renderDrillResult() : renderDrillQuestion();

  const answered = qs.filter(q => drillQStats(q.id).tries > 0);
  const allTries = qs.reduce((s, q) => s + drillQStats(q.id).tries, 0);
  const allOk = qs.reduce((s, q) => s + drillQStats(q.id).ok, 0);

  let html = `<div class="card"><h2>科目A 過去問ドリル（A-1・A-2）</h2>
    <div class="small">IPA公表の過去問（出典付き）で演習します。科目A-2（専門・250問）と科目A-1（旧午前I・共通知識300問）の両方を収録。学習の流れ: <b>教材で知識収集 → 単元別ドリル → 本試験モードで総仕上げ</b>。解答履歴は端末間で同期され、単元別の理解度と週ごとの推移が自動で記録されます。</div>
    <div class="tiles" style="margin-top:12px">
      <div class="tile"><div class="v">${qs.length}</div><div class="l">収録問題数</div></div>
      <div class="tile"><div class="v">${answered.length}<span style="font-size:14px;color:var(--muted)"> / ${qs.length}</span></div><div class="l">解答済みの問題</div></div>
      <div class="tile"><div class="v">${allTries ? Math.round(100 * allOk / allTries) : "--"}<span style="font-size:14px;color:var(--muted)">%</span></div><div class="l">通算正答率</div><div class="s">目標: 80%以上</div></div>
    </div></div>`;

  // ①今日の復習（間隔反復）
  html += reviewCardHtml();

  // ②クイック演習
  html += `<div class="card"><h2>クイック演習</h2>
    <div class="small" style="margin:6px 0">
      分野: <select id="drillCat"><option value="">すべて</option>${["A","B","C","D","E","F","G","H","J"].map(c => `<option value="${c}">${CATS[c]}</option>`).join("")}</select>
      問数: <select id="drillCount"><option>5</option><option selected>10</option><option>25</option></select>
    </div>
    <div style="margin-top:10px">
      <button class="primary" onclick="startDrill('weak')">弱点優先で開始（推奨）</button>
      <button class="ghost" onclick="startDrill('unseen')">未解答の問題から</button>
      <button class="ghost" onclick="startDrill('random')">完全ランダム</button>
    </div></div>`;

  // ②本試験モード
  const sessions = examSessions();
  html += `<div class="card"><h2>本試験モード（過去問1回分を通しで解く）</h2>
    <div class="small">本番と同じ順で1回分を通しで解きます（A-2は25問・A-1は30問）。仕上げの実力測定に使ってください。合格ラインはどちらも60%です。</div>
    <div style="margin-top:10px">
      <select id="examSession">${sessions.map(([label, ids]) => `<option value="${esc(label)}">${esc(label)}（${ids.length}問）</option>`).join("")}</select>
      <button class="primary" onclick="startExamSession()">開始</button>
    </div></div>`;

  // ③単元別ドリル（理解度つき）
  html += `<div class="card"><h2>単元別ドリル（理解度）</h2>
    <div class="small">理解度 = 教材の学習完了20点＋その単元の問題の網羅率20点＋各問題の最新解答での正答率60点。</div></div>`;
  const dueMap = dueCountByUnit();
  for (const catId of Object.keys(CATS)) {
    if (catId === "I") continue;
    const units = UNITS.filter(u => u.cat === catId);
    if (!units.length) continue;
    const avg = (() => {
      const vals = units.map(u => understanding(u.id)).filter(v => v !== null);
      return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
    })();
    html += `<div class="card"><details ${catId === "A" ? "open" : ""}><summary style="cursor:pointer;font-weight:600">${CATS[catId]}${avg !== null ? `　<span class="muted">平均理解度 ${avg}%</span>` : ""}</summary>`;
    html += units.map(u => {
      const pool = qs.filter(q => q.unitId === u.id);
      const und = understanding(u.id);
      const tr = trendText(u.id);
      const due = dueMap[u.id] || 0;
      return `<div class="unit">
        <div class="u-name">${unitNameLink(u)} <span class="badge rank">${u.trend}</span>${due ? ` <span class="badge due">要復習${due}</span>` : ""}
          <div class="u-meta">過去問${pool.length}問${tr ? "　" + esc(tr) : ""}</div>
          <div style="display:flex;align-items:center;gap:10px;margin-top:4px;max-width:300px">
            <div class="bar-track" style="flex:1"><div class="bar-fill" style="width:${und || 0}%"></div></div>
            <span class="score-val">${und === null ? "—" : und + "%"}</span>
          </div>
        </div>
        ${pool.length ? `<button class="ghost" onclick="startDrillForUnit('${u.id}')">解く</button>` : `<span class="muted small">問題なし</span>`}
      </div>`;
    }).join("");
    html += `</details></div>`;
  }
  return html;
}

function renderDrillQuestion() {
  const qs = drillQuestions();
  const s = drillSession;
  const q = qs.find(x => x.id === s.qids[s.idx]);
  const u = drillUnit(q);
  const answered = s.chosen !== null;
  const modeLabel = s.mode === "exam" ? esc(s.examLabel) + "・通し演習"
    : s.mode === "unit" ? "単元別ドリル"
    : s.mode === "review" ? "今日の復習（間隔反復）"
    : s.mode === "section" ? "小単元演習" : "";
  // 選択肢の表示順: 本試験モード以外はシャッフル（位置で覚えるのを防ぐ）。
  // 記号ア〜エは出典・解説と対応させるため元のまま表示し、並びだけ変える
  let order = [0, 1, 2, 3];
  if (s.mode !== "exam") {
    if (!s.shuffle) s.shuffle = {};
    if (!s.shuffle[q.id]) {
      const o = [0, 1, 2, 3];
      for (let i = o.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [o[i], o[j]] = [o[j], o[i]];
      }
      s.shuffle[q.id] = o;
    }
    order = s.shuffle[q.id];
  }
  let html = `<div class="card"><div class="q-no">問${s.idx + 1} / ${s.qids.length}　${modeLabel ? modeLabel + "　" : ""}${u ? esc(CATS[u.cat]) + "・" + esc(u.name) : ""} <span class="badge rank">${u ? u.trend : ""}</span></div>
    <div style="margin:8px 0 12px;font-size:15px">${esc(q.question)}${q.modified ? ' <span class="muted">（一部改変）</span>' : ""}</div>`;
  // ラベル: シャッフル時は表示位置の①〜④（元の記号は解答後にだけ並記し、
  // 「答えはウ」という記号の記憶では選べないようにする）。本試験モードはア〜エのまま
  const NUM = ["①", "②", "③", "④"];
  const shuffled = s.mode !== "exam";
  html += order.map((i, pos) => {
    const c = q.choices[i];
    let cls = "choice is-btn";
    if (answered) {
      if (i === q.answer) cls += " correct";
      else if (i === s.chosen) cls += " wrong";
    }
    const label = shuffled ? (answered ? `${NUM[pos]}<span class="kana-orig">${KANA[i]}</span>` : NUM[pos]) : KANA[i];
    return `<button class="${cls}" ${answered ? "disabled" : ""} onclick="drillAnswer(${i})"><span class="kana">${label}</span>${esc(c)}</button>`;
  }).join("");
  if (answered) {
    const ok = s.chosen === q.answer;
    const hasMat = window.MATERIALS && window.MATERIALS[q.unitId];
    const ansLabel = shuffled ? `${NUM[order.indexOf(q.answer)]}（${KANA[q.answer]}）` : `「${KANA[q.answer]}」`;
    html += `<div class="${ok ? "notice" : "alert"}" style="margin-top:14px"><b>${ok ? "正解！" : "不正解（正解は " + ansLabel + "）"}</b>${shuffled ? `<span class="muted small">　※解説のア〜エは各選択肢に並記した元の記号に対応</span>` : ""}<br>${esc(q.explanation)}</div>
      <div class="muted">${esc(q.source)}</div>
      <div style="margin-top:12px"><button class="primary" onclick="drillNext()">${s.idx + 1 >= s.qids.length ? "結果を見る" : "次の問題へ"}</button>
      ${hasMat ? `<button class="ghost" onclick="openMaterialForQuestion('${q.id}')">📖 教材の解説箇所を読む</button>` : ""}</div>`;
  } else {
    html += `<div class="muted" style="margin-top:10px">${esc(q.source)}</div>`;
  }
  html += `<div style="margin-top:14px"><button class="ghost" onclick="endDrill()">中断する（履歴は保存済み）</button></div></div>`;
  return html;
}

function renderDrillResult() {
  const qs = drillQuestions();
  const s = drillSession;
  const pct = Math.round(100 * s.correct / s.qids.length);
  let html = `<div class="card"><h2>${s.mode === "exam" ? "本試験モード 結果" : s.mode === "unit" ? "単元別ドリル 結果" : s.mode === "review" ? "今日の復習 結果" : s.mode === "section" ? "小単元演習 結果" : "ドリル結果"}</h2>
    <div class="tiles"><div class="tile"><div class="v">${s.correct}<span style="font-size:14px;color:var(--muted)"> / ${s.qids.length}</span></div><div class="l">正解数（${pct}%）</div></div>
    ${s.mode === "exam" ? `<div class="tile"><div class="v" style="background:none;-webkit-background-clip:initial;color:${pct >= 60 ? "var(--emerald)" : "var(--crit)"}">${pct >= 60 ? "合格圏" : "未達"}</div><div class="l">合格ライン（60%）との比較</div><div class="s">${pct}% / 60%</div></div>` : ""}
    ${s.mode === "unit" ? `<div class="tile"><div class="v">${understanding(s.unitId) ?? "—"}<span style="font-size:14px;color:var(--muted)">%</span></div><div class="l">この単元の理解度</div></div>` : ""}</div>`;
  html += s.qids.map((qid, i) => {
    const q = qs.find(x => x.id === qid);
    const last = ((state.drill[qid] || {}).attempts || []).slice(-1)[0] || {};
    const u = drillUnit(q);
    const matLink = window.MATERIALS && window.MATERIALS[q.unitId]
      ? `　<a href="javascript:void(0)" onclick="openMaterialForQuestion('${q.id}')" style="color:var(--indigo)">📖 教材で確認</a>` : "";
    return `<div class="small" style="padding:4px 0;border-bottom:1px solid var(--grid)">
      ${last.ok ? "<span style='color:var(--emerald)'>○</span>" : "<span style='color:var(--crit)'>✕</span>"}
      問${i + 1}　${esc(q.question.slice(0, 40))}…　<span class="muted">${u ? esc(u.name) : ""}</span>${matLink}</div>`;
  }).join("");
  html += `<div style="margin-top:12px"><button class="primary" onclick="endDrill()">出題設定に戻る</button>
    ${s.mode === "unit" ? `<button class="ghost" onclick="startDrillForUnit('${s.unitId}')">もう一度この単元を解く</button>` : ""}</div></div>`;
  return html;
}