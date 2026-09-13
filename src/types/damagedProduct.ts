import type { Product } from "./product";

export type DamagedProductStatus =
    | "PENDING_DECISION"
    | "RETURNED_TO_STOCK"
    | "RETURNED_TO_SUPPLIER"
    | "DISPOSED";

export interface DamagedProduct {
    id: number;
    product: Product;
    quantity: number;
    reason: string;
    status: DamagedProductStatus;
    reportedAt: string;
    resolvedAt: string | null;
}
