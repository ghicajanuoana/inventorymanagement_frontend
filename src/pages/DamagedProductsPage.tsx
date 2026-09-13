import { useEffect, useState } from "react";
import axios from "axios";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Paper,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Tabs
} from "@mui/material";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import {
    disposeDamagedProduct,
    getAllDamagedProducts,
    returnDamagedProductToStock,
    returnDamagedProductToSupplier
} from "../api/damagedProductApi";
import Page from "../components/common/Page";
import type { DamagedProduct, DamagedProductStatus } from "../types/damagedProduct";

export default function DamagedProductsPage() {
    const [records, setRecords] = useState<DamagedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [resolvingId, setResolvingId] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [view, setView] = useState<"pending" | "resolved">("pending");

    useEffect(() => {
        async function loadRecords() {
            try {
                setRecords(await getAllDamagedProducts());
            } catch (caught) {
                setError(apiMessage(caught, "Could not load damaged products."));
            } finally {
                setLoading(false);
            }
        }
        loadRecords();
    }, []);

    async function resolve(
        record: DamagedProduct,
        action: (id: number) => Promise<DamagedProduct>,
        label: string
    ) {
        if (!window.confirm(`${label} ${record.quantity} unit(s) of ${record.product.name}?`)) {
            return;
        }

        try {
            setError("");
            setResolvingId(record.id);
            const updated = await action(record.id);
            setRecords((current) =>
                current.map((item) => item.id === updated.id ? updated : item)
            );
        } catch (caught) {
            setError(apiMessage(caught, "Could not resolve damaged product."));
        } finally {
            setResolvingId(null);
        }
    }

    const pendingCount = records.filter(
        (record) => record.status === "PENDING_DECISION"
    ).length;
    const resolvedCount = records.length - pendingCount;
    const visibleRecords = records.filter((record) =>
        view === "pending"
            ? record.status === "PENDING_DECISION"
            : record.status !== "PENDING_DECISION"
    );

    return (
        <Page
            title="Damaged products"
            description="Review damaged stock and decide whether it returns to inventory, the supplier, or disposal."
            action={<Chip color="warning" label={`${pendingCount} pending`} />}
        >
            {error && <Alert severity="error">{error}</Alert>}
            {loading ? (
                <Box sx={{ display: "grid", placeItems: "center", py: 12 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper variant="outlined">
                    <Tabs
                        value={view}
                        onChange={(_, value: "pending" | "resolved") => setView(value)}
                        aria-label="Damaged product status"
                        sx={{ px: 2, borderBottom: 1, borderColor: "divider" }}
                    >
                        <Tab value="pending" label={`Pending (${pendingCount})`} />
                        <Tab value="resolved" label={`Resolved (${resolvedCount})`} />
                    </Tabs>
                    {visibleRecords.length === 0 ? (
                        <Box sx={{ p: 5, textAlign: "center" }}>
                            <Typography color="text.secondary">
                                {view === "pending"
                                    ? "No damaged products are awaiting a decision."
                                    : "No damaged products have been resolved."}
                            </Typography>
                        </Box>
                    ) : (
                    <TableContainer>
                        <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>SKU</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell>Reason</TableCell>
                                <TableCell>Reported</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Resolved</TableCell>
                                <TableCell align="right">Decision</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRecords.map((record) => {
                                const pending = record.status === "PENDING_DECISION";
                                const disabled = resolvingId === record.id;
                                return (
                                    <TableRow key={record.id} hover>
                                        <TableCell sx={{ fontWeight: 600 }}>{record.product.name}</TableCell>
                                        <TableCell>{record.product.sku}</TableCell>
                                        <TableCell align="right">{record.quantity}</TableCell>
                                        <TableCell>{record.reason}</TableCell>
                                        <TableCell>{formatDate(record.reportedAt)}</TableCell>
                                        <TableCell><StatusChip status={record.status} /></TableCell>
                                        <TableCell>
                                            {record.resolvedAt ? formatDate(record.resolvedAt) : "—"}
                                        </TableCell>
                                        <TableCell align="right">
                                            {pending ? (
                                                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                                                    <Button
                                                        size="small"
                                                        startIcon={<InventoryRoundedIcon />}
                                                        disabled={disabled}
                                                        onClick={() => resolve(record, returnDamagedProductToStock, "Return to stock")}
                                                    >
                                                        Stock
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        startIcon={<LocalShippingRoundedIcon />}
                                                        disabled={disabled}
                                                        onClick={() => resolve(record, returnDamagedProductToSupplier, "Return to supplier")}
                                                    >
                                                        Supplier
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        startIcon={<DeleteOutlineRoundedIcon />}
                                                        disabled={disabled}
                                                        onClick={() => resolve(record, disposeDamagedProduct, "Dispose")}
                                                    >
                                                        Dispose
                                                    </Button>
                                                </Stack>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">No actions</Typography>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    )}
                </Paper>
            )}
        </Page>
    );
}

function StatusChip({ status }: { status: DamagedProductStatus }) {
    const labels: Record<DamagedProductStatus, string> = {
        PENDING_DECISION: "Pending decision",
        RETURNED_TO_STOCK: "Returned to stock",
        RETURNED_TO_SUPPLIER: "Returned to supplier",
        DISPOSED: "Disposed"
    };
    return (
        <Chip
            size="small"
            color={status === "PENDING_DECISION" ? "warning" : "default"}
            label={labels[status]}
        />
    );
}

function formatDate(value: string): string {
    return new Date(value).toLocaleString();
}

function apiMessage(error: unknown, fallback: string): string {
    if (!axios.isAxiosError(error)) return fallback;
    const data = error.response?.data as { message?: string; detail?: string } | undefined;
    return data?.message ?? data?.detail ?? fallback;
}
