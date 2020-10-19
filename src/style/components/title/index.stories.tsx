import React from 'react';

import {
  Story,
  Meta,
} from '@storybook/react/types-6-0';

import Title from '.';

export default {
  title: 'Title',
  component: Title,
} as Meta;

const Template: Story = () => (
  <Title>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Title>
);

export const Primary = Template.bind({});
