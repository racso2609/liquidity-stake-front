import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link, Text } from "../../GlobalStyles/styles";
import {
  NavItemPopContainer,
  NavItem,
  NavContainer,
  Nav,
  Hamburg,
} from "./styles";
import ConnectWallet from "./components/connectWalletDot";
import WalletContext from "../../context/Wallet";
import useToggle from "../../hooks/useToggle.js";

// TODO: transform this multiples array on a unique json object to simplify render
// NOTE: put this inside the component using callback hook to avoid renders

// items public items
const navItems = [{ pathname: "/", label: "home" }];

// items available id you are a admin of stake manage
const managerAdminNavItems = [
  { pathname: "/create-stake-pool", label: "Create stake pool" },
  { pathname: "/add-admin", label: "Add Admin" },
  { pathname: "/notify", label: "Notify" },
];
// items available when connect wallet
const userItems = [
  { pathname: "/add-stake", label: "Add stake" },
  { pathname: "/balance", label: "Balance" },
  { pathname: "/unstake", label: "Unstake" },
  { pathname: "/claim-rewards", label: "Claim Rewards" },
];

export default function NavBar() {
  const { pathname } = useLocation();
  const { roles, currentAccount } = useContext(WalletContext);
  const showAdminPopover = useToggle();
  const showResponsivePopover = useToggle();

  const toggleResponsive = () => {
    showResponsivePopover.toggle();
    showAdminPopover.setShow(false);
  };

  return (
    <Nav>
      <div className="first-container connect-container">
        <ConnectWallet />
      </div>
      <NavContainer className="second-container">
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
        {roles.stakeAdmin && (
          <NavItemPopContainer
            showChildren={showAdminPopover.show}
            onClick={showAdminPopover.toggle}
            active={managerAdminNavItems.find(
              (item) => item.pathname === pathname
            )}
          >
            <NavItem
              active={managerAdminNavItems.find(
                (item) => item.pathname === pathname
              )}
            >
              <Text>Admin</Text>
            </NavItem>

            <div className="pop-over">
              {managerAdminNavItems.map((item) => {
                return (
                  <NavItem
                    key={item.pathname}
                    active={item.pathname === pathname}
                  >
                    <Link to={item.pathname}>{item.label}</Link>
                  </NavItem>
                );
              })}
            </div>
          </NavItemPopContainer>
        )}
      </NavContainer>
      <div className="responsive-container">
        <NavItem onClick={toggleResponsive} hideColor>
          <Hamburg />
        </NavItem>
        <NavItemPopContainer
          showChildren={showResponsivePopover.show}
          hideColor
        >
          <div className="pop-over">
            {navItems.map((item) => {
              return (
                <NavItem
                  key={item.pathname}
                  active={item.pathname === pathname}
                >
                  <Link to={item.pathname}>{item.label}</Link>
                </NavItem>
              );
            })}

            {currentAccount &&
              userItems.map((item) => {
                return (
                  <NavItem
                    key={item.pathname}
                    active={item.pathname === pathname}
                  >
                    <Link to={item.pathname}>{item.label}</Link>
                  </NavItem>
                );
              })}

            {roles.stakeAdmin && (
              <>
                <NavItem
                  onClick={showAdminPopover.toggle}
                  active={managerAdminNavItems.find(
                    (item) => item.pathname === pathname
                  )}
                >
                  <Text>Admin</Text>
                </NavItem>
                <NavItemPopContainer
                  showChildren={showAdminPopover.show}
                  active={managerAdminNavItems.find(
                    (item) => item.pathname === pathname
                  )}
                  subMenu
                >
                  <div className="pop-over sub">
                    {managerAdminNavItems.map((item) => {
                      return (
                        <NavItem
                          key={item.pathname}
                          active={item.pathname === pathname}
                        >
                          <Link to={item.pathname}>{item.label}</Link>
                        </NavItem>
                      );
                    })}
                  </div>
                </NavItemPopContainer>
              </>
            )}
          </div>
        </NavItemPopContainer>
      </div>
    </Nav>
  );
}
