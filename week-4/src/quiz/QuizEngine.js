import { shuffle } from "../utils/helpers.js";
import { APP_CONFIG } from "../constants/appConfig.js";

export default class QuizEngine {
    constructor(questionBank) {
        this.questionBank = questionBank;
        this.index = 0;
        this.score = 0;
        this.filteredQuestions = [];
    }
    flatten(category, difficulty) {
        let result = [];

        if (category === "All" && difficulty === "All") {
            Object.values(this.questionBank).forEach(levels => {
                Object.values(levels).forEach(arr => {
                    result = result.concat(arr);
                });
            });
        }
        else if (category !== "All" && difficulty === "All") {
            Object.values(this.questionBank[category]).forEach(arr => {
                result = result.concat(arr);
            });
        }
        else if (category === "All" && difficulty !== "All") {
            Object.values(this.questionBank).forEach(levels => {
                result = result.concat(levels[difficulty]);
            });
        }
        else {
            result = [...this.questionBank[category][difficulty]];
        }

        return result;
    }

    start(category, difficulty) {
        const questionPool = this.flatten(category, difficulty);

        if (!questionPool || questionPool.length === 0) {
            return false;
        }
        shuffle(questionPool);

        this.filteredQuestions = questionPool.slice(
            0,
            APP_CONFIG.QUIZ_QUESTION_LIMIT
        );
        this.index = 0;
        this.score = 0;
        return true;
    }

    currentQuestion() {
        return this.filteredQuestions[this.index];
    }

    next() {
        this.index++;
    }

    isFinished() {
        return this.index >= this.filteredQuestions.length;
    }

    answer(choice) {
        const correctAnswer = this.currentQuestion().answer;
        if (choice === correctAnswer) {
            this.score++;
            return true;
        }
        return false;
    }

    getScore() {
        return this.score;
    }

    getTotalQuestions() {
        return this.filteredQuestions.length;
    }

    getCurrentIndex() {
        return this.index;
    }
}
