import { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type { CategoryRequest } from "../../types/category";

interface CategoryFormProps {
    addCategory: (category: CategoryRequest) => Promise<void>;
}

export default function CategoryForm({
    addCategory
}: CategoryFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(
        event: React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await addCategory({ name, description });
            setName("");
            setDescription("");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Add a new category
                </Typography>

                <Stack
                    component="form"
                    onSubmit={handleSubmit}
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{ alignItems: { md: "flex-start" } }}
                >
                    <TextField
                        label="Category name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        sx={{ flex: 1 }}
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        sx={{ flex: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<AddRoundedIcon />}
                        disabled={isSubmitting}
                        sx={{ minHeight: 40, whiteSpace: "nowrap" }}
                    >
                        {isSubmitting ? "Adding..." : "Add category"}
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
}
