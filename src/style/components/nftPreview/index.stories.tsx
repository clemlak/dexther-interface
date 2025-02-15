import React from 'react';
import styled from 'styled-components';

import {
  Meta,
} from '@storybook/react/types-6-0';

import NFTPreview from '.';

export default {
  title: 'NFTPreview',
  component: NFTPreview,
} as Meta;

export const Standard = () => (
  <NFTPreview
    imageUrl="https://lh3.googleusercontent.com/SVU6AZUVgf8ZULxtUfbLPDarNzWXOWyPMRMO-R8rkrZV0CIcKKaEXGVcoYqIfePYKAKhDE1ejgNoLZX7f4z6N8oF"
    contractName="ZLOTO"
    assetName="ZEGAR1"
  />
);

export const Carousel = () => (
  <NFTPreview
    imageUrl="https://lh3.googleusercontent.com/SVU6AZUVgf8ZULxtUfbLPDarNzWXOWyPMRMO-R8rkrZV0CIcKKaEXGVcoYqIfePYKAKhDE1ejgNoLZX7f4z6N8oF"
    contractName="ZLOTO"
    assetName="ZEGAR1"
    isCarousel
  />
);
