import React from 'react';

import {
  Story,
  Meta,
} from '@storybook/react/types-6-0';

import Text from '.';

export default {
  title: 'Text',
  component: Text,
} as Meta;

const Template: Story = () => (
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Text>
);

export const Primary = Template.bind({});
