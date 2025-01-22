import axios from 'axios';

import {jwtDecode} from "jwt-decode";
import {toast} from '../context/ToastProvider';


let setLoading: (loading: boolean) => void;

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: any = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
            localStorage.clear();
            window.location.href = '/login';
            return Promise.reject(new Error('Token expired'));
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (setLoading) setLoading(true);
        return config;
    },
    (error) => {
        if (setLoading) setLoading(false);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (setLoading) setLoading(false);

        // Handle success statuses
        const {status} = response;
        if ([201, 202, 203, 204].includes(status)) {
            toast(response.data.message || 'success', 'success');
        }

        return response;
    },
    (error) => {
        if (setLoading) setLoading(false);

        // Handle error statuses
        if (error.response) {
            const {status, data} = error.response;

            if (status === 401) {
                toast('Unauthorized! Please log in again.', 'error');
                localStorage.clear();
                window.location.href = '/login';
            } else if (status === 403) {
                toast('Forbidden! You do not have access to this resource.', 'warning');
            } else if (status === 404) {
                toast(data.message || 'Resource not found.', 'warning');
            } else if (status === 500) {
                toast(data.message || 'Internal server error.', 'error');
            } else {
                toast(data.message || 'An error occurred.', 'error');
            }
        } else {
            toast('Network error. Please try again.', 'error');
        }

        return Promise.reject(error);
    }
);

export const initAxiosInterceptors = (loadingCallback: (loading: boolean) => void) => {
    setLoading = loadingCallback;
};

export default axiosInstance;
