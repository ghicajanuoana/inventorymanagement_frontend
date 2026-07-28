import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/tokenStorage";

import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";
import type { Dashboard } from "../types/dashboard";
import DashboardCard from "../components/dashboard/DashboardCard";
import "../styles/dashboard.css";

function DashboardPage() {
    const navigate = useNavigate();
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getDashboard();
                setDashboard(data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboard();
    }, []);

    return (
        <main>
            <h1>Dashboard</h1>

            {dashboard && (
                <div className="dashboard-grid">
                    <DashboardCard
                        title="Total Products"
                        value={dashboard.totalProducts}
                    />

                    <DashboardCard
                        title="Total Customers"
                        value={dashboard.totalCustomers}
                    />

                    <DashboardCard
                        title="Total Suppliers"
                        value={dashboard.totalSuppliers}
                    />

                    <DashboardCard
                        title="Total Purchase Orders"
                        value={dashboard.totalPurchaseOrders}
                    />

                    <DashboardCard
                        title="Total Sales Orders"
                        value={dashboard.totalSalesOrders}
                    />

                    <DashboardCard
                        title="Pending Sales Orders"
                        value={dashboard.pendingSalesOrders}
                    />

                    <DashboardCard
                        title="Completed Sales Orders"
                        value={dashboard.completedSalesOrders}
                    />

                    <DashboardCard
                        title="Low Stock Products"
                        value={dashboard.lowStockProducts}
                    />

                    <DashboardCard
                        title="Inventory Value"
                        value={dashboard.inventoryValue}
                    />
                </div>
            )}

        </main>
    );
}

export default DashboardPage;