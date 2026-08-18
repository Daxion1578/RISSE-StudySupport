"use strict";

/* =========================================================
   画面描画
   ========================================================= */
const TABS = [
  { id:"home", name:"ホーム" },
  { id:"diag", name:"レベル診断" },
  { id:"roadmap", name:"ロードマップ" },
  { id:"drill", name:"ドリル" },
  { id:"materials", name:"教材" },
  { id:"examb", name:"科目B演習" },
  { id:"units", name:"単元マップ" },
  { id:"log", name:"学習記録" },
  { id:"trend", name:"出題傾向" },
  { id:"config", name:"設定" },
];
let activeTab = "home";
let diagInProgress = false;
let animateNext = true; // 画面切替時だけカードをふわっと浮き上がらせる（チェック操作の再描画では動かさない）

function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

function render() {
  const nav = document.getElementById("nav");
  nav.innerHTML = TABS.map(t =>
    `<button class="${t.id===activeTab?"active":""}" onclick="switchTab('${t.id}')">${t.name}</button>`).join("");
  const main = document.getElementById("main");
  const fn = { home:renderHome, diag:renderDiag, roadmap:renderRoadmap, drill:renderDrill, materials:renderMaterials, examb:renderExamB, units:renderUnits, log:renderLog, trend:renderTrend, config:renderConfig }[activeTab];
  main.innerHTML = fn();
  if (animateNext) {
    animateNext = false;
    main.querySelectorAll(".card").forEach(c => c.classList.add("reveal"));
    observeReveals();
  }
}
/* スクロールに合わせて .card を浮き上がらせる */
function observeReveals() {
  if (!window.__revealObs) {
    window.__revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("visible"); window.__revealObs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
  }
  document.querySelectorAll(".card.reveal:not(.visible)").forEach(el => window.__revealObs.observe(el));
}
function switchTab(id) { activeTab = id; diagInProgress = false; animateNext = true; render(); window.scrollTo(0,0); }

/* ---------- 学習記録 ---------- */
function renderLog() {
  let html = `<div class="card"><h2>学習記録</h2>
    <div class="small">単元の完了・診断の実施が自動で記録されます。「何を勉強したか」はこのタブと単元マップでいつでも確認できます。</div></div>`;
  if (!state.log.length) return html + `<div class="card muted">まだ記録がありません。</div>`;
  html += `<div class="card"><div class="tbl-wrap"><table><tr><th style="width:11em">日時</th><th>内容</th></tr>`;
  html += state.log.map(l => {
    const d = new Date(l.ts);
    return `<tr><td>${fmtDateFull(d)} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}</td><td>${esc(l.text)}</td></tr>`;
  }).join("");
  return html + `</table></div></div>`;
}

/* ---------- 出題傾向 ---------- */
function renderTrend() {
  let html = `<div class="card"><h2>出題傾向分析（ロードマップの根拠）</h2>
    <div class="small">このアプリの単元の重要度ランク（S/A/B）と時間配分は、以下の実際の出題実績と試験制度の分析に基づいています。詳細はリポジトリの docs/trend-analysis.md 参照。</div></div>`;

  html += `<div class="card"><h2>試験制度（2026年度〜の重要変更）</h2><div class="small">
    <ul>
      <li><b>CBT方式に移行</b>。従来の春期・秋期は「前期・後期」に変わりました（2027年4月の春期試験はありません）</li>
      <li>科目名変更: 午前I→科目A-1、午前II→科目A-2、午後→科目B</li>
      <li>既定の目標＝<b>後期試験</b>: 申込 2027/1/27〜2/27、科目A 2027/2/20〜3/2、科目B 2027/3/16〜28</li>
      <li>2026年度の出題範囲は変更なし（2027年度以降に科目Aの体系再編の方向性あり）</li>
    </ul></div></div>`;

  html += `<div class="card"><h2>科目B（旧午後）の出題テーマ実績</h2><div class="tbl-wrap"><table>
    <tr><th>実施回</th><th>問1</th><th>問2</th><th>問3</th><th>問4</th></tr>`;
  html += PAST_THEMES.map(p => `<tr><td>${p.exam}</td>${p.themes.map(t=>`<td>${esc(t)}</td>`).join("")}</tr>`).join("");
  html += `</table></div>
    <h3>読み取れるトレンド</h3><div class="small"><ul>
      <li><b>脆弱性管理・IT資産管理</b>が令和7年春に2問出題 → 最重点（Sランク）</li>
      <li><b>クラウド・SaaS、サプライチェーン、インシデント対応</b>が定番化 → Sランク</li>
      <li>Web・DNS・メールなどの技術系テーマも毎回どこかに登場 → Sランク</li>
      <li>開発・インフラ・NWが混ざる<b>融合問題</b>が増加 → 特定分野の丸暗記ではなく横断理解が必要</li>
      <li>新技術は台頭から2〜3年で出題される（例: 暗号資産 R7秋）</li>
    </ul></div></div>`;

  html += `<div class="card"><h2>科目A-2（旧午前II）の傾向</h2><div class="small"><ul>
    <li>25問中、セキュリティ約17問＋ネットワーク約3問。残りはDB・開発・監査など</li>
    <li><b>過去問からの再出題が約4〜5割</b>。特に3〜8回前の問題が再出題されやすい</li>
    <li>→ ロードマップ終盤に「科目A過去問演習」を計6回分（計14時間）確保しています</li>
  </ul></div></div>`;

  html += `<div class="card"><h2>情報源</h2><div class="small"><ul>
    <li><a href="https://www.sc-siken.com/" target="_blank" rel="noopener">情報処理安全確保支援士ドットコム（過去問・テーマ実績）</a></li>
    <li><a href="https://www.tac-school.co.jp/kouza_joho/joho_cbt_2026.html" target="_blank" rel="noopener">TAC: 令和8年度 CBT実施概要・日程</a></li>
    <li><a href="https://www.itec.co.jp/examination/ap_koudo_sc-cbt.html" target="_blank" rel="noopener">アイテック: 制度変更の解説</a></li>
    <li><a href="https://www.ipa.go.jp/shiken/" target="_blank" rel="noopener">IPA 情報処理技術者試験（公式・最新日程は必ずここで確認）</a></li>
  </ul></div></div>`;
  return html;
}

/* ---------- 設定 ---------- */
function renderConfig() {
  const s = state.settings;
  let html = `<div class="card"><h2>目標試験</h2>
    <select id="cfgPreset" onchange="onPresetChange()">` +
    EXAM_PRESETS.map(p => `<option value="${p.id}" ${s.examPreset===p.id?"selected":""}>${esc(p.name)}</option>`).join("") +
    `</select>
    <div style="margin-top:10px" class="small">
      科目A開始日: <input type="date" id="cfgDateA" value="${s.dateA}" ${s.examPreset!=="custom"?"disabled":""}>
      科目B開始日: <input type="date" id="cfgDateB" value="${s.dateB}" ${s.examPreset!=="custom"?"disabled":""}>
    </div>
    <div class="muted" style="margin-top:6px">CBTは期間内で受験日を選べます。開始日を基準に逆算しています。正式日程はIPA公式サイトで必ず確認してください。</div></div>`;

  html += `<div class="card"><h2>学習ペース</h2>
    週あたりの学習時間: <input type="number" id="cfgHours" min="3" max="40" value="${s.hoursPerWeek}" style="width:5em"> 時間
    <div class="muted" style="margin-top:6px">平日1時間＋休日2時間ずつなら週9時間です。</div>
    <div style="margin-top:10px"><button class="primary" onclick="saveConfig()">設定を保存してロードマップを再計算</button></div></div>`;

  const sc = loadSyncCfg();
  html += `<div class="card"><h2>クラウド同期（PC⇄スマホ）</h2>
    <div class="small">GitHubの非公開Gistに学習データを保存し、複数の端末で共有します。初回だけ下の手順でトークンを作り、<b>すべての端末で同じトークン</b>を貼り付けてください。</div>
    <details class="small" style="margin:8px 0"><summary style="cursor:pointer;color:var(--indigo)">トークンの作り方（初回のみ・約2分）</summary>
      <ol style="margin:8px 0 0;padding-left:20px">
        <li>GitHubにログイン → 右上アイコン → <b>Settings</b></li>
        <li>左メニュー最下部 <b>Developer settings</b> → <b>Personal access tokens</b> → <b>Tokens (classic)</b></li>
        <li><b>Generate new token (classic)</b> を押す（Note: <code>sc-study-sync</code>、Expiration: 1年など）</li>
        <li>スコープは <b>gist だけ</b>にチェック → <b>Generate token</b></li>
        <li>表示された <code>ghp_...</code> をコピーして下に貼り付け（この画面を閉じると二度と見られないので注意）</li>
      </ol>
      <div class="muted" style="margin-top:6px">トークンはこの端末のブラウザ内にだけ保存され、エクスポートファイルには含まれません。gist権限しか無いので、万一漏れてもリポジトリ等は操作されません。</div>
    </details>
    <div style="margin-top:8px">
      <input type="password" id="syncToken" placeholder="${sc.token ? "トークン保存済み（変更する場合のみ入力）" : "ghp_... を貼り付け"}" style="width:min(340px,100%)">
    </div>
    <label class="small" style="display:block;margin:8px 0"><input type="checkbox" id="syncAuto" ${sc.auto !== false ? "checked" : ""}> アプリを開いたとき自動で同期する</label>
    <div>
      <button class="primary" onclick="saveSyncSettings()">保存して同期</button>
      <button class="ghost" onclick="doSync(false)">今すぐ同期</button>
      ${sc.token ? `<button class="ghost danger" onclick="clearSyncSettings()">この端末の同期設定を削除</button>` : ""}
    </div>
    <div id="syncStatus" class="muted" style="margin-top:8px">${sc.lastSync ? "最終同期: " + fmtDateFull(new Date(sc.lastSync)) + " " + new Date(sc.lastSync).toTimeString().slice(0,5) : "未同期"}</div>
  </div>`;

  html += `<div class="card"><h2>データのバックアップ</h2>
    <div class="small">学習データはこのブラウザ内（localStorage）だけに保存されます。端末変更・ブラウザ履歴削除で消えるため、定期的にエクスポートしてください。</div>
    <div style="margin-top:8px">
      <button class="ghost" onclick="exportData()">エクスポート（ファイル保存）</button>
      <button class="ghost" onclick="document.getElementById('importFile').click()">インポート</button>
      <input type="file" id="importFile" accept=".json" style="display:none" onchange="importData(event)">
    </div>
    <textarea id="exportArea" rows="4" style="margin-top:8px" placeholder="エクスポートするとここにもJSONが表示されます（コピー保存用）"></textarea></div>`;

  html += `<div class="card"><h2>データの初期化</h2>
    <button class="ghost danger" onclick="resetData()">すべての学習データを削除</button>
    <div class="muted" style="margin-top:6px">診断結果・進捗・記録がすべて消えます。元に戻せません。</div></div>`;
  return html;
}

function onPresetChange() {
  const id = document.getElementById("cfgPreset").value;
  const p = EXAM_PRESETS.find(x => x.id === id);
  const a = document.getElementById("cfgDateA"), b = document.getElementById("cfgDateB");
  if (p.dateA) { a.value = p.dateA; b.value = p.dateB; }
  a.disabled = b.disabled = (id !== "custom");
}
function saveConfig() {
  const preset = document.getElementById("cfgPreset").value;
  const dateA = document.getElementById("cfgDateA").value;
  const dateB = document.getElementById("cfgDateB").value;
  const hours = Math.max(3, Math.min(40, Number(document.getElementById("cfgHours").value) || 9));
  if (!dateA || !dateB) { alert("試験日を入力してください"); return; }
  state.settings = { examPreset: preset, dateA, dateB, hoursPerWeek: hours, updatedAt: Date.now() };
  addLog("config", `設定変更（目標: 科目A ${dateA} / 科目B ${dateB}、週${hours}h）`);
  saveState();
  activeTab = "roadmap";
  render();
}
function exportData() {
  const json = JSON.stringify(state, null, 2);
  document.getElementById("exportArea").value = json;
  const blob = new Blob([json], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `sc-study-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}
function importData(ev) {
  const file = ev.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const s = JSON.parse(reader.result);
      if (!s.settings || !("progress" in s)) throw new Error("形式が違います");
      state = Object.assign(defaultState(), s);
      addLog("import", "バックアップからデータを復元");
      saveState();
      render();
      alert("インポートしました");
    } catch (e) { alert("インポートに失敗しました: " + e.message); }
  };
  reader.readAsText(file);
}
function resetData() {
  if (!confirm("本当にすべての学習データを削除しますか？")) return;
  localStorage.removeItem(LS_KEY);
  state = defaultState();
  render();
}

render();

// 起動時の自動同期（設定済みの場合のみ）
(function () { const c = loadSyncCfg(); if (c.token && c.auto !== false) doSync(true); })();
