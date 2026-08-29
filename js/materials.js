"use strict";

/* =========================================================
   教材ビューア（小単元ページ方式）
   - 教材データは data/materials/cat-*.js が window.MATERIALS に積む
   - 1画面の情報量を抑えるため、単元は「目次 → 小単元（節）を1つずつ」
     の形で表示する。各節の末尾には、その節の知識で解ける過去問を
     「小単元演習」として出す（検索練習: 読んだ直後に思い出すと定着する）
   - ドリルの解説からは openMaterialForQuestion(qid) で該当の節に直接飛ぶ
   ========================================================= */

let materialUnit = null;    // 表示中の単元id（nullなら一覧）
let materialSection = null; // 表示中の節index（nullなら単元の目次）

function materialsOf() { return window.MATERIALS || {}; }

function openMaterial(unitId) {
  materialUnit = unitId;
  materialSection = null;
  activeTab = "materials";
  animateNext = true;
  render();
  window.scrollTo(0, 0);
}

function openMaterialSection(unitId, idx) {
  materialUnit = unitId;
  materialSection = idx;
  activeTab = "materials";
  render();
  window.scrollTo(0, 0);
}

function closeMaterial() { materialUnit = null; materialSection = null; render(); window.scrollTo(0, 0); }

/* 問題qに最も関係が深い節のindex（語句の重なりで判定）。見つからなければnull */
function bestSectionIdx(q, m) {
  const src = q.question + " " + q.choices[q.answer] + " " + q.explanation;
  const tokens = new Set(src.match(/[A-Za-z0-9./-]{2,}|[ァ-ヶー]{3,}|[一-龠々]{2,}/g) || []);
  let best = null, bestScore = 0;
  (m.sections || []).forEach((s, i) => {
    const text = s.heading + (s.body || "").replace(/<[^>]*>/g, "");
    let score = 0;
    tokens.forEach(t => { if (text.includes(t)) score++; });
    if (score > bestScore) { bestScore = score; best = i; }
  });
  return best;
}

/* 単元の過去問を節ごとに振り分ける: [節index] -> 問題の配列 */
function sectionQuestionMap(m) {
  const map = (m.sections || []).map(() => []);
  drillQuestions().filter(q => q.unitId === m.unitId).forEach(q => {
    const i = bestSectionIdx(q, m);
    if (i !== null) map[i].push(q);
  });
  return map;
}

/* 節の過去問だけでドリルを開始（小単元演習） */
function startSectionQuiz(unitId, secIdx) {
  const m = materialsOf()[unitId];
  if (!m) return;
  const qs = sectionQuestionMap(m)[secIdx] || [];
  startDrillForQids(qs.map(q => q.id), (m.sections[secIdx] || {}).heading || "");
}

/* ドリルから「この問題の解説が書かれている節」へ直接飛ぶ */
function openMaterialForQuestion(qid) {
  const q = (window.QUESTIONS_A || []).concat(window.QUESTIONS_A1 || []).find(x => x.id === qid);
  if (!q || !materialsOf()[q.unitId]) return;
  const m = materialsOf()[q.unitId];
  const best = bestSectionIdx(q, m);
  openMaterialSection(q.unitId, best !== null ? best : 0);
  const el = document.querySelector(".mat-sec");
  if (el) {
    el.classList.add("mat-hit");
    setTimeout(() => el.classList.remove("mat-hit"), 2600);
  }
}

function renderMaterials() {
  const mats = materialsOf();
  if (!Object.keys(mats).length) {
    return `<div class="card"><h2>教材</h2>
      <div class="notice">教材データがまだ収録されていません。</div></div>`;
  }
  if (materialUnit && mats[materialUnit]) return renderMaterialDetail(mats[materialUnit]);
  materialUnit = null;

  let html = `<div class="card"><h2>教材（分野別テキスト）</h2>
    <div class="small">試験範囲を単元ごとに解説した教材です。単元を開くと小単元（節）ごとに読み進められ、各節の最後でその節の知識を使う過去問をすぐ解けます（読んだ直後に思い出すと記憶に残ります）。読み終えたらロードマップや単元マップでチェックを入れてください。</div></div>`;

  for (const catId of Object.keys(CATS)) {
    const units = UNITS.filter(u => u.cat === catId && mats[u.id]);
    if (!units.length) continue;
    html += `<div class="card"><h2>${CATS[catId]}</h2>`;
    html += units.map(u => {
      const st = typeof drillUnitStats === "function" ? drillUnitStats(u.id) : { acc: null };
      const acc = st.acc !== null ? `<span class="muted">ドリル正答率 ${Math.round(st.acc * 100)}%</span>` : "";
      return `<div class="unit ${isDone(u.id) ? "done" : ""}">
        <div class="u-name"><a href="javascript:void(0)" onclick="openMaterial('${u.id}')" style="color:var(--indigo);text-decoration:none">${esc(u.name)}</a>
          <span class="badge rank">${u.trend}</span>
          <div class="u-meta">${esc(u.desc)}　${acc}</div></div>
        <span class="status-chip ${isDone(u.id) ? "done" : "todo"}">${isDone(u.id) ? "✓ 済" : "未学習"}</span>
      </div>`;
    }).join("");
    html += `</div>`;
  }
  return html;
}

/* ---------- 単元の目次（小単元一覧） ---------- */
function renderMaterialToc(m, u) {
  const secs = m.sections || [];
  const qmap = sectionQuestionMap(m);
  const done = isDone(m.unitId);
  const inDrill = typeof drillSession !== "undefined" && drillSession;

  let html = `<div class="card">
    <div class="muted small"><a href="javascript:void(0)" onclick="closeMaterial()" style="color:var(--indigo)">← 教材一覧に戻る</a>　${u ? esc(CATS[u.cat]) : ""}</div>
    <h2 style="margin-top:8px">${esc(m.title)} <span class="badge rank">${u ? u.trend : ""}</span></h2>
    <div class="small">${u ? esc(u.desc) : ""}</div>
    <div class="small muted" style="margin-top:6px">小単元を1つずつ読み進めてください。各節の最後に、その節の知識で解ける過去問があります。</div>`;

  html += secs.map((s, i) => {
    const chars = (s.body || "").replace(/<[^>]*>/g, "").length;
    const mins = Math.max(1, Math.round(chars / 500)); // 読了目安（500字/分）
    return `<div class="unit">
      <div class="u-name"><a href="javascript:void(0)" onclick="openMaterialSection('${m.unitId}', ${i})" style="color:var(--indigo);text-decoration:none">${i + 1}. ${esc(s.heading)}</a>
        <div class="u-meta">約${mins}分${s.svg ? "・図解あり" : ""}${qmap[i].length ? `・関連過去問${qmap[i].length}問` : ""}</div></div>
      <button class="ghost" onclick="openMaterialSection('${m.unitId}', ${i})">読む</button>
    </div>`;
  }).join("");

  if (m.terms && m.terms.length) {
    html += `<div class="unit">
      <div class="u-name"><a href="javascript:void(0)" onclick="openMaterialSection('${m.unitId}', ${secs.length})" style="color:var(--indigo);text-decoration:none">${secs.length + 1}. 重要用語（${m.terms.length}語）</a>
        <div class="u-meta">この単元の用語一覧。本文中でもホバーで意味を確認できます</div></div>
      <button class="ghost" onclick="openMaterialSection('${m.unitId}', ${secs.length})">読む</button>
    </div>`;
  }

  html += `<div style="margin-top:16px">
    <button class="primary" onclick="toggleUnit('${m.unitId}'); openMaterial('${m.unitId}')">${done ? "完了を取り消す" : "この単元を学習完了にする ✓"}</button>
    ${inDrill ? `<button class="ghost" onclick="switchTab('drill')">← ドリルに戻る</button>` : `<button class="ghost" onclick="startDrillForUnit('${m.unitId}')">この単元のドリルを解く</button>`}
  </div></div>`;
  return html;
}

/* ---------- 小単元（節）ページ ---------- */
function renderMaterialDetail(m) {
  const u = UNITS.find(x => x.id === m.unitId);
  const secs = m.sections || [];
  if (materialSection === null) return renderMaterialToc(m, u);

  const i = materialSection;
  const isTerms = i >= secs.length;
  const total = secs.length + (m.terms && m.terms.length ? 1 : 0);
  const inDrill = typeof drillSession !== "undefined" && drillSession;

  let html = `<div class="card">
    <div class="muted small"><a href="javascript:void(0)" onclick="openMaterial('${m.unitId}')" style="color:var(--indigo)">← ${esc(m.title)} の目次</a>　${i + 1} / ${total}</div>`;

  if (isTerms) {
    html += `<h2 style="margin-top:8px">重要用語</h2><div class="tbl-wrap"><table>` +
      m.terms.map(t => `<tr><th style="width:12em">${esc(t.term)}${t.en ? `<div class="muted" style="font-weight:normal;font-size:11px">${esc(t.en)}</div>` : ""}</th><td>${esc(t.desc)}</td></tr>`).join("") +
      `</table></div>`;
  } else {
    const s = secs[i];
    html += `<div class="mat-sec"><h2 style="margin-top:8px">${esc(s.heading)}</h2>
      <div class="small" style="line-height:1.9">${s.body}</div>`;
    if (s.svg) html += `<div style="margin:12px 0;padding:14px;border:1px solid var(--grid);border-radius:12px;background:rgba(255,255,255,0.02)">${s.svg}</div>`;
    html += `</div>`;

    // 小単元演習: この節の知識で解ける過去問（検索練習）
    const qs = sectionQuestionMap(m)[i] || [];
    if (qs.length) {
      html += `<div class="sec-quiz"><h3>この節の過去問はこう出た（${qs.length}問）</h3>
        <div class="small muted">読んだ直後に解くと定着します。出典つきの実際の過去問です。</div>` +
        qs.slice(0, 6).map(q => {
          const st = typeof drillQStats === "function" ? drillQStats(q.id) : { tries: 0 };
          const mark = st.tries === 0 ? "" : (state.drill[q.id].attempts.slice(-1)[0].ok ? " <span style='color:var(--emerald)'>○</span>" : " <span style='color:var(--crit)'>✕</span>");
          return `<div class="small" style="padding:5px 0;border-bottom:1px solid var(--grid)">${esc(q.question.slice(0, 55))}…
            <span class="muted">${esc(q.source.replace("出典: ", ""))}</span>${mark}</div>`;
        }).join("") +
        (qs.length > 6 ? `<div class="small muted" style="padding:4px 0">ほか${qs.length - 6}問</div>` : "") +
        `<div style="margin-top:10px"><button class="primary" onclick="startSectionQuiz('${m.unitId}', ${i})">この節の過去問を解く（${qs.length}問）</button></div>
      </div>`;
    }
  }

  // ナビゲーション
  html += `<div style="margin-top:16px">
    ${i > 0 ? `<button class="ghost" onclick="openMaterialSection('${m.unitId}', ${i - 1})">← 前の節</button>` : ""}
    ${i + 1 < total ? `<button class="primary" onclick="openMaterialSection('${m.unitId}', ${i + 1})">次の節 →</button>`
      : `<button class="primary" onclick="toggleUnit('${m.unitId}'); openMaterial('${m.unitId}')">${isDone(m.unitId) ? "完了を取り消す" : "読了！ この単元を学習完了にする ✓"}</button>`}
    <button class="ghost" onclick="openMaterial('${m.unitId}')">目次へ</button>
    ${inDrill ? `<button class="ghost" onclick="switchTab('drill')">← ドリルに戻る</button>` : ""}
  </div></div>`;
  return html;
}
