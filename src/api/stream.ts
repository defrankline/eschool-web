import axiosInstance from './axiosInstance';
import {ApiListResponse, ApiObjectResponse} from "./api.ts";
import {GradeLevel} from "./gradeLevel.ts";

export interface Stream {
    id: number;
    name: string;
    gradeLevel: GradeLevel;
    gradeLevelId: number;
}

export const getStreams = async (gradeLevelId: number): Promise<ApiListResponse<Stream>> => {
    const response = await axiosInstance.get('/streams', {
        params: {
            gradeLevelId
        },
    });
    return response.data;
};

export const createStream = async (stream: Stream): Promise<ApiObjectResponse<Stream>> => {
    const response = await axiosInstance.post('/streams', stream);
    return response.data;
};

export const updateStream = async (id: number, stream: Stream): Promise<ApiObjectResponse<Stream>> => {
    const response = await axiosInstance.put(`/streams/${id}`, stream);
    return response.data;
};

export const deleteStream = async (id: number): Promise<ApiObjectResponse<string>> => {
    return await axiosInstance.delete(`/streams/${id}`);
};
