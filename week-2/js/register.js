import { STORAGE_KEYS, ROUTES, ERROR_MESSAGES } from "./constants.js";
import { validateRegisterInputs } from "./validation.js";

const registerButton = document.getElementById("registerButton");
const registerError = document.getElementById("registerError");

const handleRegister = () => {
    const usernameValue = document.getElementById("registerUsernameInput").value;
    const passwordValue = document.getElementById("registerPasswordInput").value;
    const confirmPasswordValue = document.getElementById("registerConfirmPasswordInput").value;
    registerError.textContent = "";
    const validationResult = validateRegisterInputs(
        usernameValue,
        passwordValue,
        confirmPasswordValue
    );

    if (!validationResult.valid) {
        registerError.textContent = validationResult.message;
        return;
    }

    const storedUsers =
        JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];

    const userExists = storedUsers.some(
        user => user.username === validationResult.username
    );

    if (userExists) {
        registerError.textContent = ERROR_MESSAGES.USER_EXISTS;
        return;
    }

    storedUsers.push({
        username: validationResult.username,
        password: validationResult.password
    });

    localStorage.setItem(
        STORAGE_KEYS.USERS,
        JSON.stringify(storedUsers)
    );
    window.location.href = ROUTES.LOGIN;
};
registerButton.addEventListener("click", handleRegister);