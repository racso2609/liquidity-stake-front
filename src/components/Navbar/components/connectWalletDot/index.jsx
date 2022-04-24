import React, { useContext } from "react";
import WalletContext from "../../../../context/Wallet";
import { Button, Container } from "../../../../GlobalStyles/styles";
import Identicon from "react-identicons";
import styled from "styled-components";

const ContainerImage = styled(Container)`
  width: auto;
  height: auto;
  > * {
    width: ${(props) => props.width} !important;
    height: ${(props) => props.height} !important;
  }
`;

const Connected = ({ currentAccount }) => {
  return (
    <ContainerImage width="30px" height="30px" align="center" justify="center">
      <Identicon string={currentAccount} />
    </ContainerImage>
  );
};

const Disconnected = ({ connectWalletHandler }) => {
  return (
    <Button width="200px" onClick={connectWalletHandler}>
      Connect Wallet
    </Button>
  );
};

export default function ConnectWalletButton() {
  const { connectWalletHandler, currentAccount } = useContext(WalletContext);

  return currentAccount ? (
    <Connected currentAccount={currentAccount} />
  ) : (
    <Disconnected connectWalletHandler={connectWalletHandler} />
  );
}
