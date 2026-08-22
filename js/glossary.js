"use strict";

/* =========================================================
   用語集＋ホバー解説（ツールチップ）
   - 用語の出どころは2つ:
     ① 各教材の terms（data/materials/cat-*.js）
     ② 横断的な基礎用語（data/glossary-extra.js の GLOSSARY_EXTRA。同名なら②が優先）
   - render() のあと annotateTerms() が本文中の用語を <span class="term"> に包み、
     マウスオーバー（スマホはタップ）でツールチップを出す
   ========================================================= */

let GLOSSARY = null;      // 用語 -> { desc, unitId }
let glossaryRegex = null;

function buildGlossary() {
  GLOSSARY = {};
  Object.values(window.MATERIALS || {}).forEach(m => (m.terms || []).forEach(t => {
    if (!t.term || !t.desc) return;
    if (!GLOSSARY[t.term] || GLOSSARY[t.term].desc.length < t.desc.length) {
      GLOSSARY[t.term] = { desc: t.desc, en: t.en || null, unitId: m.unitId };
    }
  }));
  // GLOSSARY_EXTRA の値は 文字列 or { en, desc } の両形式に対応
  Object.entries(window.GLOSSARY_EXTRA || {}).forEach(([term, v]) => {
    const desc = typeof v === "string" ? v : v.desc;
    const en = typeof v === "string" ? null : (v.en || null);
    GLOSSARY[term] = { desc, en: en || (GLOSSARY[term] || {}).en || null, unitId: (GLOSSARY[term] || {}).unitId || null };
  });
  const terms = Object.keys(GLOSSARY).filter(t => t.length >= 2)
    .sort((a, b) => b.length - a.length)  // 長い用語を先に照合（「公開鍵暗号」を「公開鍵」より優先）
    .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  glossaryRegex = terms.length ? new RegExp(terms.join("|"), "g") : null;
}

/* 本文中の用語をツールチップ付きspanに置き換える */
function annotateTerms(root) {
  if (!GLOSSARY) buildGlossary();
  if (!glossaryRegex) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      if (!n.nodeValue || n.nodeValue.length < 2) return NodeFilter.FILTER_REJECT;
      const p = n.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      if (p.closest("svg, textarea, input, select, button, nav, h1, h2, .term, .badge, .glos-row, .q-no")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const text = node.nodeValue;
    glossaryRegex.lastIndex = 0;
    if (!glossaryRegex.test(text)) return;
    glossaryRegex.lastIndex = 0;
    const frag = document.createDocumentFragment();
    let last = 0, m;
    while ((m = glossaryRegex.exec(text))) {
      frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const span = document.createElement("span");
      span.className = "term";
      span.textContent = m[0];
      span.dataset.term = m[0];
      span.tabIndex = 0;
      frag.appendChild(span);
      last = m.index + m[0].length;
    }
    frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  });
}

/* ツールチップの表示制御（イベントは一度だけ登録） */
function initTermTip() {
  if (document.getElementById("termTip")) return;
  const tip = document.createElement("div");
  tip.id = "termTip";
  document.body.appendChild(tip);

  function show(el) {
    const term = el.dataset.term;
    const g = GLOSSARY && GLOSSARY[term];
    if (!g) return;
    const unit = g.unitId ? UNITS.find(u => u.id === g.unitId) : null;
    tip.innerHTML = `<b>${esc(term)}</b>${g.en ? `<span class="tip-en">${esc(g.en)}</span>` : ""}<br>${esc(g.desc)}` +
      (unit ? `<div class="tip-src">関連単元: ${esc(unit.name)}</div>` : "");
    tip.style.display = "block";
    const r = el.getBoundingClientRect();
    const tw = Math.min(320, window.innerWidth * 0.86);
    let left = Math.min(Math.max(8, r.left), window.innerWidth - tw - 8);
    tip.style.left = left + "px";
    tip.style.top = "0px"; // 一旦置いて高さを測る
    const th = tip.offsetHeight;
    const below = r.bottom + 8 + th < window.innerHeight;
    tip.style.top = (below ? r.bottom + 8 : Math.max(8, r.top - th - 8)) + "px";
  }
  function hide() { tip.style.display = "none"; }

  document.addEventListener("mouseover", e => {
    const t = e.target.closest ? e.target.closest(".term") : null;
    if (t) show(t);
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest && e.target.closest(".term")) hide();
  });
  // スマホ: タップで表示、他の場所タップで消す
  document.addEventListener("click", e => {
    const t = e.target.closest ? e.target.closest(".term") : null;
    if (t) show(t); else hide();
  });
  window.addEventListener("scroll", hide, { passive: true });
}

/* ---------- 用語集タブ ---------- */
function renderGlossary() {
  if (!GLOSSARY) buildGlossary();
  const entries = Object.entries(GLOSSARY).sort((a, b) => a[0].localeCompare(b[0], "ja"));
  let html = `<div class="card"><h2>用語集（${entries.length}語）</h2>
    <div class="small">教材に登場する専門用語と基礎IT用語の一覧です。教材・ドリル解説などの本文中では、これらの用語に点線の下線が付き、カーソルを乗せる（スマホはタップ）とその場で意味が表示されます。</div>
    <div style="margin-top:10px"><input type="text" placeholder="用語を検索…" style="width:min(320px,100%)"
      oninput="glossaryFilter(this.value)"></div></div>`;
  html += `<div class="card">` + entries.map(([term, g]) => {
    const unit = g.unitId ? UNITS.find(u => u.id === g.unitId) : null;
    return `<div class="glos-row unit" data-k="${esc((term + " " + (g.en || "") + " " + g.desc).toLowerCase())}">
      <div class="u-name"><b style="color:var(--indigo)">${esc(term)}</b>${g.en ? ` <span class="muted" style="font-size:12px">${esc(g.en)}</span>` : ""}
        <div class="u-meta" style="font-size:12.5px;color:var(--ink-2)">${esc(g.desc)}</div>
        ${unit ? `<div class="u-meta"><a href="javascript:void(0)" onclick="openMaterial('${unit.id}')" style="color:var(--muted)">→ 教材: ${esc(unit.name)}</a></div>` : ""}
      </div></div>`;
  }).join("") + `</div>`;
  return html;
}

function glossaryFilter(v) {
  const q = v.trim().toLowerCase();
  document.querySelectorAll(".glos-row").forEach(r => {
    r.style.display = !q || r.dataset.k.includes(q) ? "" : "none";
  });
}