import axiosInstance from "./axiosInstance";
import type { Dashboard } from "../types/dashboard";

export const getDashboard = async (): Promise<Dashboard> => {
    const response = await axiosInstance.get<Dashboard>(
        "/api/dashboard"
    );

    return response.data;
};