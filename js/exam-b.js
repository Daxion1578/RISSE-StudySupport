"use strict";

/* =========================================================
   科目B（旧午後）記述演習
   - 問題データは data/questions-b/*.js が window.QUESTIONS_B に積む
   - 記述の下書き・自己採点は state.examB["大問id#設問id"] に保存され同期される
   - 採点はMVPではコピー方式: 採点プロンプトを組み立ててクリップボードへ
   ========================================================= */

let examBOpen = null; // 表示中の大問id（nullなら一覧）

function examBList() { return window.QUESTIONS_B || []; }
function examBKey(qid, sid) { return qid + "#" + sid; }
function examBRec(qid, sid) { return state.examB[examBKey(qid, sid)] || null; }

function openExamB(qid) { examBOpen = qid; render(); window.scrollTo(0, 0); }
function closeExamB() { examBOpen = null; render(); window.scrollTo(0, 0); }

function examBSaveDraft(qid, sid) {
  const ta = document.getElementById("bAns_" + sid);
  const rec = state.examB[examBKey(qid, sid)] || {};
  rec.answer = ta.value;
  rec.at = new Date().toISOString();
  state.examB[examBKey(qid, sid)] = rec;
  saveState();
  const el = document.getElementById("bSaved_" + sid);
  if (el) el.textContent = "保存しました";
}

function examBSaveScore(qid, sid) {
  const score = Number(document.getElementById("bScore_" + sid).value);
  const note = document.getElementById("bNote_" + sid).value;
  const rec = state.examB[examBKey(qid, sid)] || {};
  rec.score = isNaN(score) ? null : score;
  rec.note = note;
  rec.at = new Date().toISOString();
  state.examB[examBKey(qid, sid)] = rec;
  const q = examBList().find(x => x.id === qid);
  const sub = q.questions.find(x => x.id === sid);
  addLog("examB", `科目B ${q.theme} ${sub.label}: ${rec.score != null ? rec.score + "点" : "記録"}を保存`);
  saveState();
  render();
}

/* 採点プロンプトの組み立て（コピー方式とAI自動採点で共用） */
function buildGradingPrompt(qid, sid) {
  const q = examBList().find(x => x.id === qid);
  const sub = q.questions.find(x => x.id === sid);
  const my = (examBRec(qid, sid) || {}).answer || "（未記入）";
  const plain = q.body.replace(/<[^>]+>/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return [
    "あなたは情報処理安全確保支援士試験の採点者です。以下の記述式答案を10点満点で採点し、講評してください。",
    "採点基準: IPA解答例と同趣旨なら満点。部分的に正しければ部分点。問題文の条件（登場する組織名・システム名・字数制限など）を無視した答案は減点。",
    "",
    "【問題本文（抜粋可）】", plain,
    "",
    "【設問】" + sub.label, sub.text,
    sub.maxChars ? "（字数目安: " + sub.maxChars + "字以内）" : "",
    "",
    "【IPA公表の解答例】", sub.modelAnswer,
    sub.gradingNote ? "【採点講評の要点】\n" + sub.gradingNote : "",
    "",
    "【私の答案】", my,
    "",
    "出力形式: 必ず1行目を「点数: n/10」にし、続けて良い点、改善点、模範解答との差分を簡潔に。",
  ].join("\n");
}

function examBCopyPrompt(qid, sid) {
  navigator.clipboard.writeText(buildGradingPrompt(qid, sid)).then(() => {
    const el = document.getElementById("bCopied_" + sid);
    if (el) el.textContent = "コピーしました。Claudeなどに貼り付けて採点してもらい、結果を下に記録してください。";
  }).catch(() => alert("コピーに失敗しました。手動で選択してコピーしてください。"));
}

/* ---------- AI自動採点（任意機能。設定タブでAPIキーを保存した場合のみ） ---------- */
const AI_KEY = "sc-study-ai-v1";
function loadAiCfg() { try { return JSON.parse(localStorage.getItem(AI_KEY)) || {}; } catch (e) { return {}; } }
function saveAiCfg(c) { localStorage.setItem(AI_KEY, JSON.stringify(c)); }

async function examBAutoGrade(qid, sid) {
  const cfg = loadAiCfg();
  const el = document.getElementById("bCopied_" + sid);
  if (!cfg.apiKey) { if (el) el.textContent = "設定タブでClaude APIキーを保存すると自動採点できます。"; return; }
  const rec = examBRec(qid, sid);
  if (!rec || !rec.answer) { if (el) el.textContent = "先に答案を書いて保存してください。"; return; }
  if (el) el.textContent = "AIが採点中です…（10〜30秒）";
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": cfg.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
        "anthropic-beta": "server-side-fallback-2026-07-01",
      },
      body: JSON.stringify({
        model: "claude-opus-5",
        max_tokens: 4096,
        fallbacks: "default",
        messages: [{ role: "user", content: buildGradingPrompt(qid, sid) }],
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(res.status === 401 ? "APIキーが無効です" : (err.error && err.error.message) || "APIエラー " + res.status);
    }
    const data = await res.json();
    if (data.stop_reason === "refusal") throw new Error("この内容は自動採点できませんでした。コピー方式で採点してください");
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
    const m = text.match(/点数[:：]\s*(\d+)\s*\/\s*10/);
    const score = m ? Math.min(10, Number(m[1])) : null;
    const note = text.replace(/^点数[:：][^\n]*\n?/, "").replace(/\s+/g, " ").slice(0, 120);
    const r = state.examB[examBKey(qid, sid)] || {};
    if (score != null) r.score = score;
    r.note = note;
    r.at = new Date().toISOString();
    state.examB[examBKey(qid, sid)] = r;
    const q = examBList().find(x => x.id === qid);
    const sub = q.questions.find(x => x.id === sid);
    addLog("examB", `科目B ${q.theme} ${sub.label}: AI採点 ${score != null ? score + "点" : "記録"}`);
    saveState();
    render();
    const el2 = document.getElementById("bCopied_" + sid);
    if (el2) el2.textContent = "AI採点を記録しました: " + text.slice(0, 200);
  } catch (e) {
    const el2 = document.getElementById("bCopied_" + sid);
    if (el2) el2.textContent = "自動採点に失敗: " + e.message;
  }
}

/* ---------- 集計（ホーム・ロードマップ連動） ---------- */
function examBAvgScore() {
  const scores = Object.values(state.examB).map(r => r.score).filter(v => v != null);
  if (!scores.length) return null;
  return { avg: Math.round(10 * scores.reduce((a, b) => a + b, 0) / scores.length) / 10, n: scores.length };
}
function examBHomeTileHtml() {
  const a = examBAvgScore();
  if (!a) return "";
  const ok = a.avg >= 6;
  return `<div class="tile"><div class="v" style="background:none;-webkit-background-clip:initial;color:${ok ? "var(--emerald)" : "var(--crit)"}">${a.avg}<span style="font-size:14px;color:var(--muted)">/10</span></div><div class="l">科目B記述の平均点</div><div class="s">合格ライン目安6点・採点${a.n}問</div></div>`;
}
function examBProgressText() {
  const total = examBList().reduce((s, q) => s + q.questions.length, 0);
  if (!total) return "";
  const done = Object.values(state.examB).filter(r => r.score != null).length;
  const a = examBAvgScore();
  return `記述演習の進捗: 採点済み${done}/${total}問${a ? `・平均${a.avg}点` : ""}`;
}

function examBCount(sid) {
  const ta = document.getElementById("bAns_" + sid);
  const el = document.getElementById("bCount_" + sid);
  if (ta && el) el.textContent = ta.value.length;
}

function renderExamB() {
  const list = examBList();
  if (!list.length) {
    return `<div class="card"><h2>科目B 記述演習</h2>
      <div class="notice">問題データがまだ収録されていません。</div></div>`;
  }
  if (examBOpen) {
    const q = list.find(x => x.id === examBOpen);
    if (q) return renderExamBDetail(q);
    examBOpen = null;
  }
  const avg = examBAvgScore();
  let html = `<div class="card"><h2>科目B 記述演習</h2>
    <div class="small">IPA公表の過去問で記述式の演習をします。答案を書いたら「採点プロンプトをコピー」→ Claudeアプリ等に貼り付けて採点（設定タブでAPIキーを保存すればワンタップの自動採点も可）。下書き・点数は端末間で同期されます。本試験は4問中2問選択なので、<b>得意テーマを2つ作る</b>のが戦略です。</div>
    ${avg ? `<div class="tiles" style="margin-top:12px">
      <div class="tile"><div class="v" style="background:none;-webkit-background-clip:initial;color:${avg.avg >= 6 ? "var(--emerald)" : "var(--crit)"}">${avg.avg}<span style="font-size:14px;color:var(--muted)">/10</span></div><div class="l">記述の平均点（採点${avg.n}問）</div><div class="s">合格ライン目安: 6点${avg.avg >= 6 ? "・合格圏です" : "・あと" + Math.round(10 * (6 - avg.avg)) / 10 + "点"}</div></div>
    </div>` : ""}</div>`;
  html += list.map(q => {
    const total = q.questions.length;
    const done = q.questions.filter(s => { const r = examBRec(q.id, s.id); return r && r.score != null; }).length;
    const avg = (() => {
      const scores = q.questions.map(s => (examBRec(q.id, s.id) || {}).score).filter(v => v != null);
      return scores.length ? Math.round(10 * scores.reduce((a, b) => a + b, 0) / scores.length) / 10 : null;
    })();
    return `<div class="card"><h2>${esc(q.theme)}</h2>
      <div class="small muted">${esc(q.source)}　設問${total}問${done ? `・採点済み${done}問${avg != null ? `・平均${avg}点` : ""}` : ""}</div>
      <div style="margin-top:10px"><button class="primary" onclick="openExamB('${q.id}')">${done ? "続きから演習する" : "演習を始める"}</button></div>
    </div>`;
  }).join("");
  return html;
}

function renderExamBDetail(q) {
  let html = `<div class="card">
    <div class="muted small"><a href="javascript:void(0)" onclick="closeExamB()" style="color:var(--indigo)">← 問題一覧に戻る</a></div>
    <h2 style="margin-top:8px">${esc(q.theme)}</h2>
    <div class="muted small">${esc(q.source)}${q.figuresNote ? "　※" + esc(q.figuresNote) : ""}</div>
    <details style="margin-top:10px" open><summary style="cursor:pointer;color:var(--indigo)">問題本文（クリックで開閉）</summary>
      <div class="small" style="line-height:1.9;margin-top:8px">${q.body}</div></details>
  </div>`;

  q.questions.forEach(sub => {
    const rec = examBRec(q.id, sub.id) || {};
    html += `<div class="card"><h3 style="margin-top:0">${esc(sub.label)}</h3>
      <div class="small" style="margin-bottom:8px">${esc(sub.text)}</div>
      ${sub.hint ? `<details class="small"><summary style="cursor:pointer;color:var(--muted)">ヒントを見る</summary><div style="margin:6px 0">${esc(sub.hint)}</div></details>` : ""}
      <textarea id="bAns_${sub.id}" rows="4" placeholder="ここに答案を書く（自動保存ではありません。書いたら保存を押す）" oninput="examBCount('${sub.id}')">${esc(rec.answer || "")}</textarea>
      <div class="muted small"><span id="bCount_${sub.id}">${(rec.answer || "").length}</span>字${sub.maxChars ? `（目安: ${sub.maxChars}字以内）` : ""}</div>
      <div style="margin-top:6px">
        <button class="ghost" onclick="examBSaveDraft('${q.id}','${sub.id}')">答案を保存</button>
        <span id="bSaved_${sub.id}" class="muted small"></span>
      </div>
      <details style="margin-top:10px"><summary style="cursor:pointer;color:var(--emerald)">IPA解答例を見る（自分で書いてから！）</summary>
        <div class="small" style="margin:8px 0"><b>解答例:</b> ${esc(sub.modelAnswer)}
        ${sub.gradingNote ? `<br><b>講評の要点:</b> ${esc(sub.gradingNote)}` : ""}</div>
      </details>
      <div style="margin-top:10px">
        <button class="primary" onclick="examBCopyPrompt('${q.id}','${sub.id}')">採点プロンプトをコピー</button>
        ${loadAiCfg().apiKey ? `<button class="ghost" onclick="examBAutoGrade('${q.id}','${sub.id}')">🤖 AIで自動採点</button>` : ""}
        <div id="bCopied_${sub.id}" class="muted small" style="margin-top:4px"></div>
      </div>
      <div class="small" style="margin-top:10px">
        採点結果: <input type="number" id="bScore_${sub.id}" min="0" max="10" value="${rec.score != null ? rec.score : ""}" style="width:4em"> /10点
        メモ: <input type="text" id="bNote_${sub.id}" value="${esc(rec.note || "")}" style="width:min(280px,60%)" placeholder="講評の要点など">
        <button class="ghost" onclick="examBSaveScore('${q.id}','${sub.id}')">記録</button>
        ${rec.score != null ? `<span class="status-chip done">✓ ${rec.score}点</span>` : ""}
      </div>
    </div>`;
  });
  html += `<div class="card"><button class="ghost" onclick="closeExamB()">← 問題一覧に戻る</button></div>`;
  return html;
}