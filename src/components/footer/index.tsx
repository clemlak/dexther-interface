import React from 'react';
import {
  Box,
  Flex,
} from 'reflexbox';
import styled from 'styled-components';

import {
  Link,
} from '../../style/components';

const FooterText = styled.p`
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${(props) => props.theme.font.family};
  font-size: 14px;
  font-weight: ${(props) => props.theme.font.weight.regular};
  text-align: center;
`;

const FooterLink = styled(Link)`
  font-size: 14px;
  margin: 0;
`;

function Footer() {
  return (
    <>
      <Flex
        alignItems="center"
        pt="6rem"
      >
        <Box
          width={1}
        >
          <FooterText>
            Made by
            {' '}
            <FooterLink
              href="https://twitter.com/clementcodes"
              target="_blank"
              rel="noreferrer noopener"
            >
              Clemlak
            </FooterLink>
          </FooterText>
        </Box>
      </Flex>
    </>
  );
}

export default Footer;
