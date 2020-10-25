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

import {
  getOffers,
} from '../../utils/dexther';

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

  useEffect(() => {
    async function getCurrentOffers() {
      try {
        const res = await getOffers(provider, '4');
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }

    getCurrentOffers();
  }, [provider]);

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
