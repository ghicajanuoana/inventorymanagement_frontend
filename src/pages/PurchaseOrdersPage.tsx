import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Box, CircularProgress, Stack } from "@mui/material";
import { getAllProducts } from "../api/productApi";
import {
    cancelPurchaseOrder,
    createPurchaseOrder,
    getAllPurchaseOrders,
    receivePurchaseOrder
} from "../api/purchaseOrderApi";
import { getAllSuppliers } from "../api/supplierApi";
import Page from "../components/common/Page";
import PurchaseOrderForm from "../components/orders/PurchaseOrderForm";
import PurchaseOrderTable from "../components/orders/PurchaseOrderTable";
import type { Product } from "../types/product";
import type {
    PurchaseOrder,
    PurchaseOrderRequest
} from "../types/purchaseOrder";
import type { Supplier } from "../types/supplier";

export default function PurchaseOrdersPage() {
    const [orders, setOrders] = useState<PurchaseOrder[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPage() {
            try {
                setLoading(true);
                setError("");
                const [orderData, productData, supplierData] = await Promise.all([
                    getAllPurchaseOrders(),
                    getAllProducts(),
                    getAllSuppliers()
                ]);
                setOrders(orderData);
                setProducts(productData);
                setSuppliers(supplierData);
            } catch (caught) {
                setError(apiMessage(caught, "Could not load purchase orders."));
            } finally {
                setLoading(false);
            }
        }
        loadPage();
    }, []);

    async function create(request: PurchaseOrderRequest) {
        try {
            setError("");
            const order = await createPurchaseOrder(request);
            setOrders((current) => [order, ...current]);
        } catch (caught) {
            setError(apiMessage(caught, "Could not create purchase order."));
            throw caught;
        }
    }

    async function update(
        orderId: number,
        action: (id: number) => Promise<PurchaseOrder>,
        fallback: string
    ) {
        try {
            setError("");
            const updated = await action(orderId);
            setOrders((current) =>
                current.map((order) => order.id === orderId ? updated : order)
            );
        } catch (caught) {
            setError(apiMessage(caught, fallback));
        }
    }

    return (
        <Page
            title="Purchase orders"
            description="Order inventory from suppliers and receive it into stock."
        >
            {error && <Alert severity="error">{error}</Alert>}
            {loading ? (
                <Box sx={{ display: "grid", placeItems: "center", py: 12 }}><CircularProgress /></Box>
            ) : (
                <Stack spacing={3}>
                    <PurchaseOrderForm products={products} suppliers={suppliers} onCreate={create} />
                    <PurchaseOrderTable
                        orders={orders}
                        onReceive={(id) => update(id, receivePurchaseOrder, "Could not receive purchase order.")}
                        onCancel={(id) => update(id, cancelPurchaseOrder, "Could not cancel purchase order.")}
                    />
                </Stack>
            )}
        </Page>
    );
}

function apiMessage(error: unknown, fallback: string): string {
    if (!axios.isAxiosError(error)) return fallback;
    const data = error.response?.data as { message?: string; detail?: string } | undefined;
    return data?.message ?? data?.detail ?? fallback;
}
