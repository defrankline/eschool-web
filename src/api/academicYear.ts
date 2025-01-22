import axiosInstance from './axiosInstance';
import {ApiListResponse, ApiObjectResponse} from "./api.ts";

export interface AcademicYear {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    current: boolean;
    closed: boolean;
    previous: AcademicYear;
    previousYearId: number;
}

export const getAcademicYears = async (page: number, size: number, filter: string): Promise<ApiListResponse<AcademicYear>> => {
    const response = await axiosInstance.get('/academic-years', {
        params: {
            page,
            size,
            filter,
        },
    });
    return response.data;
};

export const createAcademicYear = async (academicYear: AcademicYear): Promise<ApiObjectResponse<AcademicYear>> => {
    const response = await axiosInstance.post('/academic-years', academicYear);
    return response.data;
};

export const updateAcademicYear = async (id: number, academicYear: AcademicYear): Promise<ApiObjectResponse<AcademicYear>> => {
    const response = await axiosInstance.put(`/academic-years/${id}`, academicYear);
    return response.data;
};

export const deleteAcademicYear = async (id: number): Promise<ApiObjectResponse<string>> => {
    return await axiosInstance.delete(`/academic-years/${id}`);
};
