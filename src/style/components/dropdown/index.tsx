import React, {
  useState,
} from 'react';

import styled from 'styled-components';

import Button from '../button';

interface DropdownInterface {
  initialLabel: string;
  options: string[];
}

interface ListInterface {
  isOpen: boolean;
}

const List = styled.div<ListInterface>`
  z-index: 10;
  transform-origin: 50% 0;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all 0.2s ease-in-out 0s;
  position: absolute;
  transform: ${(props) => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  border: none;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: ${(props) => props.theme.border.radius};
  padding: 8px;
  box-sizing: border-box;
  width: 100%;
  max-height: 250px;
  overflow: auto;
`;

const Option = styled.div`
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.regular};
  font-weight: ${(props) => props.theme.font.weight.regular};

  color: ${(props) => props.theme.colors.secondary};
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  padding: 4px 32px;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

function Dropdown(props: DropdownInterface) {
  const {
    options,
    initialLabel,
  } = props;

  const [isOpen, toggle] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(initialLabel);

  return (
    <DropdownWrapper>
      <Button
        genre="primary"
        size="m"
        onClick={() => toggle(!isOpen)}
      >
        {currentValue}
      </Button>
      <List
        isOpen={isOpen}
      >
        {options.map((option, index) => (
          <Option
            role="button"
            tabIndex={index}
            onClick={() => {
              setCurrentValue(option);
              toggle(!isOpen);
            }}
          >
            {option}
          </Option>
        ))}
      </List>
    </DropdownWrapper>
  );
}

export default Dropdown;
