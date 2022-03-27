import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';

import Logo from '../logo/Logo';
import Navbar from '../navbar/Navbar';
import ToggleButton from '../toggle-button/ToggleButton';

const Header = props => {
  const { path } = props;
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      backdropFilter={'blur(10px)'}
      zIndex={2}
    >
      <Container
        display="flex"
        flexDir="column"
        p={2}
        maxW="container.lg"
        flexWrap="wrap"
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg" letterSpacing={'tighter'}>
              <Logo />
            </Heading>
          </Flex>
          <Box flex={1} alignSelf="right">
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={6}
            >
              <ToggleButton />
              <NextLink href="/login" passHref>
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  href="/login"
                >
                  Sign In
                </Button>
              </NextLink>
              <NextLink href="/register" passHref>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={useColorModeValue('primaryGreen', 'primaryOrange')}
                  _hover={{
                    bg: 'cyan.300'
                  }}
                >
                  Sign Up
                </Button>
              </NextLink>
            </Stack>
          </Box>
        </Flex>
        <Navbar path={path} />
      </Container>
    </Box>
  );
};

export default Header;
