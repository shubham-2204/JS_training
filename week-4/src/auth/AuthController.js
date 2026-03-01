import { DOM } from "../ui/DOMElements.js";

export default class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.isLoginMode = true;
    }

    init(onLoginSuccess, onLogout) {
        this.bindEvents(onLoginSuccess, onLogout);
    }

    bindEvents(onLoginSuccess, onLogout) {
        DOM.toggleAuth.addEventListener("click", () => {
            this.isLoginMode = !this.isLoginMode;

            DOM.authTitle.textContent =
                this.isLoginMode ? "Login" : "Register";

            DOM.authSubmit.textContent =
                this.isLoginMode ? "Login" : "Register";

            DOM.toggleAuth.textContent =
                this.isLoginMode
                    ? "Don't have an account? Register"
                    : "Already have an account? Login";

            DOM.authError.textContent = "";
        });

        DOM.authSubmit.addEventListener("click", () => {
            const username = DOM.authUsername.value.trim();
            const password = DOM.authPassword.value.trim();

            if (!username || !password) {
                DOM.authError.textContent =
                    "All fields are required.";
                return;
            }

            const users = this.authService.getUsers();

            if (this.isLoginMode) {
                const user = users.find(
                    u =>
                        u.username === username &&
                        u.password === password
                );

                if (!user) {
                    DOM.authError.textContent =
                        "Invalid credentials.";
                    return;
                }

                this.authService.setCurrentUser(username);
                onLoginSuccess();
            } else {
                if (users.find(u => u.username === username)) {
                    DOM.authError.textContent =
                        "Username already exists.";
                    return;
                }
                users.push({ username, password });
                this.authService.setUsers(users);
                this.isLoginMode = true;
                DOM.authTitle.textContent = "Login";
                DOM.authSubmit.textContent = "Login";
                DOM.toggleAuth.textContent =
                    "Don't have an account? Register";
                DOM.authUsername.value = "";
                DOM.authPassword.value = "";
                DOM.authError.textContent =
                    "Registered successfully! Please login.";
            }
        });

        DOM.logoutBtn.addEventListener("click", () => {
            this.authService.logout();
            onLogout();
        });
    }
}