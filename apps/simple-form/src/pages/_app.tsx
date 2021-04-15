import 'fontsource-roboto';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';

function CustomApp({ Component, pageProps }: AppProps) {
  const theme = createMuiTheme();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Welcome to simple-form!</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
