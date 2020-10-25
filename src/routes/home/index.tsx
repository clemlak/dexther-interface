import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Flex,
  Box,
} from 'reflexbox';
import {
  utils,
} from 'ethers';

import {
  Web3Context,
} from '../../store/web3ContextProvider';

import {
  getAssets,
} from '../../utils/openSea';

import {
  getOffers,
} from '../../utils/dexther';

import {
  OfferCard,
  Text,
} from '../../style/components';

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

  const [offers, setOffers] = useState<Offer[]>([]);

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

        setOffers(res);
      } catch (e) {
        console.log(e);
      }
    }

    getCurrentOffers();
  }, [provider]);

  return (
    <Flex
      flexWrap="wrap"
      alignItems="center"
      width={[1, 1 / 2]}
      mx="auto"
    >
      {offers.length > 0 ? (
        <>
          {offers.map((offer) => (
            <Box
              width={[1, 1 / 2]}
              p="10px"
            >
              <OfferCard
                offerId="0"
                estimateAmount={utils.formatEther(offer.estimateAmount)}
                estimateTokenAddress={offer.estimateTokenAddress}
                offerTokens={[]}
                status={offer.status}
              />
            </Box>
          ))}
        </>
      ) : (
        <Box>
          <Text>
            Fetching offers...
          </Text>
        </Box>
      )}
    </Flex>
  );
}

export default Home;
