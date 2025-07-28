
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { StorageUser } from '@/utils/Cookies/cookies';

export function middleware(request: NextRequest): NextResponse {
    const token = request.cookies.get("token")?.value;
    const userCookie = request.cookies.get("user")?.value;
    const isEmployee = request.cookies.get("isEmployee")?.value;

    let user: StorageUser | null = null;
    if (userCookie) {
        try {
            user = JSON.parse(userCookie) as StorageUser;
        } catch (error) {
            console.error('Error parsing user cookie:', error);
        }
    }

    const isAuth = Boolean(token && user && isEmployee === "true");
    const isLoginPage = request.nextUrl.pathname === "/login";

    if (!isAuth && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuth && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard", "/products", "/settings", "/login"],
};
