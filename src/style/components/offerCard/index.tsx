import React, {
  useState,
} from 'react';
import styled from 'styled-components';
import {
  Box,
  Flex,
} from 'reflexbox';
import {
  BigNumber,
} from 'ethers';

import NftPreview from '../nftPreview';
import Tag from '../tag';

import {
  getStatus,
} from '../../../utils/dexther';

const OfferWrapper = styled.div`
  box-sizing: border-box;
  border: none;
  border-radius: ${(props) => (props.theme.border.radius)};
  width: 100%;
  padding: 30px;
  background-color: ${(props) => (props.theme.colors.light)};
`;

const AssetsLabel = styled.p`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.medium};
  font-size: ${(props) => props.theme.font.size.regular};
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
  text-align: right;
`;

const EstimateAmountLabel = styled.p`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.medium};
  font-size: ${(props) => props.theme.font.size.regular};
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;

interface OfferCardInterface {
  estimateAmount: string;
  estimateTokenAddress: string;
  offerAssets: Asset[];
  status: BigNumber;
}

function OfferCard(props: OfferCardInterface) {
  const {
    estimateAmount,
    estimateTokenAddress,
    offerAssets,
    status,
  } = props;

  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  return (
    <OfferWrapper>
      <Flex
        flexWrap="wrap"
      >
        <Box
          width={1 / 2}
          pb="20px"
        >
          Offer
        </Box>
        <Box
          width={1 / 2}
          pb="20px"
        >
          <Tag genre="default">
            {getStatus(status)}
          </Tag>
        </Box>
      </Flex>
      <Box pb="20px">
        {offerAssets.map((asset) => (
          <Tag genre="default">
            {asset.contract.name}
          </Tag>
        ))}
      </Box>
      <Box pb="20px">
        <NftPreview
          imageUrl={offerAssets[carouselIndex].imageUrl}
          assetName={offerAssets[carouselIndex].name}
          contractName={offerAssets[carouselIndex].contract.name}
          carouselLeftCallback={() => {
            if (carouselIndex - 1 < 0) {
              setCarouselIndex(offerAssets.length - 1);
            } else {
              setCarouselIndex(carouselIndex - 1);
            }
          }}
          carouselRightCallback={() => {
            if (carouselIndex + 1 === offerAssets.length) {
              setCarouselIndex(0);
            } else {
              setCarouselIndex(carouselIndex + 1);
            }
          }}
          isCarousel={offerAssets.length > 0}
        />
      </Box>
      <Flex flexWrap="wrap">
        <Box width={1 / 2}>
          <EstimateAmountLabel>
            {`${estimateAmount} ${estimateTokenAddress.slice(0, 4)}...${estimateTokenAddress.slice(estimateTokenAddress.length - 6, estimateTokenAddress.length)}`}
          </EstimateAmountLabel>
        </Box>
        <Box width={1 / 2}>
          <AssetsLabel>
            {`${offerAssets.length} assets`}
          </AssetsLabel>
        </Box>
      </Flex>
    </OfferWrapper>
  );
}

export default OfferCard;
