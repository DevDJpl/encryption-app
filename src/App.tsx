import '@/app.css';
import { PrimeReactProvider } from 'primereact/api';
import { CssBaseline } from '@mui/material';
import { router } from '@/routes';
import { RouterProvider } from 'react-router-dom';
import { AlertProvider } from '@/components/Alert';
// @ts-ignore
import CipherGuard from '@/presets/theme';
//import Tailwind from 'primereact/passthrough/tailwind';
import 'primeicons/primeicons.css';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';

//import 'primereact/resources/themes/lara-light-blue/theme.css';

const App = () => {
  return (
    <PrimeReactProvider value={{
      ripple: true,
      unstyled: true,
      pt: CipherGuard,
     }}>
      <AlertProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AlertProvider>
    </PrimeReactProvider>
  );
}

export default App;
