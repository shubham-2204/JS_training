export const DOM = {

  /* ================= AUTH ================= */

  authContainer: document.getElementById("auth-container"),
  authTitle: document.getElementById("auth-title"),
  authUsername: document.getElementById("auth-username"),
  authPassword: document.getElementById("auth-password"),
  authSubmit: document.getElementById("auth-submit"),
  authError: document.getElementById("auth-error"),
  toggleAuth: document.getElementById("toggle-auth"),
  logoutBtn: document.getElementById("logout-btn"),

  /* ================= QUIZ CONTROLS ================= */

  startBtn: document.getElementById("start-btn"),
  restartBtn: document.getElementById("restart-btn"),
  nextBtn: document.getElementById("next-btn"),
  categorySelect: document.getElementById("category-select"),
  difficultySelect: document.getElementById("difficulty-select"),

  /* ================= SCREENS ================= */

  startScreen: document.getElementById("start-screen"),
  questionContainer: document.getElementById("question-container"),
  resultContainer: document.getElementById("result-container"),

  /* ================= QUESTION ================= */

  questionText: document.getElementById("question-text"),
  choicesList: document.getElementById("choices-list"),
  progressDisplay: document.getElementById("progress"),
  timerDisplay: document.getElementById("timer"),

  /* ================= RESULT ================= */

  scoreDisplay: document.getElementById("score"),
  performanceDisplay: document.getElementById("performance"),
  leaderboardList: document.getElementById("leaderboard")
};