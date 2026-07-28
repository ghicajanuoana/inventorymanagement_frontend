import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { resetOwnPassword } from "../api/userApi";

function ChangePasswordPage() {
    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] =
        useState(false);

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setMessage("");
        setError("");

        if (newPassword.length < 8) {
            setError(
                "Password must be at least 8 characters long."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("The passwords do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            setError(
                "New password must be different from the current password."
            );
            return;
        }

        setIsLoading(true);

        try {
            const response =
                await resetOwnPassword({
                    currentPassword,
                    newPassword
                });

            setMessage(response.message);

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            navigate("/dashboard");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(
                    error.response?.data?.message ??
                    error.response?.data?.detail ??
                    "The password could not be changed."
                );
            } else {
                setError(
                    "The password could not be changed."
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="page-container">
            <h1>Change password</h1>

            <form
                onSubmit={handleSubmit}
                className="change-password-form"
            >
                <div className="form-group">
                    <label htmlFor="current-password">
                        Current password
                    </label>

                    <input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(event) =>
                            setCurrentPassword(
                                event.target.value
                            )
                        }
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="new-password">
                        New password
                    </label>

                    <input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(event) =>
                            setNewPassword(
                                event.target.value
                            )
                        }
                        minLength={8}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-password">
                        Confirm new password
                    </label>

                    <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(
                                event.target.value
                            )
                        }
                        minLength={8}
                        required
                    />
                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Changing password..."
                        : "Change password"}
                </button>
            </form>
        </div>
    );
}

export default ChangePasswordPage;