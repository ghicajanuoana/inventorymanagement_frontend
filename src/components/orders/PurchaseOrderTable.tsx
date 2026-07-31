import {
    Button,
    Card,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import type { PurchaseOrder } from "../../types/purchaseOrder";
import OrderStatusChip from "./OrderStatusChip";

interface PurchaseOrderTableProps {
    orders: PurchaseOrder[];
    onReceive: (orderId: number) => Promise<void>;
    onCancel: (orderId: number) => Promise<void>;
}

export default function PurchaseOrderTable({
    orders,
    onReceive,
    onCancel
}: PurchaseOrderTableProps) {
    if (orders.length === 0) {
        return <Card variant="outlined" sx={{ p: 5, textAlign: "center" }}><Typography color="text.secondary">No purchase orders found.</Typography></Card>;
    }

    return (
        <TableContainer component={Card} variant="outlined">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order</TableCell>
                        <TableCell>Supplier</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => {
                        const total = order.items.reduce(
                            (sum, item) => sum + Number(item.unitPrice) * item.quantity,
                            0
                        );
                        return (
                            <TableRow key={order.id} hover>
                                <TableCell>
                                    <Typography variant="body2" sx={{ fontWeight: 700 }}>#{order.id}</Typography>
                                    <Typography variant="caption" color="text.secondary">{new Date(order.orderDate).toLocaleString()}</Typography>
                                </TableCell>
                                <TableCell>{order.supplier?.name ?? "—"}</TableCell>
                                <TableCell>
                                    {order.items.map((item) => (
                                        <Typography key={item.id ?? item.product.id} variant="body2">
                                            {item.product.name} × {item.quantity}
                                        </Typography>
                                    ))}
                                </TableCell>
                                <TableCell>{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                                <TableCell><OrderStatusChip status={order.status} /></TableCell>
                                <TableCell align="right">
                                    {order.status === "PENDING" && (
                                        <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                            <Button size="small" color="success" startIcon={<CheckCircleOutlineRoundedIcon />} onClick={() => onReceive(order.id)}>Receive</Button>
                                            <Button size="small" color="error" startIcon={<CancelOutlinedIcon />} onClick={() => onCancel(order.id)}>Cancel</Button>
                                        </Stack>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
