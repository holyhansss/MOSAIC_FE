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
import { auth, dbService } from './firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import styled from "styled-components";

const Container = styled.div`
@media screen {
  background: linear-gradient(-45deg, #3E2EB2 10%, #10061E 90%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  color: white;
};
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [admin, setAdmin] = useState(false);

  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
    });
  };

  const getAdmin = async(email) => {
    const q = query(collection(dbService, 'admin_info'), where('admin_email', '==', email));
    const querySnapShot = await getDocs(q);

    if (querySnapShot.empty) {
      setAdmin(false);
    } else {
      setAdmin(true);
    };
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user){
        await setUserObj({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
        });
        getAdmin(user.email);
      } else {
        setIsLoggedIn(false);
      }
    })
    
  }, []);
  return (
    <Container>
      <Header user={userObj} admin={admin}/>
      <Routes>
        <Route path='/' element={<MainPage/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/join' element={<Join/>} ></Route>
        <Route path='admin' element={<Admin/>} ></Route>
        <Route path='/market' element={<MarketPage/>} ></Route>
        <Route path='/reportList' element={<ReportList/>} ></Route>
        <Route path='/reportDetail/:id/:title/:writer/:date' element={<ReportDetail user={userObj}/>} ></Route>
        <Route path='/profile' element={<MyPage user={userObj} refreshUser={refreshUser}/>} ></Route>
        {/* <Route path='/detailpages/*' > 
          <Route path=":id" element={<DetailPage />} />
        </Route>  */}
      </Routes>
    </Container>
  );
}

export default App; 
