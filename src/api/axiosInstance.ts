import axios from 'axios';

let setLoading: (loading: boolean) => void;

// Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        if (setLoading) setLoading(true); // Start loading
        return config;
    },
    (error) => {
        if (setLoading) setLoading(false); // Stop loading on error
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        if (setLoading) setLoading(false); // Stop loading
        return response;
    },
    (error) => {
        if (setLoading) setLoading(false); // Stop loading on error
        return Promise.reject(error);
    }
);

// Function to initialize interceptors with the loading callback
export const initAxiosInterceptors = (loadingCallback: (loading: boolean) => void) => {
    setLoading = loadingCallback;
};

export default axiosInstance;
