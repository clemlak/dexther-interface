import React from 'react';
import {
  Meta,
} from '@storybook/react/types-6-0';

import Link from '.';

export default {
  title: 'Link',
  component: Link,
} as Meta;

export const Default = () => (
  <Link href="/">
    Click me!
  </Link>
);
