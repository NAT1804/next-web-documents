import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollToTop from '../scroll-to-top/ScrollToTop';
import Searchbar from 'components/search-bar/Searchbar';

const Layout = ({ children, router }) => {
  const checkPathName = () => {
    if (
      router.pathname.includes('login') ||
      router.pathname.includes('register')
    ) {
      return undefined;
    } else {
      return <Searchbar />;
    }
  };

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Web Document</title>
      </Head>
      <Header path={router.asPath} />
      <Container maxW="container.xl" pt={{ base: 160, md: 190 }}>
        {checkPathName()}
        {children}
      </Container>
      <Footer />
      <ScrollToTop />
    </Box>
  );
};

export default Layout;
