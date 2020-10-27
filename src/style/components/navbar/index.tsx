import React from 'react';
import {
  Flex,
  Box,
} from 'reflexbox/styled-components';
import styled from 'styled-components';

import Web3Connector from '../../../components/web3Connector';

import NavLink from '../navLink';
import Link from '../link';

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.font.family};
  font-size: 32px;
  font-weight: ${(props) => props.theme.font.weight.extraBold};
  border-bottom: ${(props) => `6px solid ${props.theme.colors.brand}`};
`;

function Navbar() {
  return (
    <Flex
      py="10px"
      px="40px"
      paddingBottom="20px"
      alignItems="center"
    >
      <NavLink margin="0" to="/">
        <Logo>
          Dexther
        </Logo>
      </NavLink>
      <Box mx="auto" />
      <NavLink to="/">All offers</NavLink>
      <NavLink to="/">My offers</NavLink>
      <NavLink to="/">My swaps</NavLink>
      <Link href="https://hackmd.io/@clemlak/BJsgG1Udw" target="_blank" rel="noreferrer noopener">FAQs</Link>
      <NavLink margin="0 20px 0 10px" to="/create">Create an offer</NavLink>
      <Web3Connector />
    </Flex>
  );
}

export default Navbar;
