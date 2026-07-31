import { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type { ProductRequest } from "../../types/product";

interface ProductFormProps {
    addProduct: (product: ProductRequest) => Promise<void>;
}

export default function ProductForm({ addProduct }: ProductFormProps) {
    const [form, setForm] = useState<ProductRequest>({
        name: "",
        sku: "",
        description: "",
        quantity: 0,
        minimumStock: 0,
        price: 0,
        categoryId: 0,
        supplierId: 0
    });
    const [submitting, setSubmitting] = useState(false);

    function updateField(field: keyof ProductRequest, value: string) {
        setForm((current) => ({
            ...current,
            [field]: ["name", "sku", "description"].includes(field)
                ? value
                : Number(value)
        }));
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitting(true);
        try {
            await addProduct(form);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Add a new product
                </Typography>
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                            gap: 16
                        }}
                    >
                        <TextField label="Name" value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
                        <TextField label="SKU" value={form.sku} onChange={(e) => updateField("sku", e.target.value)} required />
                        <TextField label="Description" value={form.description} onChange={(e) => updateField("description", e.target.value)} />
                        <TextField label="Quantity" type="number" value={form.quantity} onChange={(e) => updateField("quantity", e.target.value)} slotProps={{ htmlInput: { min: 0 } }} />
                        <TextField label="Minimum stock" type="number" value={form.minimumStock} onChange={(e) => updateField("minimumStock", e.target.value)} slotProps={{ htmlInput: { min: 0 } }} />
                        <TextField label="Price" type="number" value={form.price} onChange={(e) => updateField("price", e.target.value)} slotProps={{ htmlInput: { min: 0, step: 0.01 } }} />
                        <TextField label="Category ID" type="number" value={form.categoryId} onChange={(e) => updateField("categoryId", e.target.value)} />
                        <TextField label="Supplier ID" type="number" value={form.supplierId} onChange={(e) => updateField("supplierId", e.target.value)} />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        disabled={submitting}
                        sx={{ mt: 2 }}
                    >
                        {submitting ? "Adding..." : "Add product"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
