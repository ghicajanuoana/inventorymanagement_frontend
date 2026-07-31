import axiosInstance from "./axiosInstance";
import type {
    Category,
    CategoryRequest
} from "../types/category";

export async function getAllCategories(): Promise<Category[]> {
    const response = await axiosInstance.get<Category[]>(
        "/api/categories"
    );

    return response.data;
}

export async function createCategory(
    category: CategoryRequest
): Promise<Category> {
    const response = await axiosInstance.post<Category>(
        "/api/categories",
        category
    );

    return response.data;
}

export async function removeCategory(
    categoryId: number
): Promise<void> {
    await axiosInstance.delete(`/api/categories/${categoryId}`);
}
