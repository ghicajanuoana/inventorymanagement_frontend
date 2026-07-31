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
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import type { SalesOrder } from "../../types/salesOrder";
import OrderStatusChip from "./OrderStatusChip";

interface SalesOrderTableProps {
    orders: SalesOrder[];
    onConfirm: (orderId: number) => Promise<void>;
    onComplete: (orderId: number) => Promise<void>;
    onCancel: (orderId: number) => Promise<void>;
}

export default function SalesOrderTable({
    orders,
    onConfirm,
    onComplete,
    onCancel
}: SalesOrderTableProps) {
    if (orders.length === 0) {
        return <Card variant="outlined" sx={{ p: 5, textAlign: "center" }}><Typography color="text.secondary">No sales orders found.</Typography></Card>;
    }

    return (
        <TableContainer component={Card} variant="outlined">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id} hover>
                            <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>#{order.id}</Typography>
                                <Typography variant="caption" color="text.secondary">{new Date(order.orderDate).toLocaleString()}</Typography>
                            </TableCell>
                            <TableCell>{order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : "—"}</TableCell>
                            <TableCell>
                                {order.items.map((item) => (
                                    <Typography key={item.id ?? item.product.id} variant="body2">
                                        {item.product.name} × {item.quantity}
                                    </Typography>
                                ))}
                            </TableCell>
                            <TableCell>{Number(order.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            <TableCell><OrderStatusChip status={order.status} /></TableCell>
                            <TableCell align="right">
                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                    {order.status === "PENDING" && <Button size="small" startIcon={<TaskAltRoundedIcon />} onClick={() => onConfirm(order.id)}>Confirm</Button>}
                                    {order.status === "CONFIRMED" && <Button size="small" color="success" startIcon={<DoneAllRoundedIcon />} onClick={() => onComplete(order.id)}>Complete</Button>}
                                    {(order.status === "PENDING" || order.status === "CONFIRMED") && <Button size="small" color="error" startIcon={<CancelOutlinedIcon />} onClick={() => onCancel(order.id)}>Cancel</Button>}
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
