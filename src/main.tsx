import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {LoadingContext, LoadingProvider} from './context/LoadingContext';
import GlobalProgressBar from './components/GlobalProgressBar'; // Or GlobalSpinner
import {initAxiosInterceptors} from './api/axiosInstance';
import './index.css';
import {ToastProvider} from "./context/ToastProvider.tsx"; // Import Tailwind and global styles

// Create Material-UI theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blue
        },
        secondary: {
            main: '#dc004e', // Pink
        },
        background: {
            default: '#f5f5f5', // Light gray background
        },
        text: {
            primary: '#333', // Dark gray text
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif', // Use the Inter font
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/> {/* Resets Material-UI base styles */}
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
                <ToastProvider>
                    <App/>
                </ToastProvider>
            </LoadingProvider>
        </ThemeProvider>
    </React.StrictMode>
);
