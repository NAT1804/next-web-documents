import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  golbal: props => ({
    body: {
      bg: mode('#F7F7F7', '#202023')(props)
      // bg: mode('#f0e7db', '#202023')(props)
    }
  })
};

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#00ab8b', '#ffa14e')(props),
      textUnderlineOffset: 3
    })
  }
};

const fonts = {
  heading: 'M PLUS Rounded 1c'
};

const colors = {
  glassTeal: '#88ccca',
  primaryOrange: '#ffa14e',
  primaryGreen: '#00ab8b'
};

const config = {
  initialColorMode: 'dark'
  // useSystemColorMode: true
};

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts
});

export default theme;
