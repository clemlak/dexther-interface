import React, {
  useContext,
  useEffect,
} from 'react';

import {
  Web3Context,
} from '../../store/web3ContextProvider';

import {
  getAssets,
} from '../../utils/openSea';

function Home() {
  const web3Context = useContext(Web3Context);

  const {
    state,
  } = web3Context;

  const {
    address,
    provider,
    chainId,
    isWalletConnected,
  } = state;

  useEffect(() => {
    async function getUserAssets() {
      try {
        const assets = await getAssets('rinkeby', address);
        console.log(assets);
      } catch (e) {
        console.log(e);
      }
    }

    if (address !== '') {
      getUserAssets();
    }
  }, [address]);

  return (
    <>
      <ul>
        <li>
          {`Is Wallet Connected: ${isWalletConnected}`}
        </li>
        <li>
          {`Chain ID: ${chainId}`}
        </li>
      </ul>
    </>
  );
}

export default Home;
