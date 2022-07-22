import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Admin from "./pages/Admin";
import MarketPage from "./pages/Market";
import ReportList from "./pages/ReportList";
import ReportDetail from "./pages/ReportDetail";
import MyPage from "./pages/MyPage";
import Header from "./components/Header/Header";
import { auth, updateProfileData } from './firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user){
        console.log(user);
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        });
      } else {
        setIsLoggedIn(false);
      }
    })
  }, []);

  return (
    <>
      <Header user={userObj}/>
      <Routes>
        <Route path='/' element={<MainPage/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/join' element={<Join/>} ></Route>
        <Route path='admin' element={<Admin/>} ></Route>
        <Route path='/market' element={<MarketPage/>} ></Route>
        <Route path='/reportList' element={<ReportList/>} ></Route>
        <Route path='/reportDetail' element={<ReportDetail/>} ></Route>
        <Route path='/profile' element={<MyPage user={userObj} refreshUser={refreshUser}/>} ></Route>
        {/* <Route path='/detailpages/*' > 
          <Route path=":id" element={<DetailPage />} />
        </Route>  */}
      </Routes>
    </>
  );
}

export default App; 
