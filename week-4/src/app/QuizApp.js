import AuthService from "../auth/AuthService.js";
import AuthController from "../auth/AuthController.js";
import QuizEngine from "../quiz/QuizEngine.js";
import LeaderboardService from "../quiz/LeaderboardService.js";
import UIController from "../ui/UIController.js";
import { DOM } from "../ui/DOMElements.js";
import { APP_CONFIG } from "../constants/appConfig.js";
import { QUIZ_MESSAGES } from "../constants/messages.js";
import { formatTime } from "../utils/helpers.js";

export default class QuizApp {
  constructor(questionBank) {
    /* ================= SERVICES ================= */

    this.authService = new AuthService();
    this.authController = new AuthController(this.authService);
    this.leaderboardService = new LeaderboardService();
    this.quizEngine = new QuizEngine(questionBank);
    this.ui = new UIController();

    /* ================= TIMER ================= */

    this.timerInterval = null;
    this.timeLeft = APP_CONFIG.TIMER_DURATION;
  }

  /* ================= INIT ================= */

  init() {
    this.bindAuthFlow();
    this.bindQuizFlow();

    if (this.authService.getCurrentUser()) {
      this.ui.showStartScreen();
    } else {
      this.ui.showAuthScreen();
    }

    this.renderLeaderboard();
  }

  /* ================= AUTH FLOW ================= */

  bindAuthFlow() {
    this.authController.init(
      () => this.ui.showStartScreen(),   // On Login Success
      () => this.ui.showAuthScreen()     // On Logout
    );
  }

  /* ================= QUIZ FLOW ================= */

  bindQuizFlow() {
    DOM.startBtn.addEventListener("click", () => {
      const category = this.ui.getSelectedCategory();
      const difficulty = this.ui.getSelectedDifficulty();

      const started = this.quizEngine.start(category, difficulty);

      if (!started) {
        alert(QUIZ_MESSAGES.NO_QUESTIONS);
        return;
      }

      this.ui.showQuestionScreen();
      this.showQuestion();
    });

    DOM.nextBtn.addEventListener("click", () => {
      this.goNext();
    });

    DOM.restartBtn.addEventListener("click", () => {
      this.ui.showStartScreen();
    });
  }

  /* ================= QUESTION ================= */

  showQuestion() {
    const question = this.quizEngine.currentQuestion();

    this.ui.renderQuestion(
      question,
      this.quizEngine.getCurrentIndex(),
      this.quizEngine.getTotalQuestions()
    );

    this.startTimer();

    const choices = DOM.choicesList.querySelectorAll("li");

    choices.forEach(choiceElement => {
      choiceElement.addEventListener("click", () => {
        this.handleAnswer(choiceElement.textContent);
      });
    });
  }

  handleAnswer(selectedChoice) {
    this.stopTimer();

    const question = this.quizEngine.currentQuestion();
    const correctAnswer = question.answer;

    this.quizEngine.answer(selectedChoice);

    this.ui.highlightAnswers(correctAnswer, selectedChoice);
  }

  goNext() {
    this.quizEngine.next();

    if (this.quizEngine.isFinished()) {
      this.showResult();
    } else {
      this.showQuestion();
    }
  }

  /* ================= RESULT ================= */

  showResult() {
    this.stopTimer();

    const score = this.quizEngine.getScore();
    const total = this.quizEngine.getTotalQuestions();
    const percentage = (score / total) * 100;

    let message = "";

    if (percentage >= 80)
      message = QUIZ_MESSAGES.PERFORMANCE.EXCELLENT;
    else if (percentage >= 50)
      message = QUIZ_MESSAGES.PERFORMANCE.GOOD;
    else
      message = QUIZ_MESSAGES.PERFORMANCE.PRACTICE;

    this.ui.showResultScreen();
    this.ui.renderResult(score, total, message);

    const currentUser = this.authService.getCurrentUser();
    this.leaderboardService.save(currentUser, score);

    this.renderLeaderboard();
  }

  /* ================= LEADERBOARD ================= */

  renderLeaderboard() {
    const entries = this.leaderboardService.getAll();
    this.ui.renderLeaderboard(entries);
  }

  /* ================= TIMER ================= */

  startTimer() {
    this.timeLeft = APP_CONFIG.TIMER_DURATION;
    this.ui.updateTimerDisplay(formatTime(this.timeLeft));

    this.timerInterval = setInterval(() => {
      this.timeLeft--;

      this.ui.updateTimerDisplay(formatTime(this.timeLeft));

      if (this.timeLeft <= 0) {
        this.stopTimer();
        this.goNext();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }
}