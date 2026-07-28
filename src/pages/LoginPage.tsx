import { useLocation } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

interface LoginLocationState {
    message?: string;
}

function LoginPage() {
    const location = useLocation();

    const state =
        location.state as LoginLocationState | null;

    return (
        <main>
            <section>
                <h1>Inventory Management</h1>
                <h2>Login</h2>

                {state?.message && (
                    <p>{state.message}</p>
                )}

                <LoginForm />
            </section>
        </main>
    );
}

export default LoginPage;