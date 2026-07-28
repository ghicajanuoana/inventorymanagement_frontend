export interface Dashboard {
    totalProducts: number;
    totalCustomers: number;
    totalSuppliers: number;
    totalPurchaseOrders: number;
    totalSalesOrders: number;
    pendingSalesOrders: number;
    completedSalesOrders: number;
    lowStockProducts: number;
    inventoryValue: number;
}