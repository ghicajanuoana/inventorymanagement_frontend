import { useEffect, useState } from "react";
import "../styles/products.css";

import {
    addStock as addStockApi,
    createProduct,
    getAllProducts,
    removeStock as removeStockApi,
} from "../api/productApi";
import ProductTable from "../components/products/ProductTable";
import type { Product, ProductRequest } from "../types/product";
import ProductForm from "../components/products/ProductForm";


function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

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

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

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

    return (
        <section>
            <h1>Products</h1>

            {errorMessage && (
               <p>{errorMessage}</p>
           )}

            <ProductForm addProduct={addProduct} />

            <ProductTable
                products={products}
                addStock={handleAddStock}
                removeStock={handleRemoveStock}
            />
        </section>
    );
}

export default ProductsPage;