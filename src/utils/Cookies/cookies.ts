import Cookies, { CookieAttributes } from "js-cookie";

export function setCookie<T>(
    key: string,
    value: T,
    options: CookieAttributes = {}
): void {
    Cookies.set(
        key,
        typeof value === "object" ? JSON.stringify(value) : String(value),
        options
    );
}

export function getCookie<T>(key: string): T | null {
    const value = Cookies.get(key);
    if (!value) return null;

    try {
        return JSON.parse(value) as T;
    } catch {
        return value as T;
    }
}


export function removeCookie(key: string, options: CookieAttributes = {}): void {
    Cookies.remove(key, options);
}


export interface StorageUser {
    id: string;
    name: string;
    email: string;
}

export type CookieItems = {
    token: string;
    user: StorageUser;
    isEmployee: boolean;
};
