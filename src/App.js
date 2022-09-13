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
import { auth, dbService } from "./firebase";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import styled from "styled-components";
import Intro from "./pages/Intro";

const Container = styled.div`
  @media screen {
    background: linear-gradient(-45deg, #191240 10%, #06020d 90%);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    color: white;
  } ;
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

  const getAdmin = async (email) => {
    const q = query(
      collection(dbService, "admin_info"),
      where("admin_email", "==", email)
    );
    const querySnapShot = await getDocs(q);

    if (querySnapShot.empty) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
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
    });
  }, []);

  //리포트 리스트 db 불러오기 
  const [reports, setReports] = useState([]);

  const getReports = async () => {
    const q = query(collection(dbService, "weekly_report"), orderBy("date"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docs) => {
      const reportObj = {
        id: docs.id,
        title: docs.data().title,
        date: docs.data().date,
        writer: docs.data().writer,
      };
      setReports((prev) => [reportObj, ...prev]);
    });
  };
  let result = reports[0];
  useEffect(() => {
    getReports();
  }, []);




  return (
    <Container>
      <Header user={userObj} admin={admin} />
      <Routes>
        <Route path="/" element={<MainPage result={result} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/market" element={<MarketPage />}></Route>
        <Route path="/reportList" element={<ReportList result={result} reports={reports} />}></Route>
        <Route path="/intro" element={<Intro/>}></Route>
        <Route
          path="/reportDetail/:id/:title/:writer/:date"
          element={<ReportDetail user={userObj} />}
        ></Route>
        <Route
          path="/profile"
          element={<MyPage user={userObj} refreshUser={refreshUser} />}
        ></Route>
        {/* <Route path='/detailpages/*' > 
          <Route path=":id" element={<DetailPage />} />
        </Route>  */}
      </Routes>
    </Container>
  );
}

export default App;
