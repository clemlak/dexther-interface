import styled from 'styled-components';

interface TagInterface {
  clickable?: boolean;
  bold?: boolean;
}

const Tag = styled.button<TagInterface>`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: ${(props) => (props.bold ? props.theme.font.weight.bold : props.theme.font.weight.medium)};
  color: ${(props) => props.theme.colors.primary};

  background-color: ${(props) => props.theme.colors.background};

  padding: 8px 18px;

  border-radius: 100px;
  border: none;

  cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};

  opacity: 0.8;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
    opacity: ${(props) => (props.clickable ? '0.6' : '0.8')};
    transition: all 300ms;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default Tag;
