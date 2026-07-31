import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
    cssVariables: true,
    palette: {
        primary: { main: "#2563eb", dark: "#1d4ed8" },
        secondary: { main: "#0f766e" },
        background: { default: "#f6f8fc", paper: "#ffffff" },
        text: { primary: "#172033", secondary: "#64748b" }
    },
    shape: { borderRadius: 12 },
    typography: {
        fontFamily: '"Inter", "Segoe UI", Roboto, Arial, sans-serif',
        h1: { fontWeight: 800, letterSpacing: "-0.035em" },
        h2: { fontWeight: 750, letterSpacing: "-0.025em" },
        h3: { fontWeight: 700 }
    },
    components: {
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: { textTransform: "none", fontWeight: 700, borderRadius: 10 }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: { backgroundImage: "none", borderColor: "#e7eaf0" }
            }
        },
        MuiTextField: {
            defaultProps: { size: "small", variant: "outlined" }
        },
        MuiAlert: {
            styleOverrides: { root: { borderRadius: 10 } }
        }
    }
});

export default appTheme;
