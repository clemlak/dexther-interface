import React, {
  useState,
} from 'react';
import {
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  Box,
  Flex,
} from 'reflexbox';

import NftPreview from '../nftPreview';
import Tag from '../tag';

import {
  getStatus,
} from '../../../utils/dexther';

import Dai from '../../../assets/icons/dai.png';

const WrapperLink = styled(Link)`
  text-decoration: none;
`;

const OfferWrapper = styled.div`
  box-sizing: border-box;
  border: none;
  border-radius: ${(props) => (props.theme.border.radius)};
  width: 100%;
  padding: 30px;
  background-color: ${(props) => (props.theme.colors.light)};

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const AssetsLabel = styled.p`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.medium};
  font-size: ${(props) => props.theme.font.size.regular};
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;

const EstimateAmountLabel = styled.span`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.medium};
  font-size: ${(props) => props.theme.font.size.regular};
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;

const DaiLogo = styled.img`
  height: 28px;
  margin-right: 10px;
`;

interface OfferCardInterface {
  offerId: string;
  estimateAmount: string;
  estimateTokenAddress: string;
  offerAssets: Asset[];
  status: string;
}

function OfferCard(props: OfferCardInterface) {
  const {
    offerId,
    estimateAmount,
    estimateTokenAddress,
    offerAssets,
    status,
  } = props;

  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  return (
    <WrapperLink to={`/offer/${offerId}`}>
      <OfferWrapper>
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
            isCarousel={offerAssets.length > 1}
          />
        </Box>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          pb="20px"
        >
          {offerAssets.map((asset) => (
            <Tag genre="default">
              {asset.contract.name}
            </Tag>
          ))}
        </Flex>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex
            alignItems="center"
          >
            <DaiLogo src={Dai} alt="Dai logo" />
            <EstimateAmountLabel>
              {`${estimateAmount} DAI`}
            </EstimateAmountLabel>
          </Flex>
          <AssetsLabel>
            {offerAssets.length === 1 ? (
              <>
                {`${offerAssets.length} asset`}
              </>
            ) : (
              <>
                {`${offerAssets.length} assets`}
              </>
            )}
          </AssetsLabel>
          <Tag genre="default">
            {getStatus(status)}
          </Tag>
        </Flex>
      </OfferWrapper>
    </WrapperLink>
  );
}

export default OfferCard;
