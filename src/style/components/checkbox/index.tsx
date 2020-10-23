import React from 'react';
import styled, {
  keyframes,
} from 'styled-components';

const pop = () => keyframes`
  0% {
    transform: scale(0);
  }

  80% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
`;

const Label = styled.label`
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.small};
  cursor: pointer;
`;

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  appearance: none;

  vertical-align: bottom;

  margin: 0px 6px;
  width: 16px;
  height: 16px;
  border-radius: 4px;

  background: none;
  border-width: ${(props) => props.theme.border.width};
  border-style: ${(props) => props.theme.border.style};
  border-color: ${(props) => props.theme.colors.secondary};

  transition: all 300ms;

  &:checked {
    transition: all 300ms;

    &:after {
      animation-name: ${() => pop()};
      animation-duration: 0.2s;
      animation-iteration-count: 1;
      animation-timing-function: linear;
      animation-delay: 0;

      content: ' ';
      background-color: ${(props) => props.theme.colors.primary};
      width: 10px;
      height: 10px;
      border-radius: 4px;
    }

    &:focus {
      outline: none;
    }
  }

  &:focus {
    outline: none;
  }

  &:hover {
    transition: all 300ms;
    cursor: pointer;
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

interface CheckboxWrapperInterface {
  label: string,
  handleOnChange: Function,
}

function CheckboxWrapper(props: CheckboxWrapperInterface) {
  const {
    label,
    handleOnChange,
  } = props;

  return (
    <Label>
      <Checkbox onChange={(e) => handleOnChange(e)} />
      {label}
    </Label>
  );
}

export default CheckboxWrapper;
