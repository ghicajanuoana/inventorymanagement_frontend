import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const drawerWidth = 270;

export default function AppLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": { width: drawerWidth }
                    }}
                >
                    <Sidebar onNavigate={() => setMobileOpen(false)} />
                </Drawer>
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            borderRightColor: "divider"
                        }
                    }}
                >
                    <Sidebar />
                </Drawer>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Header onMenuClick={() => setMobileOpen(true)} />
                <Box
                    component="main"
                    sx={{
                        maxWidth: 1440,
                        mx: "auto",
                        p: { xs: 2, sm: 3, lg: 4 }
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
