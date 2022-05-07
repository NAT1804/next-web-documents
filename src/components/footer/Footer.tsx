import React, { ReactNode, useEffect } from 'react';
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { useAnimation, motion } from 'framer-motion';

import Logo from '../logo/Logo';

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const MotionBox = motion(Box);

const footerVariants = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2
    }
  }
};

const Footer = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <MotionBox
      ref={ref}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      pt={8}
      variants={footerVariants}
      animate={controls}
      initials="hidden"
    >
      <Container as={Stack} maxW="container.xl" py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo />
            </Box>
            <Text fontSize={'sm'}>
              Hiện tại mọi tài liệu chia sẻ đều Miễn Phí!
            </Text>
            <Text fontSize={'sm'}>
              Mọi hình thức Reup nội dung trên website này mà chưa được sự đồng
              ý đều là trái phép!
            </Text>
            <Text fontSize={'sm'}>
              Copyright © 2022 TailieuVNU. All rights reserved
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Link href={'#'}>Overview</Link>
            <Link href={'#'}>Features</Link>
            <Link href={'#'}>Tutorials</Link>
            <Link href={'#'}>Pricing</Link>
            <Link href={'#'}>Releases</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>About</Link>
            <Link href={'#'}>Press</Link>
            <Link href={'#'}>Careers</Link>
            <Link href={'#'}>Contact</Link>
            <Link href={'#'}>Partners</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Legal</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Status</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Follow Us</ListHeader>
            <Link href={'#'}>Facebook</Link>
            <Link href={'#'}>Twitter</Link>
            <Link href={'#'}>Dribbble</Link>
            <Link href={'#'}>Instagram</Link>
            <Link href={'#'}>LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </MotionBox>
  );
};

export default Footer;
