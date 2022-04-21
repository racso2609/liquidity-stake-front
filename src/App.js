import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Liquidity from "./views/AddLiquidity";
import Navbar from "./components/Navbar";
import CreateStackPool from "./views/CreateStakePool";
import Balance from "./views/CheckBalances";
import "./App.css";
import WalletContext from "./context/Wallet";

function App() {
  const { currentAccount, roles } = useContext(WalletContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Main />} path="/" />
        {currentAccount && (
          <>
            <Route element={<Liquidity />} path="/add-liquidity" />
            <Route element={<Balance />} path="/balance" />
          </>
        )}
        {roles.stakeAdmin && (
          <Route element={<CreateStackPool />} path="/create-stake-pool" />
        )}
      </Routes>
    </>
  );
}

export default App;
