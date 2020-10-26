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
import styled from 'styled-components';

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

const OfferTitle = styled(Title)`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`;

const OfferTag = styled(Tag)`
  margin-left: 20px;
  vertical-align: text-bottom;
`;

const AssetsSubtitle = styled(Subtitle)`
  display: inline;
  font-size: 16px;
`;

function OfferView() {
  const web3Context = useContext(Web3Context);
  const {
    id,
  } = useParams();

  const {
    state,
  } = web3Context;

  const {
    chainId,
    provider,
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
            width={1}
            pb={3}
          >
            <OfferTitle>
              {`Offer #${id}`}
              <OfferTag genre="default">
                {getStatus(offer.status)}
              </OfferTag>
            </OfferTitle>
          </Box>

          <Box
            width={1 / 2}
            pb={3}
          >
            <AssetsSubtitle>
              {offer.offerAssets.length === 1 ? (
                <>
                  {`${offer.offerAssets.length} asset`}
                </>
              ) : (
                <>
                  {`${offer.offerAssets.length} assets`}
                </>
              )}
            </AssetsSubtitle>
          </Box>
          <Box
            width={1 / 2}
            textAlign="right"
            pb={3}
          >
            <Button
              genre="brand"
              size="s"
            >
              Swap
            </Button>
          </Box>

          {offer.offerAssets.map((asset) => (
            <Box
              width={1 / 2}
              pb={2}
              key={`${asset.contract.address}/${asset.tokenId}`}
            >
              <NftCard
                imageUrl={asset.imageUrl}
                assetName={asset.name}
                contractName={asset.contract.name}
                isSelected={false}
                onClick={() => {}}
              />
            </Box>
          ))}
        </>
      )}
    </Flex>
  );
}

export default OfferView;
