import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signIn } from "./authAcion";

import { getCookie, setCookie, removeCookie } from "@/utils/Cookies/cookies";

import { toast } from "react-hot-toast";


interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isEmployee: boolean;
    isLoading: boolean;
    error: string | null;
}

const localUser = getCookie<User>("user");
const token = getCookie<string>("token");
const isEmployee = getCookie<boolean>("isEmployee");

const initialState: AuthState = {
    user: localUser || null,
    token: token || null,
    isEmployee: isEmployee === true || String(isEmployee).toLowerCase() === "true",
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isEmployee = false;

            removeCookie("user");
            removeCookie("token");
            removeCookie("isEmployee");

            toast.success("Logged out successfully");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(
                signIn.fulfilled,
                (state, action: PayloadAction<{ user: User; token: string }>) => {
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.isEmployee = true;
                    state.isLoading = false;
                    state.error = null;

                    setCookie("user", action.payload.user, { path: "/" });
                    setCookie("token", action.payload.token, { path: "/" });
                    setCookie("isEmployee", true, { path: "/" });
                }
            )
            .addCase(signIn.rejected, (state, action) => {
                state.user = null;
                state.token = null;
                state.isEmployee = false;
                state.isLoading = false;
                state.error = action.payload?.errorMessage || action.error.message || "Login failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// Export types for reuse
export type { User, AuthState };
