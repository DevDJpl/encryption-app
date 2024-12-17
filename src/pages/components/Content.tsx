import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Content = () => {
    return (
        <Box component="main" className="page-content overflow-x-auto w-full" id="page-content">
            <Outlet />
        </Box>
    );
};

export default Content;
