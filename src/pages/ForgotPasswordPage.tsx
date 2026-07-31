import { useState } from "react";
import { Alert, Button, Stack, TextField } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/authApi";
import AuthPage from "../components/auth/AuthPage";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("");
        setError("");
        setIsLoading(true);
        try {
            setMessage((await forgotPassword({ email })).message);
        } catch {
            setError("The password recovery request could not be sent.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthPage
            title="Forgot password"
            description="Enter your email address and we will send you a secure password recovery link."
        >
            <Stack component="form" onSubmit={handleSubmit} spacing={2}>
                <TextField
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    fullWidth
                />
                {message && <Alert severity="success">{message}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
                <Button type="submit" variant="contained" size="large" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send recovery email"}
                </Button>
                <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate("/login")}>
                    Back to login
                </Button>
            </Stack>
        </AuthPage>
    );
}
