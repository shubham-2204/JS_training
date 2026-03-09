import { shuffle } from "../utils/helpers.js";
import { APP_CONFIG } from "../constants/appConfig.js";
import type {
    Category,
    CategoryFilter,
    Difficulty,
    DifficultyFilter,
    Question,
    QuestionBank
} from "../types/models.js";

export default class QuizEngine {
    private questionBank: QuestionBank;
    private index: number;
    private score: number;
    private filteredQuestions: Question[];

    constructor(questionBank: QuestionBank) {
        this.questionBank = questionBank;
        this.index = 0;
        this.score = 0;
        this.filteredQuestions = [];
    }
    flatten(category: CategoryFilter, difficulty: DifficultyFilter): Question[] {
        let result: Question[] = [];

        if (category === "All" && difficulty === "All") {
            Object.values(this.questionBank).forEach(levels => {
                Object.values(levels).forEach(arr => {
                    result = result.concat(arr);
                });
            });
        }
        else if (category !== "All" && difficulty === "All") {
            const selectedCategory = category as Category;
            Object.values(this.questionBank[selectedCategory]).forEach(arr => {
                result = result.concat(arr);
            });
        }
        else if (category === "All" && difficulty !== "All") {
            const selectedDifficulty = difficulty as Difficulty;
            Object.values(this.questionBank).forEach(levels => {
                result = result.concat(levels[selectedDifficulty]);
            });
        }
        else {
            const selectedCategory = category as Category;
            const selectedDifficulty = difficulty as Difficulty;
            result = [...this.questionBank[selectedCategory][selectedDifficulty]];
        }

        return result;
    }

    start(category: CategoryFilter, difficulty: DifficultyFilter): boolean {
        const questionPool = this.flatten(category, difficulty);

        if (!questionPool || !questionPool.length) {
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

    currentQuestion(): Question | undefined {
        return this.filteredQuestions[this.index];
    }

    next(): void {
        this.index++;
    }

    isFinished(): boolean {
        return this.index >= this.filteredQuestions.length;
    }

    answer(choice: string): boolean {
        const current = this.currentQuestion();
        if (!current) {
            return false;
        }
        const correctAnswer = current.answer;
        if (choice === correctAnswer) {
            this.score++;
            return true;
        }
        return false;
    }

    getScore(): number {
        return this.score;
    }

    getTotalQuestions(): number {
        return this.filteredQuestions.length;
    }

    getCurrentIndex(): number {
        return this.index;
    }
}
