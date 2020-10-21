import React from 'react';

import {
  Meta,
} from '@storybook/react/types-6-0';

import Button from '.';

export default {
  title: 'Button',
  component: Button,
} as Meta;

export const Primary = () => (
  <Button genre="primary" size="m">
    Log In
  </Button>
);

export const PrimaryLoading = () => (
  <Button genre="primary" size="m" isLoading>
    Log In
  </Button>
);

export const PrimaryLarge = () => (
  <Button genre="primary" size="l">
    Log In
  </Button>
);

export const PrimaryBlock = () => (
  <Button genre="primary" size="m" block>
    Log In
  </Button>
);

export const Brand = () => (
  <Button genre="brand" size="m">
    Log In
  </Button>
);

export const BrandLoading = () => (
  <Button genre="brand" size="m" isLoading>
    Log In
  </Button>
);

export const BrandBlock = () => (
  <Button genre="brand" size="m" block>
    Log In
  </Button>
);

export const Inverted = () => (
  <Button genre="inverted" size="m">
    Create a free account
  </Button>
);

export const InvertedLoading = () => (
  <Button genre="inverted" size="m" isLoading>
    Create a free account
  </Button>
);

export const InvertedLarge = () => (
  <Button genre="inverted" size="l">
    Create a free account
  </Button>
);

export const InvertedBlock = () => (
  <Button genre="inverted" size="m" block>
    Create a free account
  </Button>
);

export const PrimaryDotted = () => (
  <Button genre="primary" size="m" dashed>
    Create a free account
  </Button>
);

export const PrimaryDottedBlock = () => (
  <Button genre="primary" size="m" block dashed>
    Create a free account
  </Button>
);
