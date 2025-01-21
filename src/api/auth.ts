import axiosInstance from './axiosInstance';

export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
};
