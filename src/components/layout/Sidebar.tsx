import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/tokenStorage";

function Sidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        removeToken();
        navigate("/login");
    }

    return (
        <aside>
            <h2>Inventory Management</h2>

            <nav>
                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/products">
                    Products
                </NavLink>

                <NavLink to="/categories">
                    Categories
                </NavLink>

                <NavLink to="/suppliers">
                    Suppliers
                </NavLink>

                <NavLink to="/purchase-orders">
                    Purchase Orders
                </NavLink>

                <NavLink to="/sales-orders">
                    Sales Orders
                </NavLink>
            </nav>

            <button
                type="button"
                onClick={handleLogout}
            >
                Logout
            </button>
        </aside>
    );
}

export default Sidebar;