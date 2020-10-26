import React from 'react';

import {
  ThemeProvider,
} from 'styled-components';

import lightTheme from '../src/style/lightTheme';
import darkTheme from '../src/style/darkTheme';
import GlobalStyle from '../src/style/globalStyle';

import {
  Web3ContextProvider,
} from '../src/store/web3ContextProvider';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Web3ContextProvider>
        <Story />
      </Web3ContextProvider>
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
