import axiosInstance from "./axiosInstance";
import type { DamagedProduct } from "../types/damagedProduct";

export async function getAllDamagedProducts(): Promise<DamagedProduct[]> {
    const response = await axiosInstance.get<DamagedProduct[]>(
        "/api/damaged-products"
    );
    return response.data;
}

export async function getPendingDamagedProducts(): Promise<DamagedProduct[]> {
    const response = await axiosInstance.get<DamagedProduct[]>(
        "/api/damaged-products/pending"
    );
    return response.data;
}

export async function returnDamagedProductToStock(id: number): Promise<DamagedProduct> {
    const response = await axiosInstance.put<DamagedProduct>(
        `/api/damaged-products/${id}/return-to-stock`
    );
    return response.data;
}

export async function returnDamagedProductToSupplier(id: number): Promise<DamagedProduct> {
    const response = await axiosInstance.put<DamagedProduct>(
        `/api/damaged-products/${id}/return-to-supplier`
    );
    return response.data;
}

export async function disposeDamagedProduct(id: number): Promise<DamagedProduct> {
    const response = await axiosInstance.put<DamagedProduct>(
        `/api/damaged-products/${id}/dispose`
    );
    return response.data;
}
