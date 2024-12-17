import { Alert } from '@mui/material';
import { AxiosError } from 'axios';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorResponse {
    message: string;
}

function ErrorAlert({ error }: { error: AxiosError | null }) {
    const { t } = useTranslation();

    if (!error) {
        return null;
    }

    const errorMessage = (error?.response?.data as ErrorResponse)?.message;

    return <Alert severity="error">{t(errorMessage) || t('Something went wrong')}</Alert>;
}

export default memo(ErrorAlert);
