import React, { useState, createContext, useEffect } from "react";
const WalletContext = createContext();

export function WalletProvider({children}) {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = () => {
    const { ethereum } = window;
    if (!ethereum) return alert("install metamask");
    connectWalletHandler();
  };

  const connectWalletHandler = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("make sure hace metamask installed");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!accounts.length) return alert("autorized account nor found");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      return alert(error.message);
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
    //eslint-disable-next-line
  }, []);

  return (
    <WalletContext.Provider value={{ currentAccount, connectWalletHandler }}>
      {children}
    </WalletContext.Provider>
  );
}
export default WalletContext;
