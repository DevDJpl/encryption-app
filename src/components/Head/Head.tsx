import { Helmet, HelmetProvider } from 'react-helmet-async';

const Head = ({ children }: { children: React.ReactNode }) => {

  return (
    <HelmetProvider>
      <Helmet>
        {children}
      </Helmet>
    </HelmetProvider>
  );
}

export default Head;
