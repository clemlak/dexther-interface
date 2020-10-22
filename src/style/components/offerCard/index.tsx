import React, {
  useState,
} from 'react';
import styled from 'styled-components';

import NftPreview from '../nftPreview';
import Tag from '../tag';

const OfferWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: ${(props) => props.theme.border.radius};
  padding: 20px;
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
  creator: string;
  estimateAmount: string;
  estimateTokenAddress: string;
  offerTokens: Nft[];
  swapper: string;
  swappedAt: number;
  swapTokens: Nft[];
  status: string;
}

function OfferCard(props: OfferCardInterface) {
  const {
    offerId,
    creator,
    estimateAmount,
    estimateTokenAddress,
    offerTokens,
    swapper,
    swappedAt,
    swapTokens,
    status,
  } = props;

  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  return (
    <OfferWrapper>
      {offerTokens.map((token) => (
        <Tag genre="default">
          {token.contractName}
        </Tag>
      ))}
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

    </OfferWrapper>
  );
}

export default OfferCard;
