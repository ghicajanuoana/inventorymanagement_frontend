import axiosInstance from "./axiosInstance";

import type {
    MessageResponse,
    ResetPasswordRequest
} from "../types/auth";

export async function resetOwnPassword(
    request: ResetPasswordRequest
): Promise<MessageResponse> {
    const response =
        await axiosInstance.put<MessageResponse>(
            "/api/users/me/reset-password",
            request
        );

    return response.data;
}