import { ERROR_MESSAGES } from "./constants.js";

export const validateRegisterInputs = (username, password, confirmPassword) => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedUsername || !trimmedPassword || !trimmedConfirm) {
        return { valid: false, message: ERROR_MESSAGES.REQUIRED_FIELDS };
    }

    if (trimmedUsername.length < 3) {
        return { valid: false, message: ERROR_MESSAGES.USERNAME_LENGTH };
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(trimmedPassword)) {
        return { valid: false, message: ERROR_MESSAGES.PASSWORD_RULE };
    }

    if (trimmedPassword !== trimmedConfirm) {
        return { valid: false, message: ERROR_MESSAGES.PASSWORD_MISMATCH };
    }

    return {
        valid: true,
        username: trimmedUsername,
        password: trimmedPassword
    };
};

export const validateLoginInputs = (username, password) => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
        return { valid: false, message: ERROR_MESSAGES.REQUIRED_FIELDS };
    }

    return {
        valid: true,
        username: trimmedUsername,
        password: trimmedPassword
    };
};