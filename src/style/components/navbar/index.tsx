import React from 'react';
import {
  Flex,
  Box,
} from 'reflexbox';

function Navbar() {
  return (
    <Flex flexWrap="wrap">
      <Box width={1 / 5}>
        Dexter
      </Box>
      <Box width={2 / 5} >
        Hey
      </Box>
      <Box width={2 / 5}>
        Hoy
      </Box>
    </Flex>
  );
}

export default Navbar;
