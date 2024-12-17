import { Stack } from '@mui/material';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

const Layout = () => {
    return (
        <Stack direction="row" className="main-content h-screen w-full" id="main-content">
            <Sidebar />
            <Stack flex={1} className="content-inner w-full">
                <Content />
            </Stack>
        </Stack>
    );
};

export default Layout;
