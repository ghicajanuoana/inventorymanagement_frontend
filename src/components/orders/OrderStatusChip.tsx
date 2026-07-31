import { Chip } from "@mui/material";

interface OrderStatusChipProps {
    status: string;
}

export default function OrderStatusChip({ status }: OrderStatusChipProps) {
    const color =
        status === "COMPLETED" || status === "RECEIVED"
            ? "success"
            : status === "CANCELLED"
                ? "error"
                : status === "CONFIRMED"
                    ? "info"
                    : "warning";

    return <Chip label={status} color={color} size="small" />;
}
