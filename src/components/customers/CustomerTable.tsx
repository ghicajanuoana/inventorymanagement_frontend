import { useState } from "react";
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
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import type { Customer } from "../../types/customer";
import type { CustomerRequest } from "../../types/customer";
import CustomerEditDialog from "./CustomerEditDialog";

interface CustomerTableProps {
    customers: Customer[];
    editCustomer: (
        customerId: number,
        request: CustomerRequest
    ) => Promise<void>;
}

export default function CustomerTable({
    customers,
    editCustomer
}: CustomerTableProps) {
    const [selectedCustomer, setSelectedCustomer] =
        useState<Customer | null>(null);

    if (customers.length === 0) {
        return (
            <Card variant="outlined" sx={{ p: 5, textAlign: "center" }}>
                <Typography color="text.secondary">
                    No customers found.
                </Typography>
            </Card>
        );
    }

    return (
        <TableContainer component={Card} variant="outlined">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.id} hover>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 700 }}
                                >
                                    {getCustomerName(customer)}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    ID: {customer.id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Link href={`mailto:${customer.email}`}>
                                    {customer.email}
                                </Link>
                            </TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.address}</TableCell>
                            <TableCell align="right">
                                <Button
                                    size="small"
                                    startIcon={<EditRoundedIcon />}
                                    onClick={() =>
                                        setSelectedCustomer(customer)
                                    }
                                >
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CustomerEditDialog
                customer={selectedCustomer}
                open={selectedCustomer !== null}
                onClose={() => setSelectedCustomer(null)}
                onSave={editCustomer}
            />
        </TableContainer>
    );
}

function getCustomerName(customer: Customer): string {
    return [
        customer.firstName,
        customer.lastName
    ]
        .filter(Boolean)
        .join(" ") || `Customer #${customer.id}`;
}
