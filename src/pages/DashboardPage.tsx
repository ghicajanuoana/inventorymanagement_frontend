import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/tokenStorage";

function DashboardPage() {
    const navigate = useNavigate();

    function handleLogout() {
        removeToken();
        navigate("/login");
    }

    return (
        <main>
            <h1>Dashboard</h1>

            <p>Welcome to the Inventory Management application.</p>
{/* 
            <button
                type="button"
                onClick={handleLogout}
            >
                Logout
            </button> */}
        </main>
    );
}

export default DashboardPage;