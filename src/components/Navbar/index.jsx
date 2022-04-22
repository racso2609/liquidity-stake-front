import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "../../GlobalStyles/styles";
import { NavItem, NavContainer, Nav } from "./styles";
import ConnectWallet from "./components/connectWalletDot";
import WalletContext from "../../context/Wallet";

// TODO: transform this multiples array on a unique json object to simplify render
// NOTE: put this inside the component using callback hook to avoid renders

// items public items
const navItems = [{ pathname: "/", label: "home" }];

// items available id you are a admin of stake manage
const managerAdminNavItems = [
  { pathname: "/create-stake-pool", label: "Create stake pool" },
  { pathname: "/add-admin", label: "Add Admin" },
];
// items available when connect wallet
const userItems = [
  { pathname: "/add-stake", label: "Add stake" },
  { pathname: "/balance", label: "Balance" },
];

export default function NavBar() {
  const { pathname } = useLocation();
  const { roles, currentAccount } = useContext(WalletContext);

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

        {currentAccount &&
          userItems.map((item) => {
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
