import {
  Contract,
  ContractInterface,
  providers,
} from 'ethers';

import erc20AbiJson from './abis/erc20.json';
import erc721AbiJson from './abis/erc721.json';
import erc1155AbiJson from './abis/erc1155.json';

const erc20Abi: ContractInterface = erc20AbiJson;
const erc721Abi: ContractInterface = erc721AbiJson;
const erc1155Abi: ContractInterface = erc1155AbiJson;

async function approveErc20(
  provider: providers.Web3Provider,
  tokenAddress: string,
  spender: string,
  amount: string,
) {
  const contract = new Contract(tokenAddress, erc20Abi, provider);

  try {
    const tx = await contract.approve(spender, amount);
    const receipt = await tx.wait();

    return receipt;
  } catch (e) {
    console.log(e);

    throw new Error('Cannot approve');
  }
}

async function allowanceErc20(
  provider: providers.Web3Provider,
  tokenAddress: string,
  owner: string,
  spender: string,
) {
  const contract = new Contract(tokenAddress, erc20Abi, provider);

  try {
    const allowance = await contract.approve(owner, spender);
    return allowance;
  } catch (e) {
    console.log(e);

    throw new Error('Cannot approve');
  }
}

async function balanceOfErc20(
  provider: providers.Web3Provider,
  tokenAddress: string,
  owner: string,
) {
  const contract = new Contract(tokenAddress, erc20Abi, provider);

  try {
    const balance = await contract.balanceOf(owner);
    return balance;
  } catch (e) {
    console.log(e);

    throw new Error('Cannot approve');
  }
}

async function approveErc721(
  provider: providers.Web3Provider,
  tokenAddress: string,
  spender: string,
  amount: string,
) {
  const contract = new Contract(tokenAddress, erc721Abi, provider);

  try {
    const tx = await contract.approve(spender, amount);
    const receipt = await tx.wait();

    return receipt;
  } catch (e) {
    console.log(e);

    throw new Error('Cannot approve');
  }
}

async function setApproveForAllErc721(
  provider: providers.Web3Provider,
  tokenAddress: string,
  spender: string,
) {
  const contract = new Contract(tokenAddress, erc721Abi, provider);

  try {
    const tx = await contract.setApprovalForAll(spender, true);
    const receipt = await tx.wait();

    return receipt;
  } catch (e) {
    console.log(e);

    throw new Error('Cannot set approve for all');
  }
}

async function setApprovalForAllErc1155(
  provider: providers.Web3Provider,
  tokenAddress: string,
  spender: string,
) {
  const contract = new Contract(tokenAddress, erc1155Abi, provider);

  try {
    const tx = await contract.setApprovalForAll(spender, true);
    const receipt = await tx.wait();

    return receipt;
  } catch (e) {
    console.log(e);

    throw new Error('Cannot set approve for all');
  }
}

async function isApprovedForAllErc721(
  provider: providers.Web3Provider,
  tokenAddress: string,
  account: string,
  spender: string,
) {
  const contract = new Contract(tokenAddress, erc721Abi, provider);

  try {
    const isApprovedForAll = await contract.isApprovedForAll(account, spender);
    return isApprovedForAll;
  } catch (e) {
    console.log(e);

    throw new Error('Cannot get approved for all');
  }
}

async function isApprovedForAllErc1155(
  provider: providers.Web3Provider,
  tokenAddress: string,
  account: string,
  spender: string,
) {
  const contract = new Contract(tokenAddress, erc1155Abi, provider);

  try {
    const isApprovedForAll = await contract.isApprovedForAll(account, spender);
    return isApprovedForAll;
  } catch (e) {
    console.log(e);

    throw new Error('Cannot get approved for all');
  }
}

export {
  approveErc20,
  allowanceErc20,
  balanceOfErc20,
  approveErc721,
  setApproveForAllErc721,
  setApprovalForAllErc1155,
  isApprovedForAllErc1155,
  isApprovedForAllErc721,
};
