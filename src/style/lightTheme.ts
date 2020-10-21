import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  font: {
    family: 'Commissioner',
    weight: {
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
    },
    size: {
      huge: '44px',
      big: '36px',
      regular: '16px',
      small: '12px',
    },
  },
  border: {
    radius: '10px',
    style: 'solid',
    width: '2px',
  },
  colors: {
    brand: '#FEDE48',
    primary: '#000',
    secondary: '#666666',
    inverted: '#fff',
    light: '#f7f1e1',
    background: '#fff',
  },
};

export default lightTheme;
