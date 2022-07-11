import { React, useState } from "react";
import { Routes, Route, Switch } from "react-router-dom";

import MainPage from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";


function App() {

  return (
    <Routes>
      <Route path='/' element={<MainPage/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/join' element={<Join/>} ></Route>
    </Routes>
  );
}

export default App;
