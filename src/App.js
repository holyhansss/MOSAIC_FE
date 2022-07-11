import { React, useState } from "react";
import { Routes, Route, Switch } from "react-router-dom";

import MainPage from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Admin from "./pages/Admin";
import MarketPage from "./pages/Market";

function App() {

  return (
    <Routes>
<<<<<<< HEAD
      <Route path='/' element={<MainPage/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/join' element={<Join/>} ></Route>
      <Route path='/admin' element={<Admin/>} ></Route>
      <Route path='/market' element={<MarketPage/>} ></Route>
      {/* <Route path='/detailpages/*' > 
        <Route path=":id" element={<DetailPage />} />
      </Route>  */}
=======
    <Route path='/' element={<MainPage/>} ></Route>
    <Route path='/market' element={<MarketPage/>} ></Route>
    

>>>>>>> 094c6196edc2de7e3ed8f1bde08938f81ea20d88
  </Routes>
  );
}

export default App;
