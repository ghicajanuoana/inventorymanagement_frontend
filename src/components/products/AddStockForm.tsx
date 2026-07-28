import { useState } from "react";
import type { SubmitEvent } from "react";

interface AddStockFormProps {
    productId: number;

    addStock: (
        productId: number,
        quantity: number,
        reason: string
    ) => Promise<void>;

    closeForm: () => void;
}

function AddStockForm({
    productId,
    addStock,
    closeForm
}: AddStockFormProps) {
    const [quantity, setQuantity] = useState(1);
    const [reason, setReason] = useState("");

    async function handleSubmit(
        event: SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (quantity <= 0) {
            return;
        }

        try {
            await addStock(productId, quantity, reason);

            setQuantity(1);
            setReason("");
            closeForm();
        } catch {
            // ProductsPage displays the error.
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor={`stock-quantity-${productId}`}>
                    Quantity to add
                </label>

                <input
                    id={`stock-quantity-${productId}`}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) =>
                        setQuantity(Number(event.target.value))
                    }
                    required
                />
            </div>

            <div>
                <label htmlFor={`stock-reason-${productId}`}>
                    Reason
                </label>

                <input
                    id={`stock-reason-${productId}`}
                    type="text"
                    value={reason}
                    onChange={(event) =>
                        setReason(event.target.value)
                    }
                    placeholder="For example: New delivery"
                    required
                />
            </div>

            <button type="submit">
                Confirm
            </button>

            <button
                type="button"
                onClick={closeForm}
            >
                Cancel
            </button>
        </form>
    );
}

export default AddStockForm;