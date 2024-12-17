import loadable from '@loadable/component';
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { RouteBoundary } from '@/components/ErrorBoundary';

/* Layouts */
export const BaseLayout = loadable(() => import('@/pages/Layout'));
/* Pages */
export const Home = loadable(() => import('@/pages/Page'));
export const Encryption = loadable(() => import('@/pages/Encryption/Page'));
export const Certificate = loadable(() => import('@/pages/Certificate/Page'));

export const routeList: RouteObject[] = [
    {
        element: <BaseLayout />,
        id: 'root',
        path: '/',
        errorElement: <RouteBoundary />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'encryption',
                element: <Encryption />,
            },
            {
                path: 'certificate',
                element: <Certificate />,
            },
        ],
    },
];

export const router = createBrowserRouter(routeList);
