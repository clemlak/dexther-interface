import React, {
  useState,
} from 'react';
import styled from 'styled-components';
import {
  Flex,
} from 'reflexbox/styled-components';

const AlertWrapper = styled(Flex)`
  background-color: ${(props) => props.theme.colors.light};
  border-radius: ${(props) => props.theme.border.radius};
  border: none;
  position: fixed;
  bottom: 18px;
  right: 18px;
  left: 18px;
`;

const Message = styled.p`
  font-family: ${(props) => props.theme.font.family}, sans-serif;
  font-weight: ${(props) => props.theme.font.weight.regular};
  font-size: ${(props) => props.theme.font.size.regular};
  color: ${(props) => props.theme.colors.secondary};
  margin: 0;
`;

const CloseIcon = styled.svg`
  cursor: pointer;
  height: 26px;
  color: ${(props) => props.theme.colors.secondary};
`;

interface AlertInterface {
  message: string;
}

function Alert(props: AlertInterface) {
  const {
    message,
  } = props;

  const [isOpen, toggle] = useState<boolean>(true);

  if (isOpen === false) {
    return (
      <>
      </>
    );
  }

  return (
    <AlertWrapper
      alignItems="center"
      justifyContent="space-between"
      py="8px"
      px="18px"
    >
      <Message>
        {message}
      </Message>
      <CloseIcon
        onClick={() => toggle(false)}
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </CloseIcon>
    </AlertWrapper>
  );
}

export default Alert;
