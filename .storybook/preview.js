import React from 'react';

import {
  ThemeProvider,
} from 'styled-components';

import lightTheme from '../src/style/lightTheme';

import {
  Web3ContextProvider,
} from '../src/store/web3ContextProvider';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <Web3ContextProvider>
        <Story />
      </Web3ContextProvider>
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
