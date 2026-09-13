import { useState } from "react";
import { Alert, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";

interface DamagedStockFormProps {
    availableQuantity: number;
    reportDamagedStock: (quantity: number, reason: string) => Promise<void>;
}

export default function DamagedStockForm({
    availableQuantity,
    reportDamagedStock
}: DamagedStockFormProps) {
    const [quantity, setQuantity] = useState("");
    const [reason, setReason] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const damagedQuantity = Number(quantity);
        if (damagedQuantity > availableQuantity) {
            setValidationMessage(
                `Damaged quantity cannot exceed the ${availableQuantity} units available.`
            );
            return;
        }

        setValidationMessage("");

        try {
            await reportDamagedStock(damagedQuantity, reason.trim());
            setQuantity("");
            setReason("");
        } catch {
            // ProductsPage displays the backend error.
        }
    }

    return (
        <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Report damaged stock</Typography>
            <Stack component="form" onSubmit={handleSubmit} spacing={1.5}>
                {validationMessage && (
                    <Alert severity="error">{validationMessage}</Alert>
                )}
                <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(event) => {
                        setQuantity(event.target.value);
                        setValidationMessage("");
                    }}
                    slotProps={{ htmlInput: { min: 1, max: availableQuantity } }}
                    helperText={`${availableQuantity} units available`}
                    disabled={availableQuantity === 0}
                    required
                />
                <TextField
                    label="Reason"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="For example: Damaged during handling"
                    disabled={availableQuantity === 0}
                    required
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="error"
                    startIcon={<ReportProblemRoundedIcon />}
                    disabled={availableQuantity === 0}
                >
                    Report damaged
                </Button>
            </Stack>
        </Paper>
    );
}
