/* eslint-disable no-await-in-loop */

import {
  Contract,
  providers,
  BigNumber,
  ContractInterface,
} from 'ethers';

import {
  getAsset,
} from './tokenUtils';

import dextherAbiJson from './abis/dexther.json';
import config from './config';

const dextherAbi = dextherAbiJson as ContractInterface;

declare global {
  interface Offer {
    creator: string;
    estimateAmount: BigNumber;
    estimateTokenAddress: string;
    offerTokensAddresses: string[];
    offerTokensIds: BigNumber[];
    offerTokensValues: BigNumber[];
    expectedTokens: string[];
    restrictedTo: string;
    swapper: string;
    swappedAt: string;
    swapTokensAddresses: string[];
    swapTokensIds: BigNumber[];
    swapTokensValues: BigNumber[];
    status: BigNumber;
  }
}

function getContract(
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  chainId: string,
) {
  const contractAddress = config.contracts.dexther[chainId];

  if (provider instanceof providers.Web3Provider) {
    return new Contract(contractAddress, dextherAbi, provider.getSigner());
  }

  return new Contract(contractAddress, dextherAbi, provider);
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

async function getOffer(
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  chainId: string,
  offerId: BigNumber,
) {
  const contract = getContract(provider, chainId);

  try {
    const offer = await contract.getOffer(offerId);
    return offer;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot get offer');
  }
}

async function getOffers(
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  chainId: string,
) {
  const contract = getContract(provider, chainId);

  try {
    const filter = contract.filters.Created();
    const logs = await contract.queryFilter(filter);

    const offers: Offer[] = [];

    for (let i = 0; i < logs.length; i += 1) {
      if (logs[i]?.args?.offerId !== undefined) {
        const offerId = logs[i]?.args?.offerId;

        const offer: Offer = await getOffer(provider, chainId, offerId);

        console.log(offer);

        for (let j = 0; j < offer.offerTokensAddresses.length; j += 1) {
          const asset = await getAsset(
            provider,
            offer.offerTokensAddresses[j],
            offer.offerTokensIds[j],
          );

          console.log(asset);
        }

        offers.push(offer);
      }
    }

    return offers;
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
