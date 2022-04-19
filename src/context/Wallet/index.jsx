import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [signer, setSigner] = useState(null);

  const checkWalletIsConnected = () => {
    const { ethereum } = window;
    if (!ethereum) return alert("install metamask");
    connectWalletHandler();
  };

  const connectWalletHandler = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("make sure have metamask installed");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts.length) return alert("authorized account nor found");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      return alert(error.message);
    }
  };
  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) return alert("Install metamask");
    const provider = new ethers.providers.Web3Provider(ethereum);
    setSigner(provider.getSigner());
  }, [currentAccount]);

  useEffect(() => {
    checkWalletIsConnected();
    //eslint-disable-next-line
  }, []);

  return (
    <WalletContext.Provider
      value={{ signer, currentAccount, connectWalletHandler }}
    >
      {children}
    </WalletContext.Provider>
  );
}
export default WalletContext;
