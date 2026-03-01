export function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export function formatTime(seconds) {
    return `${seconds}s`;
}

export function safeParse(value, fallback = []) {
    try {
        return JSON.parse(value) || fallback;
    } catch {
        return fallback;
    }
}