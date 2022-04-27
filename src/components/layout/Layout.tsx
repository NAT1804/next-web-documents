import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollToTop from '../scroll-to-top/ScrollToTop';

const Layout = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Web Document</title>
      </Head>
      <Header path={router.asPath} />
      <Container maxW="container.lg" pt="190">
        {children}
      </Container>
      <Footer />
      <ScrollToTop />
    </Box>
  );
};

export default Layout;
