import React, { useContext, useEffect, useState } from "react";
import StakeManagerContext from "../../context/StakeManager";
import WalletContext from "../../context/Wallet";
import { H1, Text } from "../../GlobalStyles/styles";

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
      <H1>add liquidity {poolTokens}</H1>
      <Text>{stakingManager?.address}</Text>
      {currentAccount ? <Text>add liquidity</Text> : <ConnectWalletButton />}
    </div>
  );
};

export default Main;
