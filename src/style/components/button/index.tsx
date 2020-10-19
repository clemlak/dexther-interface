import styled, {
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
  genre: string;
  block?: boolean;
  isLoading?: boolean;
}

const Button = styled.button<ButtonInterface>`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: 14.4px;
`;

export default Button;
