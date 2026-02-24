import { APP_CONFIG } from "../config/appConfig.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";
import { isPastDate } from "./dateHelper.js";

export const validateTaskInput = ({ text, dueDate, existingTasks }) => {
    const trimmedText = text?.trim();

    if (!trimmedText) {
        return { isValid: false, message: ERROR_MESSAGES.EMPTY_TASK };
    }

    if (trimmedText.length > APP_CONFIG.maxTaskLength) {
        return { isValid: false, message: ERROR_MESSAGES.TASK_TOO_LONG };
    }

    const duplicateExists = existingTasks.some(
        (task) =>
            task.text.toLowerCase() === trimmedText.toLowerCase() &&
            task.dueDate === dueDate
    );

    if (duplicateExists) {
        return { isValid: false, message: ERROR_MESSAGES.DUPLICATE_TASK };
    }

    if (isPastDate(dueDate)) {
        return { isValid: false, message: ERROR_MESSAGES.INVALID_DATE };
    }

    return { isValid: true, message: null };
};