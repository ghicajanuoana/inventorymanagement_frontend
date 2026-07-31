import {
    Box,
    CssBaseline,
    Typography
} from "@mui/material";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import {
    BrandMark,
    BrandRow,
    HighlightIcon,
    HighlightRow,
    Highlights,
    LoginHeadline,
    LoginInformation,
    LoginIntroduction,
    LoginPageContent,
    LoginPageRoot
} from "../components/auth/loginStyles";

interface LoginLocationState {
    message?: string;
}

function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LoginLocationState | null;

    const highlights = [
        {
            icon: <InsightsRoundedIcon />,
            title: "Clear inventory insights",
            description:
                "See stock levels, inventory value, and operational activity from one dashboard."
        },
        {
            icon: <Inventory2RoundedIcon />,
            title: "Reliable stock control",
            description:
                "Track every stock movement and identify low-stock products before they become a problem."
        },
        {
            icon: <LocalShippingRoundedIcon />,
            title: "Connected operations",
            description:
                "Keep products, suppliers, purchases, and sales organized in one workspace."
        },
        {
            icon: <ShieldRoundedIcon />,
            title: "Secure access",
            description:
                "Protected account access keeps your inventory information available to the right people."
        }
    ];

    return (
        <>
            <CssBaseline />
            <LoginPageRoot>
                <LoginPageContent>
                    <LoginInformation>
                        <BrandRow>
                            <BrandMark>
                                <Inventory2RoundedIcon />
                            </BrandMark>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 750 }}
                            >
                                Inventory Management
                            </Typography>
                        </BrandRow>

                        <Box>
                            <LoginHeadline>
                                Keep your inventory moving with confidence.
                            </LoginHeadline>
                            <LoginIntroduction
                                variant="body1"
                                color="text.secondary"
                            >
                                A focused workspace for monitoring products,
                                managing stock, and keeping daily inventory
                                operations under control.
                            </LoginIntroduction>
                        </Box>

                        <Highlights>
                            {highlights.map((item) => (
                                <HighlightRow key={item.title}>
                                    <HighlightIcon>
                                        {item.icon}
                                    </HighlightIcon>
                                    <Box>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                            sx={{ fontWeight: 700 }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ lineHeight: 1.6 }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </Box>
                                </HighlightRow>
                            ))}
                        </Highlights>
                    </LoginInformation>

                    <LoginForm
                        message={state?.message}
                        onForgotPassword={() => navigate("/forgot-password")}
                    />
                </LoginPageContent>
            </LoginPageRoot>
        </>
    );
}

export default LoginPage;
