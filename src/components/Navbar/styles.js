import styled from "styled-components";
import { getColor } from "../../GlobalStyles/Colors";

export const NavItem = styled.div`
  padding: 20px;
  &:hover {
    opacity: 0.8;
  }
  ${(props) =>
    props.active &&
    `
    background-color: ${getColor("active")} 
    `}
`;

export const NavContainer = styled.div`
  display: flex;
`;

export const Nav = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${getColor("card")};
  align-items: center;
  .connect-container {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
  }
`;
