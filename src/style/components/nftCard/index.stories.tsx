import React from 'react';
import {
  Flex,
  Box,
} from 'reflexbox';

import {
  Meta,
} from '@storybook/react/types-6-0';

import NftCard from '.';

export default {
  title: 'NftCard',
  component: NftCard,
  decorators: [(Story) => (
    <Flex flexWrap="wrap">
      <Box width={1 / 4}>
        <Story />
      </Box>
    </Flex>
  )],
} as Meta;

let isSelected = false;

export const Standard = () => (
  <NftCard
    imageUrl="https://lh3.googleusercontent.com/SVU6AZUVgf8ZULxtUfbLPDarNzWXOWyPMRMO-R8rkrZV0CIcKKaEXGVcoYqIfePYKAKhDE1ejgNoLZX7f4z6N8oF"
    contractName="ZLOTO"
    assetName="ZEGAR1"
    isSelected={isSelected}
    onClick={() => {
      console.log('Clicked');
      isSelected = !isSelected;
    }}
  />
);

export const Selected = () => (
  <NftCard
    imageUrl="https://lh3.googleusercontent.com/SVU6AZUVgf8ZULxtUfbLPDarNzWXOWyPMRMO-R8rkrZV0CIcKKaEXGVcoYqIfePYKAKhDE1ejgNoLZX7f4z6N8oF"
    contractName="ZLOTO"
    assetName="ZEGAR1"
    isSelected
    onClick={() => {
      console.log('Clicked');
      isSelected = !isSelected;
    }}
  />
);
