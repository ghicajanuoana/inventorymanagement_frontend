import { useState } from "react";
import type { Product } from "../../types/product";
import AddStockForm from "./AddStockForm";
import RemoveStockForm from "./RemoveStockForm";
import StockHistoryModal from "./StockHistoryModal";

interface ProductRowProps {
    product: Product;

    addStock: (
        productId: number,
        quantity: number,
        reason: string
    ) => Promise<void>;

    removeStock: (
        productId: number,
        quantity: number,
        reason: string
    ) => Promise<void>;

    deleteProduct: (productId: number) => Promise<void>;
}

function ProductRow({
    product,
    addStock,
    removeStock,
    deleteProduct,
}: ProductRowProps) {
    const [isManageStockOpen, setIsManageStockOpen] =
        useState(false);

    const [showHistory, setShowHistory] =
        useState(false);

    const isLowStock = product.quantity <= product.minimumStock;
    const isOutOfStock = product.quantity === 0;

    return (
        <>
            <tr>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}
                    {isOutOfStock ? (<span className="stock-flag out-of-stock">Out of stock</span>) : 
                    isLowStock ? (<span className="stock-flag low-stock">Low stock</span>) : null}
                </td>
                <td>{product.minimumStock}</td>

                <td>
                    <button
                        type="button"
                        onClick={() =>
                            setIsManageStockOpen(
                                !isManageStockOpen
                            )
                        }
                    >
                        {isManageStockOpen
                            ? "Close Stock Management"
                            : "Manage Stock"}
                    </button>

                    <button
                            type="button"
                            onClick={() => deleteProduct(product.id)}
                        >
                            Delete Product
                    </button>
                </td>
            </tr>

            {isManageStockOpen && (
                <tr>
                    <td colSpan={6}>
                        <h3>Manage Stock — {product.name}</h3>

                        <AddStockForm
                            productId={product.id}
                            addStock={addStock}
                            closeForm={() =>
                                setIsManageStockOpen(false)
                            }
                        />

                        <RemoveStockForm
                            removeStock={(quantity, reason) =>
                                removeStock(
                                    product.id,
                                    quantity,
                                    reason
                                )
                            }
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowHistory(true)
                            }
                        >
                            View Stock History
                        </button>
                    </td>
                </tr>
            )}

            {showHistory && (
                <StockHistoryModal
                    productId={product.id}
                    productName={product.name}
                    closeModal={() =>
                        setShowHistory(false)
                    }
                />
            )}
        </>
    );
}

export default ProductRow;