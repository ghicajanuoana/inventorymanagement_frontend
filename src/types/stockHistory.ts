import type { Product } from "./product";

export interface StockHistory {
    id: number;
    product: Product;
    quantity: number;
    reason: string;
    createdAt: string;
    type: string;
}