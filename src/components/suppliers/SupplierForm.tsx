import { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type { SupplierRequest } from "../../types/supplier";

interface SupplierFormProps {
    addSupplier: (supplier: SupplierRequest) => Promise<void>;
}

const initialSupplier: SupplierRequest = {
    name: "",
    email: "",
    phone: "",
    address: ""
};

export default function SupplierForm({
    addSupplier
}: SupplierFormProps) {
    const [supplier, setSupplier] =
        useState<SupplierRequest>(initialSupplier);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function updateField(
        field: keyof SupplierRequest,
        value: string
    ) {
        setSupplier((currentSupplier) => ({
            ...currentSupplier,
            [field]: value
        }));
    }

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await addSupplier(supplier);
            setSupplier(initialSupplier);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Add a new supplier
                </Typography>

                <Stack
                    component="form"
                    onSubmit={handleSubmit}
                    spacing={2}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                    >
                        <TextField
                            label="Supplier name"
                            value={supplier.name}
                            onChange={(event) =>
                                updateField("name", event.target.value)
                            }
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email address"
                            type="email"
                            value={supplier.email}
                            onChange={(event) =>
                                updateField("email", event.target.value)
                            }
                            required
                            fullWidth
                        />
                    </Stack>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                    >
                        <TextField
                            label="Phone number"
                            value={supplier.phone}
                            onChange={(event) =>
                                updateField("phone", event.target.value)
                            }
                            required
                            fullWidth
                        />
                        <TextField
                            label="Address"
                            value={supplier.address}
                            onChange={(event) =>
                                updateField("address", event.target.value)
                            }
                            required
                            fullWidth
                        />
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        disabled={isSubmitting}
                        sx={{ alignSelf: "flex-start" }}
                    >
                        {isSubmitting ? "Adding..." : "Add supplier"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
