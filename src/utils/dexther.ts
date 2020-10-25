import {
  Contract,
  providers,
  BigNumber,
  ContractInterface,
} from 'ethers';

import dextherAbiJson from './abis/dexther.json';
import config from './config.json';

const dextherAbi = dextherAbiJson as ContractInterface;

function getContract(
  provider: providers.Web3Provider,
  chainId: string,
) {
  const contractAddress = '0x18a4c4D0fEd36F715d264D4A3e051AE719388D19';
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

interface Offer {
  creator: string;
  estimateAmount: BigNumber;
  estimateTokenAddress: string;
  offerTokensAddresses: string[];
  offerTokensValues: BigNumber[];
  offersTokensIds: BigNumber[];
  expectedTokens: string[];
  restrictedTo: string;
  swapper: string;
  swappedAt: string;
  swapTokensAddresses: string[];
  swapTokensIds: BigNumber[];
  swapTokensValues: BigNumber[];
}

async function getOffer(
  provider: providers.Web3Provider | providers.JsonRpcProvider,
  chainId: string,
  offerId: BigNumber,
) {
  const contractAddress = '0x18a4c4D0fEd36F715d264D4A3e051AE719388D19';
  const contract = new Contract(contractAddress, dextherAbi, provider);

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
  const contractAddress = '0x18a4c4D0fEd36F715d264D4A3e051AE719388D19';
  const contract = new Contract(contractAddress, dextherAbi, provider);

  try {
    const filter = contract.filters.Created();
    const logs = await contract.queryFilter(filter);

    const offers: Offer[] = [];

    for (let i = 0; i < logs.length; i += 1) {
      if (logs[i]?.args?.offerId !== undefined) {
        const offerId = logs[i]?.args?.offerId;

        // eslint-disable-next-line no-await-in-loop
        const offer: Offer = await getOffer(provider, chainId, offerId);
        console.log(offer);
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
