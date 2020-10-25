import React from 'react';

import {
  Meta,
} from '@storybook/react/types-6-0';

import Modal from '.';
import Text from '../text';

export default {
  title: 'Modal',
  component: Modal,
} as Meta;

export const Default = () => (
  <Modal
    isOpen
    toggle={() => console.log('toggle')}
    title="This is a modal"
  >
    <Text>
      Lorem ipsum and bidum satum.
    </Text>
  </Modal>
);

export const Closed = () => (
  <Modal
    isOpen={false}
    toggle={() => console.log('toggle')}
    title="This is a modal"
  >
    <Text>
      Lorem ipsum and bidum satum.
    </Text>
  </Modal>
);
