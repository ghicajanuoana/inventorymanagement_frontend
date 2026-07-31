import type { ReactNode } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

interface DashboardCardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    color?: string;
}

export default function DashboardCard({
    title,
    value,
    icon,
    color = "#2563eb"
}: DashboardCardProps) {
    return (
        <Card variant="outlined">
            <CardContent>
                <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
                            {value}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: 2.5,
                            color,
                            bgcolor: `${color}14`
                        }}
                    >
                        {icon}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
