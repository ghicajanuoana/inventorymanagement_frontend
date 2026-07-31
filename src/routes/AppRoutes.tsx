import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProductsPage from "../pages/ProductsPage";
import CategoriesPage from "../pages/CategoriesPage";
import SuppliersPage from "../pages/SuppliersPage";
import PurchaseOrdersPage from "../pages/PurchaseOrdersPage";
import SalesOrdersPage from "../pages/SalesOrdersPage";

import ProtectedRoute from "../components/common/ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ConfirmForgotPasswordPage from "../pages/ConfirmForgotPasswordPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import CustomersPage from "../pages/CustomersPage";

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/products"
                    element={<ProductsPage />}
                />

                <Route
                    path="/categories"
                    element={<CategoriesPage />}
                />

                <Route
                    path="/suppliers"
                    element={<SuppliersPage />}
                />

                <Route
                    path="/customers"
                    element={<CustomersPage />}
                />

                <Route
                    path="/purchase-orders"
                    element={<PurchaseOrdersPage />}
                />

                <Route
                    path="/sales-orders"
                    element={<SalesOrdersPage />}
                />

                <Route
                    path="/change-password"
                    element={<ChangePasswordPage />}
                />
            </Route>

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

            <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
            />
            <Route
                path="/forgot-password/confirm"
                element={<ConfirmForgotPasswordPage />}
            />

        </Routes>
    );
}

export default AppRoutes;
