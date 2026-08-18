"use strict";

/* =========================================================
   状態管理（localStorage）
   ========================================================= */
const LS_KEY = "sc-study-v1";

function defaultState() {
  return {
    settings: { examPreset:"kouki2027", dateA:"2027-02-20", dateB:"2027-03-16", hoursPerWeek:9, updatedAt:0 },
    diagnosis: null,   // { finishedAt, answers:{qid:idx|-1}, scores:{d1:{correct,total}, ...} }
    progress: {},      // unitId -> { done:true/false, at:"ISO" }（取り消しも記録に残す。旧形式 {done:true, doneAt} も読める）
    log: [],           // { ts, type, text }
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    return Object.assign(defaultState(), s);
  } catch (e) { return defaultState(); }
}
function saveState() { localStorage.setItem(LS_KEY, JSON.stringify(state)); }
function addLog(type, text) {
  state.log.unshift({ ts: new Date().toISOString(), type, text });
  if (state.log.length > 500) state.log.length = 500;
}

/* =========================================================
   日付ユーティリティ
   ========================================================= */
function toDate(s) { const [y,m,d] = s.split("-").map(Number); return new Date(y, m-1, d); }
function fmtDate(d) { return `${d.getMonth()+1}/${d.getDate()}`; }
function fmtDateFull(d) { return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`; }
function mondayOf(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = (x.getDay() + 6) % 7; // 月曜=0
  x.setDate(x.getDate() - day);
  return x;
}
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function daysUntil(dateStr) {
  const now = new Date(); const t = toDate(dateStr);
  return Math.ceil((t - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
}

/* =========================================================
   クラウド同期（GitHub Gist）
   - 非公開Gistの sc-study-sync.json に学習データを保存し、PC・スマホで共有する
   - トークンとGist IDは学習データとは別キーに保存（エクスポートには含めない）
   - 衝突は「単元ごと・項目ごとに新しいタイムスタンプが勝つ」で自動解決
   ========================================================= */
const SYNC_KEY = "sc-study-sync-v1";
const SYNC_FILE = "sc-study-sync.json";

function loadSyncCfg() { try { return JSON.parse(localStorage.getItem(SYNC_KEY)) || {}; } catch (e) { return {}; } }
function saveSyncCfg(c) { localStorage.setItem(SYNC_KEY, JSON.stringify(c)); }

function entryTime(e) { return e ? (e.at || e.doneAt || "") : ""; }

function mergeStates(a, b) {
  const out = defaultState();
  out.settings = ((a.settings.updatedAt || 0) >= (b.settings.updatedAt || 0)) ? a.settings : b.settings;
  const da = a.diagnosis, db = b.diagnosis;
  out.diagnosis = !da ? db : !db ? da : (da.finishedAt >= db.finishedAt ? da : db);
  const ids = new Set([...Object.keys(a.progress), ...Object.keys(b.progress)]);
  ids.forEach(id => {
    const ea = a.progress[id], eb = b.progress[id];
    out.progress[id] = !ea ? eb : !eb ? ea : (entryTime(ea) >= entryTime(eb) ? ea : eb);
  });
  const seen = new Set();
  out.log = [...a.log, ...b.log].filter(l => {
    const k = l.ts + "|" + l.text;
    if (seen.has(k)) return false;
    seen.add(k); return true;
  }).sort((x, y) => y.ts.localeCompare(x.ts)).slice(0, 500);
  return out;
}

async function ghFetch(cfg, path, opts = {}) {
  const res = await fetch("https://api.github.com" + path, Object.assign({}, opts, {
    headers: Object.assign({ "Authorization": "token " + cfg.token, "Accept": "application/vnd.github+json" }, opts.headers || {}),
  }));
  if (res.status === 401) throw new Error("トークンが無効です。作り直して貼り直してください");
  if (!res.ok && res.status !== 404) throw new Error("GitHub APIエラー (" + res.status + ")");
  return res;
}

function setSyncStatus(text) { const el = document.getElementById("syncStatus"); if (el) el.textContent = text; }

let syncing = false;
async function doSync(silent) {
  const cfg = loadSyncCfg();
  if (!cfg.token) { if (!silent) setSyncStatus("先にトークンを保存してください"); return; }
  if (syncing) return;
  syncing = true;
  try {
    setSyncStatus("同期中…");
    // Gistを特定: 保存済みIDがなければ自分のGist一覧から探し、それでもなければ後で新規作成
    if (!cfg.gistId) {
      const list = await (await ghFetch(cfg, "/gists?per_page=100")).json();
      const hit = Array.isArray(list) && list.find(g => g.files && g.files[SYNC_FILE]);
      if (hit) { cfg.gistId = hit.id; saveSyncCfg(cfg); }
    }
    let remote = null;
    if (cfg.gistId) {
      const res = await ghFetch(cfg, "/gists/" + cfg.gistId);
      if (res.status === 404) { cfg.gistId = null; saveSyncCfg(cfg); }
      else {
        const g = await res.json();
        const f = g.files && g.files[SYNC_FILE];
        if (f) {
          const content = f.truncated ? await (await fetch(f.raw_url)).text() : f.content;
          try { remote = Object.assign(defaultState(), JSON.parse(content)); } catch (e) { remote = null; }
        }
      }
    }
    const before = JSON.stringify(state);
    if (remote) state = mergeStates(state, remote);
    if (JSON.stringify(state) !== before) addLog("sync", "同期で他端末の記録を取り込み");
    saveState();
    const body = JSON.stringify({
      description: "支援士学習アプリ（sc-study）の同期データ", public: false,
      files: { [SYNC_FILE]: { content: JSON.stringify(state) } },
    });
    if (cfg.gistId) {
      await ghFetch(cfg, "/gists/" + cfg.gistId, { method: "PATCH", body });
    } else {
      const g = await (await ghFetch(cfg, "/gists", { method: "POST", body })).json();
      cfg.gistId = g.id; saveSyncCfg(cfg);
    }
    cfg.lastSync = new Date().toISOString(); saveSyncCfg(cfg);
    if (activeTab !== "config" || !silent) render();
    setSyncStatus("同期完了（" + fmtDateFull(new Date()) + " " + new Date().toTimeString().slice(0, 5) + "）");
  } catch (e) {
    setSyncStatus("同期失敗: " + e.message + (navigator.onLine === false ? "（オフラインの可能性）" : ""));
  } finally { syncing = false; }
}

function saveSyncSettings() {
  const t = document.getElementById("syncToken").value.trim();
  const cfg = loadSyncCfg();
  if (t) cfg.token = t;
  cfg.auto = document.getElementById("syncAuto").checked;
  saveSyncCfg(cfg);
  render();
  if (cfg.token) doSync(false);
}
function clearSyncSettings() {
  if (!confirm("この端末の同期設定（トークン）を削除しますか？ Gist上のデータと学習データは残ります。")) return;
  localStorage.removeItem(SYNC_KEY);
  render();
}
