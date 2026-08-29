"use strict";

/* =========================================================
   記憶定着（間隔反復・復習キュー・学習ストリーク）
   - 忘却曲線に沿った分散学習: 復習間隔は 1→3→7→14→30→60日、
     不正解ならその問題は1日に戻る（難易度適応）
   - 各問題の次回復習日は既存の解答履歴(state.drill[qid].attempts)から
     純関数で計算する。保存構造を変えないので、旧データの移行も
     端末間マージ(mergeStates)もそのまま動く
   ========================================================= */

const SRS_LADDER = [1, 3, 7, 14, 30, 60];

/* 日付だけに丸める（時刻の差で期限判定がぶれないように） */
function srsDay(t) {
  const d = new Date(t);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/* 1問のSRS状態: { due, streak, interval } / 未解答なら null（復習対象外＝新規問題） */
function srsInfo(qid) {
  const attempts = ((state.drill[qid] || {}).attempts || []);
  if (!attempts.length) return null;
  let streak = 0; // 直近から連続何回正解しているか
  for (let i = attempts.length - 1; i >= 0 && attempts[i].ok; i--) streak++;
  const interval = streak === 0 ? 1 : SRS_LADDER[Math.min(streak, SRS_LADDER.length) - 1];
  const due = addDays(srsDay(attempts[attempts.length - 1].at), interval);
  return { due, streak, interval };
}

/* 復習期限が来ている問題id（期限超過が大きい順） */
function dueQuestionIds() {
  const today = srsDay(new Date());
  const out = [];
  drillQuestions().forEach(q => {
    const s = srsInfo(q.id);
    if (s && s.due <= today) out.push({ id: q.id, over: (today - s.due) / 86400000 });
  });
  out.sort((a, b) => b.over - a.over);
  return out.map(x => x.id);
}

/* 単元ごとの要復習問題数（単元マップ・単元別ドリルの表示用） */
function dueCountByUnit() {
  const today = srsDay(new Date());
  const map = {};
  drillQuestions().forEach(q => {
    const s = srsInfo(q.id);
    if (s && s.due <= today) map[q.unitId] = (map[q.unitId] || 0) + 1;
  });
  return map;
}

/* 復習セッション開始: 期限超過の大きい順に最大20問、単元横断で混ぜる（交互学習） */
function startReviewSession() {
  const pick = dueQuestionIds().slice(0, 20);
  if (!pick.length) return;
  for (let i = pick.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pick[i], pick[j]] = [pick[j], pick[i]];
  }
  drillSession = { qids: pick, idx: 0, chosen: null, correct: 0, mode: "review" };
  activeTab = "drill";
  animateNext = true;
  render();
  window.scrollTo(0, 0);
}

/* 連続学習日数: 解答・学習ログのある日が今日（または昨日）から何日続いているか */
function studyStreakDays() {
  const days = new Set();
  const key = t => { const d = new Date(t); return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(); };
  (state.log || []).forEach(l => days.add(key(l.ts)));
  Object.values(state.drill || {}).forEach(x => (x.attempts || []).forEach(a => days.add(key(a.at))));
  let cur = new Date();
  if (!days.has(key(cur))) cur = addDays(cur, -1); // 今日まだ学習していなくても昨日までの連続は保つ
  let n = 0;
  while (days.has(key(cur))) { n++; cur = addDays(cur, -1); }
  return n;
}

/* 復習キューのカード（ホームとドリルタブ共通） */
function reviewCardHtml() {
  const due = dueQuestionIds();
  const streak = studyStreakDays();
  const streakText = streak > 0 ? `🔥 連続${streak}日学習中` : "今日から学習を始めましょう";
  if (!due.length) {
    return `<div class="card"><h2>今日の復習（間隔反復）</h2>
      <div class="small">期限が来ている復習はありません。${streakText}。
      新しい単元を進めるか、ドリルの「未解答の問題から」で学習範囲を広げましょう。
      解いた問題は忘却曲線に合わせて 1日→3日→7日→14日→30日→60日 の間隔で自動的に復習キューに入ります。</div></div>`;
  }
  return `<div class="card"><h2>今日の復習（間隔反復） <span class="badge rank">S</span></h2>
    <div class="small">忘れかけた頃に思い出すと記憶が長持ちします（分散学習）。期限が来た問題が <b>${due.length}問</b> あります。
    間違えた問題は翌日に、連続正解した問題は最長60日間隔まで自動で延びます。${streakText}。</div>
    <div style="margin-top:10px">
      <button class="primary" onclick="startReviewSession()">復習を始める（${Math.min(due.length, 20)}問・単元ミックス）</button>
    </div></div>`;
}
