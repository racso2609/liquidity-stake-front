import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import Liquidity from "./views/AddLiquidity";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Liquidity />} path="/add-liquidity" />
      </Routes>
    </>
  );
}

export default App;
