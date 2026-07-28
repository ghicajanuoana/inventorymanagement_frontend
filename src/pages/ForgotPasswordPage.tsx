import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/authApi";

function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setMessage("");
        setError("");
        setIsLoading(true);

        try {
            const response = await forgotPassword({
                email: email
            });

            setMessage(response.message);
        } catch {
            setError(
                "The password recovery request could not be sent."
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Forgot password</h1>

                <p>
                    Enter your email address and we will send
                    you a password recovery link.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    {message && (
                        <p className="success-message">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Sending..."
                            : "Send recovery email"}
                    </button>
                </form>

                <button
                    type="button"
                    onClick={() => navigate("/login")}
                >
                    Back to login
                </button>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;