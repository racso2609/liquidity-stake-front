import React from "react";
import {Routes,Route} from 'react-router-dom';
import  Main from './views/Main';
import DropInfo from './views/DropInfo';

import "./App.css";
//:TODO: update contract to be able to edit drop info, and add a mapping to get al related nftId to the mint

function App() {

  return (
    <>
    <Routes>
      <Route element={<Main/>} path="/" />
      <Route element={<DropInfo/>} exact path="/drops/:dropId" />
    </Routes>
    </>
  );
}

export default App;
