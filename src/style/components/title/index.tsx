import styled from 'styled-components';

const Title = styled.h1`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.extraBold};
  font-size: ${(props) => props.theme.font.size.huge};
  color: ${(props) => props.theme.colors.primary};
`;

export default Title;
