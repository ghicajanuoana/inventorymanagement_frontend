import { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

interface RemoveStockFormProps {
    removeStock: (quantity: number, reason: string) => Promise<void>;
}

export default function RemoveStockForm({ removeStock }: RemoveStockFormProps) {
    const [quantity, setQuantity] = useState("");
    const [reason, setReason] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await removeStock(Number(quantity), reason);
        setQuantity("");
        setReason("");
    }

    return (
        <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Remove stock</Typography>
            <Stack component="form" onSubmit={handleSubmit} spacing={1.5}>
                <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    slotProps={{ htmlInput: { min: 1 } }}
                    required
                />
                <TextField
                    label="Reason"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    required
                />
                <Button type="submit" variant="outlined" color="warning" startIcon={<RemoveRoundedIcon />}>
                    Remove stock
                </Button>
            </Stack>
        </Paper>
    );
}
