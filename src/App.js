import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import AddStake from "./views/AddStake";
import Navbar from "./components/Navbar";
import CreateStackPool from "./views/CreateStakePool";
import Balance from "./views/CheckBalances";
import Unstake from "./views/Unstake";
import ClaimRewards from "./views/ClaimRewards";
import Notify from "./views/Notify";
import AddAdmin from "./views/AddAdmin";
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
            <Route element={<AddStake />} path="/add-stake" />
            <Route element={<Unstake />} path="/unstake" />
            <Route element={<ClaimRewards />} path="/claim-rewards" />
            <Route element={<Balance />} path="/balance" />
            <Route element={<Notify />} path="/notify" />
          </>
        )}
        {roles.stakeAdmin && (
          <>
            <Route element={<CreateStackPool />} path="/create-stake-pool" />
            <Route element={<AddAdmin />} path="/add-admin" />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
