import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  ThemeProvider,
} from 'styled-components';

import lightTheme from '../../style/lightTheme';
import GlobalStyle from '../../style/globalStyle';

import {
  Web3ContextProvider,
} from '../../store/web3ContextProvider';

import Header from '../header';
import Footer from '../footer';

import Home from '../../routes/home';

function App() {
  return (
    <BrowserRouter>
      <>
        <ThemeProvider theme={lightTheme}>
          <>
            <Web3ContextProvider>
              <GlobalStyle />
              <Header />
              <Switch>
                <Route path="/" exact component={Home} />
              </Switch>
              <Footer />
            </Web3ContextProvider>
          </>
        </ThemeProvider>
      </>
    </BrowserRouter>
  );
}

export default App;
