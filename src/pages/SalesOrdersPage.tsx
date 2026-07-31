import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Box, CircularProgress, Stack } from "@mui/material";
import { getAllCustomers } from "../api/customerApi";
import { getAllProducts } from "../api/productApi";
import {
    cancelSalesOrder,
    completeSalesOrder,
    confirmSalesOrder,
    createSalesOrder,
    getAllSalesOrders
} from "../api/salesOrderApi";
import Page from "../components/common/Page";
import SalesOrderForm from "../components/orders/SalesOrderForm";
import SalesOrderTable from "../components/orders/SalesOrderTable";
import type { Customer } from "../types/customer";
import type { Product } from "../types/product";
import type {
    SalesOrder,
    SalesOrderRequest
} from "../types/salesOrder";

export default function SalesOrdersPage() {
    const [orders, setOrders] = useState<SalesOrder[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadPage() {
            try {
                setLoading(true);
                setError("");
                const [orderData, productData, customerData] = await Promise.all([
                    getAllSalesOrders(),
                    getAllProducts(),
                    getAllCustomers()
                ]);
                setOrders(orderData);
                setProducts(productData);
                setCustomers(customerData);
            } catch (caught) {
                setError(apiMessage(caught, "Could not load sales orders."));
            } finally {
                setLoading(false);
            }
        }
        loadPage();
    }, []);

    async function create(request: SalesOrderRequest) {
        try {
            setError("");
            const order = await createSalesOrder(request);
            setOrders((current) => [order, ...current]);
        } catch (caught) {
            setError(apiMessage(caught, "Could not create sales order."));
            throw caught;
        }
    }

    async function update(
        orderId: number,
        action: (id: number) => Promise<SalesOrder>,
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
            title="Sales orders"
            description="Create customer orders and move them through fulfillment."
        >
            {error && <Alert severity="error">{error}</Alert>}
            {loading ? (
                <Box sx={{ display: "grid", placeItems: "center", py: 12 }}><CircularProgress /></Box>
            ) : (
                <Stack spacing={3}>
                    <SalesOrderForm products={products} customers={customers} onCreate={create} />
                    <SalesOrderTable
                        orders={orders}
                        onConfirm={(id) => update(id, confirmSalesOrder, "Could not confirm sales order.")}
                        onComplete={(id) => update(id, completeSalesOrder, "Could not complete sales order.")}
                        onCancel={(id) => update(id, cancelSalesOrder, "Could not cancel sales order.")}
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
