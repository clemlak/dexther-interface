import React from 'react';
import {
  Flex,
  Box,
} from 'reflexbox/styled-components';

import {
  Meta,
} from '@storybook/react/types-6-0';

import OfferCard from '.';

export default {
  title: 'OfferCard',
  component: OfferCard,
  decorators: [(Story) => (
    <Flex flexWrap="wrap">
      <Box width={1 / 3}>
        <Story />
      </Box>
    </Flex>
  )],
} as Meta;

const offerAssets: Asset[] = [
  {
    contract: {
      address: '0x58b17A2C86dA4Bd820DEAEaD3784Ca0AB61F0dA3',
      name: 'CryptoKitties',
      symbol: 'CK',
      imageUrl: '',
      type: 'ERC721',
    },
    tokenId: '42',
    name: 'Cool Kitty',
    imageUrl: 'https://lh3.googleusercontent.com/SVU6AZUVgf8ZULxtUfbLPDarNzWXOWyPMRMO-R8rkrZV0CIcKKaEXGVcoYqIfePYKAKhDE1ejgNoLZX7f4z6N8oF',
  },
];

export const Standard = () => (
  <OfferCard
    offerId="0"
    estimateAmount="100"
    estimateTokenAddress="0x58b17A2C86dA4Bd820DEAEaD3784Ca0AB61F0dA3"
    offerAssets={offerAssets}
    status="0"
  />
);
