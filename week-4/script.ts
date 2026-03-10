import QuizApp from "./src/app/QuizApp.js";
import { questionBank } from "./questions.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = new QuizApp(questionBank);
  app.init();
});