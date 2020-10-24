import {
  Contract,
  providers,
  BigNumber,
} from 'ethers';

import dextherAbi from './abis/dexther.json';
import config from './config.json';

function getContract(
  provider: providers.Web3Provider,
  chainId: string,
) {
  const contractAddress = '0x97632340F1A717223Af560Ce86fFF70a56D3De4F';
  const contract = new Contract(contractAddress, dextherAbi, provider.getSigner());

  return contract;
}

async function createOffer(
  provider: providers.Web3Provider,
  chainId: string,
  estimateAmount: BigNumber,
  estimateTokenAddress: string,
  offerTokensAddresses: string[],
  offerTokensIds: string[],
  offerTokensValues: string[],
  expectedTokens: string[],
  restrictedTo: string,
) {
  const contract = getContract(provider, chainId);

  try {
    const tx = await contract.createOffer(
      estimateAmount,
      estimateTokenAddress,
      offerTokensAddresses,
      offerTokensIds,
      offerTokensValues,
      expectedTokens,
      restrictedTo,
    );

    const receipt = await tx.wait();

    return receipt;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot create offer');
  }
}

async function cancelOffer(
  provider: providers.Web3Provider,
  chainId: string,
  offerId: string,
) {
  const contract = getContract(provider, chainId);

  try {
    const tx = await contract.cancelOffer(offerId);
    const receipt = await tx.wait();

    return receipt;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot cancel offer');
  }
}

async function getOffers(
  provider: providers.Web3Provider,
  chainId: string,
) {
  const contract = getContract(provider, chainId);

  try {
    const filter = contract.filters.Created();
    const logs = await contract.queryFilter(filter);
    return logs;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot get offers');
  }
}

export {
  createOffer,
  cancelOffer,
  getOffers,
};
