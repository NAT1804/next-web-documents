import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';

const LinkItem = ({ href, path, children }) => {
  const active = path === href;
  const inActiveColor = useColorModeValue('gray200', 'whiteAlpha.900');
  return (
    <NextLink href={href} passHref>
      <Link
        p={2}
        bg={active ? 'glassTeal' : undefined}
        color={active ? '#202023' : inActiveColor}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const Navbar = ({ path }) => {
  return (
    <>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        display={{ base: 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <LinkItem href="/works" path={path}>
          Tài liệu chung
        </LinkItem>
        <LinkItem href="/posts" path={path}>
          Các trường
        </LinkItem>
        <LinkItem href="/posts" path={path}>
          Đề thi đại học
        </LinkItem>
        <LinkItem href="/posts" path={path}>
          Đề thi THPT chuyên
        </LinkItem>
      </Stack>
      <Box flex={1} align="right">
        <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              aria-label="Options"
            ></MenuButton>
            <MenuList>
              <NextLink href="/" passHref>
                <MenuItem as={Link}>About</MenuItem>
              </NextLink>
              <NextLink href="/works" passHref>
                <MenuItem as={Link}>Works</MenuItem>
              </NextLink>
              <NextLink href="/posts" passHref>
                <MenuItem as={Link}>Posts</MenuItem>
              </NextLink>
              <MenuItem as={Link} href="https://github.com">
                View Source
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
