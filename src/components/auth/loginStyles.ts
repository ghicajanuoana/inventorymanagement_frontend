import {
    Box,
    Button,
    Card,
    Stack,
    Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoginPageRoot = styled("main")(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: theme.spacing(6, 4),
    background:
        "radial-gradient(circle at 15% 10%, rgba(37, 99, 235, 0.12), transparent 32%), linear-gradient(135deg, #f8fbff 0%, #ffffff 48%, #f4f7fb 100%)",

    "&::after": {
        content: '""',
        position: "absolute",
        width: 420,
        height: 420,
        borderRadius: "50%",
        right: -180,
        bottom: -220,
        background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(14, 165, 233, 0.04))"
    },

    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(4, 2)
    }
}));

export const LoginPageContent = styled(Stack)(({ theme }) => ({
    width: "100%",
    maxWidth: 1120,
    marginInline: "auto",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    flexDirection: "column-reverse",
    gap: theme.spacing(6),

    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        gap: theme.spacing(10)
    },

    [theme.breakpoints.up("lg")]: {
        gap: theme.spacing(14)
    }
}));

export const LoginInformation = styled(Stack)(({ theme }) => ({
    width: "100%",
    maxWidth: 500,
    gap: theme.spacing(4)
}));

export const BrandRow = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(1.5)
}));

export const BrandMark = styled(Box)(({ theme }) => ({
    display: "grid",
    placeItems: "center",
    width: 42,
    height: 42,
    borderRadius: theme.spacing(2.5),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0 10px 24px rgba(37, 99, 235, 0.25)"
}));

export const LoginHeadline = styled("h1")(({ theme }) => ({
    marginTop: 0,
    fontSize: "2rem",
    lineHeight: 1.12,
    letterSpacing: "-0.035em",
    fontWeight: 800,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1.5),

    [theme.breakpoints.up("sm")]: {
        fontSize: "2.65rem"
    }
}));

export const LoginIntroduction = styled(Typography)({
    maxWidth: 460,
    lineHeight: 1.75
});

export const Highlights = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(2.5)
}));

export const HighlightRow = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.spacing(2)
}));

export const HighlightIcon = styled(Box)(({ theme }) => ({
    display: "grid",
    placeItems: "center",
    flex: "0 0 auto",
    width: 36,
    height: 36,
    borderRadius: theme.spacing(2),
    color: theme.palette.primary.main,
    backgroundColor: "rgba(37, 99, 235, 0.08)",

    "& svg": {
        fontSize: 20
    }
}));

export const StyledLoginCard = styled(Card)(({ theme }) => ({
    width: "100%",
    maxWidth: 450,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(4),
    borderColor: "rgba(15, 23, 42, 0.09)",
    backgroundImage: "none",
    boxShadow:
        "0 24px 70px rgba(15, 23, 42, 0.10), 0 4px 18px rgba(15, 23, 42, 0.05)",

    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3)
    }
}));

export const LoginLockMark = styled(Box)(({ theme }) => ({
    display: "grid",
    placeItems: "center",
    width: 44,
    height: 44,
    borderRadius: theme.spacing(2.5),
    color: theme.palette.primary.main,
    backgroundColor: "rgba(37, 99, 235, 0.09)",
    marginBottom: theme.spacing(2.5)
}));

export const LoginTitle = styled("h2")({
    margin: 0,
    fontSize: "2.125rem",
    lineHeight: 1.235,
    fontWeight: 800,
    letterSpacing: "-0.03em"
});

export const LoginDescription = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
}));

export const LoginFormFields = styled("form")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2.5)
}));

export const PasswordLabelRow = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(0.75)
}));

export const LoginSubmitButton = styled(Button)({
    minHeight: 48,
    borderRadius: 16,
    textTransform: "none",
    fontWeight: 700,
    boxShadow: "0 8px 20px rgba(37, 99, 235, 0.22)"
});
