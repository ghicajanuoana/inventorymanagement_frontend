import { useEffect, useState } from "react";
import axios from "axios";
import {
    Alert,
    Box,
    CircularProgress,
    Stack
} from "@mui/material";
import {
    createCategory,
    getAllCategories,
    removeCategory
} from "../api/categoryApi";
import CategoryForm from "../components/categories/CategoryForm";
import CategoryTable from "../components/categories/CategoryTable";
import Page from "../components/common/Page";
import type {
    Category,
    CategoryRequest
} from "../types/category";
import { getRole } from "../utils/tokenStorage";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const role = getRole()?.replace(/^ROLE_/i, "").toUpperCase();
    const isAdmin = role === "ADMIN";

    useEffect(() => {
        async function loadCategories() {
            try {
                setIsLoading(true);
                setErrorMessage("");
                setCategories(await getAllCategories());
            } catch {
                setErrorMessage("Could not load categories.");
            } finally {
                setIsLoading(false);
            }
        }

        loadCategories();
    }, []);

    async function addCategory(
        category: CategoryRequest
    ): Promise<void> {
        try {
            setErrorMessage("");
            const createdCategory = await createCategory(category);

            setCategories((currentCategories) => [
                ...currentCategories,
                createdCategory
            ]);
        } catch (error) {
            setErrorMessage(getApiMessage(
                error,
                "Could not create category."
            ));
            throw error;
        }
    }

    async function deleteCategory(
        categoryId: number
    ): Promise<void> {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setErrorMessage("");
            await removeCategory(categoryId);
            setCategories((currentCategories) =>
                currentCategories.filter(
                    (category) => category.id !== categoryId
                )
            );
        } catch (error) {
            const fallback =
                axios.isAxiosError(error) &&
                error.response?.status === 409
                    ? "This category cannot be deleted because it is used by one or more products."
                    : "Could not delete category.";

            setErrorMessage(getApiMessage(error, fallback));
        }
    }

    return (
        <Page
            title="Categories"
            description="Organize products into clear, manageable groups."
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
                        <CategoryForm addCategory={addCategory} />
                    )}
                    <CategoryTable
                        categories={categories}
                        canManageCategories={isAdmin}
                        deleteCategory={deleteCategory}
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
