import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  utils,
  providers,
} from 'ethers';

import {
  Web3Context,
} from '../../store/web3ContextProvider';
import {
  Button,
} from '../../style/components';


function Web3Connector() {
  const web3Context = useContext(Web3Context);

  const {
    state,
    dispatch,
  } = web3Context;

  const {
    address,
    chainId,
    provider,
    isWalletConnected,
  } = state;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        const balance = await provider?.getBalance(address);

        if (balance) {
          console.log(utils.formatEther(balance));
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (isWalletConnected && address !== '') {
      getData();
    }
  }, [provider, isWalletConnected, address, chainId]);

  async function saveConnect() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      dispatch({
        type: 'set',
        target: 'address',
        value: utils.getAddress(accounts[0]),
      });

      dispatch({
        type: 'set',
        target: 'isWalletConnected',
        value: true,
      });

      dispatch({
        type: 'set',
        target: 'provider',
        value: new providers.Web3Provider(window.ethereum),
      });

      dispatch({
        type: 'set',
        target: 'chainId',
        value: window.ethereum.chainId,
      });

      window.ethereum.on('accountsChanged', (newAccounts: Array<string>) => {
        dispatch({
          type: 'set',
          target: 'address',
          value: utils.getAddress(newAccounts[0]),
        });
      });

      window.ethereum.on('chainChanged', (newChainId: string) => {
        console.log(newChainId);

        // Quick fix to avoid a crash of Ethers.js
        window.location.reload();
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function isConnected() {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isConnected) {
        try {
          saveConnect();
        } catch (e) {
          console.log(e);
        }
      }
    }

    isConnected();
  }, []);

  async function connect() {
    setIsLoading(true);

    try {
      if (typeof window.ethereum !== 'undefined') {
        await saveConnect();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      genre="primary"
      size="m"
      onClick={() => connect()}
      isLoading={isLoading}
    >
      {isWalletConnected ? (
        <>
          {`${address.substring(0, 5)}...${address.substring(address.length - 6, address.length)}`}
        </>
      ) : (
        'Connect your wallet'
      )}
    </Button>
  );
}

export default Web3Connector;
