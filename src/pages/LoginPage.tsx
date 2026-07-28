import { useLocation } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

interface LoginLocationState {
    message?: string;
}

function LoginPage() {
    const location = useLocation();

    const state =
        location.state as LoginLocationState | null;

    const navigate = useNavigate();
    
    return (
        <main>
            <section>
                <h1>Inventory Management</h1>
                <h2>Login</h2>

                {state?.message && (
                    <p>{state.message}</p>
                )}

                <LoginForm />
                <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                >
                Forgot password?
                </button>
            </section>
        </main>
    );
}

export default LoginPage;