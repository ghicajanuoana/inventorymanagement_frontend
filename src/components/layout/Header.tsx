import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{ borderBottom: 1, borderColor: "divider" }}
        >
            <Toolbar>
                <IconButton
                    onClick={onMenuClick}
                    edge="start"
                    aria-label="Open navigation"
                    sx={{ display: { md: "none" }, mr: 1 }}
                >
                    <MenuRoundedIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                    Inventory workspace
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
