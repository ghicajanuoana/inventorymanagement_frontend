export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export interface CustomerRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}
