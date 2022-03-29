import { useEffect, useState } from 'react';
import { Box, Button, useColorModeValue } from '@chakra-ui/react';
// import NextLink from 'next/link';
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

  const goToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

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
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
            exit={{ y: 100, opacity: 0, transition: { duration: 0.6 } }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
              // backgroundColor: 'cyan'
            }}
            whileTap={{ scale: 1 }}
            onClick={goToTop}
          >
              <FaArrowUp />
          </MotionButton>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTop;
