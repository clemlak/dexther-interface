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


const OfferWrapper = styled.div`
  box-sizing: border-box;

  border-radius: ${(props) => props.theme.border.radius};
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.colors.secondary};
  border-style: ${(props) => (props.theme.border.style)};

  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  padding: 30px 25px;
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

declare global {
  interface Nft {
    address: string;
    id: string;
    value: string;
    contractName: string;
    name: string;
    imageUrl: string;
  }
}

interface OfferCardInterface {
  offerId: string;
  estimateAmount: string;
  estimateTokenAddress: string;
  offerTokens: Nft[];
  status: BigNumber;
}

function OfferCard(props: OfferCardInterface) {
  const {
    offerId,
    estimateAmount,
    estimateTokenAddress,
    offerTokens,
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
          {offerId}
        </Box>
        <Box
          width={1 / 2}
          pb="20px"
        >
          {status}
        </Box>
      </Flex>
      <Box pb="20px">
        {offerTokens.map((token) => (
          <Tag genre="default">
            {token.contractName}
          </Tag>
        ))}
      </Box>
      <Box pb="20px">
        <NftPreview
          imageUrl={offerTokens[carouselIndex].imageUrl}
          assetName={offerTokens[carouselIndex].name}
          contractName={offerTokens[carouselIndex].contractName}
          carouselLeftCallback={() => {
            if (carouselIndex - 1 < 0) {
              setCarouselIndex(offerTokens.length - 1);
            } else {
              setCarouselIndex(carouselIndex - 1);
            }
          }}
          carouselRightCallback={() => {
            if (carouselIndex + 1 === offerTokens.length) {
              setCarouselIndex(0);
            } else {
              setCarouselIndex(carouselIndex + 1);
            }
          }}
          isCarousel
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
            {`${offerTokens.length} assets`}
          </AssetsLabel>
        </Box>
      </Flex>
    </OfferWrapper>
  );
}

export default OfferCard;
