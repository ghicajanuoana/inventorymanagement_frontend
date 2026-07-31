import type { ReactNode } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

interface AuthPageProps {
    title: string;
    description: string;
    children: ReactNode;
}

export default function AuthPage({ title, description, children }: AuthPageProps) {
    return (
        <Box
            component="main"
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                p: 2,
                background:
                    "radial-gradient(circle at 20% 10%, rgba(37,99,235,.12), transparent 35%), #f6f8fc"
            }}
        >
            <Card variant="outlined" sx={{ width: "100%", maxWidth: 480, boxShadow: 3 }}>
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Stack spacing={2.5}>
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                display: "grid",
                                placeItems: "center",
                                borderRadius: 2.5,
                                bgcolor: "primary.main",
                                color: "common.white"
                            }}
                        >
                            <Inventory2RoundedIcon />
                        </Box>
                        <Box>
                            <Typography component="h1" variant="h4">{title}</Typography>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                {description}
                            </Typography>
                        </Box>
                        {children}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
