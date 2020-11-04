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
  Web3Context,
} from '../../store/web3ContextProvider';

import {
  getOffers,
} from '../../utils/dexther';

import {
  OfferCard,
  Text,
  OfferPlaceholder,
} from '../../style/components';

function displayPlaceholders() {
  const placeholders = [];

  for (let i = 0; i < 12; i += 1) {
    placeholders.push(
      <Box
        width={[1, 1 / 2, 1 / 3]}
        p="10px"
      >
        <OfferPlaceholder />
      </Box>,
    );
  }

  return placeholders;
}

function Home() {
  const web3Context = useContext(Web3Context);

  const {
    state,
  } = web3Context;

  const {
    provider,
    chainId,
  } = state;

  const [offers, setOffers] = useState<OfferWithAssets[]>([]);
  const [hasFetchedOffers, setHasFetchedOffers] = useState<boolean>(false);

  useEffect(() => {
    async function getCurrentOffers() {
      try {
        const res = await getOffers(provider, chainId);
        console.log(res);
        setOffers(res);
      } catch (e) {
        console.log(e);
      } finally {
        setHasFetchedOffers(true);
      }
    }

    // getCurrentOffers();
  }, [provider]);

  return (
    <Flex
      flexWrap="wrap"
      alignItems="center"
      width={[1, 2 / 3]}
      mx="auto"
    >
      {offers.length > 0 ? (
        <>
          {offers.map((offer) => (
            <Box
              key={offer.offerId}
              width={[1, 1 / 2]}
              p="10px"
            >
              <OfferCard
                offerId={offer.offerId}
                estimateAmount={offer.estimateAmount}
                estimateTokenAddress={offer.estimateTokenAddress}
                offerAssets={offer.offerAssets}
                status={offer.status}
              />
            </Box>
          ))}
        </>
      ) : (
        <>
          {hasFetchedOffers ? (
            <Box>
              <Text>
                No offers...
              </Text>
            </Box>
          ) : (
            <>
              {displayPlaceholders()}
            </>
          )}
        </>
      )}
    </Flex>
  );
}

export default Home;
