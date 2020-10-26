import React from 'react';
import styled from 'styled-components';

import Tag from '../tag';

const NFTWrapper = styled.div`
  border-radius: ${(props) => props.theme.border.radius};
  width: 100%;
  position: relative;
`;

const TopOverlay = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  text-align: left;
`;

const BottomOverlay = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  text-align: right;
`;

const RightOverlay = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  text-align: right;
`;

const LeftOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 16px;
  text-align: left;
`;

const Thumbnail = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: ${(props) => props.theme.border.radius};
`;

const CarouselButton = styled.button`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: ${(props) => props.theme.font.weight.medium};
  color: ${(props) => props.theme.colors.background};

  background-color: ${(props) => props.theme.colors.primary};

  padding: 10px;

  border-radius: 100px;
  border: none;

  cursor: pointer;

  opacity: 0.8;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.6;
    transition: all 300ms;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface NFTPreviewnterface {
  imageUrl: string;
  assetName: string;
  contractName: string;
  isCarousel?: boolean;
  carouselRightCallback?: Function;
  carouselLeftCallback?: Function;
}

function NFTPreview(props: NFTPreviewnterface) {
  const {
    imageUrl,
    assetName,
    contractName,
    isCarousel = false,
    carouselRightCallback = () => {},
    carouselLeftCallback = () => {},
  } = props;

  return (
    <NFTWrapper>
      <Thumbnail src={imageUrl} alt={assetName} />
      <TopOverlay>
        <Tag genre="default" opacity={0.8}>
          {contractName}
        </Tag>
      </TopOverlay>
      {isCarousel && (
        <>
          <LeftOverlay>
            <CarouselButton onClick={() => carouselLeftCallback()}>
              <svg width="20px" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
            </CarouselButton>
          </LeftOverlay>
          <RightOverlay>
            <CarouselButton onClick={() => carouselRightCallback()}>
              <svg width="20px" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </CarouselButton>
          </RightOverlay>
        </>
      )}
      <BottomOverlay>
        <Tag genre="default" opacity={0.8} bold>
          {assetName}
        </Tag>
      </BottomOverlay>
    </NFTWrapper>
  );
}

export default NFTPreview;
