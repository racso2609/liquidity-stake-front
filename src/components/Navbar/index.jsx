import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "../../GlobalStyles/styles";
import { NavItem, NavContainer, Nav } from "./styles";
import ConnectWallet from "./components/connectWalletDot";
import WalletContext from "../../context/Wallet";

const navItems = [
  { pathname: "/", label: "home" },
  { pathname: "/add-liquidity", label: "Add liquidity" },
  { pathname: "/stake", label: "Stake" },
];

const managerAdminNavItems = [
  { pathname: "/create-stake-pool", label: "Create stake pool" },
];

export default function NavBar() {
  const { pathname } = useLocation();
  const { roles } = useContext(WalletContext);

  return (
    <Nav>
      <NavContainer>
        {navItems.map((item) => {
          return (
            <NavItem key={item.pathname} active={item.pathname === pathname}>
              <Link to={item.pathname}>{item.label}</Link>
            </NavItem>
          );
        })}

        {roles.stakeAdmin &&
          managerAdminNavItems.map((item) => {
            return (
              <NavItem key={item.pathname} active={item.pathname === pathname}>
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
