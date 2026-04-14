import { writable, derived, get } from 'svelte/store';
import { steps, QUIZ_TOTAL, RESET_URL, BLOB_ID } from '$lib/data/steps.js';
import { isCorrect } from '$lib/utils/normalize.js';

const JSONBLOB_URL = `https://jsonblob.com/api/jsonBlob/${BLOB_ID}`;

// ─── État persisté dans localStorage ───────────────────────────────────────
function persisted(key, defaultValue) {
  const stored = localStorage.getItem(key);
  const initial = stored !== null ? JSON.parse(stored) : defaultValue;
  const store = writable(initial);
  store.subscribe(v => localStorage.setItem(key, JSON.stringify(v)));
  return store;
}

export const current     = persisted('level', 0);
export const score       = persisted('score', 0);
export const teamName    = persisted('teamName', '');
export const userAnswers = persisted('answers', []);
export const gameOver    = persisted('gameOver', false);

// ─── Timer ─────────────────────────────────────────────
export const startTime = persisted('startTime', null);
export const totalTime = persisted('totalTime', null);

export function startTimer() {
  startTime.set(Date.now());
  totalTime.set(null);
}

export function stopTimer() {
  const start = get(startTime);
  if (start) totalTime.set(Math.floor((Date.now() - start) / 1000));
}

// ─── State UI (non persisté) ────────────────────────────────────────────────
export const feedback      = writable('');
export const transitioning = writable(false);

// ─── Dérivés ────────────────────────────────────────────────────────────────
export const currentStep = derived(current, $c => steps[$c]);
export const progress    = derived(current, $c => ($c / steps.length) * 100);
export const quizTotal   = QUIZ_TOTAL;

// ─── Actions ────────────────────────────────────────────────────────────────
export function submitQuiz(value, step) {
  if (get(transitioning)) return;
  transitioning.set(true);
  userAnswers.update(answers => {
    answers[get(current)] = value;
    return answers;
  });
  if (isCorrect(value, step.answer)) {
    score.update(s => s + 1);
    feedback.set('✅ Bonne réponse !');
  } else {
    feedback.set('❌ Raté');
  }
  setTimeout(nextStep, 1000);
}

export function addPoint() {
  score.update(s => s + 1);
}

export function nextStep() {
  current.update(c => {
    const next = c + 1;
    if (next >= steps.length) {
      stopTimer();
      saveScore();
      gameOver.set(true);
    }
    return next;
  });
  feedback.set('');
  transitioning.set(false);
}

export function resetGame() {
  localStorage.clear();
  current.set(0);
  score.set(0);
  teamName.set('');
  userAnswers.set([]);
  gameOver.set(false);
  feedback.set('');
  transitioning.set(false);
  startTime.set(null);
  totalTime.set(null);
}

export function adminReset() {
  const code = prompt('Code admin :');
  if (code === '49895') resetGame();
}

// ─── Classement JSONBlob ─────────────────────────────────────────────────────
export async function saveScore() {
  try {
    const name = get(teamName);
    const s    = get(score);
    const t    = get(totalTime);

    const res = await fetch(base + RESET_URL + '?t=' + Date.now());
    const data = await res.json();

    // Anti-replay : on n'enregistre pas si le joueur a déjà un score
    const exists = data.scores.find(e => e.name === name);
    if (exists) return;

    data.scores.push({ name, score: s, time: t, date: Date.now() });
    data.scores.sort((a, b) => b.score - a.score || a.time - b.time);

    await fetch(JSONBLOB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch {
    // silencieux
  }
}

export async function fetchScores() {
  try {
    const res  = await fetch(JSONBLOB_URL);
    const data = await res.json();
    return data.scores || [];
  } catch {
    return [];
  }
}

// ─── Vérification reset distant ─────────────────────────────────────────────
export async function checkRemoteReset() {
  try {
    const res  = await fetch(RESET_URL + '?t=' + Date.now());
    const data = await res.json();
    const localVersion = parseInt(localStorage.getItem('resetVersion') || '0');
    if (data.version > localVersion) {
      localStorage.clear();
      localStorage.setItem('resetVersion', data.version);
      alert('🔄 Le jeu a été réinitialisé par l\'organisateur');
      location.reload();
    }
  } catch {
    // silencieux
  }
}