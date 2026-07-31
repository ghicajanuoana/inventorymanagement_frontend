import { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { Customer } from "../../types/customer";
import type { Product } from "../../types/product";
import type {
    SalesOrderItemRequest,
    SalesOrderRequest
} from "../../types/salesOrder";

interface SalesOrderFormProps {
    products: Product[];
    customers: Customer[];
    onCreate: (request: SalesOrderRequest) => Promise<void>;
}

const emptyItem = (): SalesOrderItemRequest => ({
    productId: 0,
    quantity: 1
});

export default function SalesOrderForm({
    products,
    customers,
    onCreate
}: SalesOrderFormProps) {
    const [customerId, setCustomerId] = useState(0);
    const [items, setItems] = useState([emptyItem()]);
    const [submitting, setSubmitting] = useState(false);

    function updateItem(index: number, field: keyof SalesOrderItemRequest, value: number) {
        setItems((current) =>
            current.map((item, itemIndex) =>
                itemIndex === index ? { ...item, [field]: value } : item
            )
        );
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        try {
            await onCreate({ customerId, items });
            setCustomerId(0);
            setItems([emptyItem()]);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Create sales order</Typography>
                <Stack component="form" onSubmit={handleSubmit} spacing={2}>
                    <TextField
                        select
                        label="Customer"
                        value={customerId}
                        onChange={(event) => setCustomerId(Number(event.target.value))}
                        required
                        sx={{ maxWidth: 420 }}
                    >
                        <MenuItem value={0} disabled>Select a customer</MenuItem>
                        {customers.map((customer) => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.firstName} {customer.lastName}
                            </MenuItem>
                        ))}
                    </TextField>

                    {items.map((item, index) => (
                        <Stack
                            key={index}
                            direction={{ xs: "column", md: "row" }}
                            spacing={1.5}
                            sx={{ alignItems: { md: "center" } }}
                        >
                            <TextField
                                select
                                label="Product"
                                value={item.productId}
                                onChange={(event) => updateItem(index, "productId", Number(event.target.value))}
                                required
                                sx={{ flex: 2 }}
                            >
                                <MenuItem value={0} disabled>Select a product</MenuItem>
                                {products.map((product) => (
                                    <MenuItem key={product.id} value={product.id}>
                                        {product.name} — {product.quantity} available
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Quantity"
                                type="number"
                                value={item.quantity}
                                onChange={(event) => updateItem(index, "quantity", Number(event.target.value))}
                                slotProps={{ htmlInput: { min: 1 } }}
                                required
                                sx={{ flex: 1 }}
                            />
                            <IconButton
                                color="error"
                                aria-label="Remove item"
                                disabled={items.length === 1}
                                onClick={() => setItems((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                            >
                                <DeleteOutlineRoundedIcon />
                            </IconButton>
                        </Stack>
                    ))}

                    <Stack direction="row" spacing={1.5}>
                        <Button startIcon={<AddRoundedIcon />} onClick={() => setItems((current) => [...current, emptyItem()])}>
                            Add item
                        </Button>
                        <Button type="submit" variant="contained" disabled={submitting || customerId === 0}>
                            {submitting ? "Creating..." : "Create order"}
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
