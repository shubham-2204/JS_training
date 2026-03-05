import { STORAGE_KEYS } from "../constants/storageKeys.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export const storageService = {
    loadTasks: () => {
        try {
            const rawData = localStorage.getItem(STORAGE_KEYS.TASKS);

            if (!rawData) return [];

            const parsedData = JSON.parse(rawData);

            if (!Array.isArray(parsedData)) {
                return [];
            }

            return parsedData;
        } catch (error) {
            console.error(ERROR_MESSAGES.STORAGE_FAILURE, error);
            return [];
        }
    },

    saveTasks: (tasks) => {
        try {
            localStorage.setItem(
                STORAGE_KEYS.TASKS,
                JSON.stringify(tasks)
            );
        } catch (error) {
            console.error(ERROR_MESSAGES.STORAGE_FAILURE, error);
        }
    },
};