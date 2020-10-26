import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  ThemeProvider,
} from 'styled-components';

import darkTheme from '../../style/darkTheme';
import GlobalStyle from '../../style/globalStyle';

import {
  Web3ContextProvider,
} from '../../store/web3ContextProvider';

import Header from '../header';
import Footer from '../footer';

import Home from '../../routes/home';
import Create from '../../routes/create';
import OfferView from '../../routes/offer';

function App() {
  return (
    <BrowserRouter>
      <>
        <ThemeProvider theme={darkTheme}>
          <>
            <Web3ContextProvider>
              <GlobalStyle />
              <Header />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/create" exact component={Create} />
                <Route path="/offer/:id" component={OfferView} />
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
