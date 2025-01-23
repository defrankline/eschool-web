import axiosInstance from './axiosInstance';
import {ApiListResponse, ApiObjectResponse} from "./api.ts";

export interface Subject {
    id: number;
    name: string;
    shortName: string;
}

export const getSubjects = async (page: number, size: number, filter: string): Promise<ApiListResponse<Subject>> => {
    const response = await axiosInstance.get('/subjects', {
        params: {
            page,
            size,
            filter,
        },
    });
    return response.data;
};

export const createSubject = async (subject: Subject): Promise<ApiObjectResponse<Subject>> => {
    const response = await axiosInstance.post('/subjects', subject);
    return response.data;
};

export const updateSubject = async (id: number, subject: Subject): Promise<ApiObjectResponse<Subject>> => {
    const response = await axiosInstance.put(`/subjects/${id}`, subject);
    return response.data;
};

export const deleteSubject = async (id: number): Promise<ApiObjectResponse<string>> => {
    return await axiosInstance.delete(`/subjects/${id}`);
};
