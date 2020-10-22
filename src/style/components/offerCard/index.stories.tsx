import React from 'react';
import styled from 'styled-components';
import {
  Flex,
  Box,
} from 'reflexbox/styled-components';

import {
  Meta,
} from '@storybook/react/types-6-0';

import OfferCard from '.';

const Background = styled(Flex)`
  background-color: ${(props) => props.theme.colors.light};
`;

export default {
  title: 'OfferCard',
  component: OfferCard,
  decorators: [(Story) => (
    <Background flexWrap="wrap">
      <Box width={1 / 5} padding="20px">
        <Story />
      </Box>
    </Background>
  )],
} as Meta;

const offerTokens: Nft[] = [
  {
    address: '0x58b17A2C86dA4Bd820DEAEaD3784Ca0AB61F0dA3',
    id: '42',
    value: '0',
    contractName: 'CryptoKitties',
    name: 'Cool Kitty',
    imageUrl: 'https://lh3.googleusercontent.com/SVU6AZUVgf8ZULxtUfbLPDarNzWXOWyPMRMO-R8rkrZV0CIcKKaEXGVcoYqIfePYKAKhDE1ejgNoLZX7f4z6N8oF',
  },
  {
    address: '0x58b17A2C86dA4Bd820DEAEaD3784Ca0AB61F0dA3',
    id: '15',
    value: '0',
    contractName: 'CryptoPunks',
    name: 'Cool Punk',
    imageUrl: 'https://lh3.googleusercontent.com/HUF-ufr2Mh7P89992wPqLaS5pfIcdBnxKDTJ9GLClDXeJrMmVLeZ00-RUXKpOOJ_uoVk_ko4ZiJKFcXUhR03q4QB=s0',
  },
];

const swapTokens: Nft[] = [
];

export const Standard = () => (
  <OfferCard
    offerId="Offer 0"
    creator="0x58b17A2C86dA4Bd820DEAEaD3784Ca0AB61F0dA3"
    estimateAmount="100"
    estimateTokenAddress="0x58b17A2C86dA4Bd820DEAEaD3784Ca0AB61F0dA3"
    offerTokens={offerTokens}
    swapper=""
    swapTokens={swapTokens}
    status="Available"
    swappedAt={0}
  />
);
