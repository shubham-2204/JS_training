const validateRegisterInputs = (username, password, confirmPassword) => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedUsername || !trimmedPassword || !trimmedConfirm) {
        return { valid: false, message: "All fields are required." };
    }

    if (trimmedUsername.length < 3) {
        return { valid: false, message: "Username must be at least 3 characters." };
    }

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(trimmedPassword)) {
        return {
            valid: false,
            message:
                "Password must be 8+ characters with uppercase, lowercase, number and special character."
        };
    }

    if (trimmedPassword !== trimmedConfirm) {
        return { valid: false, message: "Passwords do not match." };
    }

    return {
        valid: true,
        username: trimmedUsername,
        password: trimmedPassword
    };
};
const validateLoginInputs = (username, password) => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
        return { valid: false, message: "All fields are required." };
    }

    return {
        valid: true,
        username: trimmedUsername,
        password: trimmedPassword
    };
};