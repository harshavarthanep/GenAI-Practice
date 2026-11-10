/* GenAI Mastery — application. No build step, no frameworks. Progress is stored in this browser. */
'use strict';
const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const todayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dayNum = (d = new Date()) => Math.floor((d - new Date(d.getFullYear(), 0, 1)) / 864e5) + d.getFullYear() * 400;

/* ---------- icons ---------- */
const IC = {
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>', book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6" fill="currentColor"/>', file: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  play: '<path d="M7 5v14l11-7z"/>', check: '<path d="m5 12 5 5 9-10"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>', chev: '<path d="m9 6 6 6-6 6"/>', back: '<path d="m15 6-6 6 6 6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>', code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4"/>', db: '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>', cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
  flag: '<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>', flame: '<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>', clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/>', list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>', bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7M12 17h.01"/>', alert: '<path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/>', briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>',
  message: '<path d="M4 5h16v11H9l-5 4z"/>', layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>', download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', upload: '<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>', rotate: '<path d="M4 4v6h6"/><path d="M5 15a8 8 0 1 0 1.5-8.5L4 10"/>', terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', print: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>', star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'
};
const ic = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${IC[n] || ''}</svg>`;

/* ---------- storage ---------- */
const KEY = 'gm3';
const DEFAULTS = { v: 1, name: '', theme: 'system', daily: 45, onboarded: false, done: {}, seen: {}, last: null, days: {}, quiz: { n: 0, ok: 0 }, wrong: {},
  srs: {}, srsNew: { d: 0, n: 0 }, labs: {}, sql: {}, written: {}, wbest: {}, play: { py: '', sql: '' }, ai: { provider: 'gemini', key: '', model: '', base: '' } };
let S;
try { S = Object.assign(structuredClone(DEFAULTS), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch { S = structuredClone(DEFAULTS); }
for (const k of Object.keys(DEFAULTS)) if (S[k] === undefined || S[k] === null && DEFAULTS[k] !== null) S[k] = structuredClone(DEFAULTS[k]);
let saveWarned = false;
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { if (!saveWarned) { saveWarned = true; toast('Progress could not be saved — storage is full or blocked in this browser.'); } } }
function active() { S.days[todayKey()] = 1; save(); paintStreak(); }
function streak() { let n = 0; const d = new Date(); if (!S.days[todayKey(d)]) d.setDate(d.getDate() - 1); while (S.days[todayKey(d)]) { n++; d.setDate(d.getDate() - 1); } return n; }

/* ---------- data ---------- */
const BY_ID = Object.fromEntries(COURSE.map(l => [l.id, l]));
const ORDER = COURSE.slice().sort((a, b) => a.lv - b.lv || COURSE.indexOf(a) - COURSE.indexOf(b));
const LESSONS_BY_LV = LEVELS.map(L => ORDER.filter(l => l.lv === L.n));
const TOTAL_MIN = COURSE.reduce((a, l) => a + l.min, 0);
const QUESTIONS = [
  ...ORDER.flatMap(l => l.quiz.map((q, i) => ({ id: `${l.id}:${i}`, lv: l.lv, q: q[0], o: q[1], a: q[2], e: q[3], src: l.t, lesson: l.id }))),
  ...BANK.map(b => ({ id: b.id, lv: b.lv, q: b.q, o: b.o, a: b.a, e: b.e, src: 'Interview bank' }))
];
const QBY = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
const DECK = ORDER.flatMap(l => [...l.cards.map((c, i) => ({ id: `${l.id}:c${i}`, f: c[0], b: c[1], lesson: l.id, kind: 'Concept' })),
  ...l.iq.map((c, i) => ({ id: `${l.id}:i${i}`, f: c[0], b: c[1], lesson: l.id, kind: 'Interview' }))]);
const isDone = id => !!S.done[id];
const lvlPct = n => { const ls = LESSONS_BY_LV[n]; return ls.length ? Math.round(100 * ls.filter(l => isDone(l.id)).length / ls.length) : 0; };
const totalPct = () => Math.round(100 * COURSE.filter(l => isDone(l.id)).length / COURSE.length);
const nextLesson = () => ORDER.find(l => !isDone(l.id));

/* ---------- text rendering ---------- */
function inl(s) {
  return esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/==([^=]+)==/g, '<mark>$1</mark>');
}
function blocks(arr) {
  let html = '', list = [];
  const flush = () => { if (list.length) { html += `<ul>${list.map(x => `<li>${inl(x)}</li>`).join('')}</ul>`; list = []; } };
  for (const p of arr) { if (p.startsWith('- ')) list.push(p.slice(2)); else { flush(); html += `<p>${inl(p)}</p>`; } }
  flush(); return html;
}
function mdLite(text) { // for AI answers: paragraphs, bullets, numbered lists, code fences, bold, inline code
  const parts = String(text).split(/```[a-zA-Z]*\n?([\s\S]*?)```/g); let html = '';
  parts.forEach((part, i) => {
    if (i % 2) { html += `<pre>${esc(part.trim())}</pre>`; return; }
    for (const para of part.split(/\n{2,}/)) {
      const lines = para.split('\n').filter(x => x.trim());
      if (!lines.length) continue;
      if (lines.every(l => /^\s*([-*•]|\d+[.)])\s+/.test(l))) {
        const ordered = /^\s*\d/.test(lines[0]);
        html += `<${ordered ? 'ol' : 'ul'}>${lines.map(l => `<li>${inl(l.replace(/^\s*([-*•]|\d+[.)])\s+/, ''))}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`;
      } else html += `<p>${lines.map(l => inl(l.replace(/^#+\s*/, ''))).join('<br>')}</p>`;
    }
  });
  return html;
}
const PYK = 'False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|print|len|range|self';
const SQLK = 'SELECT|FROM|WHERE|AND|OR|NOT|IN|IS|NULL|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|JOIN|LEFT|RIGHT|INNER|OUTER|FULL|ON|DISTINCT|COUNT|SUM|AVG|MIN|MAX|ROUND|CASE|WHEN|THEN|ELSE|END|WITH|OVER|PARTITION|RANK|DENSE_RANK|ROW_NUMBER|LAG|DESC|ASC|LIKE|BETWEEN|CREATE|TABLE|INSERT|INTO|VALUES|EXTENSION|IF|EXISTS|INDEX|USING|PRIMARY|KEY|REFERENCES|INTEGER|TEXT|UPDATE|DELETE|SET|COALESCE|UNION|ALL';
function hl(code, lang) {
  const e = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let re;
  if (lang === 'py') re = new RegExp(`(#[^\\n]*)|("""[\\s\\S]*?"""|'''[\\s\\S]*?'''|[fr]?"(?:\\\\.|[^"\\\\\\n])*"|[fr]?'(?:\\\\.|[^'\\\\\\n])*')|\\b(${PYK})\\b|\\b(\\d+\\.?\\d*(?:e-?\\d+)?)\\b|\\b([A-Za-z_]\\w*)(?=\\()`, 'g');
  else if (lang === 'sql') re = new RegExp(`(--[^\\n]*)|('(?:''|[^'])*')|\\b(${SQLK})\\b|\\b(\\d+\\.?\\d*)\\b|\\b([A-Za-z_]\\w*)(?=\\()`, 'gi');
  else if (lang === 'sh') re = /(#[^\n]*)|("(?:\\.|[^"\\\n])*"|'[^'\n]*')|\b(git|pip|python|cd|ls|source|init|add|commit|push|remote|branch|freeze)\b()()/g;
  else return e(code);
  let out = '', last = 0, m;
  while ((m = re.exec(code))) {
    out += e(code.slice(last, m.index));
    const [t, c, s, k, n, f] = m;
    out += c ? `<span class="t-c">${e(c)}</span>` : s ? `<span class="t-s">${e(s)}</span>` : k ? `<span class="t-k">${e(k)}</span>` : n ? `<span class="t-n">${e(n)}</span>` : f ? `<span class="t-f">${e(f)}</span>` : e(t);
    last = m.index + t.length; if (!t.length) re.lastIndex++;
  }
  return out + e(code.slice(last));
}

/* ---------- toast ---------- */
let toastT;
function toast(msg, action) {
  const t = $('#toast'); t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button>${esc(action.label)}</button>` : ''}`;
  if (action) t.querySelector('button').onclick = () => { t.classList.remove('on'); action.fn(); };
  t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), action ? 9000 : 2600);
}

/* ---------- theme, nav, streak ---------- */
function applyTheme() {
  const dark = S.theme === 'dark' || (S.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  $('meta[name=theme-color]').content = dark ? '#0c0d0e' : '#f1f1ee';
  $('#themeBtn').innerHTML = ic(dark ? 'sun' : 'moon');
}
$('#themeBtn').onclick = () => { const dark = document.documentElement.dataset.theme === 'dark'; S.theme = dark ? 'light' : 'dark'; save(); applyTheme(); };
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => S.theme === 'system' && applyTheme());
const NAV = [['Learn', [['', 'home', 'Home'], ['learn', 'book', 'Course'], ['sheet', 'file', 'Cheat sheet']]],
  ['Practise', [['practice', 'target', 'Practice hub'], ['quiz', 'list', 'Quiz'], ['cards', 'cards', 'Flashcards'], ['labs', 'code', 'Python labs'], ['sql', 'db', 'SQL labs'], ['play', 'terminal', 'Playground']]],
  ['Interview', [['answers', 'pen', 'Answer writing'], ['mock', 'mic', 'Mock interview'], ['mistakes', 'rotate', 'Mistakes']]],
  ['', [['settings', 'gear', 'Settings']]]];
function paintNav(route) {
  const sect = { lesson: 'learn', lab: 'labs', sqllab: 'sql', answer: 'answers' }[route] || route;
  $('#nav').innerHTML = NAV.map(([g, items]) => `${g ? `<div class="grp">${g}</div>` : '<div class="grp"></div>'}${items.map(([r, i, t]) => `<a href="#/${r}" class="${sect === r ? 'on' : ''}">${ic(i)}${t}</a>`).join('')}`).join('');
  const tabs = [['', 'home', 'Home'], ['learn', 'book', 'Learn'], ['practice', 'target', 'Practise'], ['sheet', 'file', 'Sheet'], ['settings', 'gear', 'More']];
  const tsect = ['quiz', 'cards', 'labs', 'sql', 'play', 'answers', 'mock', 'mistakes'].includes(sect) ? 'practice' : sect;
  $('#tabbar').innerHTML = tabs.map(([r, i, t]) => `<a href="#/${r}" class="${tsect === r ? 'on' : ''}">${ic(i)}${t}</a>`).join('');
  $('#sidefoot').innerHTML = `${totalPct()}% of the course complete<div class="bar" style="margin-top:8px"><i style="width:${totalPct()}%"></i></div>`;
}
function paintStreak() { const n = streak(); $('#streak').innerHTML = `${ic('flame')}${n}<span>&nbsp;day${n === 1 ? '' : 's'}</span>`; $('#streak').title = `${n}-day streak`; }

/* ---------- router ---------- */
const V = {};
function parse() { const h = location.hash.replace(/^#\/?/, ''); const [path, qs] = h.split('?'); const parts = path.split('/').filter(Boolean); return { route: parts[0] || '', arg: decodeURIComponent(parts[1] || ''), qs: new URLSearchParams(qs || '') }; }
function render() {
  const { route, arg, qs } = parse(); const view = $('#view');
  stopTimers(); keyHandler = null; view.onclick = null;
  const fn = V[route] || V.notfound;
  view.className = 'view' + (['lab', 'sqllab', 'play'].includes(route) ? ' wide' : '');
  try { fn(view, arg, qs); } catch (e) { console.error(e); view.innerHTML = `<div class="empty">Something went wrong on this page. <a href="#/">Go home</a><br><small>${esc(e.message)}</small></div>`; }
  paintNav(route); paintStreak();
  if (!render.first) window.scrollTo(0, 0); render.first = false;
  view.focus({ preventScroll: true });
}
render.first = true;
addEventListener('hashchange', render);
const crumb = (...parts) => { $('#crumb').innerHTML = parts.map((p, i) => i < parts.length - 1 ? `<a href="${p[1]}">${esc(p[0])}</a><span class="sep">/</span>` : `<b>${esc(typeof p === 'string' ? p : p[0])}</b>`).join(''); };
const head = (path, title, lead) => `<header class="page-h">${path ? `<div class="path">${esc(path)}</div>` : ''}<h1>${esc(title)}</h1>${lead ? `<p>${lead}</p>` : ''}</header>`;
let timers = [];
const stopTimers = () => { timers.forEach(clearInterval); timers = []; };

/* ---------- HOME ---------- */
const STARTS = {
  zero: ['flag', 'Complete beginner', 'I’ve never coded. Start from how computers work.', 'computers'],
  python: ['code', 'I know some Python', 'Skip the basics; start with data, SQL and the maths.', 'sql-basics'],
  ml: ['layers', 'I know Python and some ML', 'Jump to how LLMs work, then build with them.', 'attention'],
  interview: ['briefcase', 'I have interviews soon', 'Focus on LLMs, RAG, agents and interview practice.', 'llm-api']
};
let OB = { step: 0, start: null, daily: null, name: '' };
V[''] = view => {
  crumb('Home');
  if (!S.onboarded) return onboarding(view);
  const nx = S.last && BY_ID[S.last] && !isDone(S.last) ? BY_ID[S.last] : nextLesson();
  const due = dueCards().length, wrong = Object.keys(S.wrong).length;
  const labsDone = Object.values(S.labs).filter(x => x.passed).length + Object.values(S.sql).filter(x => x.passed).length;
  const h = new Date().getHours(), greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const doneMin = COURSE.filter(l => isDone(l.id)).reduce((a, l) => a + l.min, 0);
  const daysLeft = Math.ceil((TOTAL_MIN - doneMin) * 1.6 / Math.max(15, S.daily));
  view.innerHTML = `<header class="hello"><h1>${greet}${S.name ? ', ' + esc(S.name) : ''}.</h1>
    <p>${nx ? 'One lesson, a few flashcards and one lab a day is all it takes. Pick up where you left off.' : 'You’ve finished every lesson. Keep your answers sharp with daily practice.'}</p></header>
    ${nx ? `<a class="cont" href="#/lesson/${nx.id}"><div><div class="k">${S.last === nx.id ? 'Continue' : 'Up next'} · Level ${nx.lv}: ${esc(LEVELS[nx.lv].t)}</div><h3>${esc(nx.t)}</h3>
      <div class="small muted">${nx.min} min · ${esc(nx.big)}</div></div><span class="go">${ic('play')}</span></a>` : ''}
    <div class="today">
      <a href="#/cards"><b>${due}</b><span>flashcards due</span></a>
      <a href="#/quiz?n=10"><b>${ic('target')}</b><span>Daily 10 quiz</span></a>
      <a href="#/mistakes"><b>${wrong}</b><span>mistakes to fix</span></a>
      <a href="#/labs"><b>${labsDone}</b><span>labs passed of ${PY_LABS.length + SQL_LABS.length}</span></a>
    </div>
    <div class="sec-h"><h2>Your path</h2><a href="#/learn">See all lessons</a></div>
    <div class="plan-line"><div class="ring" style="--p:${totalPct()}"><span>${totalPct()}%</span></div><div><b>${COURSE.filter(l => isDone(l.id)).length} of ${COURSE.length} lessons done</b>
      <div class="small muted">At ${S.daily} minutes a day (learning plus practice) you’ll finish in about ${daysLeft} day${daysLeft === 1 ? '' : 's'}. ${streak() ? `Current streak: ${streak()} day${streak() === 1 ? '' : 's'}.` : 'Start a streak today.'}</div></div></div>
    <div class="stages" style="margin-top:12px">${STAGES.map((st, i) => { const lvls = LEVELS.filter(L => L.stage === i); const ls = lvls.flatMap(L => LESSONS_BY_LV[L.n]); const p = Math.round(100 * ls.filter(l => isDone(l.id)).length / ls.length);
      return `<div class="stage"><div class="n">Stage ${i + 1}</div><h3>${esc(st.t)}</h3><p>${esc(st.d)}</p><div class="bar"><i style="width:${p}%"></i></div></div>`; }).join('')}</div>
    <div class="sec-h"><h2>Practise</h2><a href="#/practice">Practice hub</a></div>
    <div class="grid">
      <a class="tile" href="#/labs"><span class="ti">${ic('code')}</span><h3>Python labs</h3><p>Write real code in your browser; automatic tests tell you what’s right and what to fix.</p></a>
      <a class="tile" href="#/sql"><span class="ti">${ic('db')}</span><h3>SQL labs</h3><p>Query a practice company database. Works offline.</p></a>
      <a class="tile" href="#/mock"><span class="ti">${ic('mic')}</span><h3>Mock interview</h3><p>Timed questions, model answers, and your weak spots sent to flashcards.</p></a>
    </div>
    <div class="install no-print" id="installBox" style="margin-top:22px"><div class="panel row"><div style="flex:1;min-width:220px"><b>Install the app</b><div class="small muted">Learn offline from your home screen or desktop, like a native app.</div></div><button class="btn pri" id="installBtn">${ic('download')}Install</button></div></div>`;
  showInstall();
};
function onboarding(view) {
  const steps = [
    () => `<h1>Welcome. Let’s set up your path.</h1><p class="muted" style="margin-top:10px">Where are you starting from? You can change this any time, and every lesson stays open to you.</p>
      ${Object.entries(STARTS).map(([k, v]) => `<button class="opt ${OB.start === k ? 'on' : ''}" data-ob="${k}"><span class="ti">${ic(v[0])}</span><span><b>${v[1]}</b><span>${v[2]}</span></span></button>`).join('')}`,
    () => `<h1>How much time per day?</h1><p class="muted" style="margin-top:10px">Small daily sessions beat long weekend ones. Your plan adapts to this.</p>
      ${[[20, 'About 20 minutes', 'One short lesson or a practice set.'], [45, 'About 45 minutes', 'A lesson plus flashcards and a lab.'], [90, '90 minutes or more', 'The fastest path to interview-ready.']].map(([m, t, d]) => `<button class="opt ${OB.daily === m ? 'on' : ''}" data-ob="${m}"><span class="ti">${ic('clock')}</span><span><b>${t}</b><span>${d}</span></span></button>`).join('')}
      <label class="f" for="obname">Your first name (optional)</label><input id="obname" maxlength="40" value="${esc(OB.name)}" placeholder="e.g. Harsha" autocomplete="given-name">`
  ];
  const ok = OB.step === 0 ? !!OB.start : !!OB.daily;
  view.innerHTML = `<section class="onboard"><div class="dots"><i class="on"></i><i class="${OB.step ? 'on' : ''}"></i></div>${steps[OB.step]()}
    <div class="row" style="margin-top:22px;justify-content:space-between"><button class="btn ghost" data-ob="skip">Skip</button>
    <div class="row">${OB.step ? '<button class="btn" data-ob="back">Back</button>' : ''}<button class="btn pri" data-ob="next" ${ok ? '' : 'disabled'}>${OB.step ? 'Start learning' : 'Continue'}</button></div></div>
    <p class="small muted" style="margin-top:26px">${COURSE.length} lessons · ${QUESTIONS.length} quiz questions · ${DECK.length} flashcards · ${PY_LABS.length} Python and ${SQL_LABS.length} SQL labs · works offline once installed</p></section>`;
  $('#obname')?.addEventListener('input', e => { OB.name = e.target.value; });
  view.onclick = e => { const b = e.target.closest('[data-ob]'); if (!b) return; const v = b.dataset.ob;
    if (v === 'skip') { S.onboarded = true; save(); return render(); }
    if (v === 'back') OB.step = 0;
    else if (v === 'next') { if (OB.step === 0) OB.step = 1; else { S.onboarded = true; S.daily = OB.daily; S.name = OB.name.trim().slice(0, 40); S.last = STARTS[OB.start][3]; save(); view.onclick = null; location.hash = '#/lesson/' + S.last; return; } }
    else if (OB.step === 0) OB.start = v; else OB.daily = +v;
    onboarding(view); };
}

/* ---------- COURSE ---------- */
V.learn = view => {
  crumb('Course');
  const cur = S.last || nextLesson()?.id;
  view.innerHTML = head('', 'The course', `${COURSE.length} lessons in 12 levels, from your first line of code to GenAI system design. Every lesson has a plain explanation, why it matters, a real-life example, runnable code, common mistakes, the questions you might ask, interview answers and a quiz.`) +
    STAGES.map((st, si) => `<div class="stage-h"><h2>${si + 1}. ${esc(st.t)}</h2><span>${esc(st.d)}</span></div>` + LEVELS.filter(L => L.stage === si).map(L => {
      const ls = LESSONS_BY_LV[L.n], p = lvlPct(L.n), open = ls.some(l => l.id === cur);
      return `<details class="lvl ${p === 100 ? 'dn' : ''}" ${open ? 'open' : ''}><summary><span class="num">${p === 100 ? ic('check') : L.n}</span><div><h3>Level ${L.n} · ${esc(L.t)}</h3><p>${esc(L.d)}</p></div>
        <span class="right"><span class="small muted">${ls.filter(l => isDone(l.id)).length}/${ls.length}</span><span class="bar"><i style="width:${p}%"></i></span>${ic('chev', 'i chev')}</span></summary>
        ${ls.map(l => `<a class="lrow ${isDone(l.id) ? 'dn' : ''} ${l.id === cur && !isDone(l.id) ? 'cur' : ''}" href="#/lesson/${l.id}"><span class="st">${isDone(l.id) ? ic('check') : ''}</span><span><b>${esc(l.t)}</b><small>${esc(l.big)}</small></span><span class="small muted">${l.min} min</span></a>`).join('')}</details>`;
    }).join('')).join('');
};

/* ---------- LESSON ---------- */
V.lesson = (view, id) => {
  const l = BY_ID[id]; if (!l) return V.notfound(view);
  S.last = id; S.seen[id] = 1; save();
  const L = LEVELS[l.lv], i = ORDER.indexOf(l), prev = ORDER[i - 1], next = ORDER[i + 1];
  crumb(['Course', '#/learn'], [`Level ${l.lv}`, '#/learn'], l.t);
  const out = OUTPUTS[l.id];
  const outHtml = !out ? '' : out.sql ? `<div class="out" id="out"><div class="oh">${ic('check')}Result</div>${sqlTables(out.sql)}</div>`
    : `<div class="out" id="out"><div class="oh">${ic('check')}Output</div><pre>${esc(out)}</pre></div>`;
  const runLabel = l.lang === 'sql' ? 'Run SQL' : 'Run';
  view.innerHTML = `<article>
    <header class="lhead"><div class="meta"><span class="tag">Level ${l.lv} · ${esc(L.t)}</span><span class="tag">${ic('clock')}${l.min} min</span>${isDone(id) ? `<span class="tag ok">${ic('check')}Completed</span>` : ''}</div>
      <h1>${esc(l.t)}</h1><div class="big"><span class="lab">The big idea</span>${inl(l.big)}</div></header>
    <section class="sec"><h2>${ic('target')}Why this matters</h2><div class="callout why">${inl(l.why)}</div></section>
    <section class="sec"><h2>${ic('book')}Explained simply</h2><div class="prose">${blocks(l.body)}</div></section>
    <section class="sec"><h2>${ic('bulb')}Real-life example</h2><div class="callout ex">${inl(l.ex)}</div></section>
    <section class="sec"><h2>${ic('code')}${l.run ? 'See it in code — and run it' : 'See it in code'}</h2>
      <div class="code"><div class="ch"><span>${{ py: 'Python', sql: 'SQL · practice database', sh: 'Terminal', text: 'Reference' }[l.lang]}</span><span class="sp"></span>
        ${l.run ? `<button class="run" id="runBtn">${ic('play')}${runLabel}</button><button id="editBtn">${ic('pen')}Edit in playground</button>` : ''}<button id="copyBtn">${ic('copy')}Copy</button></div>
        <pre id="codeView">${hl(l.code, l.lang)}</pre></div>${outHtml}
      ${!l.run && l.lang === 'py' ? '<p class="hint">This example needs packages or internet access that the in-browser Python can’t provide. Run it in VS Code or Google Colab.</p>' : ''}</section>
    <section class="sec"><h2>${ic('alert')}Common mistakes</h2><div class="callout mist"><ul>${l.mist.map(m => `<li>${inl(m)}</li>`).join('')}</ul></div></section>
    <section class="sec"><h2>${ic('help')}Questions you might ask</h2>${l.faq.map(([q, a]) => `<details class="qa"><summary>${inl(q)}${ic('chev')}</summary><div class="ans">${inl(a)}</div></details>`).join('')}
      <div class="panel no-print" style="margin-top:12px"><label class="f" for="askq" style="margin-top:0">Still have a question? Ask the tutor about this lesson</label>
      <div class="row"><input id="askq" placeholder="e.g. Why do we divide by √d in attention?" maxlength="600" style="flex:1;min-width:200px"><button class="btn pri" id="askBtn">${ic('message')}Ask</button></div><div id="askOut" style="margin-top:10px"></div></div></section>
    <section class="sec"><h2>${ic('briefcase')}Interview questions</h2>${l.iq.map(([q, a]) => `<details class="qa"><summary>${inl(q)}${ic('chev')}</summary><div class="ans"><b>Model answer.</b> ${inl(a)}</div></details>`).join('')}</section>
    <section class="sec"><h2>${ic('star')}Remember</h2><ul class="cheat">${l.cheat.map(c => `<li>${inl(c)}</li>`).join('')}</ul></section>
    <section class="sec" id="check"><h2>${ic('list')}Check yourself</h2><div class="q-card" id="lq"></div></section>
    <div class="pager no-print">
      ${prev ? `<a class="btn" href="#/lesson/${prev.id}">${ic('back')}${esc(prev.t)}</a>` : '<span></span>'}
      <div class="row">${isDone(id) ? `<button class="btn" id="undoBtn">Mark as not done</button>` : `<button class="btn pri" id="doneBtn">${ic('check')}Mark complete${next ? ' and continue' : ''}</button>`}
      ${next && isDone(id) ? `<a class="btn pri" href="#/lesson/${next.id}">Next: ${esc(next.t)}${ic('chev')}</a>` : ''}</div>
    </div></article>`;
  // quiz inline
  inlineQuiz($('#lq'), l.quiz.map((q, k) => QBY[`${l.id}:${k}`]));
  $('#copyBtn').onclick = () => copy(l.code);
  if (l.run) {
    $('#editBtn').onclick = () => { S.play[l.lang === 'sql' ? 'sql' : 'py'] = l.code; save(); location.hash = l.lang === 'sql' ? '#/play/sql' : '#/play'; };
    $('#runBtn').onclick = async () => {
      const box = $('#out') || (() => { const d = document.createElement('div'); d.className = 'out'; d.id = 'out'; $('#codeView').parentElement.after(d); return d; })();
      if (l.lang === 'sql') { box.innerHTML = `<div class="oh">${ic('play')}Running…</div>`; const r = await runSQL(l.code); box.innerHTML = r.error ? `<div class="oh" style="color:var(--err)">${ic('x')}Error</div><pre class="err">${esc(r.error)}</pre>` : `<div class="oh">${ic('check')}Result · ran just now</div>${sqlTables(r.sets)}`; }
      else { box.innerHTML = `<div class="oh">${ic('play')}<span id="pystat">Running…</span></div><pre></pre>`; const r = await runPy(l.code, s => { const el = $('#pystat'); if (el) el.textContent = s; });
        box.innerHTML = `<div class="oh" ${r.error ? 'style="color:var(--err)"' : ''}>${ic(r.error ? 'x' : 'check')}${r.error ? 'Error' : 'Output · ran just now'}</div><pre>${esc(r.out)}${r.error ? `<span class="err">${esc(r.error)}</span>` : ''}</pre>`; }
      active();
    };
  }
  $('#askBtn').onclick = () => askTutor(l);
  $('#askq').onkeydown = e => { if (e.key === 'Enter') askTutor(l); };
  $('#doneBtn') && ($('#doneBtn').onclick = () => { S.done[id] = todayKey(); active(); toast(`Lesson complete · ${totalPct()}% of the course`); location.hash = next ? '#/lesson/' + next.id : '#/learn'; });
  $('#undoBtn') && ($('#undoBtn').onclick = () => { delete S.done[id]; save(); render(); });
};
function inlineQuiz(box, qs) {
  box.innerHTML = qs.map((q, n) => { const order = shuffle(q.o.map((_, j) => j));
    return `<div class="qitem" data-id="${q.id}"><b>${n + 1}. ${inl(q.q)}</b>${order.map((j, k) => `<button class="qopt" data-j="${j}"><span class="k">${'ABCD'[k]}</span><span>${inl(q.o[j])}</span></button>`).join('')}<div class="qexp"></div></div>`; }).join('');
  box.onclick = e => { const o = e.target.closest('.qopt'); if (!o || o.disabled) return; const it = o.closest('.qitem'); const q = QBY[it.dataset.id];
    const ok = +o.dataset.j === q.a; answerQ(q, ok);
    $$('.qopt', it).forEach(b => { b.disabled = true; if (+b.dataset.j === q.a) b.classList.add('right'); }); if (!ok) o.classList.add('wrong');
    it.classList.add('done'); $('.qexp', it).innerHTML = `<b class="${ok ? 'ok' : 'no'}">${ok ? 'Correct.' : 'Not quite.'}</b> ${inl(q.e)}`; };
}
function answerQ(q, ok) { S.quiz.n++; if (ok) { S.quiz.ok++; delete S.wrong[q.id]; } else S.wrong[q.id] = todayKey(); active(); }
function copy(text) { navigator.clipboard?.writeText(text).then(() => toast('Copied'), () => toast('Copy failed — select and copy manually')) ?? toast('Copy not supported here'); }

/* ---------- Python runner (Pyodide in a worker, so a stuck loop can be stopped) ---------- */
const PY = { worker: null, ready: null, seq: 0, pending: {} };
function pyWorker() {
  if (PY.worker) return PY.ready;
  const src = `importScripts("${PYODIDE}pyodide.js");
let py = null;
const ready = loadPyodide({ indexURL: "${PYODIDE}" }).then(p => { py = p; postMessage({ type: "ready" }); }).catch(e => postMessage({ type: "fail", error: String(e) }));
onmessage = async (e) => {
  await ready; const { id, code } = e.data; let out = "";
  if (!py) return postMessage({ type: "done", id, out, error: "Python could not start." });
  py.setStdout({ batched: s => { out += s + "\\n"; } }); py.setStderr({ batched: s => { out += s + "\\n"; } });
  try {
    postMessage({ type: "status", id, text: "Loading packages…" });
    await py.loadPackagesFromImports(code);
    postMessage({ type: "exec", id });
    const ns = py.globals.get("dict")();
    await py.runPythonAsync(code, { globals: ns }); ns.destroy();
    postMessage({ type: "done", id, out });
  } catch (err) { postMessage({ type: "done", id, out, error: String((err && err.message) || err) }); }
};`;
  PY.worker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
  PY.ready = new Promise((res, rej) => {
    PY.worker.onmessage = e => { const m = e.data;
      if (m.type === 'ready') res(); else if (m.type === 'fail') { rej(new Error(m.error)); }
      else { const p = PY.pending[m.id]; if (!p) return; if (m.type === 'status') p.status(m.text); else if (m.type === 'exec') { p.status('Running…'); p.arm(); } else if (m.type === 'done') { p.finish(m); } } };
    PY.worker.onerror = e => rej(new Error(e.message || 'Python failed to load'));
  });
  return PY.ready;
}
function cleanTrace(msg) {
  const lines = String(msg).split('\n'); const i = lines.findIndex(x => x.includes('File "<exec>"'));
  const keep = i >= 0 ? lines.slice(i) : lines.slice(-4);
  return keep.join('\n').replace(/File "<exec>", /g, '').trim();
}
async function runPy(code, status = () => {}) {
  if (!navigator.onLine && !PY.worker) return { out: '', error: 'Python needs an internet connection the first time it loads (about 10 MB). After that it works from the cache.' };
  status(PY.worker ? 'Starting…' : 'Starting Python — the first run downloads about 10 MB…');
  try { await pyWorker(); } catch (e) { PY.worker?.terminate(); PY.worker = null; return { out: '', error: 'Python could not load: ' + e.message + '. Check your connection and try again.' }; }
  const id = ++PY.seq;
  return new Promise(resolve => {
    let timer = null;
    const finish = m => { clearTimeout(timer); delete PY.pending[id]; resolve({ out: m.out || '', error: m.error ? cleanTrace(m.error) : '' }); };
    PY.pending[id] = { status, finish, arm: () => { timer = setTimeout(() => { PY.worker.terminate(); PY.worker = null; delete PY.pending[id];
      resolve({ out: '', error: 'Stopped after 15 seconds. Is there an infinite loop (a while loop whose condition never becomes False)?' }); }, 15000); } };
    PY.worker.postMessage({ id, code });
  });
}

/* ---------- SQL runner (sql.js, bundled — works offline) ---------- */
let SQLP = null;
function sqlEngine() {
  if (SQLP) return SQLP;
  SQLP = new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'vendor/sql-wasm.js';
    s.onload = () => initSqlJs({ locateFile: f => 'vendor/' + f }).then(res, rej); s.onerror = () => rej(new Error('SQL engine failed to load')); document.head.appendChild(s); });
  SQLP.catch(() => { SQLP = null; });
  return SQLP;
}
async function runSQL(query) {
  try { const SQL = await sqlEngine(); const db = new SQL.Database(); db.exec(SQL_SCHEMA);
    try { const sets = db.exec(query); return { sets }; } finally { db.close(); } }
  catch (e) { return { error: String(e.message || e) }; }
}
function sqlTables(sets) {
  if (!sets || !sets.length) return '<pre class="muted">Query ran. No rows returned.</pre>';
  return sets.map(s => `<div class="restbl"><table><thead><tr>${s.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${s.values.slice(0, 200).map(r => `<tr>${r.map(v => v === null ? '<td class="null">NULL</td>' : `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <div class="hint">${s.values.length} row${s.values.length === 1 ? '' : 's'}${s.values.length > 200 ? ' (first 200 shown)' : ''}</div></div>`).join('');
}

/* ---------- AI tutor (optional; your own key) ---------- */
const PROVIDERS = {
  gemini: { name: 'Google Gemini (free tier available)', model: 'gemini-2.5-flash', keyUrl: 'https://aistudio.google.com/apikey' },
  groq: { name: 'Groq (free tier available)', model: 'llama-3.3-70b-versatile', base: 'https://api.groq.com/openai/v1', keyUrl: 'https://console.groq.com/keys' },
  anthropic: { name: 'Anthropic Claude', model: 'claude-haiku-5-5', keyUrl: 'https://console.anthropic.com/' },
  openai: { name: 'Any OpenAI-compatible API', model: '', base: 'https://api.openai.com/v1', keyUrl: '' }
};
async function ai(system, user) {
  const a = S.ai; if (!a.key) throw new Error('NO_KEY');
  const P = PROVIDERS[a.provider] || PROVIDERS.gemini; const model = a.model || P.model;
  if (!model) throw new Error('Set a model name in Settings.');
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 45000);
  try {
    let r, d;
    if (a.provider === 'gemini') {
      r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, { method: 'POST', signal: ctl.signal,
        headers: { 'content-type': 'application/json', 'x-goog-api-key': a.key },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: user }] }], generationConfig: { maxOutputTokens: 1400, temperature: 0.3 } }) });
      d = await r.json(); if (!r.ok) throw new Error(d?.error?.message || 'HTTP ' + r.status);
      return (d.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('') || 'No answer returned.';
    }
    if (a.provider === 'anthropic') {
      r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal: ctl.signal,
        headers: { 'content-type': 'application/json', 'x-api-key': a.key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model, max_tokens: 1400, system, messages: [{ role: 'user', content: user }] }) });
      d = await r.json(); if (!r.ok) throw new Error(d?.error?.message || 'HTTP ' + r.status);
      return (d.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n');
    }
    const base = (a.base || P.base || '').replace(/\/+$/, '');
    r = await fetch(base + '/chat/completions', { method: 'POST', signal: ctl.signal, headers: { 'content-type': 'application/json', authorization: 'Bearer ' + a.key },
      body: JSON.stringify({ model, max_tokens: 1400, temperature: 0.3, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }) });
    d = await r.json(); if (!r.ok) throw new Error(d?.error?.message || 'HTTP ' + r.status);
    return d.choices?.[0]?.message?.content || 'No answer returned.';
  } catch (e) { if (e.name === 'AbortError') throw new Error('The AI took too long to answer. Try again.'); if (e instanceof TypeError) throw new Error('Could not reach the AI provider (offline, or the provider blocks browser requests). Try another provider in Settings.'); throw e; }
  finally { clearTimeout(t); }
}
const TUTOR = 'You are a patient, accurate tutor for a beginner learning Generative AI to get a job. Explain simply, use a short real-life example (Indian context is welcome), and say clearly when something is uncertain or depends on the provider. Keep answers under 220 words unless code is needed. Never invent facts, APIs or numbers.';
const noKey = () => `<div class="ai-box">The tutor uses your own free AI key. Add one in <a href="#/settings">Settings</a> (Google Gemini and Groq both have free tiers). Meanwhile, the answers above cover the questions learners ask most.</div>`;
async function askTutor(l) {
  const q = $('#askq').value.trim(), out = $('#askOut'); if (!q) return $('#askq').focus();
  if (!S.ai.key) { out.innerHTML = noKey(); return; }
  out.innerHTML = '<div class="ai-box muted">Thinking…</div>';
  const ctx = `Lesson: ${l.t}\nBig idea: ${l.big}\nKey points:\n${l.body.join('\n')}`;
  try { const ans = await ai(TUTOR, `${ctx}\n\nThe learner asks: ${q}`); out.innerHTML = `<div class="ai-box">${mdLite(ans)}</div>`; active(); }
  catch (e) { out.innerHTML = e.message === 'NO_KEY' ? noKey() : `<div class="ai-box">${esc(e.message)}</div>`; }
}

/* ---------- PRACTICE HUB ---------- */
V.practice = view => {
  crumb('Practise');
  const due = dueCards().length, wrong = Object.keys(S.wrong).length;
  const lp = Object.values(S.labs).filter(x => x.passed).length, sp = Object.values(S.sql).filter(x => x.passed).length;
  const acc = S.quiz.n ? Math.round(100 * S.quiz.ok / S.quiz.n) + '%' : '—';
  view.innerHTML = head('', 'Practise', 'Learning sticks when you use it. Mix these every day: a quiz, your due flashcards, one lab, and an interview answer out loud.') + `
    <div class="today" style="margin-bottom:24px"><a href="#/quiz"><b>${acc}</b><span>quiz accuracy (${S.quiz.n} answered)</span></a><a href="#/cards"><b>${due}</b><span>flashcards due</span></a><a href="#/labs"><b>${lp}/${PY_LABS.length}</b><span>Python labs passed</span></a><a href="#/sql"><b>${sp}/${SQL_LABS.length}</b><span>SQL labs passed</span></a></div>
    <div class="grid">
      <a class="tile" href="#/quiz"><span class="ti">${ic('list')}</span><h3>Quiz</h3><p>${QUESTIONS.length} multiple-choice questions with explanations. Pick levels and length.</p></a>
      <a class="tile" href="#/cards"><span class="ti">${ic('cards')}</span><h3>Flashcards</h3><p>Spaced repetition: hard cards return sooner. Covers concepts and interview answers from lessons you’ve opened.</p><span class="meta">${due} due now</span></a>
      <a class="tile" href="#/labs"><span class="ti">${ic('code')}</span><h3>Python labs</h3><p>${PY_LABS.length} exercises from basics to attention and RAG, auto-checked by tests.</p></a>
      <a class="tile" href="#/sql"><span class="ti">${ic('db')}</span><h3>SQL labs</h3><p>${SQL_LABS.length} questions on a company database: filters, joins, window functions.</p></a>
      <a class="tile" href="#/play"><span class="ti">${ic('terminal')}</span><h3>Playground</h3><p>Write and run any Python or SQL, on any device.</p></a>
      <a class="tile" href="#/answers"><span class="ti">${ic('pen')}</span><h3>Answer writing</h3><p>${WRITTEN.length} interview questions. Write your answer; see which key points you covered and missed.</p></a>
      <a class="tile" href="#/mock"><span class="ti">${ic('mic')}</span><h3>Mock interview</h3><p>Timed, spoken-style practice with model answers and honest self-rating.</p></a>
      <a class="tile" href="#/mistakes"><span class="ti">${ic('rotate')}</span><h3>Mistakes</h3><p>Every question you got wrong, until you get it right.</p><span class="meta">${wrong} waiting</span></a>
    </div>`;
};

/* ---------- QUIZ ---------- */
V.quiz = (view, _, qs) => {
  crumb(['Practise', '#/practice'], 'Quiz');
  const n = qs.get('n'), lv = qs.get('lv');
  if (!n) {
    const counts = LEVELS.map(L => QUESTIONS.filter(q => q.lv === L.n).length);
    view.innerHTML = head('Practise', 'Quiz', 'Choose what to practise. Options are shuffled every time, and wrong answers go to Mistakes until you get them right.') + `
      <div class="panel"><label class="f" for="qlv" style="margin-top:0">Levels</label><select id="qlv"><option value="done">Lessons I’ve completed (recommended)</option><option value="all">Everything (${QUESTIONS.length})</option>
      ${LEVELS.map((L, i) => `<option value="${L.n}">Level ${L.n} · ${esc(L.t)} (${counts[i]})</option>`).join('')}</select>
      <label class="f" for="qn">Length</label><select id="qn"><option value="10">10 questions</option><option value="20">20 questions</option><option value="40">40 questions</option></select>
      <div class="row" style="margin-top:16px"><button class="btn pri" id="qgo">${ic('play')}Start</button><a class="btn" href="#/quiz?n=10">Daily 10 (mixed)</a></div></div>`;
    $('#qgo').onclick = () => { location.hash = `#/quiz?n=${$('#qn').value}&lv=${$('#qlv').value}`; };
    return;
  }
  let pool = QUESTIONS;
  if (lv === 'done') { const dn = new Set(Object.keys(S.done)); pool = QUESTIONS.filter(q => q.lesson ? dn.has(q.lesson) : LESSONS_BY_LV[q.lv].some(l => dn.has(l.id))); if (pool.length < 5) pool = QUESTIONS.filter(q => q.lv <= Math.max(1, (BY_ID[S.last]?.lv ?? 1))); }
  else if (lv && lv !== 'all') pool = QUESTIONS.filter(q => q.lv === +lv);
  const wrongFirst = shuffle(pool.filter(q => S.wrong[q.id])).slice(0, 3);
  const set = [...wrongFirst, ...shuffle(pool.filter(q => !wrongFirst.includes(q)))].slice(0, +n || 10);
  runQuiz(view, set, 'Quiz');
};
function runQuiz(view, set, title) {
  if (!set.length) { view.innerHTML = head('Practise', title) + '<div class="empty">No questions here yet. <a href="#/quiz">Choose another set</a>.</div>'; return; }
  let i = 0, right = 0; const missed = [];
  const step = () => {
    if (i >= set.length) { const pct = Math.round(100 * right / set.length);
      view.innerHTML = head('Practise', title) + `<div class="score"><b>${right}/${set.length}</b><div><div>${pct >= 80 ? 'Excellent — this is interview-ready.' : pct >= 60 ? 'Good. Read the explanations for the ones you missed.' : 'Worth another look. Revisit the lessons below, then try again.'}</div>
        <div class="row" style="margin-top:10px"><a class="btn pri" href="${location.hash}" onclick="setTimeout(render)">New set</a><a class="btn" href="#/mistakes">Review mistakes</a></div></div></div>
        ${missed.length ? `<div class="sec-h"><h2>Revisit</h2></div><div class="list">${[...new Set(missed.filter(q => q.lesson))].map(q => `<a class="labrow" href="#/lesson/${q.lesson}"><span class="n">${ic('book')}</span><span>${esc(BY_ID[q.lesson].t)}</span>${ic('chev')}</a>`).join('') || '<div class="labrow"><span></span><span class="muted">These came from the interview bank — try them again in Mistakes.</span><span></span></div>'}</div>` : ''}`;
      return; }
    const q = set[i], order = shuffle(q.o.map((_, j) => j));
    view.innerHTML = head('Practise', title) + `<div class="q-card"><div class="q-meta"><span>Question ${i + 1} of ${set.length}</span><span>Level ${q.lv} · ${esc(q.src)}</span></div>
      <div class="bar" style="margin-bottom:16px"><i style="width:${100 * i / set.length}%"></i></div><div class="q-text">${inl(q.q)}</div>
      ${order.map((j, k) => `<button class="qopt" data-j="${j}"><span class="k">${'ABCD'[k]}</span><span>${inl(q.o[j])}</span></button>`).join('')}<div id="fb"></div></div>`;
    view.onclick = e => { const o = e.target.closest('.qopt'); if (!o || o.disabled) return; const ok = +o.dataset.j === q.a; answerQ(q, ok); if (ok) right++; else missed.push(q);
      $$('.qopt', view).forEach(b => { b.disabled = true; if (+b.dataset.j === q.a) b.classList.add('right'); }); if (!ok) o.classList.add('wrong');
      $('#fb').innerHTML = `<div class="qexp"><b class="${ok ? 'ok' : 'no'}">${ok ? 'Correct.' : 'Not quite.'}</b> ${inl(q.e)}${q.lesson ? ` <a href="#/lesson/${q.lesson}">Lesson</a>` : ''}</div><div class="row" style="margin-top:14px"><button class="btn pri" id="nextQ">${i + 1 < set.length ? 'Next question' : 'See score'}${ic('chev')}</button></div>`;
      $('#nextQ').focus(); $('#nextQ').onclick = () => { i++; view.onclick = null; step(); }; };
  };
  step();
}
V.mistakes = view => {
  crumb(['Practise', '#/practice'], 'Mistakes');
  const qs = Object.keys(S.wrong).map(id => QBY[id]).filter(Boolean);
  if (!qs.length) { view.innerHTML = head('Interview', 'Mistakes', 'Questions you answer wrongly collect here until you get them right.') + `<div class="empty">Nothing to fix right now. <a href="#/quiz?n=10">Take the Daily 10</a>.</div>`; return; }
  runQuiz(view, shuffle(qs).slice(0, 25), `Mistakes (${qs.length})`);
};

/* ---------- FLASHCARDS (Leitner spaced repetition) ---------- */
const BOX_DAYS = [0, 1, 3, 7, 16, 35];
function dueCards(all = false) {
  const t = dayNum(), seen = new Set(Object.keys(S.seen)), nw = S.srsNew.d === t ? S.srsNew.n : 0;
  const due = DECK.filter(c => S.srs[c.id] && S.srs[c.id].due <= t);
  const fresh = DECK.filter(c => !S.srs[c.id] && (all || seen.has(c.lesson))).slice(0, Math.max(0, 20 - nw));
  return [...due, ...fresh];
}
V.cards = (view, _, qs) => {
  crumb(['Practise', '#/practice'], 'Flashcards');
  const list = dueCards(qs.get('all') === '1'); let i = 0, shown = false, reviewed = 0;
  const draw = () => {
    const c = list[i];
    if (!c) { const fut = Object.values(S.srs).map(x => x.due).filter(d => d > dayNum()); const nextIn = fut.length ? Math.min(...fut) - dayNum() : 0;
      view.innerHTML = head('Practise', 'Flashcards', 'Spaced repetition: say the answer out loud, reveal, then rate yourself honestly.') + `<div class="fc"><div class="fc-card" style="align-items:center;justify-content:center;text-align:center">
        <div class="q">${reviewed ? `Done — ${reviewed} card${reviewed === 1 ? '' : 's'} reviewed.` : 'No cards due right now.'}</div>
        <p class="muted">${Object.keys(S.seen).length ? (nextIn ? `Next cards are due in ${nextIn} day${nextIn === 1 ? '' : 's'}. New cards come from lessons you open.` : 'New cards appear as you open lessons.') : 'Open a lesson first — its cards join your deck automatically.'}</p>
        <div class="row" style="justify-content:center"><a class="btn pri" href="#/quiz?n=10">Daily 10 quiz</a><a class="btn" href="#/cards?all=1" onclick="setTimeout(render)">Study cards from all lessons</a></div></div></div>`; if (reviewed) active(); return; }
    const st = S.srs[c.id];
    view.innerHTML = head('Practise', 'Flashcards') + `<div class="fc"><div class="fc-meta"><span>${i + 1} of ${list.length}</span><span>${st ? `Box ${st.box + 1} of ${BOX_DAYS.length}` : 'New'} · ${c.kind} · ${esc(BY_ID[c.lesson].t)}</span></div>
      <div class="fc-card"><div class="q">${inl(c.f)}</div>${shown ? `<div class="a">${inl(c.b)}</div><a class="small" href="#/lesson/${c.lesson}">Open the lesson</a>` : `<p class="muted small">${c.kind === 'Interview' ? 'Answer out loud as if in an interview, then reveal.' : 'Say the answer in your own words, then reveal.'}</p>`}</div>
      <div class="fc-actions">${shown ? `<button class="btn" data-g="0">Again</button><button class="btn" data-g="1">Good</button><button class="btn pri" data-g="2">Easy</button>` : `<button class="btn pri" data-g="show">Show answer</button>`}</div>
      <p class="hint" style="text-align:center">Keys: Space to reveal · 1 Again · 2 Good · 3 Easy</p></div>`;
  };
  const grade = g => { const c = list[i]; if (!c) return;
    if (g === 'show') { shown = true; return draw(); }
    if (!shown) return;
    const t = dayNum(), cur = S.srs[c.id];
    if (!cur) S.srsNew = { d: t, n: (S.srsNew.d === t ? S.srsNew.n : 0) + 1 };
    const box = g === 0 ? 0 : Math.min(BOX_DAYS.length - 1, (cur ? cur.box : -1) + g);
    S.srs[c.id] = { box, due: t + (g === 0 ? 0 : BOX_DAYS[box]) }; save();
    if (g === 0) list.push(c); i++; reviewed++; shown = false; draw(); };
  view.onclick = e => { const b = e.target.closest('[data-g]'); if (b) grade(b.dataset.g === 'show' ? 'show' : +b.dataset.g); };
  keyHandler = e => { if (e.target.matches('input,textarea,select')) return; if (e.key === ' ') { e.preventDefault(); grade('show'); } else if (['1', '2', '3'].includes(e.key)) grade(+e.key - 1); };
  draw();
};
let keyHandler = null;
addEventListener('keydown', e => keyHandler && keyHandler(e));

/* ---------- MOCK INTERVIEW ---------- */
V.mock = view => {
  crumb(['Interview', '#/practice'], 'Mock interview');
  const pool = ORDER.flatMap(l => l.iq.map(([q, a]) => ({ q, a, lesson: l.id, lv: l.lv })));
  view.innerHTML = head('Interview', 'Mock interview', 'Answer each question out loud, as you would in a real interview — aim for 60–90 seconds: definition, how it works, an example, a trade-off. Then compare with the model answer and rate yourself honestly. Weak answers go into your flashcards.') + `
    <div class="panel" id="mk"><label class="f" for="mkf" style="margin-top:0">Focus</label><select id="mkf"><option value="build">GenAI engineer (Levels 7–11, recommended)</option><option value="core">Core AI (Levels 4–7)</option><option value="found">Foundations (Levels 0–3)</option><option value="all">Everything</option></select>
    <label class="f" for="mkn">Questions</label><select id="mkn"><option>5</option><option selected>8</option><option>12</option></select>
    <div class="row" style="margin-top:16px"><button class="btn pri" id="mkgo">${ic('play')}Start interview</button><span class="small muted">About 2 minutes per question.</span></div></div>`;
  $('#mkgo').onclick = () => {
    const f = $('#mkf').value, range = { build: [7, 11], core: [4, 7], found: [0, 3], all: [0, 11] }[f];
    const qs = shuffle(pool.filter(q => q.lv >= range[0] && q.lv <= range[1])).slice(0, +$('#mkn').value);
    let i = 0, shown = false; const rate = []; const t0 = Date.now();
    const draw = () => {
      stopTimers();
      if (i >= qs.length) { const score = rate.reduce((a, b) => a + b, 0), max = rate.length * 2; const weak = qs.filter((_, k) => rate[k] === 0);
        weak.forEach(q => { const l = BY_ID[q.lesson]; const id = `${l.id}:i0`; S.srs[id] = { box: 0, due: dayNum() }; S.seen[l.id] = 1; }); active();
        view.innerHTML = head('Interview', 'Mock interview') + `<div class="score"><b>${Math.round(100 * score / max)}%</b><div>${score >= max * .75 ? 'Strong. You’re close to interview-ready on this set.' : score >= max * .5 ? 'Solid base. Practise the weaker answers out loud again tomorrow.' : 'Good practice. Re-read the lessons below and try again.'}
          <div class="small muted">${Math.max(1, Math.round((Date.now() - t0) / 60000))} min total</div></div></div>
          ${weak.length ? `<div class="sec-h"><h2>Added to your flashcards</h2></div><div class="list">${weak.map(q => `<a class="labrow" href="#/lesson/${q.lesson}"><span class="n">${ic('rotate')}</span><span>${inl(q.q)}</span>${ic('chev')}</a>`).join('')}</div>` : ''}
          <div class="row" style="margin-top:18px"><a class="btn pri" href="#/mock" onclick="setTimeout(render)">New interview</a><a class="btn" href="#/cards">Flashcards</a></div>`; return; }
      const q = qs[i], qt = Date.now();
      view.innerHTML = head('Interview', 'Mock interview') + `<div class="fc"><div class="fc-meta"><span>Question ${i + 1} of ${qs.length}</span><span class="timer" id="mkt">0:00</span></div>
        <div class="fc-card"><div class="q">${inl(q.q)}</div>${shown ? `<div class="a"><b>Model answer.</b> ${inl(q.a)}</div><p class="muted small">How did your answer compare?</p>` : '<p class="muted small">Structure: definition → how it works → example → trade-off → how you’d use it.</p>'}</div>
        <div class="fc-actions">${shown ? '<button class="btn" data-mk="0">Weak</button><button class="btn" data-mk="1">Okay</button><button class="btn pri" data-mk="2">Strong</button>' : '<button class="btn pri" data-mk="show">I’ve answered — show the model answer</button>'}</div></div>`;
      if (!shown) timers.push(setInterval(() => { const el = $('#mkt'); if (!el) return; const s = Math.floor((Date.now() - qt) / 1000); el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; if (s >= 120) el.style.color = 'var(--warn)'; }, 500));
    };
    view.onclick = e => { const b = e.target.closest('[data-mk]'); if (!b) return; if (b.dataset.mk === 'show') shown = true; else { rate.push(+b.dataset.mk); i++; shown = false; } draw(); };
    draw();
  };
};

/* ---------- ANSWER WRITING ---------- */
V.answers = view => {
  crumb(['Interview', '#/practice'], 'Answer writing');
  view.innerHTML = head('Interview', 'Answer writing', 'Write answers the way you’d say them. The checker shows which key ideas you covered and missed, and how to make the answer stronger. With an AI key, you also get a full review that catches factual mistakes.') +
    `<div class="list">${WRITTEN.map(w => { const b = S.wbest[w.id]; return `<a class="labrow" href="#/answer/${w.id}"><span class="n">L${w.lv}</span><span>${esc(w.q)}</span><span class="tag ${b >= 80 ? 'ok' : ''}">${b != null ? 'best ' + b + '%' : 'new'}</span></a>`; }).join('')}</div>`;
};
function checkAnswer(w, text) {
  const t = ' ' + text.toLowerCase().replace(/\s+/g, ' ') + ' ';
  const res = w.points.map(p => ({ t: p.t, hit: p.k.some(k => t.includes(k.toLowerCase())) }));
  const words = text.trim() ? text.trim().split(/\s+/).length : 0, tips = [];
  if (words < 60) tips.push('Too short for an interview — aim for 80–150 words (about a minute spoken).');
  if (words > 230) tips.push('Long. Lead with a one-line definition and keep it under two minutes.');
  if (!/(for example|e\.g\.|for instance|such as|example)/.test(t)) tips.push('Add a concrete example — it proves understanding.');
  if (!/(trade-?off|however|but |downside|limitation|drawback|risk|cost)/.test(t)) tips.push('Mention a trade-off or limitation — it signals experience.');
  if (!/(\bi would\b|\bi'd\b|\bi use\b|\bi built\b|in practice|in production|in my project)/.test(t)) tips.push('Say how you would apply it (“In practice I…”).');
  return { res, words, tips, score: Math.round(100 * res.filter(r => r.hit).length / res.length) };
}
V.answer = (view, id) => {
  const w = WRITTEN.find(x => x.id === id); if (!w) return V.notfound(view);
  crumb(['Answer writing', '#/answers'], w.q);
  view.innerHTML = head(`Level ${w.lv} · ${LEVELS[w.lv].t}`, w.q) + `<div class="panel">
    <label class="f" for="wt" style="margin-top:0">Your answer</label><textarea id="wt" rows="9" placeholder="Definition → how it works → example → trade-off → how you'd use it"></textarea>
    <div class="row" style="margin-top:12px"><button class="btn pri" id="wcheck">${ic('check')}Check my answer</button><button class="btn" id="wai">${ic('message')}Review with AI</button><button class="btn ghost" id="wmodel">Show model answer</button><span class="small muted" id="wc"></span></div>
    <div id="wout" style="margin-top:14px"></div><div id="waiout" style="margin-top:10px"></div><div id="wmod" style="margin-top:10px"></div></div>`;
  const ta = $('#wt'); ta.value = S.written[id] || '';
  const count = () => { $('#wc').textContent = `${ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0} words`; }; count();
  ta.oninput = () => { S.written[id] = ta.value; save(); count(); };
  $('#wcheck').onclick = () => { if (!ta.value.trim()) return ta.focus(); const r = checkAnswer(w, ta.value); S.wbest[id] = Math.max(S.wbest[id] || 0, r.score); active();
    $('#wout').innerHTML = `<div class="score"><b>${r.score}%</b><div>key points covered<div class="small muted">${r.words} words · the checker looks for ideas, not exact words</div></div></div>
      <ul class="points">${r.res.map(p => `<li class="${p.hit ? 'ok' : 'no'}">${ic(p.hit ? 'check' : 'x')}${p.hit ? `<mark>${esc(p.t)}</mark>` : esc(p.t)}</li>`).join('')}</ul>
      ${r.tips.length ? `<div class="callout"><b>Make it stronger</b><ul>${r.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>` : '<div class="callout ex">Well structured answer.</div>'}`; };
  $('#wmodel').onclick = () => { $('#wmod').innerHTML = `<div class="callout why"><b>Model answer.</b> ${inl(w.model)}</div>`; };
  $('#wai').onclick = async () => { if (!ta.value.trim()) return ta.focus(); const o = $('#waiout'); if (!S.ai.key) { o.innerHTML = noKey(); return; } o.innerHTML = '<div class="ai-box muted">Reviewing…</div>';
    try { const ans = await ai('You are a strict but encouraging interviewer for GenAI roles reviewing a beginner. Be accurate and specific.',
      `Question: ${w.q}\n\nReference answer: ${w.model}\n\nCandidate answer: ${ta.value}\n\nReply with: Score: X/10, then "What's right" (1–3 bullets), "Mistakes" (each factual error quoted with the correction, or "None"), "Missing" (key points a strong answer adds), and "Improved answer" (under 130 words, in the candidate's voice).`);
      o.innerHTML = `<div class="ai-box">${mdLite(ans)}</div>`; } catch (e) { o.innerHTML = `<div class="ai-box">${esc(e.message === 'NO_KEY' ? 'Add a key in Settings.' : e.message)}</div>`; } };
};

/* ---------- PYTHON LABS ---------- */
V.labs = view => {
  crumb(['Practise', '#/practice'], 'Python labs');
  const groups = [[1, 'Python foundations'], [3, 'Maths in code'], [4, 'Machine learning'], [6, 'Tokens'], [7, 'Transformers'], [8, 'Building with LLMs'], [10, 'Production & safety']];
  view.innerHTML = head('Practise', 'Python labs', 'Each lab gives you a starting point and automatic tests. Write your code, press Run tests, and fix whatever fails. Python runs inside your browser — the first run downloads it once (about 10 MB).') +
    groups.map(([lv, name]) => { const ls = PY_LABS.filter(x => x.lv === lv); if (!ls.length) return '';
      return `<div class="sec-h"><h2>${esc(name)}</h2><span class="muted">Level ${lv}</span></div><div class="list">${ls.map(x => `<a class="labrow" href="#/lab/${x.id}"><span class="n">${S.labs[x.id]?.passed ? ic('check') : x.id.slice(1)}</span><span><b>${esc(x.t)}</b><br><span class="small muted">${esc(x.task.slice(0, 110))}${x.task.length > 110 ? '…' : ''}</span></span>${S.labs[x.id]?.passed ? '<span class="tag ok">passed</span>' : S.labs[x.id]?.code ? '<span class="tag">started</span>' : ''}</a>`).join('')}</div>`; }).join('');
};
function testHarness(code, tests) {
  return `${code}\n\ndef raises(fn, E):\n    try:\n        fn()\n    except E:\n        return True\n    except Exception:\n        return False\n    return False\n\nimport json as __j\n__res = []\nfor __label, __expr in ${JSON.stringify(tests)}:\n    try:\n        __ok, __err = bool(eval(__expr)), ""\n    except Exception as __e:\n        __ok, __err = False, f"{type(__e).__name__}: {__e}"\n    __res.append([__ok, __label, __err])\nprint("@@RESULTS@@" + __j.dumps(__res))\n`;
}
V.lab = (view, id) => {
  const x = PY_LABS.find(p => p.id === id); if (!x) return V.notfound(view);
  crumb(['Python labs', '#/labs'], x.t);
  const st = S.labs[id] || (S.labs[id] = {}); let hintN = 0;
  const idx = PY_LABS.indexOf(x), nx = PY_LABS[idx + 1];
  view.innerHTML = head(`Lab ${id.slice(1)} · Level ${x.lv}`, x.t) + `<div class="lab"><div>
    <div class="panel" style="margin-bottom:12px"><p style="margin:0">${inl(x.task)}</p></div>
    <textarea class="ed" id="ed" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Your code"></textarea>
    <div class="row" style="margin-top:10px"><button class="btn pri" id="run">${ic('play')}Run tests</button><button class="btn" id="hint">${ic('bulb')}Hint</button><button class="btn" id="aib">${ic('message')}Explain my error</button><span class="spacer"></span><button class="btn ghost" id="reset">${ic('rotate')}Reset</button><button class="btn ghost" id="sol">Show solution</button></div>
    <div id="hints" style="margin-top:10px"></div></div>
    <div><div class="small muted" style="margin-bottom:6px">Tests</div><ul class="tests" id="tests">${x.tests.map(t => `<li>${ic('target')}<span>${esc(t[0])}</span></li>`).join('')}</ul>
    <div class="small muted" style="margin:14px 0 6px">Output</div><pre class="term" id="term"><span class="sys">Press Run tests. Your print() output and any errors appear here.</span></pre>
    <div id="labai" style="margin-top:10px"></div><div id="solbox" style="margin-top:10px"></div>
    ${nx ? `<a class="btn" style="margin-top:12px" href="#/lab/${nx.id}">Next lab: ${esc(nx.t)}${ic('chev')}</a>` : ''}</div></div>`;
  const ed = $('#ed'); ed.value = st.code || x.starter;
  ed.oninput = () => { st.code = ed.value; save(); };
  ed.onkeydown = e => { if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); ed.setRangeText('    ', ed.selectionStart, ed.selectionEnd, 'end'); ed.oninput(); }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $('#run').click(); } };
  let lastErr = '';
  $('#run').onclick = async () => {
    const term = $('#term'); $('#run').disabled = true; term.innerHTML = '<span class="sys">Starting…</span>';
    const r = await runPy(testHarness(ed.value, x.tests), s => { term.innerHTML = `<span class="sys">${esc(s)}</span>`; });
    $('#run').disabled = false;
    const m = /@@RESULTS@@(.*)/.exec(r.out || ''); const printed = (r.out || '').replace(/@@RESULTS@@.*\n?/, '');
    lastErr = r.error || '';
    if (!m) { term.innerHTML = `${esc(printed)}<span class="err">${esc(r.error || 'The tests did not run.')}</span>`; $('#tests').innerHTML = x.tests.map(t => `<li class="fail">${ic('x')}<span>${esc(t[0])}<small>did not run — fix the error first</small></span></li>`).join(''); active(); return; }
    const res = JSON.parse(m[1]); const passed = res.filter(t => t[0]).length;
    $('#tests').innerHTML = res.map(([ok, label, err]) => `<li class="${ok ? 'pass' : 'fail'}">${ic(ok ? 'check' : 'x')}<span>${esc(label)}${err ? `<small>${esc(err)}</small>` : ''}</span></li>`).join('');
    lastErr = res.filter(t => !t[0]).map(t => `Failed: ${t[1]} ${t[2]}`).join('\n');
    term.innerHTML = `${printed ? esc(printed) + '\n' : ''}<span class="${passed === res.length ? 'pass' : 'fail'}">${passed}/${res.length} tests passed${passed === res.length ? ' — well done!' : ''}</span>`;
    if (passed === res.length && !st.passed) { st.passed = true; toast('Lab passed'); }
    save(); active();
  };
  $('#hint').onclick = () => { if (hintN < x.hints.length) { $('#hints').insertAdjacentHTML('beforeend', `<div class="callout" style="margin-bottom:6px"><b>Hint ${hintN + 1}.</b> ${inl(x.hints[hintN])}</div>`); hintN++; } if (hintN >= x.hints.length) $('#hint').disabled = true; };
  $('#reset').onclick = () => { if (confirm('Reset this lab to the starting code?')) { ed.value = x.starter; st.code = ''; save(); } };
  $('#sol').onclick = () => { $('#solbox').innerHTML = `<div class="code"><div class="ch"><span>Solution</span><span class="sp"></span><button id="usesol">${ic('pen')}Use it</button></div><pre>${hl(x.sol, 'py')}</pre></div><p class="hint">Read it, close it, then write it again yourself from memory — that’s how it sticks.</p>`;
    $('#usesol').onclick = () => { ed.value = x.sol; ed.oninput(); }; };
  $('#aib').onclick = async () => { const o = $('#labai'); if (!S.ai.key) { o.innerHTML = noKey(); return; } o.innerHTML = '<div class="ai-box muted">Looking at your code…</div>';
    try { const ans = await ai(TUTOR + ' You are reviewing a beginner\'s code for a coding exercise. Point out the specific bug(s) and explain the fix step by step. Do not just paste a full solution unless the code is nearly correct.',
      `Exercise: ${x.task}\n\nTheir code:\n${ed.value}\n\nTest results / errors:\n${lastErr || '(not run yet)'}`); o.innerHTML = `<div class="ai-box">${mdLite(ans)}</div>`; }
    catch (e) { o.innerHTML = `<div class="ai-box">${esc(e.message)}</div>`; } };
};

/* ---------- SQL LABS ---------- */
const schemaHtml = () => `<div class="panel schema"><div class="small muted" style="margin-bottom:6px">Practice database</div>${SQL_TABLES.map(([t, c]) => `<div><b>${t}</b> — <span class="muted">${esc(c)}</span></div>`).join('')}</div>`;
V.sql = view => {
  crumb(['Practise', '#/practice'], 'SQL labs');
  const groups = ['Basics', 'Aggregation', 'Joins', 'Advanced'];
  view.innerHTML = head('Practise', 'SQL labs', 'Real questions on a small company database (employees, departments, customers, orders). Your result is compared with the correct one. SQL runs offline inside the app.') + schemaHtml() +
    groups.map(g => `<div class="sec-h"><h2>${g}</h2></div><div class="list">${SQL_LABS.filter(s => s.lv === g).map(s => `<a class="labrow" href="#/sqllab/${s.id}"><span class="n">${S.sql[s.id]?.passed ? ic('check') : s.id.slice(1)}</span><span><b>${esc(s.t)}</b><br><span class="small muted">${esc(s.task)}</span></span>${S.sql[s.id]?.passed ? '<span class="tag ok">passed</span>' : ''}</a>`).join('')}</div>`).join('');
};
const normV = v => v === null ? 'NULL' : typeof v === 'number' ? String(Math.round(v * 100) / 100) : String(v);
function sameResult(a, b, ordered) {
  if (!a || !b) return { ok: false, why: 'Your query returned no rows.' };
  if (a.columns.length !== b.columns.length) return { ok: false, why: `Expected ${b.columns.length} column${b.columns.length === 1 ? '' : 's'}, got ${a.columns.length}.` };
  if (a.values.length !== b.values.length) return { ok: false, why: `Expected ${b.values.length} row${b.values.length === 1 ? '' : 's'}, got ${a.values.length}.` };
  const ka = a.values.map(r => r.map(normV).join('\u241f')), kb = b.values.map(r => r.map(normV).join('\u241f'));
  if (ordered) { const ok = ka.every((r, i) => r === kb[i]); if (ok) return { ok }; return ka.slice().sort().join('|') === kb.slice().sort().join('|') ? { ok: false, why: 'Right rows, wrong order — check ORDER BY.' } : { ok: false, why: 'Some values differ from the expected result.' }; }
  return ka.slice().sort().join('|') === kb.slice().sort().join('|') ? { ok: true } : { ok: false, why: 'Some values differ from the expected result.' };
}
V.sqllab = (view, id) => {
  const s = SQL_LABS.find(x => x.id === id); if (!s) return V.notfound(view);
  crumb(['SQL labs', '#/sql'], s.t);
  const st = S.sql[id] || (S.sql[id] = {}); const nx = SQL_LABS[SQL_LABS.indexOf(s) + 1];
  view.innerHTML = head(`SQL lab ${id.slice(1)} · ${s.lv}`, s.t) + `<div class="lab"><div>
    <div class="panel" style="margin-bottom:12px"><p style="margin:0">${esc(s.task)}</p></div>
    <textarea class="ed" id="ed" spellcheck="false" autocapitalize="off" style="min-height:200px" aria-label="Your SQL"></textarea>
    <div class="row" style="margin-top:10px"><button class="btn pri" id="run">${ic('play')}Run and check</button><button class="btn" id="hint">${ic('bulb')}Hint</button><span class="spacer"></span><button class="btn ghost" id="sol">Show solution</button></div>
    <div id="hintbox" style="margin-top:10px"></div><div style="margin-top:12px">${schemaHtml()}</div></div>
    <div><div id="verdict"></div><div class="small muted" style="margin:8px 0 6px">Your result</div><div class="out" id="res" style="margin-top:0"><pre class="muted">Run your query to see the result.</pre></div>
    <details class="qa" style="margin-top:12px"><summary>See the expected result${ic('chev')}</summary><div class="ans" id="exp">Loading…</div></details>
    <div id="solbox"></div>${nx ? `<a class="btn" style="margin-top:12px" href="#/sqllab/${nx.id}">Next: ${esc(nx.t)}${ic('chev')}</a>` : ''}</div></div>`;
  const ed = $('#ed'); ed.value = st.q || '-- write your query here\nSELECT ';
  ed.oninput = () => { st.q = ed.value; save(); };
  ed.onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $('#run').click(); } };
  runSQL(s.sol).then(r => { $('#exp').innerHTML = r.error ? esc(r.error) : sqlTables(r.sets); });
  $('#run').onclick = async () => {
    const [mine, want] = await Promise.all([runSQL(ed.value), runSQL(s.sol)]);
    if (mine.error) { $('#res').innerHTML = `<pre class="err">${esc(mine.error)}</pre>`; $('#verdict').innerHTML = `<div class="callout mist">${ic('x')} SQL error — read the message: it usually names the problem (a typo in a column, a missing comma or quote).</div>`; active(); return; }
    $('#res').innerHTML = sqlTables(mine.sets);
    const v = sameResult(mine.sets[mine.sets.length - 1], want.sets[0], s.ordered);
    $('#verdict').innerHTML = v.ok ? `<div class="callout ex">${ic('check')} <b>Correct.</b> Your result matches.</div>` : `<div class="callout mist">${ic('x')} <b>Not yet.</b> ${esc(v.why)}</div>`;
    if (v.ok && !st.passed) { st.passed = true; toast('SQL lab passed'); }
    save(); active();
  };
  $('#hint').onclick = () => { $('#hintbox').innerHTML = `<div class="callout"><b>Hint.</b> ${esc(s.hint)}</div>`; };
  $('#sol').onclick = () => { $('#solbox').innerHTML = `<div class="code" style="margin-top:12px"><div class="ch"><span>Solution</span></div><pre>${hl(s.sol, 'sql')}</pre></div>`; };
};

/* ---------- PLAYGROUND ---------- */
V.play = (view, mode) => {
  const sql = mode === 'sql';
  crumb(['Practise', '#/practice'], sql ? 'SQL playground' : 'Python playground');
  const starter = sql ? "-- Try any query on the practice database\nSELECT d.name, COUNT(e.id) AS people\nFROM departments d LEFT JOIN employees e ON e.dept_id = d.id\nGROUP BY d.name\nORDER BY people DESC;"
    : "# Write any Python here and press Run (Ctrl/Cmd + Enter).\n# numpy, pandas, scikit-learn and pydantic load automatically when you import them.\nname = \"Harsha\"\nprint(f\"Hello, {name}! Let's learn GenAI.\")\n";
  view.innerHTML = head('Practise', 'Playground', 'A scratchpad that runs on any device. Your code is saved automatically.') +
    `<div class="row" style="margin-bottom:12px"><a class="btn ${sql ? '' : 'pri'}" href="#/play">${ic('code')}Python</a><a class="btn ${sql ? 'pri' : ''}" href="#/play/sql">${ic('db')}SQL</a></div>
    <div class="lab"><div><textarea class="ed" id="ed" spellcheck="false" autocapitalize="off" aria-label="Code"></textarea>
    <div class="row" style="margin-top:10px"><button class="btn pri" id="run">${ic('play')}Run</button><button class="btn ghost" id="reset">${ic('rotate')}Reset</button><button class="btn ghost" id="cp">${ic('copy')}Copy</button></div>
    ${sql ? `<div style="margin-top:12px">${schemaHtml()}</div>` : '<p class="hint">input() isn’t available here. Packages that need internet access or a GPU (openai, torch) need VS Code or Colab.</p>'}</div>
    <div><div class="small muted" style="margin-bottom:6px">Output</div>${sql ? '<div class="out" id="out" style="margin-top:0"><pre class="muted">Results appear here.</pre></div>' : '<pre class="term" id="out"><span class="sys">Output appears here.</span></pre>'}</div></div>`;
  const k = sql ? 'sql' : 'py', ed = $('#ed'); ed.value = S.play[k] || starter;
  ed.oninput = () => { S.play[k] = ed.value; save(); };
  ed.onkeydown = e => { if (e.key === 'Tab' && !e.shiftKey && !sql) { e.preventDefault(); ed.setRangeText('    ', ed.selectionStart, ed.selectionEnd, 'end'); ed.oninput(); } if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $('#run').click(); } };
  $('#reset').onclick = () => { if (confirm('Clear the playground?')) { ed.value = starter; S.play[k] = ''; save(); } };
  $('#cp').onclick = () => copy(ed.value);
  $('#run').onclick = async () => {
    const o = $('#out'); $('#run').disabled = true;
    if (sql) { const r = await runSQL(ed.value); o.innerHTML = r.error ? `<pre class="err">${esc(r.error)}</pre>` : sqlTables(r.sets); }
    else { o.innerHTML = '<span class="sys">Starting…</span>'; const r = await runPy(ed.value, s => { o.innerHTML = `<span class="sys">${esc(s)}</span>`; }); o.innerHTML = `${esc(r.out)}${r.error ? `<span class="err">${esc(r.error)}</span>` : ''}${!r.out && !r.error ? '<span class="sys">(no output — use print() to show values)</span>' : ''}`; }
    $('#run').disabled = false; active();
  };
};

/* ---------- CHEAT SHEET ---------- */
V.sheet = (view, _, qs) => {
  crumb('Cheat sheet');
  view.innerHTML = head('', 'Cheat sheet', `Everything in one place: the big idea and key lines of all ${COURSE.length} lessons, then a glossary of ${DECK.filter(c => c.kind === 'Concept').length} terms. Filter it, or print it (A4) for revision on paper.`) +
    `<div class="row no-print" style="margin-bottom:18px"><input id="sf" placeholder="Filter, e.g. RAG, JOIN, LoRA…" style="flex:1;min-width:200px" value="${esc(qs.get('q') || '')}"><button class="btn pri" id="pr">${ic('print')}Print / save PDF</button></div><div id="sheetBody"></div>`;
  const draw = () => {
    const f = $('#sf').value.trim().toLowerCase(), m = s => !f || s.toLowerCase().includes(f);
    const lv = LEVELS.map(L => { const items = LESSONS_BY_LV[L.n].filter(l => m(l.t + ' ' + l.big + ' ' + l.cheat.join(' ')));
      return items.length ? `<section class="sheet-lvl"><h2>Level ${L.n} · ${esc(L.t)}</h2>${items.map(l => `<div class="sheet-item"><div><h3><a href="#/lesson/${l.id}">${esc(l.t)}</a></h3><div class="bigl">${inl(l.big)}</div></div><ul>${l.cheat.map(c => `<li>${inl(c)}</li>`).join('')}</ul></div>`).join('')}</section>` : ''; }).join('');
    const gl = DECK.filter(c => c.kind === 'Concept' && m(c.f + ' ' + c.b)).sort((a, b) => a.f.localeCompare(b.f));
    $('#sheetBody').innerHTML = (lv || '<div class="empty">No matches.</div>') + (gl.length ? `<section class="sheet-lvl"><h2>Glossary</h2><div class="gloss">${gl.map(c => `<div><b>${inl(c.f)}</b> — ${inl(c.b)}</div>`).join('')}</div></section>` : '');
  };
  $('#sf').oninput = draw; $('#pr').onclick = () => window.print(); draw();
};

/* ---------- SETTINGS ---------- */
V.settings = view => {
  crumb('Settings');
  const P = PROVIDERS[S.ai.provider] || PROVIDERS.gemini;
  view.innerHTML = head('', 'Settings') + `
    <div class="panel"><h3 style="font-size:16px">You</h3>
      <label class="f" for="sn">First name</label><input id="sn" maxlength="40" value="${esc(S.name)}">
      <label class="f" for="sd">Daily time</label><select id="sd">${[20, 30, 45, 60, 90, 120].map(m => `<option value="${m}" ${S.daily === m ? 'selected' : ''}>${m} minutes</option>`).join('')}</select>
      <label class="f" for="st">Theme</label><select id="st"><option value="system">Match my device</option><option value="dark">Dark</option><option value="light">Light (paper)</option></select></div>
    <div class="panel" style="margin-top:12px"><h3 style="font-size:16px">AI tutor (optional)</h3>
      <p class="small muted" style="margin-top:6px">Everything works without this. With your own key you can ask questions in any lesson, get your written answers reviewed, and get help with lab errors. Google Gemini and Groq both have free tiers.</p>
      <label class="f" for="ap">Provider</label><select id="ap">${Object.entries(PROVIDERS).map(([k, p]) => `<option value="${k}" ${S.ai.provider === k ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select>
      <label class="f" for="ak">API key</label><input id="ak" type="password" autocomplete="off" placeholder="${S.ai.key ? 'Saved — paste a new key to replace it' : 'Paste your key'}">
      <div class="hint" id="keylink">${P.keyUrl ? `Get a key: <a href="${P.keyUrl}" target="_blank" rel="noopener">${esc(P.keyUrl.replace('https://', ''))}</a>` : ''}</div>
      <label class="f" for="am">Model</label><input id="am" value="${esc(S.ai.model)}" placeholder="${esc(P.model || 'model name')}">
      <div id="baseWrap" ${S.ai.provider === 'openai' || S.ai.provider === 'groq' ? '' : 'hidden'}><label class="f" for="ab">Base URL</label><input id="ab" value="${esc(S.ai.base)}" placeholder="${esc(P.base || '')}"></div>
      <div class="row" style="margin-top:14px"><button class="btn pri" id="asave">Save</button><button class="btn" id="atest">Test connection</button><button class="btn ghost" id="aclear">Remove key</button><span class="small" id="astat"></span></div>
      <div class="callout" style="margin-top:12px;font-size:13.5px"><b>Your API key is sensitive.</b> It is stored only in this browser and sent only to the provider you chose. Don’t use it on a shared computer, never put it in your GitHub repository, and set a spending limit with the provider. If a key leaks, revoke it in the provider’s console.</div></div>
    <div class="panel" style="margin-top:12px"><h3 style="font-size:16px">Your progress</h3>
      <p class="small muted" style="margin-top:6px">Progress lives in this browser. To continue on another device, export here and import there.</p>
      <div class="row" style="margin-top:10px"><button class="btn" id="exp">${ic('download')}Export progress</button><label class="btn" for="imp">${ic('upload')}Import progress</label><input type="file" id="imp" accept="application/json,.json" hidden>
      <button class="btn ghost" id="redo">Redo setup</button><button class="btn ghost" id="wipe" style="color:var(--err)">${ic('trash')}Reset everything</button></div></div>
    <div class="panel install" id="installBox" style="margin-top:12px"><h3 style="font-size:16px">Install</h3><p class="small muted" style="margin-top:6px">Install for offline learning from your home screen or desktop.</p><button class="btn pri" id="installBtn" style="margin-top:10px">${ic('download')}Install app</button></div>
    <div class="panel" style="margin-top:12px"><h3 style="font-size:16px">About</h3><p class="small muted" style="margin-top:6px">GenAI Mastery by Harsha Varthan E P. ${COURSE.length} lessons, ${QUESTIONS.length} quiz questions, ${DECK.length} flashcards, ${PY_LABS.length + SQL_LABS.length} labs, ${WRITTEN.length} answer-writing questions. Python runs with Pyodide; SQL with sql.js. Content reviewed November 2026 — AI moves fast, so check provider documentation for the latest model names and prices.</p>
      <p class="small muted">On iPhone or iPad, install from Safari: Share → Add to Home Screen.</p></div>`;
  $('#st').value = S.theme;
  $('#sn').onchange = e => { S.name = e.target.value.trim().slice(0, 40); save(); toast('Saved'); };
  $('#sd').onchange = e => { S.daily = +e.target.value; save(); toast('Saved'); };
  $('#st').onchange = e => { S.theme = e.target.value; save(); applyTheme(); };
  $('#ap').onchange = e => { const p = PROVIDERS[e.target.value]; $('#am').placeholder = p.model || 'model name'; $('#baseWrap').hidden = !['openai', 'groq'].includes(e.target.value); $('#ab').placeholder = p.base || '';
    $('#keylink').innerHTML = p.keyUrl ? `Get a key: <a href="${p.keyUrl}" target="_blank" rel="noopener">${esc(p.keyUrl.replace('https://', ''))}</a>` : ''; };
  const saveAI = () => { const k = $('#ak').value.trim(); if (k) S.ai.key = k; S.ai.provider = $('#ap').value; S.ai.model = $('#am').value.trim(); S.ai.base = $('#ab').value.trim(); save(); $('#ak').value = ''; $('#ak').placeholder = S.ai.key ? 'Saved — paste a new key to replace it' : 'Paste your key'; };
  $('#asave').onclick = () => { saveAI(); $('#astat').textContent = S.ai.key ? 'Saved.' : 'No key saved.'; };
  $('#atest').onclick = async () => { saveAI(); if (!S.ai.key) { $('#astat').textContent = 'Add a key first.'; return; } $('#astat').textContent = 'Testing…';
    try { const a = await ai('Reply with one short sentence.', 'Say hello to a GenAI learner.'); $('#astat').innerHTML = `<span style="color:var(--ok)">Working:</span> ${esc(a.slice(0, 120))}`; } catch (e) { $('#astat').innerHTML = `<span style="color:var(--err)">${esc(e.message)}</span>`; } };
  $('#aclear').onclick = () => { S.ai.key = ''; save(); $('#astat').textContent = 'Key removed.'; $('#ak').placeholder = 'Paste your key'; };
  $('#exp').onclick = () => { const data = { ...S, ai: { ...S.ai, key: '' } }; const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' })); a.download = `genai-mastery-progress-${todayKey()}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); toast('Progress exported (your API key is not included)'); };
  $('#imp').onchange = async e => { const f = e.target.files[0]; if (!f) return;
    try { const d = JSON.parse(await f.text()); if (typeof d !== 'object' || !d.done || !d.srs) throw new Error('not a progress file');
      const key = S.ai.key; S = Object.assign(structuredClone(DEFAULTS), d); S.ai.key = S.ai.key || key; save(); applyTheme(); toast('Progress imported'); render(); }
    catch (err) { toast('That file isn’t a GenAI Mastery progress export.'); } e.target.value = ''; };
  $('#redo').onclick = () => { S.onboarded = false; OB = { step: 0, start: null, daily: null, name: S.name }; save(); location.hash = '#/'; };
  $('#wipe').onclick = () => { if (confirm('Delete all progress, answers and settings in this browser? This cannot be undone.')) { localStorage.removeItem(KEY); S = structuredClone(DEFAULTS); save(); applyTheme(); location.hash = '#/'; render(); } };
  showInstall();
};

V.notfound = view => { crumb('Not found'); view.innerHTML = `<div class="empty">That page doesn’t exist. <a href="#/">Go home</a> or <a href="#/learn">open the course</a>.</div>`; };

/* ---------- SEARCH ---------- */
const INDEX = [
  ...COURSE.map(l => ({ kind: `Lesson · Level ${l.lv}`, title: l.t, sub: l.big, href: `#/lesson/${l.id}`, text: [l.t, l.big, l.why, ...l.body, ...l.faq.flat(), ...l.cheat, ...l.cards.flat()].join(' ').toLowerCase() })),
  ...PY_LABS.map(x => ({ kind: 'Python lab', title: x.t, sub: x.task, href: `#/lab/${x.id}`, text: (x.t + ' ' + x.task).toLowerCase() })),
  ...SQL_LABS.map(x => ({ kind: 'SQL lab', title: x.t, sub: x.task, href: `#/sqllab/${x.id}`, text: (x.t + ' ' + x.task + ' ' + x.sol).toLowerCase() })),
  ...WRITTEN.map(w => ({ kind: 'Answer writing', title: w.q, sub: '', href: `#/answer/${w.id}`, text: (w.q + ' ' + w.model).toLowerCase() }))
];
let sel = 0;
function openSearch() { $('#search').hidden = false; $('#q').value = ''; doSearch(); setTimeout(() => $('#q').focus(), 10); }
function closeSearch() { $('#search').hidden = true; }
function doSearch() {
  const q = $('#q').value.trim().toLowerCase(); const words = q.split(/\s+/).filter(Boolean);
  let hits = !words.length ? INDEX.filter(x => x.kind.startsWith('Lesson')).slice(0, 0) : INDEX.map(x => {
    let s = 0; for (const w of words) { if (!x.text.includes(w)) return null; if (x.title.toLowerCase().includes(w)) s += 5; s += 1; } return { ...x, s }; }).filter(Boolean).sort((a, b) => b.s - a.s).slice(0, 12);
  sel = 0;
  $('#results').innerHTML = !words.length ? '<p class="small muted" style="padding:10px">Try “attention”, “LEFT JOIN”, “LoRA”, “hallucination”, “precision”…</p>' : hits.length ? hits.map((h, i) => `<a class="hit ${i ? '' : 'sel'}" href="${h.href}"><small>${esc(h.kind)}</small><b>${esc(h.title)}</b>${h.sub ? `<p>${inl(h.sub.slice(0, 140))}</p>` : ''}</a>`).join('') : '<p class="small muted" style="padding:10px">No results. Try a shorter word.</p>';
}
$('#searchBtn').onclick = openSearch; $('#searchClose').onclick = closeSearch; $('#q').oninput = doSearch;
$('#search').onclick = e => { if (e.target.id === 'search' || e.target.closest('.hit')) closeSearch(); };
addEventListener('keydown', e => {
  if (!$('#search').hidden) { const hs = $$('.hit');
    if (e.key === 'Escape') closeSearch(); else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!hs.length) return; hs[sel]?.classList.remove('sel'); sel = (sel + (e.key === 'ArrowDown' ? 1 : hs.length - 1)) % hs.length; hs[sel].classList.add('sel'); hs[sel].scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter' && hs[sel]) { location.hash = hs[sel].getAttribute('href'); closeSearch(); } return; }
  if ((e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) && !e.target.matches('input,textarea,select')) { e.preventDefault(); openSearch(); }
});

/* ---------- PWA: install + service worker ---------- */
let deferredPrompt = null;
addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; showInstall(); });
addEventListener('appinstalled', () => { deferredPrompt = null; showInstall(); toast('Installed'); });
function showInstall() { const box = $('#installBox'); if (!box) return; box.style.display = deferredPrompt ? 'block' : 'none';
  const b = $('#installBtn'); if (b) b.onclick = async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; showInstall(); }; }
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').then(reg => {
    reg.addEventListener('updatefound', () => { const w = reg.installing; w?.addEventListener('statechange', () => {
      if (w.state === 'installed' && navigator.serviceWorker.controller) toast('A new version is ready.', { label: 'Update', fn: () => { w.postMessage('skip'); } }); }); });
  }).catch(() => {});
  let reloaded = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (!reloaded) { reloaded = true; location.reload(); } });
}
addEventListener('offline', () => toast('You’re offline. Lessons, quizzes, flashcards and SQL still work.'));

/* ---------- start ---------- */
applyTheme();
render();
