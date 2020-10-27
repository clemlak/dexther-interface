import React from 'react';
import styled from 'styled-components';

interface CardInterface {
  isSelected: boolean;
  isSelectable: boolean;
}

const Card = styled.div<CardInterface>`
  box-sizing: border-box;
  border: none;
  border-radius: ${(props) => (props.theme.border.radius)};
  width: 100%;
  padding: 30px;
  background-color: ${(props) => (props.theme.colors.light)};

  opacity: ${(props) => (props.isSelected ? '0.8' : '1')};

  &:hover {
    cursor: ${(props) => (props.isSelectable ? 'pointer' : 'default')};
    opacity: ${(props) => (props.isSelectable && '0.8')};
  }
`;

const Thumbnail = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: ${(props) => (props.theme.border.radius)};
`;

const AssetNameLabel = styled.h3`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: ${(props) => props.theme.font.size.regular};
  font-weight: ${(props) => props.theme.font.weight.semiBold};
  color: ${(props) => props.theme.colors.primary};
  margin-block-end: 0.5em;
  text-align: center;
`;

const ContractNameLabel = styled.h4`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: ${(props) => props.theme.font.weight.medium};
  color: ${(props) => props.theme.colors.secondary};
  margin-block-start: 0.5em;
  margin-block-end: 0;
  text-align: center;
`;

const CheckCircleWrapper = styled.div`
  position: relative;
`;

const CheckCircle = styled.svg`
  height: 26px;
  color: ${(props) => props.theme.colors.primary};
  position: absolute;
  top: -13px;
  right: -13px;
`;

interface NftCardInterface {
  imageUrl: string;
  assetName: string;
  contractName: string;
  isSelected?: boolean;
  onClick?: Function;
  isSelectable?: boolean;
}

function NftCard(props: NftCardInterface) {
  const {
    imageUrl,
    assetName,
    contractName,
    isSelected = false,
    onClick = () => {},
    isSelectable = false,
  } = props;

  return (
    <Card
      isSelected={isSelected}
      onClick={() => onClick()}
      isSelectable={isSelectable}
    >
      {isSelected && (
        <CheckCircleWrapper>
          <CheckCircle className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </CheckCircle>
        </CheckCircleWrapper>
      )}
      <Thumbnail src={imageUrl} alt={assetName} />
      <AssetNameLabel>
        {assetName}
      </AssetNameLabel>
      <ContractNameLabel>
        {contractName}
      </ContractNameLabel>
    </Card>
  );
}

export default NftCard;
