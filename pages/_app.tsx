import { ChakraProvider } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

import '../styles/globals.css';
import theme from '../theme';
import { Layout } from '../components';

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout router={router}>
        <AnimatePresence exitBeforeEnter initial={true}>
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
