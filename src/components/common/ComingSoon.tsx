import { Card, CardContent, Stack, Typography } from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import Page from "./Page";

interface ComingSoonProps {
    title: string;
    description: string;
}

export default function ComingSoon({
    title,
    description
}: ComingSoonProps) {
    return (
        <Page title={title} description={description}>
            <Card variant="outlined">
                <CardContent>
                    <Stack
                        spacing={1.5}
                        sx={{
                            minHeight: 280,
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center"
                        }}
                    >
                        <ConstructionRoundedIcon
                            color="primary"
                            sx={{ fontSize: 44 }}
                        />
                        <Typography variant="h6">Module coming soon</Typography>
                        <Typography color="text.secondary" sx={{ maxWidth: 440 }}>
                            The workspace is ready for this module&apos;s data
                            and workflows when its backend functionality is connected.
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Page>
    );
}
