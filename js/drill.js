"use strict";

/* =========================================================
   科目A-2（旧午前II）過去問ドリル
   - 問題データは data/questions-a/*.js が window.QUESTIONS_A に積む
   - 履歴は state.drill[qid].attempts に記録し、Gist同期される
   - 弱点優先出題: 単元の重要度(trend) × 自分の正答率で重み付け
   ========================================================= */

let drillSession = null; // { qids, idx, chosen:null|number, correct:number, mode }

function drillQuestions() { return window.QUESTIONS_A || []; }
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
function drillPick(mode, cat, count) {
  let pool = drillQuestions().filter(q => !cat || (drillUnit(q) || {}).cat === cat);
  const picked = [];
  pool = pool.map(q => ({ q, w: drillWeight(q, mode) }));
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
  const qids = drillPick(mode, cat, count);
  if (!qids.length) { alert("この条件に合う問題がありません"); return; }
  drillSession = { qids, idx: 0, chosen: null, correct: 0, mode };
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
    addLog("drill", `科目A-2ドリル: ${s.qids.length}問中${s.correct}問正解`);
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

/* 単元別の成績（単元マップ・ホームからも使う） */
function drillUnitStats(unitId) {
  let tries = 0, ok = 0;
  drillQuestions().filter(q => q.unitId === unitId).forEach(q => {
    const st = drillQStats(q.id);
    tries += st.tries; ok += st.ok;
  });
  return { tries, ok, acc: tries ? ok / tries : null };
}

const KANA = ["ア", "イ", "ウ", "エ"];

function renderDrill() {
  const qs = drillQuestions();
  let html = "";
  if (!qs.length) {
    return `<div class="card"><h2>科目A-2 過去問ドリル</h2>
      <div class="notice">問題データがまだ収録されていません。データ追加後に利用できます。</div></div>`;
  }
  if (!drillSession) {
    const answered = qs.filter(q => drillQStats(q.id).tries > 0);
    const allTries = qs.reduce((s, q) => s + drillQStats(q.id).tries, 0);
    const allOk = qs.reduce((s, q) => s + drillQStats(q.id).ok, 0);
    const cats = [...new Set(qs.map(q => (drillUnit(q) || {}).cat).filter(Boolean))];
    html += `<div class="card"><h2>科目A-2 過去問ドリル</h2>
      <div class="small">IPA公表の過去問（出典付き）で演習します。間違えた問題・重要分野ほど優先的に出題されます。解答履歴は端末間で同期されます。</div>
      <div class="tiles" style="margin-top:12px">
        <div class="tile"><div class="v">${qs.length}</div><div class="l">収録問題数</div></div>
        <div class="tile"><div class="v">${answered.length}<span style="font-size:14px;color:var(--muted)"> / ${qs.length}</span></div><div class="l">解答済みの問題</div></div>
        <div class="tile"><div class="v">${allTries ? Math.round(100 * allOk / allTries) : "--"}<span style="font-size:14px;color:var(--muted)">%</span></div><div class="l">通算正答率</div><div class="s">目標: 80%以上</div></div>
      </div>
      <h3>出題設定</h3>
      <div class="small" style="margin:6px 0">
        分野: <select id="drillCat"><option value="">すべて</option>${["A","B","C","D","E","F","G","H"].map(c => `<option value="${c}">${CATS[c]}</option>`).join("")}</select>
        問数: <select id="drillCount"><option>5</option><option selected>10</option><option>25</option></select>
      </div>
      <div style="margin-top:10px">
        <button class="primary" onclick="startDrill('weak')">弱点優先で開始（推奨）</button>
        <button class="ghost" onclick="startDrill('unseen')">未解答の問題から</button>
        <button class="ghost" onclick="startDrill('random')">完全ランダム</button>
      </div></div>`;
    return html;
  }

  const s = drillSession;
  if (s.finished) {
    const pct = Math.round(100 * s.correct / s.qids.length);
    html += `<div class="card"><h2>ドリル結果</h2>
      <div class="tiles"><div class="tile"><div class="v">${s.correct}<span style="font-size:14px;color:var(--muted)"> / ${s.qids.length}</span></div><div class="l">正解数（${pct}%）</div></div></div>`;
    html += s.qids.map((qid, i) => {
      const q = qs.find(x => x.id === qid);
      const last = (state.drill[qid].attempts.slice(-1)[0] || {}).ok;
      const u = drillUnit(q);
      return `<div class="small" style="padding:4px 0;border-bottom:1px solid var(--grid)">
        ${last ? "<span style='color:var(--emerald)'>○</span>" : "<span style='color:var(--crit)'>✕</span>"}
        問${i + 1}　${esc(q.question.slice(0, 40))}…　<span class="muted">${u ? esc(u.name) : ""}</span></div>`;
    }).join("");
    html += `<div style="margin-top:12px"><button class="primary" onclick="endDrill()">出題設定に戻る</button></div></div>`;
    return html;
  }

  const q = qs.find(x => x.id === s.qids[s.idx]);
  const u = drillUnit(q);
  const answered = s.chosen !== null;
  html += `<div class="card"><div class="q-no">問${s.idx + 1} / ${s.qids.length}　${u ? esc(CATS[u.cat]) + "・" + esc(u.name) : ""} <span class="badge rank">${u ? u.trend : ""}</span></div>
    <div style="margin:8px 0 12px;font-size:15px">${esc(q.question)}${q.modified ? ' <span class="muted">（一部改変）</span>' : ""}</div>`;
  html += q.choices.map((c, i) => {
    let cls = "choice is-btn";
    if (answered) {
      if (i === q.answer) cls += " correct";
      else if (i === s.chosen) cls += " wrong";
    }
    return `<button class="${cls}" ${answered ? "disabled" : ""} onclick="drillAnswer(${i})"><span class="kana">${KANA[i]}</span>${esc(c)}</button>`;
  }).join("");
  if (answered) {
    const ok = s.chosen === q.answer;
    const hasMat = window.MATERIALS && window.MATERIALS[q.unitId];
    html += `<div class="${ok ? "notice" : "alert"}" style="margin-top:14px"><b>${ok ? "正解！" : "不正解（正解は「" + KANA[q.answer] + "」）"}</b><br>${esc(q.explanation)}</div>
      <div class="muted">${esc(q.source)}</div>
      <div style="margin-top:12px"><button class="primary" onclick="drillNext()">${s.idx + 1 >= s.qids.length ? "結果を見る" : "次の問題へ"}</button>
      ${hasMat ? `<button class="ghost" onclick="openMaterial('${q.unitId}')">📖 この単元の教材を読む</button>` : ""}</div>`;
  } else {
    html += `<div class="muted" style="margin-top:10px">${esc(q.source)}</div>`;
  }
  html += `<div style="margin-top:14px"><button class="ghost" onclick="endDrill()">中断する（履歴は保存済み）</button></div></div>`;
  return html;
}