import {
  createGlobalStyle,
} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@400;500;600;700;800&display=swap');

  html,
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    font-family: 'Commissioner', sans-serif;
  }
`;

export default GlobalStyle;
