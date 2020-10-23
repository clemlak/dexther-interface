import styled from 'styled-components';

interface InputInterface {
  block?: boolean,
}

const Input = styled.input<InputInterface>`
  font-family: ${(props) => props.theme.font.family};
  font-size: 14px;
  font-weight: ${(props) => props.theme.font.weight.medium};

  color: ${(props) => props.theme.colors.primary};

  background-color: ${(props) => props.theme.colors.background};

  border-color: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.border.radius};
  border-style: ${(props) => props.theme.border.style};
  border-width: ${(props) => props.theme.border.width};

  padding: 12px 24px;

  box-sizing:border-box;
  width: ${(props) => props.block && '100%'};

  &::placeholder {
    color: ${(props) => props.theme.colors.secondary};
  }

  &:focus {
    outline: none;
  }
`;

export default Input;
