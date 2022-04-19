import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./views/Main";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main />} path="/" />
      </Routes>
    </>
  );
}

export default App;
