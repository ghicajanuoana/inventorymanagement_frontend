import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import ProductRow from "./ProductRow";
import type { Product } from "../../types/product";

interface ProductTableProps {
    products: Product[];
    addStock: (productId: number, quantity: number, reason: string) => Promise<void>;
    removeStock: (productId: number, quantity: number, reason: string) => Promise<void>;
    reportDamagedStock: (productId: number, quantity: number, reason: string) => Promise<void>;
    archiveProduct: (productId: number) => Promise<void>;
}

export default function ProductTable(props: ProductTableProps) {
    if (props.products.length === 0) {
        return (
            <Card variant="outlined" sx={{ p: 5, textAlign: "center" }}>
                <Typography color="text.secondary">No active products found.</Typography>
            </Card>
        );
    }

    return (
        <TableContainer component={Card} variant="outlined">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>SKU</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Minimum stock</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.products.map((product) => (
                        <ProductRow key={product.id} product={product} {...props} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
