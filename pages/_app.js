import { ChakraProvider } from '@chakra-ui/react';

import '../styles/globals.css';
import theme from '../libs/theme';
import Main from '../components/layouts/main';

function MyApp({ Component, pageProps, router }) {
  console.log(router);
  return (
    <ChakraProvider theme={theme}>
      <Main router={router}>
        <Component {...pageProps} />
      </Main>
    </ChakraProvider>
  );
}

export default MyApp;
