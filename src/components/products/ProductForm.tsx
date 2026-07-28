import { useState } from "react";
import type { ProductRequest } from "../../types/product";

interface ProductFormProps {
    addProduct: (product: ProductRequest) => Promise<void>;
}

function ProductForm({ addProduct }: ProductFormProps) {

    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [minimumStock, setMinimumStock] = useState(0);
    const [price, setPrice] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [supplierId, setSupplierId] = useState(0);

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    addProduct({
        name,
        sku,
        description,
        quantity,
        minimumStock,
        price,
        categoryId,
        supplierId
    });
}
    
    return (
<form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="name">Name</label>
        <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
        />
    </div>

    <div>
        <label htmlFor="sku">SKU</label>
        <input
            id="sku"
            type="text"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
        />
    </div>

    <div>
        <label htmlFor="description">Description</label>
        <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
        />
    </div>

    <div>
        <label htmlFor="quantity">Quantity</label>
        <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
        />
    </div>

    <div>
        <label htmlFor="minimumStock">Minimum Stock</label>
        <input
            id="minimumStock"
            type="number"
            value={minimumStock}
            onChange={(event) => setMinimumStock(Number(event.target.value))}
        />
    </div>

    <div>
        <label htmlFor="price">Price</label>
        <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
        />
    </div>

    <div>
        <label htmlFor="categoryId">Category ID</label>
        <input
            id="categoryId"
            type="number"
            value={categoryId}
            onChange={(event) => setCategoryId(Number(event.target.value))}
        />
    </div>

    <div>
        <label htmlFor="supplierId">Supplier ID</label>
        <input
            id="supplierId"
            type="number"
            value={supplierId}
            onChange={(event) => setSupplierId(Number(event.target.value))}
        />
    </div>

    <button type="submit">
        Add Product
    </button>
</form>
);

}

export default ProductForm;