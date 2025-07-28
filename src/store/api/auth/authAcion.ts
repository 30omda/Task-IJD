import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstanse";
import Api from "@/store/endpoints";
import toast from "react-hot-toast";
import { setItem } from "@/utils/Localstorage/storage";

// types
interface LoginPayload {
    email: string;
    password: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    // ضيف أي properties تانية على حسب الـ API response
}

interface LoginResponse {
    token: string;
    user: User;
}

interface RejectPayload {
    errorMessage: string;
    error: any;
}

export const signIn = createAsyncThunk<
    LoginResponse,        // return type
    LoginPayload,         // input type
    { rejectValue: RejectPayload }  // error type
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
        } catch (error: any ) {
            const errorMessage =
                error?.response?.data?.meta || error?.message || "Login failed";
            toast.error(errorMessage);

            return rejectWithValue({ errorMessage, error });
        }
    }
);
