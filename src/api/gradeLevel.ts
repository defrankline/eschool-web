import axiosInstance from './axiosInstance';
import {ApiListResponse, ApiObjectResponse} from "./api.ts";

export interface GradeLevel {
    id: number;
    name: string;
}

export const getGradeLevels = async (page: number, size: number, filter: string): Promise<ApiListResponse<GradeLevel>> => {
    const response = await axiosInstance.get('/grade-levels', {
        params: {
            page,
            size,
            filter,
        },
    });
    return response.data;
};

export const createGradeLevel = async (gradeLevel: GradeLevel): Promise<ApiObjectResponse<GradeLevel>> => {
    const response = await axiosInstance.post('/grade-levels', gradeLevel);
    return response.data;
};

export const updateGradeLevel = async (id: number, gradeLevel: GradeLevel): Promise<ApiObjectResponse<GradeLevel>> => {
    const response = await axiosInstance.put(`/grade-levels/${id}`, gradeLevel);
    return response.data;
};

export const deleteGradeLevel = async (id: number): Promise<ApiObjectResponse<string>> => {
    return await axiosInstance.delete(`/grade-levels/${id}`);
};
