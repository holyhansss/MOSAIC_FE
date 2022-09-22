import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { auth, dbService } from "./firebase";
import GlobalStyle from "./style/global";
import { Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//page
import MainPage from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Admin from "./pages/Admin";
import MarketPage from "./pages/Market";
import PromisingCoins from "./pages/PromisingCoins";
import ReportList from "./pages/ReportList";
import ReportDetail from "./pages/ReportDetail";
import MyPage from "./pages/MyPage";
import Ranking from "./pages/Ranking";
import Header from "./components/Header/Header";
import CryptoReport from "./components/PromisingCoin/CryptoReport";
import GlobalStyle from "./style/global";
import { Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReportMain from "./pages/ReportMain";


const theme = createTheme({
  typography: {
    fontFamily: "Spoqa Han Sans Neo",
  },
});

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
        writer: docs.data().writer
      };
      setReports((prev) => [reportObj, ...prev]);
    });
  };
  const result = reports[0];

  useEffect(() => {
    getReports();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Grid container direction="column" spacing={2}>
        <Grid item md={2}>
          <Header user={userObj} admin={admin} />
        </Grid>
        <Grid item md={10}>
          <Container maxWidth="lg" disableGutters="true">
            <Routes>
              <Route path="/" element={<MainPage reports={reports} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="admin" element={<Admin />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/promising" element={<PromisingCoins />} />
              <Route path="/promising/:name" element={<CryptoReport />} />
              <Route
                path="/reportMain"
                element={<ReportMain result={result} reports={reports} />}
              />
              <Route
                path="/reportList"
                element={<ReportList result={result} reports={reports} />}
              />
              <Route
                path="/reportDetail/:id/:title/:writer/:date"
                element={<ReportDetail user={userObj} />}
              />
              <Route
                path="/profile"
                element={<MyPage user={userObj} refreshUser={refreshUser} />}
              />
              <Route path="/ranking" element={<Ranking />} />
            </Routes>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
