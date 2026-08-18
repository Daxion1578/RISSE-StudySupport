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

/* 採点プロンプトを組み立ててクリップボードへ（Claudeアプリに貼って採点してもらう） */
function examBCopyPrompt(qid, sid) {
  const q = examBList().find(x => x.id === qid);
  const sub = q.questions.find(x => x.id === sid);
  const my = (examBRec(qid, sid) || {}).answer || "（未記入）";
  const plain = q.body.replace(/<[^>]+>/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  const prompt = [
    "あなたは情報処理安全確保支援士試験の採点者です。以下の記述式答案を10点満点で採点し、講評してください。",
    "採点基準: IPA解答例と同趣旨なら満点。部分的に正しければ部分点。問題文の条件（登場する組織名・システム名・字数制限など）を無視した答案は減点。",
    "",
    "【問題本文（抜粋可）】", plain,
    "",
    "【設問】" + sub.label, sub.text,
    "",
    "【IPA公表の解答例】", sub.modelAnswer,
    sub.gradingNote ? "【採点講評の要点】\n" + sub.gradingNote : "",
    "",
    "【私の答案】", my,
    "",
    "出力形式: 「点数: n/10」の行、良い点、改善点、模範解答との差分の順で簡潔に。",
  ].join("\n");
  navigator.clipboard.writeText(prompt).then(() => {
    const el = document.getElementById("bCopied_" + sid);
    if (el) el.textContent = "コピーしました。Claudeなどに貼り付けて採点してもらい、結果を下に記録してください。";
  }).catch(() => alert("コピーに失敗しました。手動で選択してコピーしてください。"));
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
  let html = `<div class="card"><h2>科目B 記述演習</h2>
    <div class="small">IPA公表の過去問で記述式の演習をします。答案を書いたら「採点プロンプトをコピー」→ Claudeアプリ等に貼り付けて採点してもらい、点数を記録してください。下書き・点数は端末間で同期されます。</div></div>`;
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
      <textarea id="bAns_${sub.id}" rows="4" placeholder="ここに答案を書く（自動保存ではありません。書いたら保存を押す）">${esc(rec.answer || "")}</textarea>
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