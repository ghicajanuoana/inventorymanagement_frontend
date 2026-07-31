import type { Product } from "./product";
import type { Supplier } from "./supplier";

export type PurchaseOrderStatus =
    | "PENDING"
    | "RECEIVED"
    | "CANCELLED";

export interface PurchaseOrderItem {
    id: number;
    product: Product;
    quantity: number;
    unitPrice: number;
}

export interface PurchaseOrder {
    id: number;
    supplier: Supplier;
    orderDate: string;
    receivedDate?: string | null;
    status: PurchaseOrderStatus;
    items: PurchaseOrderItem[];
}

export interface PurchaseOrderItemRequest {
    productId: number;
    quantity: number;
    unitPrice: number;
}

export interface PurchaseOrderRequest {
    supplierId: number;
    items: PurchaseOrderItemRequest[];
}
