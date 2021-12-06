import { extendTheme, withDefaultColorScheme, withDefaultSize, withDefaultProps } from '@chakra-ui/react';

const theme = extendTheme(
  {
    fonts: {
      heading: 'Raleway',
      body: 'Nunito',
    },
    colors: {
      brand: {
        '50': '#f4f8fa',
        '100': '#eaf0f5',
        '200': '#cadae7',
        '300': '#aac3d9',
        '400': '#6b97bc',
        '500': '#2B6A9F',
        '600': '#275f8f',
        '700': '#205077',
        '800': '#1a405f',
        '900': '#15344e',
      },
      dark: {
        '50': '#f5f5f5',
        '100': '#ebebec',
        '200': '#cdcccf',
        '300': '#afadb2',
        '400': '#737078',
        '500': '#37323e',
        '600': '#322d38',
        '700': '#29262f',
        '800': '#211e25',
        '900': '#1b191e',
      },
      mid: {
        '50': '#f8f8f8',
        '100': '#f0f0f1',
        '200': '#dbdadd',
        '300': '#c5c3c8',
        '400': '#99979e',
        '500': '#6d6a75',
        '600': '#625f69',
        '700': '#525058',
        '800': '#414046',
        '900': '#353439',
      },
    },
    components: {
      Button: {
        baseStyle: {
          borderRadius: 'sm',
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
    components: ['Button', 'Link'],
  }),
  withDefaultSize({
    size: 'sm',
    components: ['Button', 'Input', 'Select'],
  }),
  withDefaultProps({
    defaultProps: {
      color: 'brand.500',
    },
    components: ['Link', 'CLink'],
  })
);

export default theme;
