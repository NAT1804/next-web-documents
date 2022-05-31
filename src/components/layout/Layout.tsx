import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import Head from 'next/head';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import ScrollToTop from '../scroll-to-top/ScrollToTop';
import Searchbar from 'components/search-bar/Searchbar';
import { Latest } from 'components';

const Layout = ({ children, router }) => {
  const checkPathName = () => {
    if (
      router.pathname.includes('login') ||
      router.pathname.includes('register')
    ) {
      return undefined;
    } else {
      return (
        <>
          <Grid templateColumns={'repeat(3, 1fr)'} gap={4} mt={5} mb={2}>
            <GridItem
              colSpan={{ base: 3, md: 2 }}
              gridColumnStart={{ base: 1 }}
            >
              <Latest />
            </GridItem>
            <GridItem
              colSpan={{ base: 3, md: 1 }}
              gridColumnStart={{ base: 1, sm: 2, md: 3 }}
            >
              <Searchbar />
            </GridItem>
          </Grid>
        </>
      );
    }
  };

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TAILIEU VNU</title>
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
