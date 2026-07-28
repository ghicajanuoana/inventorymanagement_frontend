export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    tokenType: string;
    userId: number;
    username: string;
    role: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ConfirmForgotPasswordRequest {
    token: string;
    newPassword: string;
}

export interface MessageResponse {
    message: string;
}

export interface ResetPasswordRequest {
    currentPassword: string;
    newPassword: string;
}