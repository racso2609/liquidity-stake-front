import React, { useContext } from "react";
import WalletContext from "../../../../context/Wallet";

const Connected = ({ currentAccount }) => {
  return <span>{currentAccount.slice(0, 10)}</span>;
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
