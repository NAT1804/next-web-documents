import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { FaArrowUp } from 'react-icons/fa';

const MotionButton = motion(Button);

const ScrollToTop = () => {
  const [scrollPostition, setScrolPosition] = useState(0);
  const colorButtonScroll = useColorModeValue('primaryGreen', 'primaryOrange');

  useEffect(() => {
    const updatePosition = () => setScrolPosition(window.scrollY);

    window.addEventListener('scroll', updatePosition);

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return (
    <>
      <AnimatePresence>
        {scrollPostition > 100 && (
          <MotionButton
            position={'fixed'}
            bottom={'2'}
            right={'2'}
            w={'50'}
            h={'50'}
            bgColor={colorButtonScroll}
            scrollBehavior="smooth"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
            exit={{ y: 100, opacity: 0, transition: { duration: 0.6 } }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
              backgroundColor: 'cyan'
            }}
            whileTap={{ scale: 1 }}
          >
            <NextLink scroll href={'#'} passHref>
              <FaArrowUp />
            </NextLink>
          </MotionButton>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTop;
