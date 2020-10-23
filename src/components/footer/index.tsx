import React from 'react';
import {
  Box,
  Flex,
} from 'reflexbox';
import styled from 'styled-components';

const FooterText = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${(props) => props.theme.font.family};
  font-size: 14px;
  font-weight: ${(props) => props.theme.font.weight.regular};
  text-align: center;
`;

function Footer() {
  return (
    <Flex
      alignItems="center"
      pt="6rem"
    >
      <Box
        width={1}
      >
        <FooterText>
          Made with ♥ by
          {' '}
          <a href="https://twitter.com/clementcodes">Clemlak</a>
        </FooterText>
      </Box>
    </Flex>
  );
}

export default Footer;
