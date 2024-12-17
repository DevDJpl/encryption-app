import React, { createContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertColor, AlertTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { capitalizeWords } from '@/utility/shared';
import { AxiosError } from 'axios';

interface AlertContextType {
    showSuccess: (message: string) => void;
    showError: (message: AxiosError | string | null) => void;
}

interface ErrorResponse {
    message: string;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('success');

    const showAlert = (newSeverity: AlertColor, newMessage: string) => {
        setMessage(newMessage);
        setSeverity(newSeverity);
        setOpen(true);
    };

    const showSuccess = (message: string) => {
        showAlert('success', message);
    };

    const showError = (error: AxiosError | string | null) => {
        let errorMessage: string = '';

        if (!error) {
            errorMessage = t('Something went wrong');
        }
        if (typeof error === 'string') {
            errorMessage = error;
        } else {
            errorMessage = (error?.response?.data as ErrorResponse)?.message;
        }
        showAlert('error', errorMessage);
    };

    const hideAlert = () => {
        setOpen(false);
    };

    return (
        <AlertContext.Provider value={{ showSuccess, showError }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={hideAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={severity} onClose={hideAlert}>
                    <AlertTitle>{capitalizeWords(t(severity))}!</AlertTitle>
                    {t(message)}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};

export default AlertProvider;
