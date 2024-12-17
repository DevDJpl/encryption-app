import { Stack, Box, Typography, Button } from '@mui/material';
import logo from '@/logo.svg';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import { NavLink, isRouteErrorResponse, useRouteError as ExceptionFilter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HttpException } from '@/utility/http.exception';
import { HttpStatus } from '@/types/enums';

function RouteBoundary() {
    const error =
        ExceptionFilter() instanceof HttpException
            ? (ExceptionFilter() as HttpException).getResponse()
            : ExceptionFilter();
    const { t } = useTranslation();

    return (
        <Box className="h-screen xy-center w-full">
            <Box className="w-full h-screen 3xl:h-auto max-w-2xl x-center pt-12 pb-6" px={4}>
                <Box className="x-center items-start w-10/12">
                    <Stack className="w-full px-4 lg:px-6 max-w-2xl">
                        <img src={logo} width={169} className="mb-4 self-center" />
                        <Box className="xy-center flex-col" pb={4}>
                            <ErrorOutlineIcon htmlColor="#f80203" sx={{ fontSize: '56px' }} />
                            <Box className="pt-3">
                                {isRouteErrorResponse(error) ? (
                                    <>
                                        {error.status === HttpStatus.BAD_REQUEST && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 400')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Bad Request.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.UNAUTHORIZED && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 401')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Unauthorized.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.FORBIDDEN && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 403')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Forbidden.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.NOT_FOUND && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 404')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Page Not Found.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.METHOD_NOT_ALLOWED && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 405')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Method Not Allowed.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.PROXY_AUTHENTICATION_REQUIRED && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 407')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Proxy Authentication Required.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.REQUEST_TIMEOUT && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 408')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Request Timeout.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.INTERNAL_SERVER_ERROR && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 500')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ color: '#475467', fontWeight: '400' }}
                                                >
                                                    {t('Internal Server Error.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.BAD_GATEWAY && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 502')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Bad Gateway.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.SERVICE_UNAVAILABLE && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 503')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Service Unavailable.')}
                                                </Typography>
                                            </>
                                        )}
                                        {error.status === HttpStatus.GATEWAY_TIMEOUT && (
                                            <>
                                                <Typography
                                                    variant="h1"
                                                    component="h1"
                                                    color="heddingTitle.main"
                                                    className="text-center not-italic text-3xl leading-8"
                                                    sx={{ fontWeight: '600' }}
                                                >
                                                    {t('Error 504')}
                                                </Typography>
                                                <Typography
                                                    variant="h2"
                                                    component="p"
                                                    color="heddingContent.main"
                                                    className="text-center not-italic text-base pt-1"
                                                    sx={{ fontWeight: '400' }}
                                                >
                                                    {t('Gateway Timeout.')}
                                                </Typography>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Typography
                                            variant="h1"
                                            component="h1"
                                            color="heddingTitle.main"
                                            className="text-center not-italic text-3xl leading-8"
                                            sx={{ fontWeight: '600' }}
                                        >
                                            {t('Error')}
                                        </Typography>
                                        <Typography
                                            variant="h2"
                                            component="p"
                                            color="heddingContent.main"
                                            className="text-center not-italic text-base pt-1"
                                            sx={{ fontWeight: '400' }}
                                        >
                                            {t('An unexpected Error occurred.')}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </Box>
                        <Box className="flex justify-center">
                            <NavLink to={'/'}>
                                <Button
                                    startIcon={<ArrowBackIcon />}
                                    variant="text"
                                    size="medium"
                                    type="button"
                                >
                                    {t('Back to Home page')}
                                </Button>
                            </NavLink>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

export default RouteBoundary;
