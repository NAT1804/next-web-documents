import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';

import Header from '../header/header';

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Web Document</title>
      </Head>

      <Header path={router.asPath} />

      <Container maxW="container.lg" pt="150">
        {children}
      </Container>
    </Box>
  );
};

export default Main;
