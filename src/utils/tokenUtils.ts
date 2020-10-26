import {
  Contract,
  ContractInterface,
  providers,
  utils,
  BigNumber,
} from 'ethers';
import axios from 'axios';

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

async function isStandardErc721(
  provider: providers.Web3Provider,
  tokenAddress: string,
) {
  try {
    const bytes = utils.toUtf8Bytes('setApprovalForAll(address,bool)');
    const sig = utils.keccak256(bytes).slice(2, 8);
    const code = await provider.getCode(tokenAddress);

    return code.includes(sig);
  } catch (e) {
    console.log(e);
    throw new Error('Cannot read contract');
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

async function setApprovalForAllErc721(
  provider: providers.Web3Provider,
  tokenAddress: string,
  spender: string,
) {
  const contract = new Contract(tokenAddress, erc721Abi, provider.getSigner());

  try {
    const tx = await contract.setApprovalForAll(spender, true);
    const receipt = await tx.wait();

    return receipt;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot set approve for all');
  }
}

async function tokenURI(
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  tokenAddress: string,
  tokenId: BigNumber,
) {
  const contract = new Contract(tokenAddress, erc721Abi, provider);

  try {
    const uri = await contract.tokenURI(tokenId);
    return uri;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot get token URI');
  }
}

async function getMetadata(
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  tokenAddress: string,
  tokenId: BigNumber,
) {
  try {
    const uri = await tokenURI(provider, tokenAddress, tokenId);
    const res = await axios.get(uri);
    const metadata: Metadata = res.data;
    return metadata;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot get metadata');
  }
}

async function getAsset(
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  tokenAddress: string,
  tokenId: BigNumber,
): Promise<Asset> {
  try {
    const contract = new Contract(tokenAddress, erc721Abi, provider);
    const name = await contract.name();
    const symbol = await contract.symbol();

    const metadata: Metadata = await getMetadata(provider, tokenAddress, tokenId);

    const asset: Asset = {
      contract: {
        address: tokenAddress,
        name,
        symbol,
        imageUrl: '',
        type: 'ERC721',
      },
      name: metadata.properties.name.description,
      tokenId: tokenId.toString(),
      imageUrl: metadata.properties.image.description,
    };

    return asset;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot get asset');
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
  isStandardErc721,
  approveErc20,
  allowanceErc20,
  balanceOfErc20,
  approveErc721,
  tokenURI,
  setApprovalForAllErc721,
  setApprovalForAllErc1155,
  isApprovedForAllErc1155,
  isApprovedForAllErc721,
  getMetadata,
  getAsset,
};
