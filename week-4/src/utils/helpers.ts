export function shuffle<T>(array: T[]): void {
    array.sort(() => Math.random() - 0.5);
}

export function formatTime(seconds: number): string {
    return `${seconds}s`;
}

export function safeParse<T>(value: string | null, fallback: T): T {
    try {
        if (!value) {
            return fallback;
        }
        return (JSON.parse(value) as T) || fallback;
    } catch {
        return fallback;
    }
}
