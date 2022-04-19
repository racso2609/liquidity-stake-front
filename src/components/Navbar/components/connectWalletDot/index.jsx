import React, { useContext } from "react";
import WalletContext from "../../../../context/Wallet";
import { Text } from "../../../../GlobalStyles/styles";

const Connected = ({ currentAccount }) => {
  return <Text>{currentAccount.slice(0, 10)}</Text>;
};

const Disconnected = ({ connectWalletHandler }) => {
  return (
    <button
      onClick={connectWalletHandler}
      className="cta-button connect-wallet-button"
    >
      Connect Wallet
    </button>
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
