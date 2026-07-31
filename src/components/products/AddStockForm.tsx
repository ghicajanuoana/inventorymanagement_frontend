import { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface AddStockFormProps {
    productId: number;
    addStock: (productId: number, quantity: number, reason: string) => Promise<void>;
    closeForm: () => void;
}

export default function AddStockForm({
    productId,
    addStock,
    closeForm
}: AddStockFormProps) {
    const [quantity, setQuantity] = useState(1);
    const [reason, setReason] = useState("");

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        if (quantity <= 0) return;
        try {
            await addStock(productId, quantity, reason);
            setQuantity(1);
            setReason("");
            closeForm();
        } catch {
            // ProductsPage displays the error.
        }
    }

    return (
        <Paper variant="outlined" sx={{ p: 2, flex: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Add stock</Typography>
            <Stack component="form" onSubmit={handleSubmit} spacing={1.5}>
                <TextField
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(event) => setQuantity(Number(event.target.value))}
                    slotProps={{ htmlInput: { min: 1 } }}
                    required
                />
                <TextField
                    label="Reason"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="For example: New delivery"
                    required
                />
                <Button type="submit" variant="contained" startIcon={<AddRoundedIcon />}>
                    Add stock
                </Button>
            </Stack>
        </Paper>
    );
}
