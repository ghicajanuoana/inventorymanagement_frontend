import { useEffect, useState } from "react";
import axios from "axios";
import {
    Alert,
    Box,
    CircularProgress,
    Stack
} from "@mui/material";
import {
    createSupplier,
    getAllSuppliers,
    removeSupplier
} from "../api/supplierApi";
import Page from "../components/common/Page";
import SupplierForm from "../components/suppliers/SupplierForm";
import SupplierTable from "../components/suppliers/SupplierTable";
import type {
    Supplier,
    SupplierRequest
} from "../types/supplier";
import { getRole } from "../utils/tokenStorage";

export default function SuppliersPage() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const role = getRole()?.replace(/^ROLE_/i, "").toUpperCase();
    const isAdmin = role === "ADMIN";

    useEffect(() => {
        async function loadSuppliers() {
            try {
                setIsLoading(true);
                setErrorMessage("");
                setSuppliers(await getAllSuppliers());
            } catch {
                setErrorMessage("Could not load suppliers.");
            } finally {
                setIsLoading(false);
            }
        }

        loadSuppliers();
    }, []);

    async function addSupplier(
        supplier: SupplierRequest
    ): Promise<void> {
        try {
            setErrorMessage("");
            const createdSupplier = await createSupplier(supplier);

            setSuppliers((currentSuppliers) => [
                ...currentSuppliers,
                createdSupplier
            ]);
        } catch (error) {
            setErrorMessage(getApiMessage(
                error,
                "Could not create supplier."
            ));
            throw error;
        }
    }

    async function deleteSupplier(
        supplierId: number
    ): Promise<void> {
        const confirmed = window.confirm(
            "Are you sure you want to delete this supplier?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setErrorMessage("");
            await removeSupplier(supplierId);
            setSuppliers((currentSuppliers) =>
                currentSuppliers.filter(
                    (supplier) => supplier.id !== supplierId
                )
            );
        } catch (error) {
            const fallback =
                axios.isAxiosError(error) &&
                error.response?.status === 409
                    ? "This supplier cannot be deleted because it is used by one or more products or orders."
                    : "Could not delete supplier.";

            setErrorMessage(getApiMessage(error, fallback));
        }
    }

    return (
        <Page
            title="Suppliers"
            description="Maintain supplier contact details and sourcing relationships."
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
                        <SupplierForm addSupplier={addSupplier} />
                    )}
                    <SupplierTable
                        suppliers={suppliers}
                        canManageSuppliers={isAdmin}
                        deleteSupplier={deleteSupplier}
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
