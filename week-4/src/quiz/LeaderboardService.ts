import { STORAGE_KEYS } from "../constants/storageKeys.js";
import { APP_CONFIG } from "../constants/appConfig.js";
import { safeParse } from "../utils/helpers.js";
import type { LeaderboardEntry } from "../types/models.js";

export default class LeaderboardService {
    parseStoredEntries(): LeaderboardEntry[] {
        const parsed = safeParse<unknown[]>(
            localStorage.getItem(STORAGE_KEYS.LEADERBOARD),
            []
        );

        return parsed.filter(
            (entry): entry is LeaderboardEntry =>
                !!entry &&
                typeof entry === "object" &&
                "username" in entry &&
                "score" in entry &&
                typeof entry.username === "string" &&
                typeof entry.score === "number"
        );
    }

    save(username: string, score: number): void {
        if (!username || typeof score !== "number") {
            return;
        }

        const stored = this.parseStoredEntries();
        const bestScoreByUser = new Map<string, number>();

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

    getAll(): LeaderboardEntry[] {
        return this.parseStoredEntries();
    }

    clear(): void {
        localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    }
}
