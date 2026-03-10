export type Category = "Science" | "General" | "Literature";
export type Difficulty = "Easy" | "Medium" | "Hard";

export type CategoryFilter = Category | "All";
export type DifficultyFilter = Difficulty | "All";

export interface Question {
  question: string;
  choices: string[];
  answer: string;
}

export type QuestionBank = Record<Category, Record<Difficulty, Question[]>>;

export interface UserCredentials {
  username: string;
  password: string;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
}
