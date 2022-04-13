import { motion, isValidMotionProp } from 'framer-motion';
import { Box, chakra, shouldForwardProp } from '@chakra-ui/react';

// const StyledDiv = chakra(motion.div, {
// shouldForwardProp: prop => {
//   return shouldForwardProp(prop) || prop === 'transition';
// }
// shouldForwardProp: isValidMotionProp
// });

const StyledDiv = motion(Box);

const Section = ({ children, delay = 0, x = 0, y = 0 }) => {
  const transition = {
    duration: 1,
    delay
  };

  return (
    <StyledDiv
      initial={{ x, y, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ x, y, opacity: 0 }}
      transition={transition}
      mb={6}
    >
      {children}
    </StyledDiv>
  );
};

export default Section;
