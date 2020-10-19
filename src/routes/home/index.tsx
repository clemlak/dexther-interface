import React, {
  useContext,
} from 'react';

import {
  Web3Context,
} from '../../store/web3ContextProvider';

import {
  Button,
} from '../../style/components';

declare global {
  interface Window {
    ethereum: any,
    web3: any,
  }
}

function Home() {
  const web3Context = useContext(Web3Context);

  const {
    state,
    dispatch,
  } = web3Context;

  const {
    address,
  } = state;

  return (
    <>
      <p>
        {`Address: ${address}`}
      </p>
      <Button
        onClick={async () => {
          try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            dispatch({
              type: 'set',
              target: 'address',
              value: accounts[0],
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Connect
      </Button>
    </>
  );
}

export default Home;
