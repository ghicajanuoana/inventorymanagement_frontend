import { useState } from "react";

interface RemoveStockFormProps {
    removeStock: (
        quantity: number,
        reason: string
    ) => Promise<void>;
}

export default function RemoveStockForm({
    removeStock,
}: RemoveStockFormProps) {
    const [quantity, setQuantity] = useState("");
    const [reason, setReason] = useState("");

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        await removeStock(Number(quantity), reason);

        setQuantity("");
        setReason("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(event) =>
                    setQuantity(event.target.value)
                }
            />

            <input
                type="text"
                placeholder="Reason"
                value={reason}
                onChange={(event) =>
                    setReason(event.target.value)
                }
            />

            <button type="submit">
                Remove Stock
            </button>
        </form>
    );
}