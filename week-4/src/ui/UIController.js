import { DOM } from "./DOMElements.js";

export default class UIController {
    showAuthScreen() {
        DOM.authContainer.classList.remove("hidden");
        DOM.startScreen.classList.add("hidden");
        DOM.questionContainer.classList.add("hidden");
        DOM.resultContainer.classList.add("hidden");
        DOM.logoutBtn.classList.add("hidden");
    }

    showStartScreen() {
        DOM.authContainer.classList.add("hidden");
        DOM.startScreen.classList.remove("hidden");
        DOM.questionContainer.classList.add("hidden");
        DOM.resultContainer.classList.add("hidden");
        DOM.logoutBtn.classList.remove("hidden");
    }

    showQuestionScreen() {
        DOM.startScreen.classList.add("hidden");
        DOM.resultContainer.classList.add("hidden");
        DOM.questionContainer.classList.remove("hidden");
    }

    showResultScreen() {
        DOM.questionContainer.classList.add("hidden");
        DOM.resultContainer.classList.remove("hidden");
    }

    renderQuestion(question, index, total) {
        DOM.nextBtn.classList.add("hidden");
        DOM.choicesList.innerHTML = "";

        DOM.progressDisplay.textContent =
            `Question ${index + 1} / ${total}`;

        DOM.questionText.textContent = question.question;

        question.choices.forEach(choice => {
            const li = document.createElement("li");
            li.textContent = choice;
            DOM.choicesList.appendChild(li);
        });
    }

    highlightAnswers(correctAnswer, selectedChoice) {
        const allChoices = DOM.choicesList.querySelectorAll("li");

        allChoices.forEach(li => {
            li.style.pointerEvents = "none";

            if (li.textContent === correctAnswer) {
                li.classList.add("correct");
            }

            if (
                li.textContent === selectedChoice &&
                selectedChoice !== correctAnswer
            ) {
                li.classList.add("wrong");
            }
        });

        DOM.nextBtn.classList.remove("hidden");
    }

    renderResult(score, total, message) {
        DOM.scoreDisplay.textContent =
            `You scored ${score} / ${total}`;

        DOM.performanceDisplay.textContent = message;
    }

    renderLeaderboard(entries) {
        DOM.leaderboardList.innerHTML = "";

        entries.forEach((entry, i) => {
            const li = document.createElement("li");
            li.textContent =
                `${i + 1}. ${entry.username} - ${entry.score}`;

            DOM.leaderboardList.appendChild(li);
        });
    }

    updateTimerDisplay(timeLeft) {
        DOM.timerDisplay.textContent = timeLeft;
    }

    getSelectedCategory() {
        return DOM.categorySelect.value;
    }

    getSelectedDifficulty() {
        return DOM.difficultySelect.value;
    }

    clearChoicesInteraction() {
        const allChoices = DOM.choicesList.querySelectorAll("li");
        allChoices.forEach(li => {
            li.style.pointerEvents = "auto";
            li.classList.remove("correct", "wrong");
        });
    }
}
