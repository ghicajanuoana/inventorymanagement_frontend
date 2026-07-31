import { useState } from "react";
import {
    Box,
    Button,
    Chip,
    Collapse,
    Stack,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import type { Product } from "../../types/product";
import AddStockForm from "./AddStockForm";
import RemoveStockForm from "./RemoveStockForm";
import StockHistoryModal from "./StockHistoryModal";
import { getRole } from "../../utils/tokenStorage";

interface ProductRowProps {
    product: Product;
    addStock: (productId: number, quantity: number, reason: string) => Promise<void>;
    removeStock: (productId: number, quantity: number, reason: string) => Promise<void>;
    archiveProduct: (productId: number) => Promise<void>;
}

export default function ProductRow({
    product,
    addStock,
    removeStock,
    archiveProduct
}: ProductRowProps) {
    const [manageOpen, setManageOpen] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const isOutOfStock = product.quantity === 0;
    const isLowStock = product.quantity <= product.minimumStock;
    const role = getRole()?.replace(/^ROLE_/i, "").toUpperCase();
    const isAdmin = role === "ADMIN";

    return (
        <>
            <TableRow hover>
                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{product.sku}</Typography>
                </TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 650 }}>{product.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                        {product.description}
                    </Typography>
                </TableCell>
                <TableCell>{product.price.toLocaleString()}</TableCell>
                <TableCell>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <span>{product.quantity}</span>
                        {isOutOfStock ? (
                            <Chip label="Out of stock" color="error" size="small" />
                        ) : isLowStock ? (
                            <Chip label="Low stock" color="warning" size="small" />
                        ) : null}
                    </Stack>
                </TableCell>
                <TableCell>{product.minimumStock}</TableCell>
                <TableCell align="right">
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                        <Button
                            size="small"
                            variant={manageOpen ? "contained" : "outlined"}
                            startIcon={<InventoryRoundedIcon />}
                            onClick={() => setManageOpen((open) => !open)}
                        >
                            {manageOpen ? "Close" : "Manage stock"}
                        </Button>
                        {isAdmin && !product.archived && (
                            <Button
                                size="small"
                                color="warning"
                                startIcon={<ArchiveRoundedIcon />}
                                onClick={() => archiveProduct(product.id)}
                            >
                                Archive
                            </Button>
                        )}
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={6} sx={{ py: 0, borderBottom: manageOpen ? undefined : 0 }}>
                    <Collapse in={manageOpen} timeout="auto" unmountOnExit>
                        <Box sx={{ py: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Manage stock — {product.name}
                            </Typography>
                            <Stack
                                direction={{ xs: "column", lg: "row" }}
                                spacing={2}
                                sx={{ alignItems: { lg: "flex-start" } }}
                            >
                                <AddStockForm
                                    productId={product.id}
                                    addStock={addStock}
                                    closeForm={() => setManageOpen(false)}
                                />
                                <RemoveStockForm
                                    removeStock={(quantity, reason) =>
                                        removeStock(product.id, quantity, reason)
                                    }
                                />
                                <Button
                                    variant="text"
                                    startIcon={<HistoryRoundedIcon />}
                                    onClick={() => setShowHistory(true)}
                                >
                                    View history
                                </Button>
                            </Stack>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <StockHistoryModal
                productId={product.id}
                productName={product.name}
                closeModal={() => setShowHistory(false)}
                open={showHistory}
            />
        </>
    );
}
