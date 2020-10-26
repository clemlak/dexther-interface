import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import {
  Flex,
  Box,
} from 'reflexbox';

import {
  Web3Context,
} from '../../store/web3ContextProvider';

import {
  getOfferWithAssets,
  getStatus,
} from '../../utils/dexther';

import {
  Text,
  Title,
  Subtitle,
  Tag,
  NftCard,
  Button,
} from '../../style/components';
import { off } from 'process';

function OfferView() {
  const web3Context = useContext(Web3Context);
  const {
    id,
  } = useParams();

  const {
    state,
    dispatch,
  } = web3Context;

  const {
    address,
    chainId,
    provider,
    isWalletConnected,
  } = state;

  const [offer, setOffer] = useState<OfferWithAssets>();

  useEffect(() => {
    async function fetchOffer() {
      try {
        const res = await getOfferWithAssets(provider, chainId, id);
        console.log(res);
        setOffer(res);
      } catch (e) {
        console.log(e);
      }
    }

    if (id !== undefined && id !== '') {
      console.log('Fetching offer');
      fetchOffer();
    }
  }, []);

  return (
    <Flex
      flexWrap="wrap"
      alignItems="center"
      width={[1, 1 / 2]}
      mx="auto"
    >
      {offer === undefined ? (
        <Box
          width={1}
        >
          <Text>
            No offer...
          </Text>
        </Box>
      ) : (
        <>
          <Box
            width={1 / 2}
          >
            {offer.offerAssets.map((asset) => (
              <NftCard
                imageUrl={asset.imageUrl}
                assetName={asset.name}
                contractName={asset.contract.name}
                isSelected={false}
                onClick={() => {}}
              />
            ))}
          </Box>
          <Box
            width={1 / 2}
          >
            <Box>
              <Tag genre="default">
                {getStatus(offer.status)}
              </Tag>
            </Box>
            <Box>
              {offer.estimateAmount.toString()} {offer.estimateTokenAddress}
            </Box>
            <Box>
              <Button
                genre="inverted"
                size="m"
              >
                Swap
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Flex>
  );
}

export default OfferView;
