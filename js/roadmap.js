"use strict";

/* =========================================================
   ロードマップ生成
   - 全単元を必ずどこかの週に割り当てる（漏れゼロ原則）
   - 診断結果の弱い分野は時間を増やし、得意分野は減らす
   ========================================================= */
function unitDomain(unit) {
  const d = DOMAINS.find(dm => dm.cats.includes(unit.cat));
  return d ? d.id : null;
}
function domainScorePct(domainId) {
  if (!state.diagnosis) return null;
  const s = state.diagnosis.scores[domainId];
  if (!s || s.total === 0) return null;
  return Math.round(100 * s.correct / s.total);
}
function unitAdjustedHours(unit) {
  const dm = unitDomain(unit);
  const pct = dm ? domainScorePct(dm) : null;
  if (pct === null) return unit.hours;
  if (pct < 40) return Math.round(unit.hours * 1.25);
  if (pct >= 80) return Math.max(1, Math.round(unit.hours * 0.75));
  return unit.hours;
}

function computeRoadmap() {
  const start = mondayOf(new Date());
  const examA = toDate(state.settings.dateA);
  const examB = toDate(state.settings.dateB);
  const weeks = [];
  let cursor = new Date(start);
  while (cursor < examB) {
    weeks.push({ start: new Date(cursor), end: addDays(cursor, 6), units: [], hours: 0 });
    cursor = addDays(cursor, 7);
  }
  if (weeks.length === 0) weeks.push({ start, end: addDays(start, 6), units: [], hours: 0 });

  const capacity = state.settings.hoursPerWeek;
  // 科目A対策（i4/i5/i6以外の全単元）は科目A試験日の2週間前までに終える（中間締切）
  const aDeadline = addDays(examA, -14);
  let aLimit = weeks.findIndex(w => w.start >= aDeadline);
  if (aLimit === -1) aLimit = weeks.length;
  aLimit = Math.max(1, aLimit);

  const ordered = [...UNITS].sort((a, b) => a.phase - b.phase || UNITS.indexOf(a) - UNITS.indexOf(b));
  const lateIds = ["i4", "i5", "i6"]; // 科目B直前演習は科目A試験後の期間に配置

  // 空きのある最も早い週に置く（best-fit）。どの週にも入らない場合は範囲内で最も軽い週へ
  // → 中盤の端数時間も使われ、最終週に積み残しが集中しない。全単元が必ずどこかに入る（漏れゼロ原則）
  function place(u, h, from, to) {
    let idx = -1;
    for (let i = from; i < to; i++) {
      if (weeks[i].hours + h <= capacity) { idx = i; break; }
    }
    if (idx === -1) {
      idx = from;
      for (let i = from; i < to; i++) if (weeks[i].hours < weeks[idx].hours) idx = i;
    }
    weeks[idx].units.push({ unit: u, hours: h });
    weeks[idx].hours += h;
  }

  ordered.forEach(u => {
    const h = unitAdjustedHours(u);
    if (lateIds.includes(u.id)) place(u, h, Math.min(aLimit, weeks.length - 1), weeks.length);
    else place(u, h, 0, aLimit);
  });

  // 週内の表示はフェーズ順に整える
  weeks.forEach(w => w.units.sort((x, y) => x.unit.phase - y.unit.phase || UNITS.indexOf(x.unit) - UNITS.indexOf(y.unit)));

  const totalHours = ordered.reduce((s, u) => s + unitAdjustedHours(u), 0);
  const neededPerWeek = Math.ceil(totalHours / weeks.length * 10) / 10;
  const maxWeekHours = Math.max(...weeks.map(w => w.hours));
  const overflow = maxWeekHours > capacity;
  return { weeks, totalHours, neededPerWeek, overflow, capacity, maxWeekHours, aLimit };
}

function isDone(unitId) { return !!(state.progress[unitId] && state.progress[unitId].done); }
function doneTime(unitId) { const p = state.progress[unitId]; return p ? (p.at || p.doneAt) : null; }

function toggleUnit(unitId) {
  const u = UNITS.find(x => x.id === unitId);
  if (isDone(unitId)) {
    // 消さずに「取り消した」記録を残す（端末間同期で新しい操作が勝てるようにするため）
    state.progress[unitId] = { done: false, at: new Date().toISOString() };
    addLog("undo", `「${u.name}」を未学習に戻した`);
  } else {
    state.progress[unitId] = { done: true, at: new Date().toISOString() };
    addLog("done", `「${u.name}」を学習完了`);
  }
  saveState();
  render();
}

/* 現在週・遅れ（未消化）判定 */
function roadmapStatus(rm) {
  const today = new Date();
  let currentIdx = rm.weeks.findIndex(w => today >= w.start && today <= addDays(w.end, 0.99));
  if (currentIdx === -1) currentIdx = today < rm.weeks[0].start ? 0 : rm.weeks.length - 1;
  const overdue = [];
  rm.weeks.forEach((w, i) => {
    if (i < currentIdx) w.units.forEach(x => { if (!isDone(x.unit.id)) overdue.push(x.unit); });
  });
  return { currentIdx, overdue };
}

/* ---------- ホーム ---------- */
function renderHome() {
  const rm = computeRoadmap();
  const st = roadmapStatus(rm);
  const doneCount = UNITS.filter(u => isDone(u.id)).length;
  const dB = daysUntil(state.settings.dateB);
  const dA = daysUntil(state.settings.dateA);
  const pct = Math.round(100 * doneCount / UNITS.length);

  let html = "";

  if (!state.diagnosis) {
    html += `<div class="notice"><b>最初にレベル診断を受けてください。</b> 診断結果に合わせて、弱い分野に時間を厚く配分したロードマップを自動生成します。
      <div style="margin-top:8px"><button class="primary" onclick="startDiag()">レベル診断を始める（25問・約15分）</button></div></div>`;
  }

  html += `<div class="tiles">
    <div class="tile"><div class="v">${dB}</div><div class="l">科目B試験まで（日）</div><div class="s">${state.settings.dateB} 開始</div></div>
    <div class="tile"><div class="v">${dA}</div><div class="l">科目A試験まで（日）</div><div class="s">${state.settings.dateA} 開始</div></div>
    <div class="tile"><div class="v">${doneCount}<span style="font-size:14px;color:var(--muted)"> / ${UNITS.length}</span></div><div class="l">消化した単元</div><div class="s">カバレッジ ${pct}%</div></div>
    <div class="tile"><div class="v">${drillHomePct()}</div><div class="l">ドリル通算正答率</div><div class="s">合格ライン60%・目標80%</div></div>
    ${typeof examBHomeTileHtml === "function" ? examBHomeTileHtml() : ""}
    <div class="tile"><div class="v">${rm.neededPerWeek}<span style="font-size:14px;color:var(--muted)">h</span></div><div class="l">必要な週あたり学習時間</div><div class="s">設定: 週${rm.capacity}h・最大負荷週${rm.maxWeekHours}h</div></div>
  </div>`;

  html += `<div class="card"><h2>全体進捗</h2>
    <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
    <div class="muted" style="margin-top:4px">${doneCount}/${UNITS.length} 単元完了（全単元がロードマップに割り当て済み。未完了の単元は必ず今後の週に残っています）</div></div>`;

  if (st.overdue.length > 0) {
    html += `<div class="alert"><b>未消化の単元が ${st.overdue.length} 件あります（予定週を過ぎています）。</b><br>
      ${st.overdue.slice(0,8).map(u => esc(u.name)).join(" ／ ")}${st.overdue.length>8?" ほか":""}<br>
      <span class="muted">今週分と並行して少しずつ消化するか、設定で週あたり時間を増やしてください。漏れとして記録され続けます。</span></div>`;
  }

  const cw = rm.weeks[st.currentIdx];
  if (cw) {
    html += `<div class="card"><h2>今週の学習（${fmtDate(cw.start)}〜${fmtDate(cw.end)}・目安${cw.hours}h）</h2>`;
    if (cw.units.length === 0) {
      html += `<div class="muted">今週の割当てはありません（未消化分の解消・復習に充ててください）。</div>`;
    } else {
      html += cw.units.map(x => unitRow(x.unit, x.hours, false)).join("");
    }
    html += `</div>`;
  }

  if (state.diagnosis) {
    html += `<div class="card"><h2>診断結果（分野別正答率）</h2>${scoreBars()}
      <div class="muted" style="margin-top:6px">診断日: ${fmtDateFull(new Date(state.diagnosis.finishedAt))}　<button class="ghost" onclick="startDiag()">再診断する</button></div></div>`;
  }

  const recent = state.log.slice(0, 5);
  if (recent.length) {
    html += `<div class="card"><h2>最近の記録</h2>` +
      recent.map(l => `<div class="small">${fmtDateFull(new Date(l.ts))}　${esc(l.text)}</div>`).join("") +
      `<div style="margin-top:6px"><button class="ghost" onclick="switchTab('log')">すべて見る</button></div></div>`;
  }
  return html;
}

/* 単元名は教材があればリンクにする（ホーム・ロードマップ共通） */
function unitNameLink(u) {
  return (window.MATERIALS && window.MATERIALS[u.id])
    ? `<a href="javascript:void(0)" onclick="openMaterial('${u.id}')" style="color:var(--indigo);text-decoration:none">${esc(u.name)}</a>`
    : esc(u.name);
}

function unitRow(u, hours, showCat) {
  const done = isDone(u.id);
  return `<div class="unit ${done?"done":""}">
    <input type="checkbox" ${done?"checked":""} onchange="toggleUnit('${u.id}')" aria-label="${esc(u.name)}を完了にする">
    <div class="u-name">${unitNameLink(u)} <span class="badge rank">${u.trend}</span>
      <div class="u-meta">${showCat?CATS[u.cat]+"・":""}目安${hours!=null?hours:u.hours}h　${esc(u.desc)}</div>
    </div>
  </div>`;
}

function scoreBars() {
  return DOMAINS.map(dm => {
    const pct = domainScorePct(dm.id);
    if (pct === null) return "";
    const badge = pct < 40 ? `<span class="badge weak">弱点 ✕</span>` : pct >= 80 ? `<span class="badge strong">得意 ✓</span>` : "";
    return `<div class="score-row">
      <div>${dm.name}${badge}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
      <div class="score-val">${pct}%</div>
    </div>`;
  }).join("");
}

/* ---------- レベル診断 ---------- */
function startDiag() { activeTab = "diag"; diagInProgress = true; animateNext = true; render(); window.scrollTo(0,0); }

function renderDiag() {
  if (!diagInProgress && state.diagnosis) {
    const rmD = computeRoadmap();
    return `<div class="card"><h2>レベル診断 結果</h2>${scoreBars()}
      <div class="small" style="margin-top:10px">この診断結果での総学習時間の目安: <b>${rmD.totalHours}時間</b>（週あたり平均${rmD.neededPerWeek}h・最大負荷週${rmD.maxWeekHours}h）</div>
      <h3>診断の見方</h3>
      <div class="small">正答率40%未満の分野は「弱点」として、ロードマップで学習時間を1.25倍に増やしています。80%以上の分野は0.75倍に圧縮し、その分を弱点に回しています。</div>
      <div style="margin-top:10px"><button class="primary" onclick="startDiag()">もう一度診断する</button>
      <button class="ghost" onclick="switchTab('roadmap')">ロードマップを見る</button></div></div>` + diagAnswerReview();
  }
  if (!diagInProgress) {
    return `<div class="card"><h2>レベル診断（25問）</h2>
      <p class="small">5分野×5問のオリジナル問題であなたの現在地を測ります。制限時間はありません。<b>わからない問題は勘で答えず「わからない」を選んでください</b>（正確な弱点分析のため）。</p>
      <button class="primary" onclick="startDiag()">診断を始める</button></div>`;
  }
  let html = `<div class="card"><h2>レベル診断</h2>
    <p class="small">全25問。わからない問題は「わからない」を選択してください。</p></div><form id="diagForm">`;
  QUESTIONS.forEach((q, i) => {
    html += `<div class="card q-card"><div class="q-no">問${i+1} ／ ${DOMAINS.find(d=>d.id===q.domain).name}</div>
      <div style="margin:4px 0 8px">${esc(q.q)}</div>`;
    q.choices.forEach((c, ci) => {
      html += `<label class="choice"><input type="radio" name="${q.id}" value="${ci}">${esc(c)}</label>`;
    });
    html += `<label class="choice"><input type="radio" name="${q.id}" value="-1">わからない</label></div>`;
  });
  html += `</form><div class="card"><button class="primary" onclick="finishDiag()">採点する</button>
    <div class="muted" style="margin-top:6px">未回答の問題は「わからない」として扱います。</div></div>`;
  return html;
}

function finishDiag() {
  const form = document.getElementById("diagForm");
  const answers = {};
  const scores = {};
  DOMAINS.forEach(d => scores[d.id] = { correct: 0, total: 0 });
  QUESTIONS.forEach(q => {
    const sel = form.querySelector(`input[name="${q.id}"]:checked`);
    const v = sel ? Number(sel.value) : -1;
    answers[q.id] = v;
    scores[q.domain].total++;
    if (v === q.answer) scores[q.domain].correct++;
  });
  state.diagnosis = { finishedAt: new Date().toISOString(), answers, scores };
  const summary = DOMAINS.map(d => `${d.name}${Math.round(100*scores[d.id].correct/scores[d.id].total)}%`).join("、");
  addLog("diag", `レベル診断を実施（${summary}）`);
  saveState();
  diagInProgress = false;
  render();
  window.scrollTo(0,0);
}

function diagAnswerReview() {
  if (!state.diagnosis) return "";
  let html = `<div class="card"><h2>解答と解説</h2>`;
  QUESTIONS.forEach((q, i) => {
    const v = state.diagnosis.answers[q.id];
    const ok = v === q.answer;
    const mark = ok ? `<span style="color:var(--good-text)">○</span>` : `<span style="color:var(--crit)">✕</span>`;
    html += `<div style="border-bottom:1px solid var(--grid);padding:8px 0" class="small">
      <b>問${i+1}</b> ${mark} ${esc(q.q)}<br>
      正解: ${esc(q.choices[q.answer])}${!ok && v >= 0 ? `<br>あなたの解答: ${esc(q.choices[v])}` : v === -1 ? "<br>（わからないを選択）" : ""}<br>
      <span class="muted">${esc(q.expl)}</span></div>`;
  });
  return html + `</div>`;
}

/* ---------- ロードマップ ---------- */
function renderRoadmap() {
  const rm = computeRoadmap();
  const st = roadmapStatus(rm);
  let html = `<div class="card"><h2>合格ロードマップ</h2>
    <div class="small">目標: 科目A ${state.settings.dateA}〜 ／ 科目B ${state.settings.dateB}〜（設定タブで変更可）<br>
    総学習時間の目安: <b>${rm.totalHours}時間</b> ／ 残り${rm.weeks.length}週 → 週あたり<b>${rm.neededPerWeek}時間</b>必要（現在の設定: 週${rm.capacity}時間）</div>`;
  if (rm.overflow) {
    html += `<div class="alert" style="margin-top:10px">設定の週${rm.capacity}時間に収まらない週があります（<b>最大負荷週: ${rm.maxWeekHours}時間</b>・必要平均: 週${rm.neededPerWeek}時間）。設定で週あたり時間を増やすか、重い週の単元を前後の空いた週へ前倒し・後ろ倒しして消化してください。<b>単元は絶対に削りません</b>（漏れゼロ原則）。</div>`;
  } else if (rm.neededPerWeek > rm.capacity) {
    html += `<div class="alert" style="margin-top:10px">設定の週${rm.capacity}時間では全単元が期間内に収まりません（必要平均: 週${rm.neededPerWeek}時間）。設定で増やすか、学習ペースを上げてください。</div>`;
  }
  if (!state.diagnosis) {
    html += `<div class="notice" style="margin-top:10px">レベル診断が未実施のため、標準時間で配分しています。<button class="ghost" onclick="startDiag()">診断を受ける</button></div>`;
  }
  html += `<div class="muted" style="margin-top:6px">単元の時間はレベル診断の結果で自動調整されます（弱点分野×1.25、得意分野×0.75）。チェックを入れると学習記録に自動で残ります。</div></div>`;

  let lastPhase = -1;
  rm.weeks.forEach((w, i) => {
    if (i === rm.aLimit) {
      html += `<div class="notice" style="margin-top:16px"><b>― ここから科目A試験期間（${state.settings.dateA}〜）後の仕上げ ―</b> ここより上の単元は科目A試験の2週間前までに終える計画です。</div>`;
    }
    const cls = i === st.currentIdx ? "current" : (i < st.currentIdx && w.units.some(x => !isDone(x.unit.id)) ? "past-open" : "");
    const phaseOfWeek = w.units.length ? w.units[0].unit.phase : null;
    if (phaseOfWeek !== null && phaseOfWeek !== lastPhase) {
      html += `<div class="phase-title">${PHASES[phaseOfWeek]}</div>`;
      lastPhase = phaseOfWeek;
    }
    html += `<div class="week ${cls}"><h3>第${i+1}週 <span class="w-label">${fmtDate(w.start)}〜${fmtDate(w.end)}${i===st.currentIdx?"（今週）":""}・目安${w.hours}h</span></h3>`;
    if (w.units.length === 0) {
      html += `<div class="muted small">予備週（遅れの吸収・復習用）</div>`;
    } else {
      html += w.units.map(x => {
        const overdue = i < st.currentIdx && !isDone(x.unit.id);
        return `<div class="${overdue?"unit overdue":"unit"} ${isDone(x.unit.id)?"done":""}" style="border-bottom:1px solid var(--grid)">
          <input type="checkbox" ${isDone(x.unit.id)?"checked":""} onchange="toggleUnit('${x.unit.id}')">
          <div class="u-name">${unitNameLink(x.unit)} <span class="badge rank">${x.unit.trend}</span>
            <div class="u-meta">${x.hours}h　${esc(x.unit.desc)}</div>
            ${["i4","i5"].includes(x.unit.id) && typeof examBProgressText === "function" && examBProgressText() ? `<div class="u-meta" style="color:var(--indigo)">${esc(examBProgressText())}</div>` : ""}</div>
        </div>`;
      }).join("");
    }
    html += `</div>`;
  });
  return html;
}

/* ホームのドリル正答率タイル（ドリル未実施なら "--"） */
function drillHomePct() {
  if (typeof drillQStats !== "function") return "--";
  let t = 0, ok = 0;
  (window.QUESTIONS_A || []).forEach(q => { const s = drillQStats(q.id); t += s.tries; ok += s.ok; });
  return t ? Math.round(100 * ok / t) + `<span style="font-size:14px;color:var(--muted)">%</span>` : "--";
}

/* ---------- 単元マップ（カバレッジ） ---------- */
function renderUnits() {
  const doneCount = UNITS.filter(u => isDone(u.id)).length;
  let html = `<div class="card"><h2>単元マップ（全${UNITS.length}単元のカバレッジ）</h2>
    <div class="small">試験範囲を網羅した全単元の一覧です。<b>すべての単元がロードマップのいずれかの週に割り当てられています</b>。ここが全部「済」になれば学習漏れはありません。</div>
    <div style="margin-top:8px" class="bar-track"><div class="bar-fill" style="width:${Math.round(100*doneCount/UNITS.length)}%"></div></div>
    <div class="muted">${doneCount} / ${UNITS.length} 単元完了</div></div>`;

  for (const catId of Object.keys(CATS)) {
    const units = UNITS.filter(u => u.cat === catId);
    if (!units.length) continue;
    const d = units.filter(u => isDone(u.id)).length;
    html += `<div class="card"><h2>${CATS[catId]} <span class="muted">(${d}/${units.length})</span></h2>`;
    html += units.map(u => {
      const done = isDone(u.id);
      const doneAt = done ? fmtDateFull(new Date(doneTime(u.id))) : "";
      const hasMat = window.MATERIALS && window.MATERIALS[u.id];
      const und = typeof understanding === "function" ? understanding(u.id) : null;
      const ds = typeof drillUnitStats === "function" ? drillUnitStats(u.id) : { tries: 0 };
      const bInfo = ["i4", "i5"].includes(u.id) && typeof examBProgressText === "function" ? examBProgressText() : "";
      const drillInfo = (und !== null ? `　理解度 ${und}%${ds.tries ? `（ドリル${ds.tries}回）` : ""}` : "") + (bInfo ? "　" + bInfo : "");
      const nameHtml = hasMat
        ? `<a href="javascript:void(0)" onclick="openMaterial('${u.id}')" style="color:var(--indigo);text-decoration:none">${esc(u.name)}</a>`
        : esc(u.name);
      return `<div class="unit ${done?"done":""}">
        <input type="checkbox" ${done?"checked":""} onchange="toggleUnit('${u.id}')">
        <div class="u-name">${nameHtml} <span class="badge rank">${u.trend}</span>
          <div class="u-meta">目安${u.hours}h　${esc(u.desc)}${drillInfo}</div></div>
        <span class="status-chip ${done?"done":"todo"}">${done?"✓ "+doneAt:"未学習"}</span>
      </div>`;
    }).join("");
    html += `</div>`;
  }
  html += `<div class="card muted small">重要度ランク: <span class="badge rank">S</span>=直近の試験で繰り返し出題される最重点分野、<span class="badge rank">A</span>=頻出、<span class="badge rank">B</span>=基礎・相対的に出題少。根拠は「出題傾向」タブ参照。</div>`;
  return html;
}
