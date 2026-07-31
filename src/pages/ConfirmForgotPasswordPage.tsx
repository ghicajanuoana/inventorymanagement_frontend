import { useState } from "react";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmForgotPassword } from "../api/authApi";
import AuthPage from "../components/auth/AuthPage";

export default function ConfirmForgotPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setMessage("");
        if (!token) return setError("The password reset link is invalid.");
        if (newPassword.length < 8) return setError("Password must be at least 8 characters long.");
        if (newPassword !== confirmPassword) return setError("The passwords do not match.");
        setIsLoading(true);
        try {
            setMessage((await confirmForgotPassword({ token, newPassword })).message);
        } catch {
            setError("The password could not be changed. The link may be invalid or expired.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthPage
            title="Create a new password"
            description="Choose a secure password with at least eight characters."
        >
            {!token ? (
                <Stack spacing={2}>
                    <Alert severity="error">The password reset link is invalid.</Alert>
                    <Button variant="contained" onClick={() => navigate("/forgot-password")}>
                        Request another link
                    </Button>
                </Stack>
            ) : (
                <Stack component="form" onSubmit={handleSubmit} spacing={2}>
                    <TextField label="New password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} slotProps={{ htmlInput: { minLength: 8 } }} required />
                    <TextField label="Confirm new password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} slotProps={{ htmlInput: { minLength: 8 } }} required />
                    {error && <Alert severity="error">{error}</Alert>}
                    {message && <Alert severity="success">{message}</Alert>}
                    <Button type="submit" variant="contained" size="large" disabled={isLoading}>
                        {isLoading ? "Changing password..." : "Change password"}
                    </Button>
                    {message && <Button onClick={() => navigate("/login")}>Go to login</Button>}
                </Stack>
            )}
        </AuthPage>
    );
}
