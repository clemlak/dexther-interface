import * as Router from 'react-router-dom';
import styled from 'styled-components';

interface NavLinkInterface {
  margin?: string,
}

const NavLink = styled(Router.NavLink)<NavLinkInterface>`
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.size.regular};
  font-weight: ${(props) => props.theme.font.weight.bold};
  color: ${(props) => props.theme.colors.secondary};
  text-decoration: none;

  margin: ${(props) => (props.margin ? props.margin : '0 30px')};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

`;

export default NavLink;
