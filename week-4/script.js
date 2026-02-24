document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  const nextBtn = document.getElementById("next-btn");
  const categorySelect = document.getElementById("category-select");
  const difficultySelect = document.getElementById("difficulty-select");
  const startScreen = document.getElementById("start-screen");
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const scoreDisplay = document.getElementById("score");
  const performanceDisplay = document.getElementById("performance");
  const leaderboardList = document.getElementById("leaderboard");
  const timerDisplay = document.getElementById("timer");
  const progressDisplay = document.getElementById("progress");  

  let index = 0;
  let score = 0;
  let timeLeft = 15;
  let timerInterval;
  let filteredQuestions = [];

  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
  }

  function flattenQuestionBank(category, difficulty) {
    let result = [];
    if (category === "All" && difficulty === "All") {
      Object.values(questionBank).forEach(levels => {
        Object.values(levels).forEach(arr => {
          result = result.concat(arr);
        });
      });
    }
    else if (category !== "All" && difficulty === "All") {
      Object.values(questionBank[category]).forEach(arr => {
        result = result.concat(arr);
      });
    }
    else if (category === "All" && difficulty !== "All") {
      Object.values(questionBank).forEach(levels => {
        result = result.concat(levels[difficulty]);
      });
    }
    else {
      result = questionBank[category][difficulty];
    }
    return result;
  }
  function startTimer() {
    timeLeft = 15;
    timerDisplay.textContent = `${timeLeft}s`;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        goNext();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  startBtn.addEventListener("click", () => {
    const selectedCategory = categorySelect.value;
    const selectedDifficulty = difficultySelect.value;
    filteredQuestions = flattenQuestionBank(
      selectedCategory,
      selectedDifficulty
    );

    if (!filteredQuestions || filteredQuestions.length === 0) {
      alert("No questions available.");
      return;
    }

    shuffle(filteredQuestions);
    index = 0;
    score = 0;
    startScreen.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  });

  function showQuestion() {
    nextBtn.classList.add("hidden");
    choicesList.innerHTML = "";

    progressDisplay.textContent = `Question ${index + 1} / ${filteredQuestions.length}`;
    questionText.textContent = filteredQuestions[index].question;
    startTimer();
    filteredQuestions[index].choices.forEach(choice => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(li, choice));
      choicesList.appendChild(li);
    });
  }

  function selectAnswer(selectedLi, choice) {
    stopTimer();
    const correct = filteredQuestions[index].answer;
    const allChoices = choicesList.querySelectorAll("li");
    allChoices.forEach(li => {
      li.style.pointerEvents = "none";

      if (li.textContent === correct) {
        li.classList.add("correct");
      }

      if (li.textContent === choice && choice !== correct) {
        li.classList.add("wrong");
      }
    });

    if (choice === correct) score++;
    nextBtn.classList.remove("hidden");
  }
  nextBtn.addEventListener("click", goNext);

  function goNext() {
    index++;
    if (index < filteredQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    stopTimer();
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const percentage = (score / filteredQuestions.length) * 100;
    let message = "";
    if (percentage >= 80) message = "Excellent Performance!";
    else if (percentage >= 50) message = "Good Job!";
    else message = "Keep Practicing!";

    scoreDisplay.textContent = `You scored ${score} / ${filteredQuestions.length}`;
    performanceDisplay.textContent = message;
    saveToLeaderboard();
    renderLeaderboard();
  }

  function saveToLeaderboard() {
    const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
    stored.push(score);
    stored.sort((a, b) => b - a);

    localStorage.setItem(
      "leaderboard",
      JSON.stringify(stored.slice(0, 5))
    );
  }

  function renderLeaderboard() {
    const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardList.innerHTML = "";
    stored.forEach((entry, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. Score: ${entry}`;
      leaderboardList.appendChild(li);
    });
  }
  restartBtn.addEventListener("click", () => {
    resultContainer.classList.add("hidden");
    startScreen.classList.remove("hidden");
    index = 0;
    score = 0;
  });
  renderLeaderboard();
});