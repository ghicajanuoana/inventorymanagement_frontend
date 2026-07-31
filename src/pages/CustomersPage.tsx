import { useEffect, useState } from "react";
import axios from "axios";
import {
    Alert,
    Box,
    CircularProgress,
    Stack
} from "@mui/material";
import {
    createCustomer,
    getAllCustomers,
    updateCustomer
} from "../api/customerApi";
import Page from "../components/common/Page";
import CustomerForm from "../components/customers/CustomerForm";
import CustomerTable from "../components/customers/CustomerTable";
import type {
    Customer,
    CustomerRequest
} from "../types/customer";
import { getRole } from "../utils/tokenStorage";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const role = getRole()?.replace(/^ROLE_/i, "").toUpperCase();
    const isAdmin = role === "ADMIN";

    useEffect(() => {
        async function loadCustomers() {
            try {
                setIsLoading(true);
                setErrorMessage("");
                setCustomers(await getAllCustomers());
            } catch {
                setErrorMessage("Could not load customers.");
            } finally {
                setIsLoading(false);
            }
        }

        loadCustomers();
    }, []);

    async function addCustomer(
        customer: CustomerRequest
    ): Promise<void> {
        try {
            setErrorMessage("");
            const createdCustomer = await createCustomer(customer);

            setCustomers((currentCustomers) => [
                ...currentCustomers,
                createdCustomer
            ]);
        } catch (error) {
            setErrorMessage(getApiMessage(
                error,
                "Could not create customer."
            ));
            throw error;
        }
    }

    async function editCustomer(
        customerId: number,
        request: CustomerRequest
    ): Promise<void> {
        try {
            setErrorMessage("");
            const updatedCustomer = await updateCustomer(
                customerId,
                request
            );

            setCustomers((currentCustomers) =>
                currentCustomers.map((customer) =>
                    customer.id === customerId
                        ? updatedCustomer
                        : customer
                )
            );
        } catch (error) {
            setErrorMessage(getApiMessage(
                error,
                "Could not update customer."
            ));
            throw error;
        }
    }

    return (
        <Page
            title="Customers"
            description="Manage customer contact details for sales and fulfillment."
        >
            {errorMessage && (
                <Alert severity="error">{errorMessage}</Alert>
            )}

            {isLoading ? (
                <Box sx={{ display: "grid", placeItems: "center", py: 12 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Stack spacing={3}>
                    {isAdmin && (
                        <CustomerForm addCustomer={addCustomer} />
                    )}
                    <CustomerTable
                        customers={customers}
                        editCustomer={editCustomer}
                    />
                </Stack>
            )}
        </Page>
    );
}

function getApiMessage(error: unknown, fallback: string): string {
    if (!axios.isAxiosError(error)) {
        return fallback;
    }

    const responseData = error.response?.data as
        | { message?: string; detail?: string }
        | undefined;

    return responseData?.message ?? responseData?.detail ?? fallback;
}
