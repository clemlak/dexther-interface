/* eslint-disable no-await-in-loop */

import {
  Contract,
  providers,
  BigNumber,
  ContractInterface,
  utils,
} from 'ethers';

import {
  getAsset,
} from './tokenUtils';

import dextherAbiJson from './abis/dexther.json';
import config from './config';

const dextherAbi = dextherAbiJson as ContractInterface;

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
  offerId: string,
): Promise<Offer> {
  const contract = getContract(provider, chainId);

  try {
    const offer = await contract.getOffer(offerId);
    return offer;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot get offer');
  }
}

async function getOfferWithAssets(
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  chainId: string,
  offerId: string,
): Promise<OfferWithAssets> {
  try {
    const offer = await getOffer(provider, chainId, offerId);

    const offerAssets: Asset[] = [];
    const swapAssets: Asset[] = [];

    for (let i = 0; i < offer.offerTokensAddresses.length; i += 1) {
      const asset = await getAsset(
        provider,
        offer.offerTokensAddresses[i],
        offer.offerTokensIds[i],
      );

      offerAssets.push(asset);
    }

    for (let i = 0; i < offer.swapTokensAddresses.length; i += 1) {
      const asset = await getAsset(
        provider,
        offer.swapTokensAddresses[i],
        offer.swapTokensIds[i],
      );

      swapAssets.push(asset);
    }

    const offerWithAssets: OfferWithAssets = {
      offerId,
      creator: offer.creator,
      estimateAmount: utils.formatEther(offer.estimateAmount),
      estimateTokenAddress: offer.estimateTokenAddress,
      offerAssets,
      expectedTokens: offer.expectedTokens,
      restrictedTo: offer.restrictedTo,
      swapper: offer.swapper,
      swappedAt: offer.swappedAt,
      swapAssets,
      status: offer.status.toString(),
    };

    return offerWithAssets;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot get offer with assets');
  }
}

async function getOffers(
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  chainId: string,
): Promise<OfferWithAssets[]> {
  const contract = getContract(provider, chainId);

  try {
    const filter = contract.filters.Created();
    const logs = await contract.queryFilter(filter);

    const offers: OfferWithAssets[] = [];

    for (let i = 0; i < logs.length; i += 1) {
      if (logs[i]?.args?.offerId !== undefined) {
        const offerId = logs[i]?.args?.offerId;
        const offer: OfferWithAssets = await getOfferWithAssets(
          provider,
          chainId,
          offerId.toString(),
        );

        offers.push(offer);
      }
    }

    return offers;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot get offers');
  }
}

function getStatus(status: string): string {
  switch (status) {
    case '0':
      return 'Available';
    case '1':
      return 'Swapped';
    case '2':
      return 'Finalized';
    case '3':
      return 'Canceled';
    default:
      return 'Wrong status';
  }
}

async function swap(
  provider: providers.Web3Provider,
  chainId: string,
  offerId: string,
  swapTokensAddresses: string[],
  swapTokensIds: string[],
  swapTokensValues: string[],
) {
  const contract = getContract(provider, chainId);

  try {
    const tx = await contract.swap(
      offerId,
      swapTokensAddresses,
      swapTokensIds,
      swapTokensValues,
    );

    const receipt = await tx.wait();
    return receipt;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot swap');
  }
}

async function finalize(
  provider: providers.Web3Provider,
  chainId: string,
  offerId: string,
  claimingAssets: boolean,
) {
  const contract = getContract(provider, chainId);

  try {
    const tx = await contract.finalize(
      offerId,
      claimingAssets,
    );

    const receipt = await tx.wait();
    return receipt;
  } catch (e) {
    console.log(e);
    throw new Error('Cannot finalize');
  }
}

export {
  createOffer,
  cancelOffer,
  getOffers,
  getOfferWithAssets,
  getStatus,
  swap,
  finalize,
};
