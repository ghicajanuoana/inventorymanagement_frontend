import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";

interface PageProps {
    title: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
}

export default function Page({
    title,
    description,
    action,
    children
}: PageProps) {
    return (
        <Stack spacing={3}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "space-between",
                    gap: 2
                }}
            >
                <Box>
                    <Typography component="h1" variant="h4">
                        {title}
                    </Typography>
                    {description && (
                        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                            {description}
                        </Typography>
                    )}
                </Box>
                {action}
            </Stack>
            {children}
        </Stack>
    );
}
