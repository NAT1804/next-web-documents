import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ToggleButton = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle theme"
      colorScheme={useColorModeValue('green', 'orange')}
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      onClick={toggleColorMode}
    ></IconButton>
  );
};

export default ToggleButton;
