import { useEffect, useState } from "react";
import {
    Alert,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { getStockHistory } from "../../api/productApi";
import type { StockHistory } from "../../types/stockHistory";

interface StockHistoryModalProps {
    productId: number;
    productName: string;
    closeModal: () => void;
    open: boolean;
}

export default function StockHistoryModal({
    productId,
    productName,
    closeModal,
    open
}: StockHistoryModalProps) {
    const [history, setHistory] = useState<StockHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!open) return;
        async function loadStockHistory() {
            try {
                setLoading(true);
                setErrorMessage("");
                setHistory(await getStockHistory(productId));
            } catch {
                setErrorMessage("Could not load stock history.");
            } finally {
                setLoading(false);
            }
        }
        loadStockHistory();
    }, [open, productId]);

    return (
        <Dialog open={open} onClose={closeModal} fullWidth maxWidth="md">
            <DialogTitle sx={{ pr: 6 }}>
                Stock history — {productName}
                <IconButton
                    onClick={closeModal}
                    aria-label="Close"
                    sx={{ position: "absolute", right: 12, top: 12 }}
                >
                    <CloseRoundedIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {loading ? (
                    <CircularProgress size={28} />
                ) : errorMessage ? (
                    <Alert severity="error">{errorMessage}</Alert>
                ) : history.length === 0 ? (
                    <Typography color="text.secondary">No stock history found.</Typography>
                ) : (
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product ID</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Reason</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.product.id}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.reason}</TableCell>
                                    <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </DialogContent>
        </Dialog>
    );
}
