import React from 'react';
import styled from 'styled-components';

interface CardInterface {
  isSelected: boolean;
}

const Card = styled.div<CardInterface>`
  box-sizing: border-box;

  border-radius: ${(props) => props.theme.border.radius};
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => (props.isSelected ? '#3C91E6' : props.theme.colors.secondary)};
  border-style: ${(props) => (props.theme.border.style)};

  width: 100%;

  padding: 30px 25px;

  &:hover {
    cursor: pointer;
    border-color: ${(props) => (props.isSelected ? '#3C91E6' : props.theme.colors.primary)};
  }
`;

const Thumbnail = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const AssetNameLabel = styled.h3`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: ${(props) => props.theme.font.size.regular};
  font-weight: ${(props) => props.theme.font.weight.bold};
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

interface NftCardInterface {
  imageUrl: string;
  assetName: string;
  contractName: string;
  isSelected: boolean;
  onClick: Function;
}

function NftCard(props: NftCardInterface) {
  const {
    imageUrl,
    assetName,
    contractName,
    isSelected,
    onClick,
  } = props;

  return (
    <Card
      isSelected={isSelected}
      onClick={() => onClick()}
    >
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
