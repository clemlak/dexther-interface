import styled, {
  DefaultTheme,
  keyframes,
} from 'styled-components';

const loading = () => keyframes`
  from {
    background-position: 2rem 0;
  }

  to {
    background-position: 0 0;
  }
`;

interface ButtonInterface {
  genre: 'primary' | 'inverted' | 'brand';
  size: 'l' | 'm';
  block?: boolean;
  dashed?: boolean;
  isLoading?: boolean;
}

function getGenre(theme: DefaultTheme, genre: string) {
  switch (genre) {
    case 'primary':
      return {
        color: theme.colors.background,
        borderColor: 'transparent',
        backgroundColor: theme.colors.primary,
      };
    case 'inverted':
      return {
        color: theme.colors.primary,
        borderColor: theme.colors.primary,
        backgroundColor: 'transparent',
      };
    case 'brand':
      return {
        color: theme.colors.primary,
        borderColor: 'transparent',
        backgroundColor: theme.colors.brand,
      };
    default:
      return {
        color: theme.colors.inverted,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
      };
  }
}

function getSize(theme: DefaultTheme, size: string) {
  switch (size) {
    case 'l':
      return {
        fontSize: '20px',
        padding: '12px 36px',
      };
    case 'm':
      return {
        fontSize: theme.font.size.regular,
        padding: '8px 32px',
      };
    case 's':
      return {
        fontSize: theme.font.size.small,
        padding: '8px 32px',
      };
    default:
      return {
        fontSize: theme.font.size.regular,
        padding: '8px 32px',
      };
  }
}

const Button = styled.button<ButtonInterface>`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: ${(props) => getSize(props.theme, props.size).fontSize};
  font-weight: ${(props) => props.theme.font.weight.semiBold};
  color: ${(props) => getGenre(props.theme, props.genre).color};

  background-color: ${(props) => getGenre(props.theme, props.genre).backgroundColor};

  padding: ${(props) => getSize(props.theme, props.size).padding};

  box-sizing: border-box;

  width: ${(props) => props.block && '100%'};

  border-radius: ${(props) => props.theme.border.radius};
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => getGenre(props.theme, props.genre).borderColor};
  border-style: ${(props) => (props.dashed ? 'dashed' : 'solid')};

  cursor: pointer;

  animation-name: ${() => loading()};
  animation-duration: 0.9s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  background-image: ${(props) => props.isLoading
    && 'linear-gradient(45deg, rgba(128, 128, 128, 0.25) 25%, transparent 25%, transparent 50%, rgba(128, 128, 128, 0.25) 50%, rgba(128, 128, 128, 0.25) 75%, transparent 75%, transparent)'};
  background-size: ${(props) => props.isLoading && '2rem 2rem'};

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: ${(props) => (props.isLoading ? 'wait' : 'pointer')};
    opacity: ${(props) => !props.isLoading && '0.8'};
    transition: all 300ms;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default Button;
