import styled from 'styled-components';

interface TextInterface {
  margin?: string;
}

const Text = styled.p<TextInterface>`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.regular};
  font-size: ${(props) => props.theme.font.size.regular};
  color: ${(props) => props.theme.colors.secondary};
  margin: ${(props) => (props.margin && props.margin)};
`;

export default Text;
