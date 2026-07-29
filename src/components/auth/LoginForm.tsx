import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import { saveToken } from "../../utils/tokenStorage";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const response = await login({
                username: username,
                password: password
            });

            saveToken(response.token);

            navigate("/dashboard");
        } catch {
            setError("Invalid username or password.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">
                    Username
                </label>

                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                    required
                />
            </div>

            <div>
                <label htmlFor="password">
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                    required
                />
            </div>

            {error && (
                <p>{error}</p>
            )}

            <button
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}

export default LoginForm;