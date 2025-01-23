import axiosInstance from './axiosInstance';
import {ApiListResponse, ApiObjectResponse} from "./api.ts";

export interface Department {
    id: number;
    name: string;
}

export const getDepartments = async (page: number, size: number, filter: string): Promise<ApiListResponse<Department>> => {
    const response = await axiosInstance.get('/departments', {
        params: {
            page,
            size,
            filter,
        },
    });
    return response.data;
};

export const createDepartment = async (department: Department): Promise<ApiObjectResponse<Department>> => {
    const response = await axiosInstance.post('/departments', department);
    return response.data;
};

export const updateDepartment = async (id: number, department: Department): Promise<ApiObjectResponse<Department>> => {
    const response = await axiosInstance.put(`/departments/${id}`, department);
    return response.data;
};

export const deleteDepartment = async (id: number): Promise<ApiObjectResponse<string>> => {
    return await axiosInstance.delete(`/departments/${id}`);
};
