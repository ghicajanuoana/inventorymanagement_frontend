import { useEffect, useState } from "react";
import { getStockHistory } from "../../api/productApi";
import type { StockHistory } from "../../types/stockHistory";

interface StockHistoryModalProps {
    productId: number;
    productName: string;
    closeModal: () => void;
}

function StockHistoryModal({
    productId,
    productName,
    closeModal,
}: StockHistoryModalProps) {
    const [history, setHistory] = useState<StockHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadStockHistory(): Promise<void> {
            try {
                setLoading(true);
                setErrorMessage("");

                const historyData = await getStockHistory(productId);
                setHistory(historyData);
            } catch (error) {
                console.error(error);
                setErrorMessage("Could not load stock history.");
            } finally {
                setLoading(false);
            }
        }

        loadStockHistory();
    }, [productId]);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button
                    type="button"
                    className="modal-close-button"
                    onClick={closeModal}
                >
                    Close
                </button>

                <h2>Stock History — {productName}</h2>

                {loading && <p>Loading stock history...</p>}

                {errorMessage && <p>{errorMessage}</p>}

                {!loading && !errorMessage && history.length === 0 && (
                    <p>No stock history found.</p>
                )}

                {!loading && !errorMessage && history.length > 0 && (
                    <table className="stock-history-table">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Reason</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {history.map((historyItem) => (
                                <tr key={historyItem.id}>
                                    <td>{historyItem.product.id}</td>
                                    <td>{historyItem.type}</td>
                                    <td>{historyItem.quantity}</td>
                                    <td>{historyItem.reason}</td>
                                    <td>
                                        {new Date(
                                            historyItem.createdAt
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default StockHistoryModal;