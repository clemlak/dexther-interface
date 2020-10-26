import React from 'react';

import {
  Meta,
} from '@storybook/react/types-6-0';

import Alert from '.';

export default {
  title: 'Alert',
  component: Alert,
} as Meta;

export const Default = () => (
  <Alert
    message="This is a beta version, please use it at your own risks!"
  />
);
