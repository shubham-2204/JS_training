import { DOM } from "../ui/DOMElements.js";
import { AUTH_MESSAGES } from "../constants/messages.js";
import { QUIZ_LABELS } from "../constants/quizConfig.js";
import type AuthService from "./AuthService.js";

export default class AuthController {
    private authService: AuthService;
    private isLoginMode: boolean;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.isLoginMode = true;
    }

    init(onLoginSuccess: () => void, onLogout: () => void): void {
        this.bindEvents(onLoginSuccess, onLogout);
    }

    bindEvents(onLoginSuccess: () => void, onLogout: () => void): void {
        DOM.toggleAuth.addEventListener("click", () => {
            this.isLoginMode = !this.isLoginMode;

            DOM.authTitle.textContent =
                this.isLoginMode ? QUIZ_LABELS.LOGIN : QUIZ_LABELS.REGISTER;

            DOM.authSubmit.textContent =
                this.isLoginMode ? QUIZ_LABELS.LOGIN : QUIZ_LABELS.REGISTER;

            DOM.toggleAuth.textContent =
                this.isLoginMode
                    ? QUIZ_LABELS.TOGGLE_TO_REGISTER
                    : QUIZ_LABELS.TOGGLE_TO_LOGIN;

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
                    AUTH_MESSAGES.REQUIRED_FIELDS;
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
                        AUTH_MESSAGES.INVALID_CREDENTIALS;
                    DOM.authError.classList.remove("auth-success");
                    DOM.authError.classList.add("auth-error");
                    return;
                }

                this.authService.setCurrentUser(username);
                onLoginSuccess();
            } else {
                if (users.find(u => u.username === username)) {
                    DOM.authError.textContent =
                        AUTH_MESSAGES.USER_EXISTS;
                    DOM.authError.classList.remove("auth-success");
                    DOM.authError.classList.add("auth-error");
                    return;
                }
                users.push({ username, password });
                this.authService.setUsers(users);
                this.isLoginMode = true;
                DOM.authTitle.textContent = QUIZ_LABELS.LOGIN;
                DOM.authSubmit.textContent = QUIZ_LABELS.LOGIN;
                DOM.toggleAuth.textContent =
                    QUIZ_LABELS.TOGGLE_TO_REGISTER;
                DOM.authUsername.value = "";
                DOM.authPassword.value = "";
                DOM.authError.textContent =
                    AUTH_MESSAGES.REGISTER_SUCCESS;
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
