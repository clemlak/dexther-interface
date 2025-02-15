import React, {
  createContext,
  useReducer,
} from 'react';
import {
  providers,
} from 'ethers';

interface IWeb3State {
  provider: providers.JsonRpcProvider | providers.Web3Provider;
  address: string;
  chainId: string;
  isWalletConnected: boolean;
}

export interface IWeb3Context {
  state: IWeb3State;
  dispatch: React.Dispatch<any>;
}

const Web3Context = createContext<IWeb3Context>({
  state: {
    provider: new providers.JsonRpcProvider('https://rpc-mumbai.matic.today', 80001),
    address: '',
    chainId: '80001',
    isWalletConnected: false,
  },
  dispatch: () => {},
});

interface IAction {
  type: string;
  target: string;
  value: number | string | Function,
}

function web3Reducer(
  state: IWeb3State,
  action: IAction,
) {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        [action.target]: action.value,
      };
    default:
      throw new Error('Unexpection action...');
  }
}

const initialWeb3State: IWeb3State = {
  provider: new providers.JsonRpcProvider('https://rpc-mumbai.matic.today', 80001),
  address: '',
  chainId: '80001',
  isWalletConnected: false,
};

interface IWeb3ContextProvider {
  children: React.ReactElement | React.ReactElement[] | Element | Element[],
}

function Web3ContextProvider(props: IWeb3ContextProvider) {
  const {
    children,
  } = props;

  const [state, dispatch] = useReducer(web3Reducer, initialWeb3State);
  const value = {
    state,
    dispatch,
  };

  return (
    <Web3Context.Provider
      value={value}
    >
      {children}
    </Web3Context.Provider>
  );
}

export {
  Web3Context,
  Web3ContextProvider,
};
