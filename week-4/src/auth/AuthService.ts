import { STORAGE_KEYS } from "../constants/storageKeys.js";
import { safeParse } from "../utils/helpers.js";
import type { UserCredentials } from "../types/models.js";

export default class AuthService {
    getUsers(): UserCredentials[] {
        return safeParse<UserCredentials[]>(
            localStorage.getItem(STORAGE_KEYS.USERS),
            []
        );
    }

    setUsers(users: UserCredentials[]): void {
        localStorage.setItem(
            STORAGE_KEYS.USERS,
            JSON.stringify(users)
        );
    }

    getCurrentUser(): string | null {
        return localStorage.getItem(
            STORAGE_KEYS.CURRENT_USER
        );
    }

    setCurrentUser(username: string): void {
        localStorage.setItem(
            STORAGE_KEYS.CURRENT_USER,
            username
        );
    }

    logout(): void {
        localStorage.removeItem(
            STORAGE_KEYS.CURRENT_USER
        );
    }
}
