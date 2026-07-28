import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/tokenStorage";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({
    children
}: ProtectedRouteProps) {

    const token = getToken();

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    message: "You must log in to access this page."
                }}
            />
        );
    }

    return children;
}

export default ProtectedRoute;