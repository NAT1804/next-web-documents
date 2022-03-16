import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

const Logo = () => {
  const srcLogo = '/logo.png';
  return (
    <Link href="/">
      <a>
        <Box display="inline-flex" alignItems="center" fontSize="30px">
          <Image src={srcLogo} width={20} height={20} alt="logo" />
          <Text
            color={useColorModeValue('gray.800', 'whiteAlpha.900')}
            fontWeight="bold"
            ml={3}
          >
            Tài liệu VNU
          </Text>
        </Box>
      </a>
    </Link>
  );
};

export default Logo;
