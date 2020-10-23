import React from 'react';

import {
  Meta,
} from '@storybook/react/types-6-0';

import Checkbox from '.';

export default {
  title: 'Checkbox',
  component: Checkbox,
} as Meta;

export const Default = () => (
  <Checkbox
    label="Click on this checkbox"
    handleOnChange={() => {}}
  />
);
