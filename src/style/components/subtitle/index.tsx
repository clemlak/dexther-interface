import styled from 'styled-components';

const Subtitle = styled.h2`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.bold};
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
`;

export default Subtitle;
