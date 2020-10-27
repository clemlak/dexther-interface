import styled from 'styled-components';

interface SubtitleInterface {
  margin?: string;
}

const Subtitle = styled.h2<SubtitleInterface>`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.semiBold};
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  margin: ${(props) => props.margin && props.margin};
`;

export default Subtitle;
