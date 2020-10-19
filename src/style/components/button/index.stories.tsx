import React from 'react';

import {
  Meta,
} from '@storybook/react/types-6-0';

import Button from '.';

export default {
  title: 'Button',
  component: Button,
} as Meta;

export const Normal = () => (
  <Button genre="primary">
    Click me
  </Button>
);

export const Block = () => (
  <Button genre="primary" block>
    Click me
  </Button>
);
