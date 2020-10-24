import React from 'react';
import {
  Flex,
  Box,
} from 'reflexbox/styled-components';
import styled from 'styled-components';

import Web3Connector from '../../../components/web3Connector';

import NavLink from '../navLink';

const NavbarWrapper = styled(Flex)`
  border-bottom: ${(props) => `1px solid ${props.theme.colors.secondary}`};
`;

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.font.family};
  font-size: 32px;
  font-weight: ${(props) => props.theme.font.weight.extraBold};
  border-bottom: ${(props) => `6px solid ${props.theme.colors.brand}`};
`;

function Navbar() {
  return (
    <NavbarWrapper
      py="10px"
      px="40px"
      paddingBottom="20px"
      alignItems="center"
    >
      <Logo>
        Dexther
      </Logo>
      <Box mx="auto" />
      <NavLink to="/">Offers</NavLink>
      <NavLink to="/">How it works</NavLink>
      <NavLink to="/">Help</NavLink>
      <Box mx="auto" />
      <NavLink to="/create">Create an offer</NavLink>
      <Web3Connector />
    </NavbarWrapper>
  );
}

export default Navbar;
