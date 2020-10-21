import React from 'react';

import {
  Meta,
} from '@storybook/react/types-6-0';

import Tag from '.';

export default {
  title: 'Tag',
  component: Tag,
} as Meta;

export const Standard = () => (
  <Tag>
    CryptoKitties
  </Tag>
);

export const Bold = () => (
  <Tag bold>
    CryptoKitties
  </Tag>
);
