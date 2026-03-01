/* ================= ARRAY HELPERS ================= */

export function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


/* ================= TIMER HELPERS ================= */

export function formatTime(seconds) {
  return `${seconds}s`;
}


/* ================= SAFE JSON ================= */

export function safeParse(value, fallback = []) {
  try {
    return JSON.parse(value) || fallback;
  } catch {
    return fallback;
  }
}