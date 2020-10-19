import React from 'react';

import {
  Story,
  Meta,
} from '@storybook/react/types-6-0';

import Button from '.';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story = () => (
  <Button genre="primary">
    Hello
  </Button>
);

export const Primary = Template.bind({});
