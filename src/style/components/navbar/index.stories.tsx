import React from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';

import {
  Meta,
} from '@storybook/react/types-6-0';

import Navbar from '.';

export default {
  title: 'Navbar',
  component: Navbar,
  decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>],
} as Meta;

export const Template = () => (
  <Navbar />
);
