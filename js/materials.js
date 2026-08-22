"use strict";

/* =========================================================
   教材ビューア
   - 教材データは data/materials/cat-*.js が window.MATERIALS に積む
   - ドリルの解説・単元マップからも openMaterial(unitId) で飛べる
   ========================================================= */

let materialUnit = null; // 表示中の単元id（nullなら一覧）

function materialsOf() { return window.MATERIALS || {}; }

function openMaterial(unitId) {
  materialUnit = unitId;
  activeTab = "materials";
  animateNext = true;
  render();
  window.scrollTo(0, 0);
}

function closeMaterial() { materialUnit = null; render(); window.scrollTo(0, 0); }

function renderMaterials() {
  const mats = materialsOf();
  if (!Object.keys(mats).length) {
    return `<div class="card"><h2>教材</h2>
      <div class="notice">教材データがまだ収録されていません。</div></div>`;
  }
  if (materialUnit && mats[materialUnit]) return renderMaterialDetail(mats[materialUnit]);
  materialUnit = null;

  let html = `<div class="card"><h2>教材（分野別テキスト）</h2>
    <div class="small">試験範囲を単元ごとに解説した教材です。重要度<span class="badge rank">S</span>の単元には図解が付いています。読み終えたらロードマップや単元マップでチェックを入れてください。</div></div>`;

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

function renderMaterialDetail(m) {
  const u = UNITS.find(x => x.id === m.unitId);
  let html = `<div class="card">
    <div class="muted small"><a href="javascript:void(0)" onclick="closeMaterial()" style="color:var(--indigo)">← 教材一覧に戻る</a>　${u ? esc(CATS[u.cat]) : ""}</div>
    <h2 style="margin-top:8px">${esc(m.title)} <span class="badge rank">${u ? u.trend : ""}</span></h2>`;

  (m.sections || []).forEach(s => {
    html += `<h3>${esc(s.heading)}</h3><div class="small" style="line-height:1.9">${s.body}</div>`;
    if (s.svg) html += `<div style="margin:12px 0;padding:14px;border:1px solid var(--grid);border-radius:12px;background:rgba(255,255,255,0.02)">${s.svg}</div>`;
  });

  if (m.terms && m.terms.length) {
    html += `<h3>重要用語</h3><div class="tbl-wrap"><table>` +
      m.terms.map(t => `<tr><th style="width:12em">${esc(t.term)}${t.en ? `<div class="muted" style="font-weight:normal;font-size:11px">${esc(t.en)}</div>` : ""}</th><td>${esc(t.desc)}</td></tr>`).join("") +
      `</table></div>`;
  }

  const done = isDone(m.unitId);
  html += `<div style="margin-top:16px">
    <button class="primary" onclick="toggleUnit('${m.unitId}'); openMaterial('${m.unitId}')">${done ? "完了を取り消す" : "この単元を学習完了にする ✓"}</button>
    <button class="ghost" onclick="startDrillForUnit('${m.unitId}')">この単元のドリルを解く</button>
    <button class="ghost" onclick="closeMaterial()">一覧に戻る</button>
  </div></div>`;
  return html;
}