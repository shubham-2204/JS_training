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
            DOM.authError.classList.remove("auth-success");
            DOM.authError.classList.add("auth-error");
            DOM.authUsername.value = "";
            DOM.authPassword.value = "";
        });

        DOM.authSubmit.addEventListener("click", () => {
            const username = DOM.authUsername.value.trim();
            const password = DOM.authPassword.value.trim();

            if (!username || !password) {
                DOM.authError.textContent =
                    "All fields are required.";
                DOM.authError.classList.remove("auth-success");
                DOM.authError.classList.add("auth-error");
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
                    DOM.authError.classList.remove("auth-success");
                    DOM.authError.classList.add("auth-error");
                    return;
                }

                this.authService.setCurrentUser(username);
                onLoginSuccess();
            } else {
                if (users.find(u => u.username === username)) {
                    DOM.authError.textContent =
                        "Username already exists.";
                    DOM.authError.classList.remove("auth-success");
                    DOM.authError.classList.add("auth-error");
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
                DOM.authError.classList.remove("auth-error");
                DOM.authError.classList.add("auth-success");
            }
        });

        DOM.logoutBtn.addEventListener("click", () => {
            this.authService.logout();
            onLogout();
        });
    }
}
