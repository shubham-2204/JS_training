const loginButton = document.getElementById("loginButton");
const loginError = document.getElementById("loginError");

const handleLogin = () => {
    loginError.textContent = "";
    const usernameValue = document.getElementById("loginUsernameInput").value;
    const passwordValue = document.getElementById("loginPasswordInput").value;
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
        loginError.textContent = "No registered users found.";
        return;
    }

    const validUser = storedUsers.some(user =>
        user.username === validationResult.username &&
        user.password === validationResult.password
    );

    if (!validUser) {
        loginError.textContent = "Invalid username or password.";
        return;
    }

    localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        validationResult.username
    );
    window.location.href = ROUTES.WELCOME;
};

loginButton.addEventListener("click", handleLogin);