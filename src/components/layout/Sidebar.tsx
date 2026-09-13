import {
    Box,
    Button,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import LockResetRoundedIcon from "@mui/icons-material/LockResetRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/tokenStorage";

interface SidebarProps {
    onNavigate?: () => void;
}

const navigation = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardRoundedIcon /> },
    { label: "Products", path: "/products", icon: <Inventory2RoundedIcon /> },
    { label: "Damaged Products", path: "/damaged-products", icon: <ReportProblemRoundedIcon /> },
    { label: "Categories", path: "/categories", icon: <CategoryRoundedIcon /> },
    { label: "Suppliers", path: "/suppliers", icon: <LocalShippingRoundedIcon /> },
    { label: "Customers", path: "/customers", icon: <PeopleRoundedIcon /> },
    { label: "Purchase Orders", path: "/purchase-orders", icon: <ShoppingCartRoundedIcon /> },
    { label: "Sales Orders", path: "/sales-orders", icon: <ReceiptLongRoundedIcon /> }
];

export default function Sidebar({ onNavigate }: SidebarProps) {
    const navigate = useNavigate();
    const location = useLocation();

    function goTo(path: string) {
        navigate(path);
        onNavigate?.();
    }

    function handleLogout() {
        removeToken();
        navigate("/login");
    }

    return (
        <Stack sx={{ height: "100%", p: 2 }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", px: 1, py: 1.5 }}>
                <Box
                    sx={{
                        width: 38,
                        height: 38,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        color: "common.white"
                    }}
                >
                    <Inventory2RoundedIcon fontSize="small" />
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: 800, lineHeight: 1.15 }}>Inventory</Typography>
                    <Typography variant="caption" color="text.secondary">Management system</Typography>
                </Box>
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            <List sx={{ flex: 1 }}>
                {navigation.map((item) => (
                    <ListItemButton
                        key={item.path}
                        selected={location.pathname === item.path}
                        onClick={() => goTo(item.path)}
                        sx={{ borderRadius: 2, mb: 0.5 }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>

            <Divider sx={{ mb: 1.5 }} />
            <Button
                color="inherit"
                startIcon={<LockResetRoundedIcon />}
                onClick={() => goTo("/change-password")}
                sx={{ justifyContent: "flex-start", mb: 0.5 }}
            >
                Change password
            </Button>
            <Button
                color="error"
                startIcon={<LogoutRoundedIcon />}
                onClick={handleLogout}
                sx={{ justifyContent: "flex-start" }}
            >
                Logout
            </Button>
        </Stack>
    );
}
