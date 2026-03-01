import { STORAGE_KEYS } from "../constants/storageKeys.js";

export default class AuthService {
    getUsers() {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEYS.USERS)
        ) || [];
    }

    setUsers(users) {
        localStorage.setItem(
            STORAGE_KEYS.USERS,
            JSON.stringify(users)
        );
    }

    getCurrentUser() {
        return localStorage.getItem(
            STORAGE_KEYS.CURRENT_USER
        );
    }

    setCurrentUser(username) {
        localStorage.setItem(
            STORAGE_KEYS.CURRENT_USER,
            username
        );
    }

    logout() {
        localStorage.removeItem(
            STORAGE_KEYS.CURRENT_USER
        );
    }
}