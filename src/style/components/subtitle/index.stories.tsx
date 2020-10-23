import React from 'react';

import {
  Story,
  Meta,
} from '@storybook/react/types-6-0';

import Subtitle from '.';

export default {
  title: 'Subtitle',
  component: Subtitle,
} as Meta;

const Template: Story = () => (
  <Subtitle>
    This is a subtitle
  </Subtitle>
);

export const Primary = Template.bind({});
