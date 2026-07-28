export interface Product {
    id: number;
    name: string;
    sku: string;
    description: string;
    quantity: number;
    minimumStock: number;
    price: number;
    categoryId: number;
    supplierId: number;
}

// ProductDTO is used for sending data to the backend when creating or updating a product
export interface ProductRequest {
    name: string;
    sku: string;
    description: string;
    quantity: number;
    minimumStock: number;
    price: number;
    categoryId: number;
    supplierId: number;
}