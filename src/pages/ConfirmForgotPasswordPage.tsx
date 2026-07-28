import { useState } from "react";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import { confirmForgotPassword } from "../api/authApi";

function ConfirmForgotPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!token) {
            setError("The password reset link is invalid.");
            return;
        }

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

        setIsLoading(true);

        try {
            const response =
                await confirmForgotPassword({
                    token,
                    newPassword
                });

            setMessage(response.message);
        } catch {
            setError(
                "The password could not be changed. The link may be invalid or expired."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Change password</h1>

                {!token ? (
                    <>
                        <p className="error-message">
                            The password reset link is invalid.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/forgot-password")
                            }
                        >
                            Request another link
                        </button>
                    </>
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
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
                                    Confirm password
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

                        {message && (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                Go to login
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ConfirmForgotPasswordPage;