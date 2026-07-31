import axiosInstance from "./axiosInstance";
import type {
    Customer,
    CustomerRequest
} from "../types/customer";

export async function getAllCustomers(): Promise<Customer[]> {
    const response = await axiosInstance.get<Customer[]>(
        "/api/customers"
    );

    return response.data;
}

export async function createCustomer(
    customer: CustomerRequest
): Promise<Customer> {
    const response = await axiosInstance.post<Customer>(
        "/api/customers",
        customer
    );

    return response.data;
}

export async function updateCustomer(
    customerId: number,
    customer: CustomerRequest
): Promise<Customer> {
    const response = await axiosInstance.put<Customer>(
        `/api/customers/${customerId}`,
        customer
    );

    return response.data;
}
