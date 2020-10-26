import styled from 'styled-components';

interface LinkInterface {
  margin?: string,
}

const Link = styled.a<LinkInterface>`
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.regular};
  font-weight: ${(props) => props.theme.font.weight.bold};
  color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;

  margin: ${(props) => (props.margin ? props.margin : '0 10px')};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

`;

export default Link;
