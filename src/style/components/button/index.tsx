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
  size?: string;
  genre?: string;
  block?: boolean;
  isLoading?: boolean;
}

const Button = styled.button<ButtonInterface>`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-size: ${(props) => props.theme.font.size.regular};
  font-weight: ${(props) => props.theme.font.weight.regular};
  color: ${(props) => props.theme.colors.primary};

  background: none;

  padding: 8px 28px;

  box-sizing: border-box;

  width: ${(props) => props.block && '100%'};

  border-radius: ${(props) => props.theme.border.radius};
  border-color: ${(props) => props.theme.colors.secondary};

  cursor: pointer;

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
