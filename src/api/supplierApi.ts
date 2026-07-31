import axiosInstance from "./axiosInstance";
import type {
    Supplier,
    SupplierRequest
} from "../types/supplier";

export async function getAllSuppliers(): Promise<Supplier[]> {
    const response = await axiosInstance.get<Supplier[]>(
        "/api/suppliers"
    );

    return response.data;
}

export async function createSupplier(
    supplier: SupplierRequest
): Promise<Supplier> {
    const response = await axiosInstance.post<Supplier>(
        "/api/suppliers",
        supplier
    );

    return response.data;
}

export async function removeSupplier(
    supplierId: number
): Promise<void> {
    await axiosInstance.delete(`/api/suppliers/${supplierId}`);
}
