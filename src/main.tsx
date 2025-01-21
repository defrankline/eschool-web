import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {LoadingContext, LoadingProvider} from './context/LoadingContext';
import GlobalProgressBar from './components/GlobalProgressBar'; // Or GlobalSpinner
import {initAxiosInterceptors} from './api/axiosInstance';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <LoadingProvider>
            {/* Initialize Axios interceptors with setLoading */}
            <LoadingContext.Consumer>
                {({setLoading}) => {
                    initAxiosInterceptors(setLoading); // Pass setLoading to Axios interceptors
                    return null;
                }}
            </LoadingContext.Consumer>

            {/* Display the global loading indicator */}
            <GlobalProgressBar/> {/* Or GlobalSpinner */}
            <App/>
        </LoadingProvider>
    </React.StrictMode>
);
