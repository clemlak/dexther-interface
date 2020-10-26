import React, {
  useEffect,
  useRef,
} from 'react';
import styled from 'styled-components';
import {
  Flex,
  Box,
} from 'reflexbox/styled-components';

interface ModalInterface {
  isOpen: boolean;
  title: string,
  children: JSX.Element | JSX.Element[] | Element | Element[],
  toggle: Function,
}

interface WrapperProps {
  isOpen: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background-color: rgba(0, 0, 0, 0.65);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 50;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  max-width: 60vh;
  width: 100%;
  border-radius: ${(props) => props.theme.border.radius};
  z-index: 100;
`;

const Title = styled.span`
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.font.family};
  font-weight: ${(props) => props.theme.font.weight.medium};
`;

const CloseBox = styled(Box)`
  text-align: right;
`;

const CloseIcon = styled.svg`
  cursor: pointer;
  height: 26px;
  color: ${(props) => props.theme.colors.primary};
`;

function Modal(props: ModalInterface) {
  const {
    isOpen,
    title,
    children,
    toggle,
  } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isOpen]);

  const contentRef = useRef<HTMLDivElement>(null);

  function handleClick(e: React.SyntheticEvent) {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      toggle();
    }
  }

  return (
    <Wrapper
      isOpen={isOpen}
      onClick={(e) => handleClick(e)}
    >
      <Content ref={contentRef}>
        <Flex flexWrap="wrap">
          <Box
            width={1 / 2}
            p={3}
            pb={0}
          >
            <Title>
              {title}
            </Title>
          </Box>
          <CloseBox
            width={1 / 2}
            p={3}
            pb={0}
          >
            <CloseIcon
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </CloseIcon>
          </CloseBox>
          <Box
            px={3}
            py={4}
            width={1}
          >
            {children}
          </Box>
        </Flex>
      </Content>
    </Wrapper>
  );
}

export default Modal;
