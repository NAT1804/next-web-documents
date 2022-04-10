import NextLink from 'next/link';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import Logo from '../logo/Logo';
import Navbar from '../navbar/Navbar';
import ToggleButton from '../toggle-button/ToggleButton';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = props => {
  const { path } = props;
  const { data: session, status } = useSession();

  const bgColorButton = useColorModeValue('primaryGreen', 'primaryOrange');
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      h="180px"
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
              {session ? (
                <>
                  <Text
                    display={{ base: 'none', sm: 'block' }}
                    alignSelf="center"
                  >
                    {session?.user?.name}
                  </Text>
                  <Button
                    as={'a'}
                    fontSize={'sm'}
                    fontWeight={400}
                    variant={'link'}
                    onClick={e => {
                      e.preventDefault();
                      signOut({ callbackUrl: `${window.location.origin}` });
                    }}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <NextLink href="/login" passHref>
                    <Button
                      as={'a'}
                      fontSize={'sm'}
                      fontWeight={400}
                      variant={'link'}
                      // href="/login"
                      onClick={e => {
                        e.preventDefault();
                        signIn();
                      }}
                    >
                      Sign In
                    </Button>
                  </NextLink>
                  {/* <NextLink href="/register" passHref> */}
                  <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={bgColorButton}
                    _hover={{
                      bg: 'cyan.300'
                    }}
                    onClick={() => {}}
                  >
                    Sign Up
                  </Button>
                  {/* </NextLink> */}
                </>
              )}
            </Stack>
          </Box>
        </Flex>
        <Navbar path={path} />
      </Container>
    </Box>
  );
};

export default Header;
