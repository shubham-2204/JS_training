import { STORAGE_KEYS, ROUTES, ERROR_MESSAGES } from "./constants.js";
import { validateLoginInputs } from "./validation.js";

const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");

const handleLogin = () => {
    const usernameValue = document.getElementById("loginUsernameInput").value;
    const passwordValue = document.getElementById("loginPasswordInput").value;
    loginError.textContent = "";
    const validationResult = validateLoginInputs(
        usernameValue,
        passwordValue
    );

    if (!validationResult.valid) {
        loginError.textContent = validationResult.message;
        return;
    }

    const storedUsers =
        JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));

    if (!storedUsers) {
        loginError.textContent = ERROR_MESSAGES.NO_USERS;
        return;
    }

    const validUser = storedUsers.some(user =>
        user.username === validationResult.username &&
        user.password === validationResult.password
    );

    if (!validUser) {
        loginError.textContent = ERROR_MESSAGES.INVALID_LOGIN;
        return;
    }

    localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        validationResult.username
    );
    window.location.href = ROUTES.WELCOME;
};
loginButton.addEventListener("click", handleLogin);