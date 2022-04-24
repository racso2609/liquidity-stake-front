import styled from "styled-components";
import { getColor } from "../../GlobalStyles/Colors";
import HamburgIcon from "../icons/Hamburg.jsx";

export const NavItem = styled.div`
  &:hover {
    ${(props) =>
      props.hideColor
        ? ""
        : `
    background-color: ${getColor("active")}`}
  }
  a,
  span,
  svg {
    padding: ${(props) => props.padding || "10px 20px"};
  }
  display: flex;
  align-items: center;
  ${(props) =>
    props.active &&
    `
    background-color: ${getColor("active")} 
    `}
`;

export const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Nav = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${getColor("card")};
  padding: 0 20px;

  align-items: center;
  .first-container {
    display: flex;
    justify-content: flex-start;
  }

  .second-container {
    display: flex;
    justify-content: flex-end;
  }
  .responsive-container {
    display: none;
  }
  @media (max-width: 800px) {
    .responsive-container {
      display: flex;
      justify-content: flex-end;
    }
    .second-container {
      display: none;
    }
  }
`;

export const NavItemPopContainer = styled(NavItem)`
  position: relative;
  display: ${(props) => (props.showChildren ? "block" : "none")};
  width: ${(props) => props.width};
  & > .pop-over {
    z-index: 1;
    position: absolute;
    background-color: ${getColor("card")};
    display: ${(props) => (props.showChildren ? "block" : "none")};

    ${(props) =>
      props.showChildren &&
      `
      top: 110%;
      right: 50%;
      width: 200px;
  `}
  }

  @media (max-width: 800px) {
    & > .pop-over {
      top: ${(props) => (props.subMenu ? "0" : "100%")};
      right: ${(props) => (props.subMenu ? "100%" : "50%")};
      width: 200px;
    }
    & > .pop-over:hover {
      .pop-over {
        display: ${(props) => (props.showChildren ? "block" : "none")};
      }
    }
  }
`;

export const Hamburg = styled(HamburgIcon)`
  width: 30px;
  height: 30px;
`;
