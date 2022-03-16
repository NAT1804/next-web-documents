import {
  Box,
  Container,
  Flex,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';

import Logo from '../logo/logo';
import Navbar from '../navbar/navbar';
import ToggleButton from '../toggle-button/toggle-button';

const Header = props => {
  const { path } = props;
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      style={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
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
          <Box flex={1} align="right">
            <ToggleButton />
          </Box>
        </Flex>
        <Navbar path={path} />
      </Container>
    </Box>
  );
};

export default Header;
