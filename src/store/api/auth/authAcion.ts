import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstanse";
import Api from "@/store/endpoints";
import toast from "react-hot-toast";
import { setItem } from "@/utils/Localstorage/storage";
import { AxiosError } from "axios";

// types
interface LoginPayload {
    email: string;
    password: string;
}

interface User {
    id: string;
    name: string;
    email: string;

}

interface LoginResponse {
    token: string;
    user: User;
}

interface ApiErrorResponse {
    meta?: string;
    message?: string;
}

interface RejectPayload {
    errorMessage: string;
    error: AxiosError<ApiErrorResponse>;
}

export const signIn = createAsyncThunk<
    LoginResponse,
    LoginPayload,
    { rejectValue: RejectPayload }
>(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const loginResponse = await axiosInstance.post(Api.login, {
                email,
                password,
                isEmployee: true,
            });

            const { token } = loginResponse.data;
            toast.success("Login successful");
            setItem("token", token);

            const userResponse = await axiosInstance.get(Api.userInfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const userData: User = userResponse.data;
            setItem("user", userData);
            setItem("isEmployee", true);

            return {
                token,
                user: userData,
            };
        } catch (error) {
            const axiosError = error as AxiosError<ApiErrorResponse>;
            const errorMessage =
                axiosError.response?.data?.meta ||
                axiosError.response?.data?.message ||
                axiosError.message ||
                "Login failed";
            toast.error(errorMessage);

            return rejectWithValue({ errorMessage, error: axiosError });
        }
    }
);
