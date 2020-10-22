import styled, {
  DefaultTheme,
} from 'styled-components';

interface TagInterface {
  genre: string;
  clickable?: boolean;
  bold?: boolean;
}

function getGenre(theme: DefaultTheme, genre: string) {
  switch (genre) {
    case 'default':
      return {
        color: theme.colors.inverted,
        backgroundColor: theme.colors.primary,
      };
    case 'inverted':
      return {
        color: theme.colors.primary,
        backgroundColor: theme.colors.background,
      };
    default:
      return {
        color: theme.colors.inverted,
        backgroundColor: theme.colors.primary,
      };
  }
}

const Tag = styled.button<TagInterface>`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: ${(props) => (props.bold ? props.theme.font.weight.bold : props.theme.font.weight.medium)};
  color: ${(props) => getGenre(props.theme, props.genre).color};

  background-color: ${(props) => getGenre(props.theme, props.genre).backgroundColor};

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
