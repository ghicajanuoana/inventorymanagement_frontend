import axiosInstance from "./axiosInstance";
import type {
    LoginRequest,
    LoginResponse,
    ForgotPasswordRequest,
    ConfirmForgotPasswordRequest,
    MessageResponse
} from "../types/auth";

export async function login(
    credentials: LoginRequest
): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
        "/api/auth/login",
        credentials
    );

    return response.data;
}


export async function forgotPassword(
    request: ForgotPasswordRequest
): Promise<MessageResponse> {
    const response =
        await axiosInstance.post<MessageResponse>(
            "/api/auth/forgot-password",
            request
        );

    return response.data;
}

export async function confirmForgotPassword(
    request: ConfirmForgotPasswordRequest
): Promise<MessageResponse> {
    const response =
        await axiosInstance.post<MessageResponse>(
            "/api/auth/forgot-password/confirm",
            request
        );

    return response.data;
}