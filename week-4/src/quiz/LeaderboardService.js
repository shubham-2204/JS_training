import { STORAGE_KEYS } from "../constants/storageKeys.js";
import { APP_CONFIG } from "../constants/appConfig.js";

export default class LeaderboardService {
    parseStoredEntries() {
        try {
            const parsed = JSON.parse(
                localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
            );
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    save(username, score) {
        if (!username || typeof score !== "number") {
            return;
        }

        const stored = this.parseStoredEntries();
        const bestScoreByUser = new Map();

        stored.forEach(entry => {
            if (
                !entry ||
                typeof entry.username !== "string" ||
                typeof entry.score !== "number"
            ) {
                return;
            }
            const previousBest = bestScoreByUser.get(entry.username) ?? -Infinity;
            bestScoreByUser.set(entry.username, Math.max(previousBest, entry.score));
        });

        const currentBest = bestScoreByUser.get(username) ?? -Infinity;
        bestScoreByUser.set(username, Math.max(currentBest, score));

        const normalizedEntries = Array.from(bestScoreByUser.entries()).map(
            ([name, userScore]) => ({ username: name, score: userScore })
        );

        normalizedEntries.sort((a, b) => b.score - a.score);
        const limited = normalizedEntries.slice(
            0,
            APP_CONFIG.LEADERBOARD_LIMIT
        );
        localStorage.setItem(
            STORAGE_KEYS.LEADERBOARD,
            JSON.stringify(limited)
        );
    }

    getAll() {
        return this.parseStoredEntries();
    }

    clear() {
        localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    }
}
