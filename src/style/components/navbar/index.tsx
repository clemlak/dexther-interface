import React from 'react';
import {
  Flex,
  Box,
} from 'reflexbox/styled-components';
import styled from 'styled-components';

import Web3Connector from '../../../components/web3Connector';

import Button from '../button';
import NavLink from '../navLink';

const NavbarWrapper = styled(Flex)`
  border-bottom: ${(props) => `1px solid ${props.theme.colors.secondary}`};
`;

const Logo = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.font.family};
  font-size: 32px;
  font-weight: ${(props) => props.theme.font.weight.extraBold};
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-color: ${(props) => props.theme.colors.brand};
`;

function Navbar() {
  return (
    <NavbarWrapper
      p={10}
      paddingBottom={20}
      alignItems="center"
    >
      <Logo>
        Dexter
      </Logo>
      <Box mx="auto" />
      <NavLink to="/">Offers</NavLink>
      <NavLink to="/">How it works</NavLink>
      <NavLink to="/">Help</NavLink>
      <Box mx="auto" />
      <Web3Connector />
    </NavbarWrapper>
  );
}

export default Navbar;
