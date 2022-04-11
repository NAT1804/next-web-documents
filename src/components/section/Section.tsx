import { motion, isValidMotionProp } from 'framer-motion';
import { Box, chakra, shouldForwardProp } from '@chakra-ui/react';

// const StyledDiv = chakra(motion.div, {
// shouldForwardProp: prop => {
//   return shouldForwardProp(prop) || prop === 'transition';
// }
// shouldForwardProp: isValidMotionProp
// });

const StyledDiv = motion(Box);

const Section = ({ children, delay = 0 }) => {
  const transition = {
    duration: 1,
    delay
  };

  return (
    <StyledDiv
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={transition}
      mb={6}
    >
      {children}
    </StyledDiv>
  );
};

export default Section;
