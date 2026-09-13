import type { Product } from "./product";

export type StockHistoryType = "IN" | "OUT" | "DAMAGED";

export interface StockHistory {
    id: number;
    product: Product;
    quantity: number;
    reason: string;
    createdAt: string;
    type: StockHistoryType;
}
