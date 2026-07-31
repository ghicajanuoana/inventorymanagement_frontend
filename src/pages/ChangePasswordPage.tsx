import { useState } from "react";
import axios from "axios";
import { Alert, Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { resetOwnPassword } from "../api/userApi";
import Page from "../components/common/Page";

export default function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("");
        setError("");
        if (newPassword.length < 8) return setError("Password must be at least 8 characters long.");
        if (newPassword !== confirmPassword) return setError("The passwords do not match.");
        if (currentPassword === newPassword) return setError("New password must be different from the current password.");
        setIsLoading(true);
        try {
            const response = await resetOwnPassword({ currentPassword, newPassword });
            setMessage(response.message);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            navigate("/dashboard");
        } catch (caught: unknown) {
            if (axios.isAxiosError(caught)) {
                setError(caught.response?.data?.message ?? caught.response?.data?.detail ?? "The password could not be changed.");
            } else {
                setError("The password could not be changed.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Page title="Change password" description="Update the password used to access your account.">
            <Card variant="outlined" sx={{ maxWidth: 560 }}>
                <CardContent>
                    <Stack component="form" onSubmit={handleSubmit} spacing={2}>
                        <TextField label="Current password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                        <TextField label="New password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} slotProps={{ htmlInput: { minLength: 8 } }} required />
                        <TextField label="Confirm new password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} slotProps={{ htmlInput: { minLength: 8 } }} required />
                        {error && <Alert severity="error">{error}</Alert>}
                        {message && <Alert severity="success">{message}</Alert>}
                        <Button type="submit" variant="contained" size="large" disabled={isLoading}>
                            {isLoading ? "Changing password..." : "Change password"}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Page>
    );
}
