import type { Customer } from "./customer";
import type { Product } from "./product";

export type SalesOrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";

export interface SalesOrderItem {
    id: number;
    product: Product;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export interface SalesOrder {
    id: number;
    customer: Customer;
    orderDate: string;
    completedDate?: string | null;
    status: SalesOrderStatus;
    totalAmount: number;
    items: SalesOrderItem[];
}

export interface SalesOrderItemRequest {
    productId: number;
    quantity: number;
}

export interface SalesOrderRequest {
    customerId: number;
    items: SalesOrderItemRequest[];
}
