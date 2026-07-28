import ProductRow from "./ProductRow";
import type { Product } from "../../types/product";

interface ProductTableProps {
    products: Product[];

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

function ProductTable({
    products,
    addStock,
    removeStock,
    deleteProduct,
}: ProductTableProps) {
    return (
        <table className="products-table">
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Minimum Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {products.map((product) => (
                    <ProductRow
                        key={product.id}
                        product={product}
                        addStock={addStock}
                        removeStock={removeStock}
                        deleteProduct={deleteProduct}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default ProductTable;