import styled, {
  DefaultTheme,
} from 'styled-components';

interface TagInterface {
  genre: 'default';
  bold?: boolean;
  opacity?: number;
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

  opacity: ${(props) => (props.opacity ? props.opacity : '1')};

  &:focus {
    outline: none;
  }
`;

export default Tag;
