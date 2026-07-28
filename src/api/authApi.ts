import axiosInstance from "./axiosInstance";
import type {
    LoginRequest,
    LoginResponse
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