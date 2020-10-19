import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      family: string;
      weight: {
        regular: number;
        medium: number;
        semiBold: number;
        bold: number;
        extraBold: number;
      },
      size: {
        huge: string;
        big: string;
        regular: string;
        small: string;
      },
    },
    border: {
      radius: string;
      style: string;
      width: string;
    },
    colors: {
      brand: string;
      primary: string;
      secondary: string;
      inverted: string;
      light: string;
      background: string;
    }
  }
}
