import { React } from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/Main";
import MarketPage from "./pages/Market";

function App() {
  return (
    <Routes>
    <Route path='/' element={<MainPage/>} ></Route>
    <Route path='/market' element={<MarketPage/>} ></Route>
    

  </Routes>
  );
}

export default App;
