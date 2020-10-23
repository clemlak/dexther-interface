import React from 'react';

import {
  Meta,
} from '@storybook/react/types-6-0';

import Input from '.';

export default {
  title: 'Input',
  component: Input,
} as Meta;

export const Default = () => (
  <Input
    placeholder="Estimated value"
  />
);

export const Block = () => (
  <Input
    placeholder="Estimated value"
    block
  />
);
