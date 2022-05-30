import { Box, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { useAnimation, motion } from 'framer-motion';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// const srcLogo = '/logo-tailieu-vnu.png';
const srcLogo = '/logo-3.png';

const logoVariants = {
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

const Logo = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <NextLink href="/" passHref>
      <motion.a
        ref={ref}
        variants={logoVariants}
        initial="hidden"
        animate={controls}
      >
        <Box display="inline-flex" alignItems="center" fontSize="30px">
          <Image src={srcLogo} width="100%" alt="logo" />
        </Box>
      </motion.a>
    </NextLink>
  );
};

export default Logo;
