import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "../../GlobalStyles/styles";
import { NavItem, NavContainer, Nav } from "./styles";
import ConnectWallet from "./components/connectWalletDot";

const navItems = [
  { pathname: "/", label: "home" },
  { pathname: "/add-liquidity", label: "Add liquidity" },
  { pathname: "/liquidity-stake", label: "Add Liquidity and stake" },
  { pathname: "/stake", label: "Stake" },
];

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <Nav>
      <NavContainer>
        {navItems.map((item) => {
          return (
            <NavItem active={item.pathname === pathname}>
              <Link to={item.pathname}>{item.label}</Link>
            </NavItem>
          );
        })}
      </NavContainer>
      <div className="connect-container">
        <ConnectWallet />
      </div>
    </Nav>
  );
}
