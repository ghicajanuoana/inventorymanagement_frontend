import {
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { Category } from "../../types/category";

interface CategoryTableProps {
    categories: Category[];
    canManageCategories: boolean;
    deleteCategory: (categoryId: number) => Promise<void>;
}

export default function CategoryTable({
    categories,
    canManageCategories,
    deleteCategory
}: CategoryTableProps) {
    if (categories.length === 0) {
        return (
            <Card variant="outlined" sx={{ p: 5, textAlign: "center" }}>
                <Typography color="text.secondary">
                    No categories found.
                </Typography>
            </Card>
        );
    }

    return (
        <TableContainer component={Card} variant="outlined">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell width="90">ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        {canManageCategories && (
                            <TableCell align="right">Actions</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id} hover>
                            <TableCell>{category.id}</TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 700 }}
                                >
                                    {category.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {category.description || "—"}
                                </Typography>
                            </TableCell>
                            {canManageCategories && (
                                <TableCell align="right">
                                    <Button
                                        size="small"
                                        color="error"
                                        startIcon={
                                            <DeleteOutlineRoundedIcon />
                                        }
                                        onClick={() =>
                                            deleteCategory(category.id)
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
