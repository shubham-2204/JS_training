import { shuffle } from "../utils/helpers.js";

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
            result = this.questionBank[category][difficulty];
        }

        return result;
    }

    start(category, difficulty) {
        this.filteredQuestions = this.flatten(category, difficulty);

        if (!this.filteredQuestions || this.filteredQuestions.length === 0) {
            return false;
        }
        shuffle(this.filteredQuestions);
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