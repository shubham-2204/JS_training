import { STORAGE_KEYS } from "../constants/storageKeys.js";
import { APP_CONFIG } from "../constants/appConfig.js";

export default class LeaderboardService {

  save(username, score) {
    const stored =
      JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADERBOARD)) || [];

    const newEntry = { username, score };

    stored.push(newEntry);

    stored.sort((a, b) => b.score - a.score);

    const limited = stored.slice(0, APP_CONFIG.LEADERBOARD_LIMIT);

    localStorage.setItem(
      STORAGE_KEYS.LEADERBOARD,
      JSON.stringify(limited)
    );
  }

  getAll() {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
    ) || [];
  }

  clear() {
    localStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
  }
}