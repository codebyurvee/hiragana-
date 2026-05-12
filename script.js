/* ============================================
   にほんご — NIHONGO LEARNING APP
   script.js — All Logic
   Sections: Data, Navigation, Hiragana,
   Practice, Words, Sentences, Grammar,
   Tests, Progress, AI Placeholders
   ============================================ */

'use strict';

/* ============================================
   ██████╗  █████╗ ████████╗ █████╗
   ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
   ██║  ██║███████║   ██║   ███████║
   ██║  ██║██╔══██║   ██║   ██╔══██║
   ██████╔╝██║  ██║   ██║   ██║  ██║
   ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
   ============================================ */

// ---- HIRAGANA DATA ----
// [character, romaji, row-key]
const HIRAGANA = [
  // Vowels
  ['あ','a','vowels'], ['い','i','vowels'], ['う','u','vowels'], ['え','e','vowels'], ['お','o','vowels'],
  // K-row
  ['か','ka','k'], ['き','ki','k'], ['く','ku','k'], ['け','ke','k'], ['こ','ko','k'],
  // S-row
  ['さ','sa','s'], ['し','shi','s'], ['す','su','s'], ['せ','se','s'], ['そ','so','s'],
  // T-row
  ['た','ta','t'], ['ち','chi','t'], ['つ','tsu','t'], ['て','te','t'], ['と','to','t'],
  // N-row
  ['な','na','n'], ['に','ni','n'], ['ぬ','nu','n'], ['ね','ne','n'], ['の','no','n'],
  // H-row
  ['は','ha','h'], ['ひ','hi','h'], ['ふ','fu','h'], ['へ','he','h'], ['ほ','ho','h'],
  // M-row
  ['ま','ma','m'], ['み','mi','m'], ['む','mu','m'], ['め','me','m'], ['も','mo','m'],
  // Y-row (gaps are null)
  ['や','ya','y'], [null,null,'y'], ['ゆ','yu','y'], [null,null,'y'], ['よ','yo','y'],
  // R-row
  ['ら','ra','r'], ['り','ri','r'], ['る','ru','r'], ['れ','re','r'], ['ろ','ro','r'],
  // W-row / N
  ['わ','wa','w'], [null,null,'w'], ['を','wo','w'], [null,null,'w'], ['ん','n','w'],
];

const HIRAGANA_ROWS = {
  vowels: 'Vowels', k: 'K-row', s: 'S-row', t: 'T-row',
  n: 'N-row', h: 'H-row', m: 'M-row', y: 'Y-row', r: 'R-row', w: 'W / ん'
};

// Valid (non-null) hiragana only
const HIRA_VALID = HIRAGANA.filter(h => h[0] !== null);

// ---- WORDS DATA ----
// Extend this array to add more words!
const WORDS = [
  { jp: 'ねこ', hira: 'ねこ', romaji: 'neko', meaning: 'Cat', cat: 'Animals', diff: 'beginner' },
  { jp: 'いぬ', hira: 'いぬ', romaji: 'inu', meaning: 'Dog', cat: 'Animals', diff: 'beginner' },
  { jp: 'とり', hira: 'とり', romaji: 'tori', meaning: 'Bird', cat: 'Animals', diff: 'beginner' },
  { jp: 'さかな', hira: 'さかな', romaji: 'sakana', meaning: 'Fish', cat: 'Animals', diff: 'beginner' },
  { jp: 'うさぎ', hira: 'うさぎ', romaji: 'usagi', meaning: 'Rabbit', cat: 'Animals', diff: 'beginner' },
  { jp: 'くま', hira: 'くま', romaji: 'kuma', meaning: 'Bear', cat: 'Animals', diff: 'beginner' },
  { jp: 'すし', hira: 'すし', romaji: 'sushi', meaning: 'Sushi', cat: 'Food', diff: 'beginner' },
  { jp: 'みず', hira: 'みず', romaji: 'mizu', meaning: 'Water', cat: 'Food', diff: 'beginner' },
  { jp: 'おちゃ', hira: 'おちゃ', romaji: 'ocha', meaning: 'Tea', cat: 'Food', diff: 'beginner' },
  { jp: 'ごはん', hira: 'ごはん', romaji: 'gohan', meaning: 'Rice / Meal', cat: 'Food', diff: 'beginner' },
  { jp: 'たまご', hira: 'たまご', romaji: 'tamago', meaning: 'Egg', cat: 'Food', diff: 'beginner' },
  { jp: 'くだもの', hira: 'くだもの', romaji: 'kudamono', meaning: 'Fruit', cat: 'Food', diff: 'intermediate' },
  { jp: 'やさい', hira: 'やさい', romaji: 'yasai', meaning: 'Vegetables', cat: 'Food', diff: 'intermediate' },
  { jp: 'そら', hira: 'そら', romaji: 'sora', meaning: 'Sky', cat: 'Nature', diff: 'beginner' },
  { jp: 'うみ', hira: 'うみ', romaji: 'umi', meaning: 'Sea / Ocean', cat: 'Nature', diff: 'beginner' },
  { jp: 'やま', hira: 'やま', romaji: 'yama', meaning: 'Mountain', cat: 'Nature', diff: 'beginner' },
  { jp: 'かわ', hira: 'かわ', romaji: 'kawa', meaning: 'River', cat: 'Nature', diff: 'beginner' },
  { jp: 'はな', hira: 'はな', romaji: 'hana', meaning: 'Flower', cat: 'Nature', diff: 'beginner' },
  { jp: 'きせつ', hira: 'きせつ', romaji: 'kisetsu', meaning: 'Season', cat: 'Nature', diff: 'intermediate' },
  { jp: 'いえ', hira: 'いえ', romaji: 'ie', meaning: 'House / Home', cat: 'Places', diff: 'beginner' },
  { jp: 'まち', hira: 'まち', romaji: 'machi', meaning: 'Town', cat: 'Places', diff: 'beginner' },
  { jp: 'みせ', hira: 'みせ', romaji: 'mise', meaning: 'Shop / Store', cat: 'Places', diff: 'beginner' },
  { jp: 'えき', hira: 'えき', romaji: 'eki', meaning: 'Train Station', cat: 'Places', diff: 'beginner' },
  { jp: 'がっこう', hira: 'がっこう', romaji: 'gakkou', meaning: 'School', cat: 'Places', diff: 'intermediate' },
  { jp: 'きょう', hira: 'きょう', romaji: 'kyou', meaning: 'Today', cat: 'Time', diff: 'beginner' },
  { jp: 'あした', hira: 'あした', romaji: 'ashita', meaning: 'Tomorrow', cat: 'Time', diff: 'beginner' },
  { jp: 'きのう', hira: 'きのう', romaji: 'kinou', meaning: 'Yesterday', cat: 'Time', diff: 'beginner' },
  { jp: 'いま', hira: 'いま', romaji: 'ima', meaning: 'Now', cat: 'Time', diff: 'beginner' },
  { jp: 'まいにち', hira: 'まいにち', romaji: 'mainichi', meaning: 'Every Day', cat: 'Time', diff: 'intermediate' },
  { jp: 'たべる', hira: 'たべる', romaji: 'taberu', meaning: 'To Eat', cat: 'Verbs', diff: 'beginner' },
  { jp: 'のむ', hira: 'のむ', romaji: 'nomu', meaning: 'To Drink', cat: 'Verbs', diff: 'beginner' },
  { jp: 'みる', hira: 'みる', romaji: 'miru', meaning: 'To See / Watch', cat: 'Verbs', diff: 'beginner' },
  { jp: 'いく', hira: 'いく', romaji: 'iku', meaning: 'To Go', cat: 'Verbs', diff: 'beginner' },
  { jp: 'くる', hira: 'くる', romaji: 'kuru', meaning: 'To Come', cat: 'Verbs', diff: 'beginner' },
  { jp: 'よむ', hira: 'よむ', romaji: 'yomu', meaning: 'To Read', cat: 'Verbs', diff: 'beginner' },
  { jp: 'かく', hira: 'かく', romaji: 'kaku', meaning: 'To Write', cat: 'Verbs', diff: 'beginner' },
  { jp: 'はなす', hira: 'はなす', romaji: 'hanasu', meaning: 'To Speak', cat: 'Verbs', diff: 'intermediate' },
  { jp: 'きく', hira: 'きく', romaji: 'kiku', meaning: 'To Listen', cat: 'Verbs', diff: 'beginner' },
];

// ---- SENTENCES DATA ----
// Add more sentences here to expand the section!
const SENTENCES = [
  { jp: 'おはようございます。', romaji: 'Ohayou gozaimasu.', en: 'Good morning.' },
  { jp: 'こんにちは。', romaji: 'Konnichiwa.', en: 'Hello / Good afternoon.' },
  { jp: 'こんばんは。', romaji: 'Konbanwa.', en: 'Good evening.' },
  { jp: 'ありがとうございます。', romaji: 'Arigatou gozaimasu.', en: 'Thank you very much.' },
  { jp: 'すみません。', romaji: 'Sumimasen.', en: 'Excuse me / Sorry.' },
  { jp: 'わかりません。', romaji: 'Wakarimasen.', en: 'I don\'t understand.' },
  { jp: 'にほんごをべんきょうしています。', romaji: 'Nihongo wo benkyou shite imasu.', en: 'I am studying Japanese.' },
  { jp: 'これはなんですか？', romaji: 'Kore wa nan desu ka?', en: 'What is this?' },
  { jp: 'おなかがすきました。', romaji: 'Onaka ga sukimashita.', en: 'I am hungry.' },
  { jp: 'がんばってください！', romaji: 'Ganbatte kudasai!', en: 'Please do your best / Good luck!' },
];

// ---- GRAMMAR DATA ----
// Add grammar topics here to expand the Grammar section!
const GRAMMAR = [
  {
    title: 'は (wa) — Topic Marker',
    explanation: 'は marks the topic of a sentence. It often translates as "as for..." or simply sets what the sentence is about. Note: は is read as "wa" when used as a particle.',
    examples: [
      { jp: 'わたしはがくせいです。', en: 'I am a student.' },
      { jp: 'ねこはかわいいです。', en: 'The cat is cute.' },
    ],
    note: 'は (wa) vs が (ga): は marks the topic; が marks the grammatical subject.',
    diff: 'beginner',
  },
  {
    title: 'です (desu) — Polite Copula',
    explanation: 'です is placed at the end of sentences to make them polite. It is similar to "is / am / are" in English.',
    examples: [
      { jp: 'これはほんです。', en: 'This is a book.' },
      { jp: 'あれはやまです。', en: 'That is a mountain.' },
    ],
    note: 'です is always at the end of the sentence in polite form.',
    diff: 'beginner',
  },
  {
    title: 'を (wo) — Object Marker',
    explanation: 'を marks the direct object of a verb — the thing being acted upon.',
    examples: [
      { jp: 'みずをのみます。', en: 'I drink water.' },
      { jp: 'ほんをよみます。', en: 'I read a book.' },
    ],
    note: 'を is read as "wo" or sometimes "o" in natural speech.',
    diff: 'beginner',
  },
  {
    title: 'に (ni) — Direction / Time Marker',
    explanation: 'に indicates direction (going to), location of existence, or specific time.',
    examples: [
      { jp: 'がっこうにいきます。', en: 'I go to school.' },
      { jp: 'さんじにたべます。', en: 'I eat at 3 o\'clock.' },
    ],
    note: 'に vs へ: both indicate direction, but へ emphasizes the direction of movement.',
    diff: 'intermediate',
  },
  {
    title: 'ない (nai) — Negative Form',
    explanation: 'To negate a verb in dictionary form, conjugate it to the negative short form using ない.',
    examples: [
      { jp: 'たべない。', en: 'I don\'t eat. (casual)' },
      { jp: 'わからない。', en: 'I don\'t understand. (casual)' },
    ],
    note: 'Polite negative: ません (masen). e.g. たべません = I don\'t eat (polite).',
    diff: 'intermediate',
  },
  {
    title: 'て-form — Connecting Verbs',
    explanation: 'The て-form connects actions (and then...) or is used in many grammatical patterns like て+います (ongoing action).',
    examples: [
      { jp: 'たべてのみます。', en: 'I eat and then drink.' },
      { jp: 'にほんごをべんきょうしています。', en: 'I am studying Japanese.' },
    ],
    note: 'て-form is one of the most important forms to master in Japanese.',
    diff: 'intermediate',
  },
];

// ---- GRAMMAR TEST QUESTIONS ----
const GRAMMAR_QUESTIONS = [
  { q: 'Which particle marks the topic of a sentence?', opts: ['は', 'を', 'に', 'が'], ans: 'は' },
  { q: 'What does です (desu) do?', opts: ['Marks the object', 'Makes sentences polite', 'Marks direction', 'Negates verbs'], ans: 'Makes sentences polite' },
  { q: 'Which particle marks the direct object?', opts: ['は', 'に', 'を', 'で'], ans: 'を' },
  { q: 'How do you say "I don\'t eat" (polite)?', opts: ['たべます', 'たべない', 'たべません', 'たべて'], ans: 'たべません' },
  { q: 'に (ni) is used for...', opts: ['Topic', 'Direction/Time', 'Object', 'Negation'], ans: 'Direction/Time' },
];

// ---- SENTENCE FILL-IN QUESTIONS ----
const FILL_QUESTIONS = [
  { sentence: 'わたし_がくせいです。', blank: '_', opts: ['は', 'を', 'に', 'が'], ans: 'は', hint: 'Topic marker' },
  { sentence: 'みず_のみます。', blank: '_', opts: ['は', 'に', 'を', 'で'], ans: 'を', hint: 'Object marker' },
  { sentence: 'がっこう_いきます。', blank: '_', opts: ['は', 'に', 'を', 'と'], ans: 'に', hint: 'Direction marker' },
  { sentence: 'これはほん___。', blank: '___', opts: ['です', 'ます', 'ない', 'て'], ans: 'です', hint: 'Polite copula' },
  { sentence: 'にほんごをべんきょうして___。', blank: '___', opts: ['います', 'ます', 'です', 'ない'], ans: 'います', hint: 'Ongoing action (て+います)' },
];

/* ============================================
   ██████╗ ██████╗  ██████╗  ██████╗ ██████╗
   ██╔══██╗██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗
   ██████╔╝██████╔╝██║   ██║██║  ███╗██████╔╝
   ██╔═══╝ ██╔══██╗██║   ██║██║   ██║██╔══██╗
   ██║     ██║  ██║╚██████╔╝╚██████╔╝██║  ██║
   ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
   ============================================ */

// ---- LOCAL STORAGE KEYS ----
const LS = {
  XP: 'nihongo_xp',
  STREAK: 'nihongo_streak',
  LAST_DATE: 'nihongo_last_date',
  TESTS_TAKEN: 'nihongo_tests_taken',
  SCORE_HISTORY: 'nihongo_score_history',
  MASTERED: 'nihongo_mastered',
  SEEN: 'nihongo_seen',
  FAVORITES: 'nihongo_favorites',
};

function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ---- PROGRESS STATE ----
let state = {
  xp: lsGet(LS.XP, 0),
  streak: lsGet(LS.STREAK, 0),
  testsTaken: lsGet(LS.TESTS_TAKEN, 0),
  mastered: lsGet(LS.MASTERED, []),      // array of romaji strings
  seen: lsGet(LS.SEEN, []),              // array of romaji strings
  scoreHistory: lsGet(LS.SCORE_HISTORY, []),
  favorites: lsGet(LS.FAVORITES, []),
};

function saveState() {
  lsSet(LS.XP, state.xp);
  lsSet(LS.STREAK, state.streak);
  lsSet(LS.TESTS_TAKEN, state.testsTaken);
  lsSet(LS.MASTERED, state.mastered);
  lsSet(LS.SEEN, state.seen);
  lsSet(LS.SCORE_HISTORY, state.scoreHistory);
  lsSet(LS.FAVORITES, state.favorites);
}

/* ============================================
   NAVIGATION
   ============================================ */
const sections = ['hiragana', 'practice', 'words', 'sentences', 'grammar', 'tests', 'progress', 'ai'];

function showSection(name) {
  sections.forEach(s => {
    document.getElementById('section-' + s).classList.toggle('active', s === name);
  });
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === name);
  });
  // Close sidebar on mobile
  if (window.innerWidth <= 900) {
    document.getElementById('sidebar').classList.remove('open');
  }
  // Refresh progress when shown
  if (name === 'progress') renderProgress();
}

// Sidebar nav buttons
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showSection(btn.dataset.section));
});

// Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

/* ============================================
   UTILITIES
   ============================================ */

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Speak text in Japanese
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ja-JP';
  u.rate = 0.8;
  window.speechSynthesis.speak(u);
}

// Copy text to clipboard
function copyText(text) {
  navigator.clipboard?.writeText(text).catch(() => {});
}

// Show XP toast
function showXP(amount) {
  state.xp += amount;
  saveState();
  document.getElementById('topbar-score').textContent = state.xp + ' XP';
  const toast = document.getElementById('xp-toast');
  toast.textContent = '+' + amount + ' XP';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

// Update streak
function updateStreak() {
  const today = new Date().toDateString();
  const last = lsGet(LS.LAST_DATE, '');
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (last === today) return;
  if (last === yesterday) { state.streak++; }
  else if (last !== today) { state.streak = 1; }
  lsSet(LS.LAST_DATE, today);
  saveState();
  document.getElementById('streak-count').textContent = state.streak;
}

/* ============================================
   HIRAGANA SECTION
   ============================================ */

let activeHiraFilter = 'all';

function buildHiraganaGrid(filterRow) {
  const grid = document.getElementById('hiragana-grid');
  grid.innerHTML = '';

  const toShow = filterRow === 'all'
    ? HIRAGANA
    : HIRAGANA.filter(h => h[2] === filterRow);

  toShow.forEach(([char, roma, row]) => {
    const card = document.createElement('div');
    card.className = 'hira-card' + (char === null ? ' empty' : '');

    if (char !== null) {
      card.innerHTML = `<span class="hira-char">${char}</span><span class="hira-romaji">${roma}</span>`;
      card.addEventListener('click', () => {
        // Bounce animation
        card.classList.remove('bounce');
        void card.offsetWidth; // reflow
        card.classList.add('bounce');
        setTimeout(() => card.classList.remove('bounce'), 400);

        // Mark as seen
        if (!state.seen.includes(roma)) { state.seen.push(roma); saveState(); }

        speak(char);
        showCharDetail(char, roma, row);
        showXP(2);
      });
    }
    grid.appendChild(card);
  });
}

function showCharDetail(char, roma, row) {
  document.getElementById('detail-char').textContent = char;
  document.getElementById('detail-romaji').textContent = roma;
  document.getElementById('detail-row').textContent = HIRAGANA_ROWS[row] || row;
  document.getElementById('char-detail').style.display = 'flex';
}

document.getElementById('close-char-detail').addEventListener('click', () => {
  document.getElementById('char-detail').style.display = 'none';
});

document.getElementById('char-detail').addEventListener('click', (e) => {
  if (e.target === document.getElementById('char-detail')) {
    document.getElementById('char-detail').style.display = 'none';
  }
});

document.getElementById('speak-detail-btn').addEventListener('click', () => {
  speak(document.getElementById('detail-char').textContent);
});

document.getElementById('practice-this-btn').addEventListener('click', () => {
  document.getElementById('char-detail').style.display = 'none';
  showSection('practice');
});

// Build row filter buttons
function buildHiraganaFilter() {
  const container = document.getElementById('hiragana-filter');
  container.innerHTML = '';

  // "All" button
  const allBtn = document.createElement('button');
  allBtn.className = 'row-filter-btn active';
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', () => {
    activeHiraFilter = 'all';
    document.querySelectorAll('.row-filter-btn').forEach(b => b.classList.remove('active'));
    allBtn.classList.add('active');
    buildHiraganaGrid('all');
  });
  container.appendChild(allBtn);

  Object.entries(HIRAGANA_ROWS).forEach(([key, label]) => {
    const btn = document.createElement('button');
    btn.className = 'row-filter-btn';
    btn.textContent = label;
    btn.addEventListener('click', () => {
      activeHiraFilter = key;
      document.querySelectorAll('.row-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildHiraganaGrid(key);
    });
    container.appendChild(btn);
  });
}

/* ============================================
   PRACTICE (RECOGNITION QUIZ)
   ============================================ */

let practiceState = {
  pool: [],           // shuffled hiragana objects for this session
  idx: 0,
  score: 0,
  total: 20,
  answered: false,
  mistakes: [],       // { char, wrongAnswer, correctAnswer }
  selectedRows: new Set(Object.keys(HIRAGANA_ROWS)),
};

function buildPracticeToggles() {
  const container = document.getElementById('practice-row-toggles');
  container.innerHTML = '';
  Object.entries(HIRAGANA_ROWS).forEach(([key, label]) => {
    const btn = document.createElement('button');
    btn.className = 'row-toggle-btn on';
    btn.textContent = label;
    btn.dataset.row = key;
    btn.addEventListener('click', () => {
      if (practiceState.selectedRows.has(key)) {
        practiceState.selectedRows.delete(key);
        btn.classList.remove('on');
      } else {
        practiceState.selectedRows.add(key);
        btn.classList.add('on');
      }
    });
    container.appendChild(btn);
  });
}

function startPractice() {
  const filtered = HIRA_VALID.filter(h => practiceState.selectedRows.has(h[2]));
  if (filtered.length < 4) {
    alert('Please select at least one row with enough characters (min 4).');
    return;
  }

  practiceState.pool = shuffle(filtered).slice(0, 20);
  practiceState.idx = 0;
  practiceState.score = 0;
  practiceState.mistakes = [];

  document.getElementById('quiz-box').style.display = 'block';
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('start-practice-btn').style.display = 'none';

  renderPracticeQuestion();
}

function renderPracticeQuestion() {
  if (practiceState.idx >= practiceState.pool.length) {
    endPractice();
    return;
  }

  practiceState.answered = false;
  const [char, roma] = practiceState.pool[practiceState.idx];
  const total = practiceState.pool.length;
  const qnum = practiceState.idx + 1;

  document.getElementById('quiz-char').textContent = char;
  document.getElementById('quiz-qnum').textContent = qnum + '/' + total;
  document.getElementById('quiz-progress-fill').style.width = ((qnum - 1) / total * 100) + '%';
  document.getElementById('quiz-feedback').textContent = '';
  document.getElementById('quiz-feedback').className = 'quiz-feedback';
  document.getElementById('quiz-next-btn').style.display = 'none';

  // Generate 4 options: 1 correct + 3 random wrong
  const wrongs = shuffle(HIRA_VALID.filter(h => h[1] !== roma)).slice(0, 3).map(h => h[1]);
  const options = shuffle([roma, ...wrongs]);

  const container = document.getElementById('quiz-options');
  container.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => checkPracticeAnswer(opt, roma, char, btn, container));
    container.appendChild(btn);
  });

  // Update score display
  const acc = practiceState.idx === 0
    ? '—'
    : Math.round((practiceState.score / practiceState.idx) * 100) + '%';
  document.getElementById('quiz-score').textContent = practiceState.score;
  document.getElementById('quiz-acc').textContent = acc;
}

function checkPracticeAnswer(chosen, correct, char, chosenBtn, container) {
  if (practiceState.answered) return;
  practiceState.answered = true;

  const allBtns = container.querySelectorAll('.quiz-option');
  allBtns.forEach(b => {
    b.disabled = true;
    if (b.textContent === correct) b.classList.add('correct');
  });

  const fb = document.getElementById('quiz-feedback');
  if (chosen === correct) {
    practiceState.score++;
    fb.textContent = '✓ Correct! — ' + char + ' = ' + correct;
    fb.className = 'quiz-feedback correct-fb';
    speak(char);
    showXP(5);
    if (!state.mastered.includes(correct)) { state.mastered.push(correct); saveState(); }
  } else {
    chosenBtn.classList.add('wrong');
    fb.textContent = '✗ Incorrect — ' + char + ' = ' + correct;
    fb.className = 'quiz-feedback wrong-fb';
    practiceState.mistakes.push({ char, correct, chosen });
  }

  document.getElementById('quiz-next-btn').style.display = 'inline-block';
}

function endPractice() {
  document.getElementById('quiz-box').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';

  const total = practiceState.pool.length;
  const pct = Math.round((practiceState.score / total) * 100);
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '😊' : '💪';

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-score-big').textContent = practiceState.score + ' / ' + total;
  document.getElementById('result-details').textContent = `Accuracy: ${pct}%`;

  const weakEl = document.getElementById('weak-areas');
  if (practiceState.mistakes.length > 0) {
    weakEl.textContent = 'Review: ' + practiceState.mistakes.map(m => m.char + '(' + m.correct + ')').join('  ');
  } else {
    weakEl.textContent = '🌟 Perfect score!';
  }

  // Save to history
  state.testsTaken++;
  state.scoreHistory.unshift({ test: 'Practice Quiz', score: practiceState.score + '/' + total, pct, date: new Date().toLocaleDateString() });
  if (state.scoreHistory.length > 20) state.scoreHistory.pop();
  saveState();
  showXP(10);
}

document.getElementById('start-practice-btn').addEventListener('click', startPractice);

document.getElementById('quiz-next-btn').addEventListener('click', () => {
  practiceState.idx++;
  renderPracticeQuestion();
});

document.getElementById('retry-btn').addEventListener('click', () => {
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('start-practice-btn').style.display = 'inline-block';
});

/* ============================================
   WORDS SECTION
   ============================================ */

let wordsFilter = { cat: 'All', search: '' };

function buildWordCatFilters() {
  const cats = ['All', ...new Set(WORDS.map(w => w.cat))];
  const container = document.getElementById('word-cat-filters');
  container.innerHTML = '';
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-filter-btn' + (cat === 'All' ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      wordsFilter.cat = cat;
      document.querySelectorAll('.cat-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWords();
    });
    container.appendChild(btn);
  });
}

function renderWords() {
  const grid = document.getElementById('words-grid');
  const search = wordsFilter.search.toLowerCase();

  const filtered = WORDS.filter(w => {
    const matchCat = wordsFilter.cat === 'All' || w.cat === wordsFilter.cat;
    const matchSearch = !search || w.meaning.toLowerCase().includes(search) || w.romaji.includes(search) || w.jp.includes(search);
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.length === 0
    ? '<p style="color:var(--text3);font-size:0.9rem">No words found.</p>'
    : '';

  filtered.forEach(w => {
    const card = document.createElement('div');
    card.className = 'word-card';
    const isFav = state.favorites.includes(w.romaji);
    card.innerHTML = `
      <div class="word-jp-main">${w.jp}</div>
      <div class="word-hiragana">${w.hira}</div>
      <div class="word-romaji">${w.romaji}</div>
      <div class="word-meaning">${w.meaning}</div>
      <div class="word-footer">
        <span class="difficulty-tag diff-${w.diff}">${w.diff}</span>
        <div class="word-actions">
          <button class="word-action-btn speak-word" title="Listen">🔊</button>
          <button class="word-action-btn fav-btn ${isFav ? 'fav-active' : ''}" title="Favorite" data-romaji="${w.romaji}">♥</button>
        </div>
      </div>`;

    card.querySelector('.speak-word').addEventListener('click', () => { speak(w.jp); showXP(1); });
    card.querySelector('.fav-btn').addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const idx = state.favorites.indexOf(w.romaji);
      if (idx === -1) { state.favorites.push(w.romaji); btn.classList.add('fav-active'); }
      else { state.favorites.splice(idx, 1); btn.classList.remove('fav-active'); }
      saveState();
    });
    grid.appendChild(card);
  });
}

document.getElementById('word-search').addEventListener('input', (e) => {
  wordsFilter.search = e.target.value;
  renderWords();
});

/* ============================================
   SENTENCES SECTION
   ============================================ */

function renderSentences() {
  const list = document.getElementById('sentences-list');
  list.innerHTML = '';
  SENTENCES.forEach(s => {
    const card = document.createElement('div');
    card.className = 'sentence-card';
    card.innerHTML = `
      <div class="sentence-jp">${s.jp}</div>
      <div class="sentence-romaji">${s.romaji}</div>
      <div class="sentence-en">${s.en}</div>
      <div class="sentence-actions">
        <button class="sentence-btn sp-btn">🔊 Listen</button>
        <button class="sentence-btn cp-btn">📋 Copy</button>
      </div>`;
    card.querySelector('.sp-btn').addEventListener('click', () => { speak(s.jp); showXP(1); });
    card.querySelector('.cp-btn').addEventListener('click', () => { copyText(s.jp); });
    list.appendChild(card);
  });
}

/* ============================================
   GRAMMAR SECTION
   ============================================ */

function renderGrammar() {
  const list = document.getElementById('grammar-list');
  list.innerHTML = '';
  GRAMMAR.forEach((g, i) => {
    const card = document.createElement('div');
    card.className = 'grammar-card';

    const diffClass = g.diff === 'beginner' ? 'diff-beginner' : g.diff === 'intermediate' ? 'diff-intermediate' : 'diff-advanced';
    const exHtml = g.examples.map(ex => `
      <div class="grammar-example">
        <div class="ex-jp">${ex.jp}</div>
        <div class="ex-en">${ex.en}</div>
      </div>`).join('');

    card.innerHTML = `
      <div class="grammar-card-header" data-idx="${i}">
        <span class="grammar-title">${g.title}</span>
        <span class="grammar-diff-tag ${diffClass}">${g.diff}</span>
      </div>
      <div class="grammar-card-body" id="grammar-body-${i}">
        <div class="grammar-explanation">${g.explanation}</div>
        <div class="grammar-examples">${exHtml}</div>
        ${g.note ? `<div class="grammar-note">💡 ${g.note}</div>` : ''}
      </div>`;

    card.querySelector('.grammar-card-header').addEventListener('click', () => {
      const body = document.getElementById('grammar-body-' + i);
      body.classList.toggle('open');
    });
    list.appendChild(card);
  });
}

/* ============================================
   TESTS SECTION
   ============================================ */

let testState = {
  type: null,
  questions: [],
  idx: 0,
  score: 0,
  mistakes: [],
  startTime: null,
  timerInterval: null,
  answered: false,
};

// Build test questions based on type
function buildTestQuestions(type) {
  switch (type) {
    case 'hiragana-recog': {
      const pool = shuffle(HIRA_VALID).slice(0, 10);
      return pool.map(([char, roma]) => {
        const wrongs = shuffle(HIRA_VALID.filter(h => h[1] !== roma)).slice(0, 3).map(h => h[1]);
        return { type: 'hiragana-recog', display: char, answer: roma, options: shuffle([roma, ...wrongs]) };
      });
    }
    case 'word-match': {
      const pool = shuffle(WORDS).slice(0, 10);
      return pool.map(w => {
        const wrongs = shuffle(WORDS.filter(x => x.meaning !== w.meaning)).slice(0, 3).map(x => x.meaning);
        return { type: 'word-match', display: w.jp, hint: w.hira, answer: w.meaning, options: shuffle([w.meaning, ...wrongs]) };
      });
    }
    case 'sentence-fill': {
      const pool = shuffle(FILL_QUESTIONS).slice(0, 5);
      return pool.map(q => ({ type: 'sentence-fill', display: q.sentence, answer: q.ans, options: q.opts, hint: q.hint }));
    }
    case 'grammar-mcq': {
      const pool = shuffle(GRAMMAR_QUESTIONS).slice(0, 5);
      return pool.map(q => ({ type: 'grammar-mcq', display: q.q, answer: q.ans, options: shuffle(q.opts) }));
    }
    default: return [];
  }
}

const TEST_TITLES = {
  'hiragana-recog': 'Hiragana Recognition',
  'word-match': 'Word Matching',
  'sentence-fill': 'Fill the Blanks',
  'grammar-mcq': 'Grammar MCQ',
};

function startTest(type) {
  testState.type = type;
  testState.questions = buildTestQuestions(type);
  testState.idx = 0;
  testState.score = 0;
  testState.mistakes = [];
  testState.startTime = Date.now();
  testState.answered = false;

  document.getElementById('test-picker').style.display = 'none';
  document.getElementById('test-area').style.display = 'block';
  document.getElementById('test-results').style.display = 'none';
  document.getElementById('test-title-bar').textContent = TEST_TITLES[type];
  document.getElementById('test-qtotal').textContent = testState.questions.length;

  // Start timer
  clearInterval(testState.timerInterval);
  testState.timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - testState.startTime) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');
    document.getElementById('test-timer').textContent = m + ':' + s;
  }, 1000);

  renderTestQuestion();
}

function renderTestQuestion() {
  if (testState.idx >= testState.questions.length) { endTest(); return; }

  testState.answered = false;
  const q = testState.questions[testState.idx];
  const total = testState.questions.length;

  document.getElementById('test-qnum').textContent = testState.idx + 1;
  document.getElementById('test-progress-fill').style.width = (testState.idx / total * 100) + '%';
  document.getElementById('test-feedback-box').textContent = '';
  document.getElementById('test-next-btn').style.display = 'none';

  // Question display
  const qBox = document.getElementById('test-question-box');
  if (q.type === 'hiragana-recog') {
    qBox.innerHTML = `<div class="test-q-char">${q.display}</div><div class="test-q-text">What is the reading of this character?</div>`;
  } else if (q.type === 'word-match') {
    qBox.innerHTML = `<div class="test-q-char" style="font-size:2.4rem">${q.display}</div><div class="test-q-text" style="font-size:0.9rem;color:var(--text3)">${q.hint}</div><div class="test-q-text">What does this word mean?</div>`;
  } else if (q.type === 'sentence-fill') {
    qBox.innerHTML = `<div class="test-q-text" style="font-size:1.3rem;font-family:var(--font-jp)">${q.display}</div><div class="test-q-text" style="margin-top:10px;font-size:0.82rem;color:var(--text3)">Hint: ${q.hint}</div>`;
  } else {
    qBox.innerHTML = `<div class="test-q-text" style="font-size:1rem">${q.display}</div>`;
  }

  // Options
  const optsBox = document.getElementById('test-options-box');
  optsBox.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'test-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => checkTestAnswer(opt, q, btn, optsBox));
    optsBox.appendChild(btn);
  });
}

function checkTestAnswer(chosen, q, chosenBtn, optsBox) {
  if (testState.answered) return;
  testState.answered = true;

  optsBox.querySelectorAll('.test-option').forEach(b => {
    b.disabled = true;
    if (b.textContent === q.answer) b.classList.add('correct');
  });

  const fb = document.getElementById('test-feedback-box');
  if (chosen === q.answer) {
    testState.score++;
    fb.textContent = '✓ Correct!';
    fb.style.color = 'var(--green)';
    if (q.type === 'hiragana-recog') speak(q.display);
  } else {
    chosenBtn.classList.add('wrong');
    fb.textContent = '✗ Incorrect — Answer: ' + q.answer;
    fb.style.color = 'var(--red)';
    testState.mistakes.push({ q: q.display, correct: q.answer, chosen });
  }

  document.getElementById('test-next-btn').style.display = 'inline-block';
}

function endTest() {
  clearInterval(testState.timerInterval);
  const elapsed = Math.floor((Date.now() - testState.startTime) / 1000);
  const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const s = String(elapsed % 60).padStart(2, '0');
  const timeStr = m + ':' + s;

  const total = testState.questions.length;
  const pct = Math.round((testState.score / total) * 100);
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '😊' : '💪';

  document.getElementById('test-area').style.display = 'none';
  document.getElementById('test-results').style.display = 'block';
  document.getElementById('test-result-emoji').textContent = emoji;
  document.getElementById('test-result-score').textContent = testState.score + ' / ' + total;
  document.getElementById('rs-accuracy').textContent = pct + '%';
  document.getElementById('rs-time').textContent = timeStr;
  document.getElementById('rs-correct').textContent = testState.score;
  document.getElementById('rs-wrong').textContent = testState.mistakes.length;

  // Mistakes review
  const mList = document.getElementById('result-mistakes');
  mList.innerHTML = '';
  if (testState.mistakes.length > 0) {
    const title = document.createElement('div');
    title.style.cssText = 'font-size:0.75rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--text3);margin-bottom:10px';
    title.textContent = 'Review mistakes:';
    mList.appendChild(title);
    testState.mistakes.forEach(m => {
      const item = document.createElement('div');
      item.className = 'mistake-item';
      item.innerHTML = `<span class="mistake-char">${m.q}</span><span>You chose <b>${m.chosen}</b> — correct: <b style="color:var(--green)">${m.correct}</b></span>`;
      mList.appendChild(item);
    });
  }

  // Save history
  state.testsTaken++;
  state.scoreHistory.unshift({ test: TEST_TITLES[testState.type], score: testState.score + '/' + total, pct, date: new Date().toLocaleDateString() });
  if (state.scoreHistory.length > 20) state.scoreHistory.pop();
  saveState();
  showXP(pct >= 80 ? 20 : 10);
}

document.getElementById('test-next-btn').addEventListener('click', () => {
  testState.idx++;
  renderTestQuestion();
});

document.getElementById('test-retry-btn').addEventListener('click', () => {
  document.getElementById('test-results').style.display = 'none';
  document.getElementById('test-picker').style.display = 'grid';
  startTest(testState.type);
});

document.getElementById('test-back-btn').addEventListener('click', () => {
  clearInterval(testState.timerInterval);
  document.getElementById('test-results').style.display = 'none';
  document.getElementById('test-picker').style.display = 'grid';
});

// Test card click
document.querySelectorAll('.test-card-pick').forEach(card => {
  card.addEventListener('click', () => startTest(card.dataset.test));
});

/* ============================================
   PROGRESS SECTION
   ============================================ */

function renderProgress() {
  document.getElementById('prog-xp').textContent = state.xp;
  document.getElementById('prog-streak').textContent = state.streak;
  document.getElementById('prog-tests').textContent = state.testsTaken;
  document.getElementById('prog-mastered').textContent = state.mastered.length;

  // Mastery grid
  const grid = document.getElementById('mastery-grid');
  grid.innerHTML = '';
  HIRA_VALID.forEach(([char, roma]) => {
    const cell = document.createElement('div');
    cell.className = 'mastery-cell' +
      (state.mastered.includes(roma) ? ' mastered' : state.seen.includes(roma) ? ' seen' : '');
    cell.innerHTML = char + `<span class="mc-roma">${roma}</span>`;
    grid.appendChild(cell);
  });

  // Score history
  const hist = document.getElementById('score-history');
  hist.innerHTML = state.scoreHistory.length === 0
    ? '<p style="color:var(--text3);font-size:0.85rem">No tests taken yet.</p>'
    : '';
  state.scoreHistory.forEach(h => {
    const item = document.createElement('div');
    item.className = 'score-item';
    item.innerHTML = `<span class="score-item-test">${h.test}</span><span class="score-item-score">${h.score} (${h.pct}%)</span><span class="score-item-date">${h.date}</span>`;
    hist.appendChild(item);
  });
}

document.getElementById('reset-progress-btn').addEventListener('click', () => {
  if (confirm('Reset all progress? This cannot be undone.')) {
    state = { xp: 0, streak: 0, testsTaken: 0, mastered: [], seen: [], scoreHistory: [], favorites: [] };
    saveState();
    renderProgress();
    document.getElementById('streak-count').textContent = 0;
    document.getElementById('topbar-score').textContent = '0 XP';
  }
});

/* ============================================
   AI MODULES PLACEHOLDER
   ============================================
   To integrate AI features, implement the
   functions below with your chosen API.
   Supported: OpenAI, Anthropic Claude, Gemini.
   ============================================ */

const AI_MODULES = {
  // ---- PRONUNCIATION ASSISTANT ----
  // Plug in: Web Speech API (recognition) + AI API
  pronunciationAssistant: async (audioBlob) => {
    // TODO: send audioBlob to speech-to-text API
    // then compare result with expected text
    console.log('[AI] Pronunciation Assistant — not yet implemented');
  },

  // ---- CHAT PRACTICE ----
  // Plug in: LLM API (e.g. claude-sonnet-4-20250514)
  chatPractice: async (userMessage, history) => {
    // TODO: POST to /v1/messages or OpenAI /chat/completions
    // with system: "You are a friendly Japanese tutor for beginners."
    console.log('[AI] Chat Practice — not yet implemented');
  },

  // ---- SENTENCE GENERATOR ----
  sentenceGenerator: async (word) => {
    // TODO: LLM API call: "Generate 3 beginner Japanese sentences using the word: " + word
    console.log('[AI] Sentence Generator — not yet implemented');
  },

  // ---- QUIZ GENERATOR ----
  quizGenerator: async (content) => {
    // TODO: LLM API call: "Generate 5 multiple choice questions from: " + content
    console.log('[AI] Quiz Generator — not yet implemented');
  },

  // ---- WRITING CORRECTION ----
  writingCorrection: async (text) => {
    // TODO: LLM API call: "Correct this Japanese text and explain mistakes: " + text
    console.log('[AI] Writing Correction — not yet implemented');
  },

  // ---- PERSONALIZED LEARNING ----
  personalizedLearning: (progressData) => {
    // TODO: analyze state.mastered, scoreHistory, etc.
    // return suggested lessons/rows to practice
    console.log('[AI] Personalized Learning — not yet implemented');
  },

  // ---- VOCABULARY RECOMMENDATION ----
  vocabRecommendation: (progressData) => {
    // TODO: filter WORDS by categories the user hasn't explored
    console.log('[AI] Vocab Recommendation — not yet implemented');
  },

  // ---- STUDY ASSISTANT ----
  studyAssistant: async (question) => {
    // TODO: LLM API call with full context about grammar, words, etc.
    console.log('[AI] Study Assistant — not yet implemented');
  },
};

/* ============================================
   INIT — Run on page load
   ============================================ */

function init() {
  updateStreak();

  // Build all sections
  buildHiraganaFilter();
  buildHiraganaGrid('all');
  buildPracticeToggles();
  buildWordCatFilters();
  renderWords();
  renderSentences();
  renderGrammar();
  renderProgress();

  // Restore XP display
  document.getElementById('topbar-score').textContent = state.xp + ' XP';
  document.getElementById('streak-count').textContent = state.streak;

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('menu-toggle');
    if (window.innerWidth <= 900 && sidebar.classList.contains('open')
      && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);