import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import theme from '../theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
