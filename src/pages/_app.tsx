import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from '../app/store';
import '../styles/globals.css';
import theme from '../theme';
import { Layout } from '../components';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Layout router={router}>
            <AnimatePresence exitBeforeEnter initial={true}>
              <Component {...pageProps} />
            </AnimatePresence>
            <ToastContainer
              position="top-right"
              autoClose={8000}
              hideProgressBar={false}
              newestOnTop={false}
              draggable={false}
              closeOnClick
              pauseOnHover
            />
          </Layout>
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
