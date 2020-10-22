import React from 'react';

import {
  Meta,
} from '@storybook/react/types-6-0';

import Tag from '.';

export default {
  title: 'Tag',
  component: Tag,
} as Meta;

export const Default = () => (
  <Tag genre="default">
    CryptoKitties
  </Tag>
);

export const Inverted = () => (
  <Tag genre="inverted">
    CryptoKitties
  </Tag>
);

export const Bold = () => (
  <Tag genre="default" bold>
    CryptoKitties
  </Tag>
);
