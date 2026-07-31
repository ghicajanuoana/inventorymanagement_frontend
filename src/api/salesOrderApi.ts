import axiosInstance from "./axiosInstance";
import type {
    SalesOrder,
    SalesOrderRequest
} from "../types/salesOrder";

export async function getAllSalesOrders(): Promise<SalesOrder[]> {
    const response = await axiosInstance.get<SalesOrder[]>(
        "/api/sales-orders"
    );
    return response.data;
}

export async function createSalesOrder(
    request: SalesOrderRequest
): Promise<SalesOrder> {
    const response = await axiosInstance.post<SalesOrder>(
        "/api/sales-orders",
        request
    );
    return response.data;
}

async function updateSalesOrderStatus(
    orderId: number,
    action: "confirm" | "complete" | "cancel"
): Promise<SalesOrder> {
    const response = await axiosInstance.put<SalesOrder>(
        `/api/sales-orders/${orderId}/${action}`
    );
    return response.data;
}

export const confirmSalesOrder = (orderId: number) =>
    updateSalesOrderStatus(orderId, "confirm");

export const completeSalesOrder = (orderId: number) =>
    updateSalesOrderStatus(orderId, "complete");

export const cancelSalesOrder = (orderId: number) =>
    updateSalesOrderStatus(orderId, "cancel");
