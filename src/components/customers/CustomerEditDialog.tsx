import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import type {
    Customer,
    CustomerRequest
} from "../../types/customer";

interface CustomerEditDialogProps {
    customer: Customer | null;
    open: boolean;
    onClose: () => void;
    onSave: (
        customerId: number,
        request: CustomerRequest
    ) => Promise<void>;
}

export default function CustomerEditDialog({
    customer,
    open,
    onClose,
    onSave
}: CustomerEditDialogProps) {
    const [form, setForm] = useState<CustomerRequest>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!customer) {
            return;
        }

        setForm({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            address: customer.address
        });
    }, [customer]);

    function updateField(
        field: keyof CustomerRequest,
        value: string
    ) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value
        }));
    }

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!customer) {
            return;
        }

        setIsSaving(true);
        try {
            await onSave(customer.id, form);
            onClose();
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit customer</DialogTitle>
            <DialogContent>
                <Stack
                    component="form"
                    id="edit-customer-form"
                    onSubmit={handleSubmit}
                    spacing={2}
                    sx={{ pt: 1 }}
                >
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                    >
                        <TextField
                            label="First name"
                            value={form.firstName}
                            onChange={(event) =>
                                updateField("firstName", event.target.value)
                            }
                            required
                            fullWidth
                        />
                        <TextField
                            label="Last name"
                            value={form.lastName}
                            onChange={(event) =>
                                updateField("lastName", event.target.value)
                            }
                            required
                            fullWidth
                        />
                    </Stack>
                    <TextField
                        label="Email address"
                        type="email"
                        value={form.email}
                        onChange={(event) =>
                            updateField("email", event.target.value)
                        }
                        required
                        fullWidth
                    />
                    <TextField
                        label="Phone number"
                        value={form.phone}
                        onChange={(event) =>
                            updateField("phone", event.target.value)
                        }
                        required
                        fullWidth
                    />
                    <TextField
                        label="Address"
                        value={form.address}
                        onChange={(event) =>
                            updateField("address", event.target.value)
                        }
                        required
                        fullWidth
                    />
                </Stack>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={onClose} disabled={isSaving}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="edit-customer-form"
                    variant="contained"
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save changes"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
