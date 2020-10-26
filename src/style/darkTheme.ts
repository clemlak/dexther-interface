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
    radius: '16px',
    style: 'solid',
    width: '2px',
  },
  colors: {
    brand: '#86d4b2',
    primary: '#ffffff',
    secondary: '#595959',
    inverted: '#171717',
    light: '#292929',
    background: '#171717',
  },
};

export default lightTheme;
