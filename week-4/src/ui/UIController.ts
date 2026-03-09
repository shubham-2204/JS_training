import { DOM } from "./DOMElements.js";
import type {
    CategoryFilter,
    DifficultyFilter,
    LeaderboardEntry,
    Question
} from "../types/models.js";

export default class UIController {
    showAuthScreen(): void {
        DOM.authContainer.classList.remove("hidden");
        DOM.startScreen.classList.add("hidden");
        DOM.questionContainer.classList.add("hidden");
        DOM.resultContainer.classList.add("hidden");
        DOM.logoutBtn.classList.add("hidden");
    }

    showStartScreen(): void {
        DOM.authContainer.classList.add("hidden");
        DOM.startScreen.classList.remove("hidden");
        DOM.questionContainer.classList.add("hidden");
        DOM.resultContainer.classList.add("hidden");
        DOM.logoutBtn.classList.remove("hidden");
    }

    showQuestionScreen(): void {
        DOM.startScreen.classList.add("hidden");
        DOM.resultContainer.classList.add("hidden");
        DOM.questionContainer.classList.remove("hidden");
    }

    showResultScreen(): void {
        DOM.questionContainer.classList.add("hidden");
        DOM.resultContainer.classList.remove("hidden");
    }

    renderQuestion(question: Question, index: number, total: number): void {
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

    highlightAnswers(correctAnswer: string, selectedChoice: string): void {
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

    renderResult(score: number, total: number, message: string): void {
        DOM.scoreDisplay.textContent =
            `You scored ${score} / ${total}`;

        DOM.performanceDisplay.textContent = message;
    }

    renderLeaderboard(entries: LeaderboardEntry[]): void {
        DOM.leaderboardList.innerHTML = "";

        entries.forEach((entry, i) => {
            const li = document.createElement("li");
            li.textContent =
                `${i + 1}. ${entry.username} - ${entry.score}`;

            DOM.leaderboardList.appendChild(li);
        });
    }

    updateTimerDisplay(timeLeft: string): void {
        DOM.timerDisplay.textContent = timeLeft;
    }

    getSelectedCategory(): CategoryFilter {
        return DOM.categorySelect.value as CategoryFilter;
    }

    getSelectedDifficulty(): DifficultyFilter {
        return DOM.difficultySelect.value as DifficultyFilter;
    }

    clearChoicesInteraction(): void {
        const allChoices = DOM.choicesList.querySelectorAll("li");
        allChoices.forEach(li => {
            li.style.pointerEvents = "auto";
            li.classList.remove("correct", "wrong");
        });
    }
}
