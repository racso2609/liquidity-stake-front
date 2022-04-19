import React, { useContext, useEffect, useState } from "react";
import StakeManagerContext from "../../context/StakeManager";
import WalletContext from "../../context/Wallet";

const ConnectWalletButton = () => {
  const { connectWalletHandler } = useContext(WalletContext);

  return (
    <button
      onClick={connectWalletHandler}
      className="cta-button connect-wallet-button"
    >
      Connect Wallet
    </button>
  );
};

const Main = () => {
  const { currentAccount } = useContext(WalletContext);
  const { poolTokens, stakingManager } = useContext(StakeManagerContext);
  return (
    <div className="main-app">
      <h1>add liquidity {poolTokens}</h1>
      <span>{stakingManager?.address}</span>
      {currentAccount ? <span>add liquidity</span> : <ConnectWalletButton />}
    </div>
  );
};

export default Main;
