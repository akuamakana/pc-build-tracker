import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import '@fontsource/raleway/700.css';
import '../styles/globals.css';
import theme from '../styles/theme';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
// import { QueryClient, QueryClientProvider } from 'react-query';

// const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
