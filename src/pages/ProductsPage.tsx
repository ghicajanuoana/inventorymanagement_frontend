import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress } from "@mui/material";
import axios from "axios";

import {
    addStock as addStockApi,
    createProduct,
    getAllProducts,
    archiveProduct as archiveProductApi,
    removeStock as removeStockApi,
    reportDamagedStock as reportDamagedStockApi,
} from "../api/productApi";
import ProductTable from "../components/products/ProductTable";
import type { Product, ProductRequest } from "../types/product";
import ProductForm from "../components/products/ProductForm";
import Page from "../components/common/Page";
import { getRole } from "../utils/tokenStorage";


function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const role = getRole()?.replace(/^ROLE_/i, "").toUpperCase();
    const isAdmin = role === "ADMIN";

    useEffect(() => {
        async function loadProducts() {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const productsFromBackend = await getAllProducts();

                setProducts(productsFromBackend);
            } catch {
                setErrorMessage("Could not load products.");
            } finally {
                setIsLoading(false);
            }
        }

        loadProducts();
    }, []);

    async function addProduct(product: ProductRequest): Promise<void> {
    try {
        const createdProduct = await createProduct(product);

        setProducts((currentProducts) => [
            ...currentProducts,
            createdProduct
        ]);
    } catch {
        setErrorMessage("Could not create product.");
      }
    } 

    async function archiveProduct(
        productId: number
    ): Promise<void> {
        const confirmed = window.confirm(
            "Are you sure you want to archive this product?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setErrorMessage("");

            await archiveProductApi(productId);

            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product.id !== productId
                )
            );
        } catch {
            setErrorMessage("Could not archive product.");
        }
    }

    async function handleAddStock(
    productId: number,
    quantity: number,
    reason: string
    ): Promise<void> {
    try {
        setErrorMessage("");

        const updatedProduct = await addStockApi(
            productId,
            quantity,
            reason
        );

        setProducts((currentProducts) =>
            currentProducts.map((product) =>
                product.id === productId
                    ? updatedProduct
                    : product
            )
        );
    } catch (error) {
        setErrorMessage("Could not add stock.");
        throw error;
    }
}

async function handleRemoveStock(
    productId: number,
    quantity: number,
    reason: string
): Promise<void> {
    try {
        setErrorMessage("");

        const updatedProduct = await removeStockApi(
            productId,
            quantity,
            reason
        );

        setProducts((currentProducts) =>
            currentProducts.map((product) =>
                product.id === productId
                    ? updatedProduct
                    : product
            )
        );
    } catch (error) {
        console.error(error);
        setErrorMessage("Could not remove stock.");
        throw error;
    }
}

async function handleReportDamagedStock(
    productId: number,
    quantity: number,
    reason: string
): Promise<void> {
    try {
        setErrorMessage("");

        const updatedProduct = await reportDamagedStockApi(
            productId,
            quantity,
            reason
        );

        setProducts((currentProducts) =>
            currentProducts.map((product) =>
                product.id === productId
                    ? updatedProduct
                    : product
            )
        );
    } catch (error) {
        setErrorMessage(getApiMessage(error, "Could not report damaged stock."));
        throw error;
    }
}

    return (
        <Page
            title="Products"
            description="Create products, monitor availability, and record stock movements."
        >
            {errorMessage && (
                <Alert severity="error">{errorMessage}</Alert>
            )}
            {isLoading ? (
                <Box sx={{ display: "grid", placeItems: "center", py: 12 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {isAdmin && (
                        <ProductForm addProduct={addProduct} />
                    )}
                    <ProductTable
                        products={products}
                        archiveProduct={archiveProduct}
                        addStock={handleAddStock}
                        removeStock={handleRemoveStock}
                        reportDamagedStock={handleReportDamagedStock}
                    />
                </>
            )}
        </Page>
    );
}

export default ProductsPage;

function getApiMessage(error: unknown, fallback: string): string {
    if (!axios.isAxiosError(error)) {
        return fallback;
    }

    const responseData = error.response?.data as
        | { message?: string; detail?: string }
        | undefined;

    return responseData?.message ?? responseData?.detail ?? fallback;
}
