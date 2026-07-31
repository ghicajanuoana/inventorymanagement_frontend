import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Alert,
    CircularProgress,
    FormControl,
    FormLabel,
    Link,
    TextField
} from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { login } from "../../api/authApi";
import {
    saveRole,
    saveToken
} from "../../utils/tokenStorage";
import {
    LoginDescription,
    LoginFormFields,
    LoginLockMark,
    LoginSubmitButton,
    LoginTitle,
    PasswordLabelRow,
    StyledLoginCard
} from "./loginStyles";

interface LoginFormProps {
    message?: string;
    onForgotPassword: () => void;
}

function LoginForm({
    message,
    onForgotPassword
}: LoginFormProps) {
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
            saveRole(response.role);

            navigate("/dashboard");
        } catch {
            setError("Invalid username or password.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <StyledLoginCard
            variant="outlined"
        >
            <LoginLockMark>
                <LockRoundedIcon />
            </LoginLockMark>

            <LoginTitle>
                Welcome back
            </LoginTitle>
            <LoginDescription
                color="text.secondary"
            >
                Sign in to continue to your inventory workspace.
            </LoginDescription>

            {message && (
                <Alert severity="info" sx={{ mb: 2.5 }}>
                    {message}
                </Alert>
            )}

            <LoginFormFields
                onSubmit={handleSubmit}
            >
                <FormControl>
                    <FormLabel htmlFor="username" sx={{ mb: 0.75 }}>
                        Username
                    </FormLabel>
                    <TextField
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) =>
                            setUsername(event.target.value)
                        }
                        autoComplete="username"
                        autoFocus
                        required
                        fullWidth
                    />
                </FormControl>

                <FormControl>
                    <PasswordLabelRow>
                        <FormLabel htmlFor="password">
                            Password
                        </FormLabel>
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            underline="hover"
                            onClick={onForgotPassword}
                            sx={{ fontWeight: 600 }}
                        >
                            Forgot password?
                        </Link>
                    </PasswordLabelRow>
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        autoComplete="current-password"
                        required
                        fullWidth
                    />
                </FormControl>

                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}

                <LoginSubmitButton
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <CircularProgress
                                size={20}
                                color="inherit"
                                sx={{ mr: 1 }}
                            />
                            Logging in...
                        </>
                    ) : (
                        "Sign in"
                    )}
                </LoginSubmitButton>
            </LoginFormFields>
        </StyledLoginCard>
    );
}

export default LoginForm;
