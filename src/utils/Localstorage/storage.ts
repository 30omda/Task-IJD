
export function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}


export function getItem<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
        return JSON.parse(value) as T;
    } catch {
        return null;
    }
}


export function removeItem(key: string): void {
    localStorage.removeItem(key);
}


export function clear(): void {
    for (let key in localStorage) {
        if (key !== "selectedLanguage" && key !== "i18nextLng") {
            localStorage.removeItem(key);
        }
    }
}


export interface StorageUser {
    id: string;
    name: string;
    email: string;
}


export type StorageItems = {
    token: string;
    user: StorageUser;
    isEmployee: boolean;
};
