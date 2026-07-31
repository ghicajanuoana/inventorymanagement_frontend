import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress } from "@mui/material";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import { getDashboard } from "../api/dashboardApi";
import type { Dashboard } from "../types/dashboard";
import DashboardCard from "../components/dashboard/DashboardCard";
import Page from "../components/common/Page";

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchDashboard() {
            try {
                setDashboard(await getDashboard());
            } catch {
                setError("Could not load dashboard data.");
            }
        }
        fetchDashboard();
    }, []);

    const cards = dashboard ? [
        ["Total Products", dashboard.totalProducts, <Inventory2RoundedIcon key="products" />, "#2563eb"],
        ["Total Customers", dashboard.totalCustomers, <PeopleRoundedIcon key="customers" />, "#7c3aed"],
        ["Total Suppliers", dashboard.totalSuppliers, <LocalShippingRoundedIcon key="suppliers" />, "#0f766e"],
        ["Purchase Orders", dashboard.totalPurchaseOrders, <ShoppingCartRoundedIcon key="purchases" />, "#0284c7"],
        ["Sales Orders", dashboard.totalSalesOrders, <ReceiptLongRoundedIcon key="sales" />, "#4f46e5"],
        ["Pending Sales", dashboard.pendingSalesOrders, <PendingActionsRoundedIcon key="pending" />, "#d97706"],
        ["Completed Sales", dashboard.completedSalesOrders, <TaskAltRoundedIcon key="completed" />, "#16a34a"],
        ["Low Stock", dashboard.lowStockProducts, <WarningAmberRoundedIcon key="stock" />, "#dc2626"],
        ["Inventory Value", dashboard.inventoryValue.toLocaleString(), <PaidRoundedIcon key="value" />, "#0891b2"]
    ] as const : [];

    return (
        <Page
            title="Dashboard"
            description="A real-time overview of your inventory operations."
        >
            {error && <Alert severity="error">{error}</Alert>}
            {!dashboard && !error ? (
                <Box sx={{ display: "grid", placeItems: "center", py: 12 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, minmax(0, 1fr))",
                            lg: "repeat(3, minmax(0, 1fr))"
                        },
                        gap: 2
                    }}
                >
                    {cards.map(([title, value, icon, color]) => (
                        <DashboardCard
                            key={title}
                            title={title}
                            value={value}
                            icon={icon}
                            color={color}
                        />
                    ))}
                </Box>
            )}
        </Page>
    );
}
