import React from 'react';

import {
  Story,
  Meta,
} from '@storybook/react/types-6-0';

import Dropdown from '.';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as Meta;

const Template: Story = () => (
  <Dropdown
    initialLabel="Foo"
    options={[
      'Hello',
      'Foo',
      'Bar',
    ]}
  />
);

export const Primary = Template.bind({});
