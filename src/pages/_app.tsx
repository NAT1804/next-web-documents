import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { store } from '../app/store';
import '../styles/globals.css';
import theme from '../theme';
import { Layout } from '../components';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Layout router={router}>
            <AnimatePresence exitBeforeEnter initial={true}>
              <Component {...pageProps} />
            </AnimatePresence>
          </Layout>
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
