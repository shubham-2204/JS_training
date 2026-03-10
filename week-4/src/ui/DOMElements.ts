function getElementById<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Missing required element: #${id}`);
    }
    return element as T;
}

export const DOM = {
    authContainer: getElementById<HTMLDivElement>("auth-container"),
    authTitle: getElementById<HTMLHeadingElement>("auth-title"),
    authUsername: getElementById<HTMLInputElement>("auth-username"),
    authPassword: getElementById<HTMLInputElement>("auth-password"),
    authSubmit: getElementById<HTMLButtonElement>("auth-submit"),
    authError: getElementById<HTMLParagraphElement>("auth-error"),
    toggleAuth: getElementById<HTMLParagraphElement>("toggle-auth"),
    logoutBtn: getElementById<HTMLButtonElement>("logout-btn"),

    startBtn: getElementById<HTMLButtonElement>("start-btn"),
    restartBtn: getElementById<HTMLButtonElement>("restart-btn"),
    nextBtn: getElementById<HTMLButtonElement>("next-btn"),
    categorySelect: getElementById<HTMLSelectElement>("category-select"),
    difficultySelect: getElementById<HTMLSelectElement>("difficulty-select"),

    startScreen: getElementById<HTMLDivElement>("start-screen"),
    questionContainer: getElementById<HTMLDivElement>("question-container"),
    resultContainer: getElementById<HTMLDivElement>("result-container"),

    questionText: getElementById<HTMLHeadingElement>("question-text"),
    choicesList: getElementById<HTMLUListElement>("choices-list"),
    progressDisplay: getElementById<HTMLParagraphElement>("progress"),
    timerDisplay: getElementById<HTMLParagraphElement>("timer"),

    scoreDisplay: getElementById<HTMLParagraphElement>("score"),
    performanceDisplay: getElementById<HTMLParagraphElement>("performance"),
    leaderboardList: getElementById<HTMLUListElement>("leaderboard")
};
