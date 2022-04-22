import React, { useContext } from "react";
import WalletContext from "../../../../context/Wallet";
import { Text, Button } from "../../../../GlobalStyles/styles";

const Connected = ({ currentAccount }) => {
  return <Text>{currentAccount.slice(0, 10)}</Text>;
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
