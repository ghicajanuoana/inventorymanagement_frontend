import { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import type { CustomerRequest } from "../../types/customer";

interface CustomerFormProps {
    addCustomer: (customer: CustomerRequest) => Promise<void>;
}

const initialCustomer: CustomerRequest = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
};

export default function CustomerForm({
    addCustomer
}: CustomerFormProps) {
    const [customer, setCustomer] =
        useState<CustomerRequest>(initialCustomer);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function updateField(
        field: keyof CustomerRequest,
        value: string
    ) {
        setCustomer((currentCustomer) => ({
            ...currentCustomer,
            [field]: value
        }));
    }

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await addCustomer(customer);
            setCustomer(initialCustomer);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Add a new customer
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
                            label="First name"
                            value={customer.firstName}
                            onChange={(event) =>
                                updateField("firstName", event.target.value)
                            }
                            required
                            fullWidth
                        />
                        <TextField
                            label="Last name"
                            value={customer.lastName}
                            onChange={(event) =>
                                updateField("lastName", event.target.value)
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
                            label="Email address"
                            type="email"
                            value={customer.email}
                            onChange={(event) =>
                                updateField("email", event.target.value)
                            }
                            required
                            fullWidth
                        />
                        <TextField
                            label="Phone number"
                            value={customer.phone}
                            onChange={(event) =>
                                updateField("phone", event.target.value)
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
                            label="Address"
                            value={customer.address}
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
                        startIcon={<PersonAddRoundedIcon />}
                        disabled={isSubmitting}
                        sx={{ alignSelf: "flex-start" }}
                    >
                        {isSubmitting ? "Adding..." : "Add customer"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
