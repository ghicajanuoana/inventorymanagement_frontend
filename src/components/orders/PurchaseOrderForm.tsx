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
import type { Product } from "../../types/product";
import type { Supplier } from "../../types/supplier";
import type {
    PurchaseOrderItemRequest,
    PurchaseOrderRequest
} from "../../types/purchaseOrder";

interface PurchaseOrderFormProps {
    products: Product[];
    suppliers: Supplier[];
    onCreate: (request: PurchaseOrderRequest) => Promise<void>;
}

const emptyItem = (): PurchaseOrderItemRequest => ({
    productId: 0,
    quantity: 1,
    unitPrice: 0
});

export default function PurchaseOrderForm({
    products,
    suppliers,
    onCreate
}: PurchaseOrderFormProps) {
    const [supplierId, setSupplierId] = useState(0);
    const [items, setItems] = useState([emptyItem()]);
    const [submitting, setSubmitting] = useState(false);

    function updateItem(
        index: number,
        field: keyof PurchaseOrderItemRequest,
        value: number
    ) {
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
            await onCreate({ supplierId, items });
            setSupplierId(0);
            setItems([emptyItem()]);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Create purchase order</Typography>
                <Stack component="form" onSubmit={handleSubmit} spacing={2}>
                    <TextField
                        select
                        label="Supplier"
                        value={supplierId}
                        onChange={(event) => setSupplierId(Number(event.target.value))}
                        required
                        sx={{ maxWidth: 420 }}
                    >
                        <MenuItem value={0} disabled>Select a supplier</MenuItem>
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
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
                                        {product.name} ({product.sku})
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
                            <TextField
                                label="Unit price"
                                type="number"
                                value={item.unitPrice}
                                onChange={(event) => updateItem(index, "unitPrice", Number(event.target.value))}
                                slotProps={{ htmlInput: { min: 0.01, step: 0.01 } }}
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
                        <Button type="submit" variant="contained" disabled={submitting || supplierId === 0}>
                            {submitting ? "Creating..." : "Create order"}
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}
