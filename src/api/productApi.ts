import axiosInstance from "./axiosInstance";
import type { Product, ProductRequest } from "../types/product";
import type { StockHistory } from "../types/stockHistory";

export async function getAllProducts(): Promise<Product[]> {
    const response = await axiosInstance.get<Product[]>(
        "/api/products"
    );

    return response.data;
}

export async function createProduct(
    product: ProductRequest
): Promise<Product> {

    const response = await axiosInstance.post<Product>(
        "/api/products",
        product
    );

    return response.data;
}

export async function addStock(
    productId: number,
    quantity: number,
    reason: string
): Promise<Product> {
    const response = await axiosInstance.post<Product>(
        `/api/products/${productId}/stock/in`,
        {
            quantity,
            reason
        }
    );

    return response.data;
}

export async function archiveProduct(
    productId: number
): Promise<Product> {
    const response = await axiosInstance.put<Product>(
        `/api/products/${productId}/archive`
    );

    return response.data;
}

export async function removeStock(
    productId: number,
    quantity: number,
    reason: string
): Promise<Product> {
    const response = await axiosInstance.post<Product>(
        `/api/products/${productId}/stock/out`,
        {
            quantity,
            reason
        }
    );

    return response.data;
}

export async function getStockHistory(
    productId: number
): Promise<StockHistory[]> {
    const response = await axiosInstance.get<StockHistory[]>(
        `/api/products/${productId}/stock/history`
    );

    return response.data;
}