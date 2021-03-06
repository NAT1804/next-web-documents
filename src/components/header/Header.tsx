import NextLink from 'next/link';
import {
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { useSession, signIn, signOut } from 'next-auth/react';

import Logo from '../logo/Logo';
import Navbar from '../navbar/Navbar';
import ToggleButton from '../toggle-button/ToggleButton';
import { useRouter } from 'next/router';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  HamburgerIcon
} from '@chakra-ui/icons';

const Header = props => {
  const { path } = props;
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

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
        maxW="container.xl"
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
                  {/* <Popover trigger="click" placement={'bottom'}> */}
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      <Text
                        alignSelf="center"
                        cursor={'pointer'}
                        _hover={{
                          opacity: 0.75
                        }}
                        onClick={onToggle}
                      >
                        {session?.user?.name}
                      </Text>
                    </MenuButton>
                    <MenuList zIndex={10}>
                      <MenuItem
                        onClick={e => {
                          e.preventDefault();
                          signOut({
                            callbackUrl: `${window.location.href}`
                          });
                        }}
                      >
                        {/* <Button
                          display={{ base: 'none', sm: 'flex' }}
                          as={'a'}
                          fontSize={'sm'}
                          fontWeight={400}
                          variant={'link'}
                          onClick={e => {
                            e.preventDefault();
                            signOut({
                              callbackUrl: `${window.location.href}`
                            });
                          }}
                        > */}
                        ????ng xu???t
                        {/* </Button> */}
                      </MenuItem>
                      <NextLink href={'/change-password'} passHref>
                        <MenuItem>?????i m???t kh???u</MenuItem>
                      </NextLink>
                      <NextLink href={'/my-document'} passHref>
                        <MenuItem>T??i li???u c???a t??i</MenuItem>
                      </NextLink>
                      <NextLink href={'/like-document'} passHref>
                        <MenuItem>T??i li???u y??u th??ch</MenuItem>
                      </NextLink>
                      <NextLink href={'/report-document'} passHref>
                        <MenuItem>T??i li???u ???? b??o c??o</MenuItem>
                      </NextLink>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <NextLink href="/login" passHref>
                    <Button
                      as={'a'}
                      fontSize={'sm'}
                      fontWeight={400}
                      variant={'link'}
                      href="/login"
                      onClick={e => {
                        e.preventDefault();
                        signIn();
                      }}
                    >
                      ????ng nh???p
                    </Button>
                  </NextLink>
                  <NextLink href="/register" passHref>
                    <Button
                      display={{ base: 'none', md: 'inline-flex' }}
                      fontSize={'sm'}
                      fontWeight={600}
                      color={'white'}
                      bg={bgColorButton}
                      _hover={{
                        bg: 'cyan.300'
                      }}
                    >
                      ????ng k??
                    </Button>
                  </NextLink>
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
