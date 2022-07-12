import React from "react";
import { Routes, Route, Switch } from "react-router-dom";

import MainPage from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Admin from "./pages/Admin";
import MarketPage from "./pages/Market";
import ReportList from "./pages/ReportList";
import ReportDetail from "./pages/ReportDetail";
import MyPage from "./pages/MyPage";

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainPage/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/join' element={<Join/>} ></Route>
      <Route path='/admin' element={<Admin/>} ></Route>
      <Route path='/market' element={<MarketPage/>} ></Route>
      <Route path='/reportList' element={<ReportList/>} ></Route>
      <Route path='/reportDetail' element={<ReportDetail/>} ></Route>
      <Route path='/profile' element={<MyPage/>} ></Route>
      {/* <Route path='/detailpages/*' > 
        <Route path=":id" element={<DetailPage />} />
      </Route>  */}
  </Routes>
  );
}

export default App; 
