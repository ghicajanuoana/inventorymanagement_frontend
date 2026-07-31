import {
    Button,
    Card,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { Supplier } from "../../types/supplier";

interface SupplierTableProps {
    suppliers: Supplier[];
    canManageSuppliers: boolean;
    deleteSupplier: (supplierId: number) => Promise<void>;
}

export default function SupplierTable({
    suppliers,
    canManageSuppliers,
    deleteSupplier
}: SupplierTableProps) {
    if (suppliers.length === 0) {
        return (
            <Card variant="outlined" sx={{ p: 5, textAlign: "center" }}>
                <Typography color="text.secondary">
                    No suppliers found.
                </Typography>
            </Card>
        );
    }

    return (
        <TableContainer component={Card} variant="outlined">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Supplier</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                        {canManageSuppliers && (
                            <TableCell align="right">Actions</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {suppliers.map((supplier) => (
                        <TableRow key={supplier.id} hover>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 700 }}
                                >
                                    {supplier.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    ID: {supplier.id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Link href={`mailto:${supplier.email}`}>
                                    {supplier.email}
                                </Link>
                            </TableCell>
                            <TableCell>{supplier.phone}</TableCell>
                            <TableCell>{supplier.address}</TableCell>
                            {canManageSuppliers && (
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        color="error"
                                        startIcon={
                                            <DeleteOutlineRoundedIcon />
                                        }
                                        onClick={() =>
                                            deleteSupplier(supplier.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
