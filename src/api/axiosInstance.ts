import axios from 'axios';
import {jwtDecode} from "jwt-decode";

let setLoading: (loading: boolean) => void;

// Create Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});


// Decode token to check expiration
const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: any = jwtDecode(token);
        return decoded.exp * 1000 < Date.now(); // Token is expired if exp is in the past
    } catch (error) {
        return true; // Treat invalid token as expired
    }
};


/*axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                originalRequest._retry = true; // Prevent infinite retry loop
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, { refreshToken });
                    localStorage.setItem('token', data.token);
                    originalRequest.headers.Authorization = `Bearer ${data.token}`;
                    return axiosInstance(originalRequest); // Retry original request
                } catch (refreshError) {
                    localStorage.clear();
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);*/

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
            localStorage.clear(); // Clear expired token
            window.location.href = '/login'; // Redirect to login
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


// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        if (setLoading) setLoading(false);
        return response;
    },
    (error) => {
        if (setLoading) setLoading(false);

        if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized (token expired or invalid)
            localStorage.clear(); // Clear local storage
            window.location.href = '/login'; // Redirect to login page
        }

        return Promise.reject(error);
    }
);

// Initialize interceptors with the loading callback
export const initAxiosInterceptors = (loadingCallback: (loading: boolean) => void) => {
    setLoading = loadingCallback;
};

export default axiosInstance;

