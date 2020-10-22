import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';

import {
  Meta,
} from '@storybook/react/types-6-0';

import NavLink from '.';

export default {
  title: 'NavLink',
  component: NavLink,
  decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>],
} as Meta;

export const Default = () => (
  <NavLink to="/">
    CryptoKitties
  </NavLink>
);
