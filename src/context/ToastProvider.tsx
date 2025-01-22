import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Alert, AlertColor, Snackbar} from '@mui/material';

type ToastContextType = {
    showToast: (message: string, severity: AlertColor) => void;
};

let externalShowToast: (message: string, severity: AlertColor) => void; // External toast function

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');

    const showToast = (message: string, severity: AlertColor) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Assign the internal showToast function to the global one
    externalShowToast = showToast;

    return (
        <ToastContext.Provider value={{showToast}}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert onClose={handleClose} severity={severity} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

// Expose a global function to trigger toasts
export const toast = (message: string, severity: AlertColor) => {
    if (externalShowToast) {
        externalShowToast(message, severity);
    }
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
