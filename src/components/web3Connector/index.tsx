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
  Modal,
  Link,
  Text,
} from '../../style/components';

function Web3Connector() {
  const web3Context = useContext(Web3Context);

  const {
    state,
    dispatch,
  } = web3Context;

  const {
    address,
    isWalletConnected,
    chainId,
  } = state;

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        value: parseInt(window.ethereum.chainId, 16).toString(),
      });

      window.ethereum.on('accountsChanged', (newAccounts: Array<string>) => {
        dispatch({
          type: 'set',
          target: 'address',
          value: utils.getAddress(newAccounts[0]),
        });
      });

      window.ethereum.on('chainChanged', (newChainId: string) => {
        dispatch({
          type: 'set',
          target: 'chainId',
          value: parseInt(newChainId, 16).toString(),
        });

        dispatch({
          type: 'set',
          target: 'provider',
          value: new providers.Web3Provider(window.ethereum),
        });
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
    <>
      <Modal
        title="Wrong network!"
        isOpen={chainId !== '80001'}
        toggle={() => {}}
      >
        <Text>
          Currently only Mumbai network is supported. Please connect your MetaMask to this network.
        </Text>
        <Link
          href="https://docs.matic.network/docs/develop/metamask/config-matic"
          rel="noreferrer noopener"
          margin="0"
        >
          More information here about the Matic Mumbai testnet here.
        </Link>
      </Modal>
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
    </>
  );
}

export default Web3Connector;
