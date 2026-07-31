import axiosInstance from "./axiosInstance";
import type {
    PurchaseOrder,
    PurchaseOrderRequest
} from "../types/purchaseOrder";

export async function getAllPurchaseOrders(): Promise<PurchaseOrder[]> {
    const response = await axiosInstance.get<PurchaseOrder[]>(
        "/api/purchase_orders"
    );
    return response.data;
}

export async function createPurchaseOrder(
    request: PurchaseOrderRequest
): Promise<PurchaseOrder> {
    const response = await axiosInstance.post<PurchaseOrder>(
        "/api/purchase_orders",
        request
    );
    return response.data;
}

export async function receivePurchaseOrder(
    orderId: number
): Promise<PurchaseOrder> {
    const response = await axiosInstance.put<PurchaseOrder>(
        `/api/purchase_orders/${orderId}/receive`
    );
    return response.data;
}

export async function cancelPurchaseOrder(
    orderId: number
): Promise<PurchaseOrder> {
    const response = await axiosInstance.put<PurchaseOrder>(
        `/api/purchase_orders/${orderId}/cancel`
    );
    return response.data;
}
