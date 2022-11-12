import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { auth, dbService } from "./firebase";
import GlobalStyle from "./style/global";
import { Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Pages
import MainPage from "./pages/Main";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Admin from "./pages/Admin";
import MarketPage from "./pages/Market";
import PromisingList from "./pages/PromisingList";
import { ReportList, DailyReportList } from "./pages/ReportList";
import ReportWeeklyDetail from "./pages/ReportWeeklyDetail";
import MyPage from "./pages/MyPage";
import Ranking from "./pages/Ranking";
import PromisingReport from "./pages/PromisingReport";
import ReportMain from "./pages/ReportMain";
import AdminWeeklyMain from "./pages/AdminWeeklyMain";
import AdminDailyMain from "./pages/AdminDailyMain";
import ReportDailyDetail from "./pages/ReportDailyDetail";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AdminPromising from "./pages/AdminPromising";

const theme = createTheme({
  typography: {
    fontFamily: "Spoqa Han Sans Neo",
    whiteSpace: "pre-line",
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [admin, setAdmin] = useState(false);
  // 리포트 리스트 db 불러오기
  const [reports, setReports] = useState([]);
  const [dailyReport, setDailyReport] = useState([]);
  // 암호화폐 db
  const [crypto, setCrypto] = useState([]);
  const [promising, setPromising] = useState([]);

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
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const getReports = async () => {
    const q = query(collection(dbService, "weekly_report"), orderBy("date"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docs) => {
      const reportObj = {
        id: docs.id,
        title: docs.data().title,
        date: docs.data().date,
        writer: docs.data().writer,
        thumbnail: docs.data().thumbnail,
      };
      setReports((prev) => [reportObj, ...prev]);
    });

    const qu = query(collection(dbService, "daily_report"), orderBy("date"));
    const querySnapShot = await getDocs(qu);
    querySnapShot.forEach((docs) => {
      const reportObj = {
        id: docs.id,
        title: docs.data().issue1_title,
        date: docs.data().date,
        writer: docs.data().writer,
        thumbnail: docs.data().thumbnail,
        hashtag: docs.data().hashtag,
      };
      setDailyReport((prev) => [reportObj, ...prev]);
    });
  };

  const result = dailyReport[0];

  const getCrypto = async () => {
    const q = query(
      collection(dbService, "cryptocurrency"),
      orderBy("rate", "asc")
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((docs) => {
      let cryptoObj = {};
      if (docs.data().promising === true) {
        if (docs.data().type === "coin") {
          cryptoObj = {
            id: docs.id,
            name: docs.data().name,
            code: docs.data().code,
            security: docs.data().security,
            scalability: docs.data().scalability,
            decentralization: docs.data().decentralization,
            others: docs.data().others,
            logo: docs.data().logo,
            rating: docs.data().rating,
            thumbnail: docs.data().thumbnail,
            hashtag: docs.data().hashtag,
            type: docs.data().type,
            promising: docs.data().promising,
            description: docs.data().description,
            assessment: docs.data().assessment,
            rate: docs.data().rate,
            cmcLink: docs.data().cmcLink,
          };
        } else {
          cryptoObj = {
            id: docs.id,
            name: docs.data().name,
            code: docs.data().code,
            business: docs.data().business,
            technicality: docs.data().technicality,
            reliability: docs.data().reliability,
            logo: docs.data().logo,
            rating: docs.data().rating,
            thumbnail: docs.data().thumbnail,
            hashtag: docs.data().hashtag,
            type: docs.data().type,
            promising: docs.data().promising,
            description: docs.data().description,
            assessment: docs.data().assessment,
            rate: docs.data().rate,
            cmcLink: docs.data().cmcLink,
          };
        }
      } else {
        if (docs.data().type === "coin") {
          cryptoObj = {
            id: docs.id,
            name: docs.data().name,
            code: docs.data().code,
            security: docs.data().security,
            scalability: docs.data().scalability,
            decentralization: docs.data().decentralization,
            others: docs.data().others,
            rating: docs.data().rating,
            hashtag: docs.data().hashtag,
            type: docs.data().type,
            promising: docs.data().promising,
            rate: docs.data().rate,
            cmcLink: docs.data().cmcLink,
          };
        } else {
          cryptoObj = {
            id: docs.id,
            name: docs.data().name,
            code: docs.data().code,
            business: docs.data().business,
            technicality: docs.data().technicality,
            reliability: docs.data().reliability,
            rating: docs.data().rating,
            hashtag: docs.data().hashtag,
            type: docs.data().type,
            promising: docs.data().promising,
            rate: docs.data().rate,
            cmcLink: docs.data().cmcLink,
          };
        }
      }

      setCrypto((prev) => [cryptoObj, ...prev]);
    });

    const q2 = query(collection(dbService, "cryptocurrency"), orderBy("date"));
    const querySnapShot2 = await getDocs(q2);
    querySnapShot2.forEach((docs) => {
      let cryptoObj = {};
      if (docs.data().promising === true) {
        if (docs.data().type === "coin") {
          cryptoObj = {
            id: docs.id,
            name: docs.data().name,
            code: docs.data().code,
            security: docs.data().security,
            scalability: docs.data().scalability,
            decentralization: docs.data().decentralization,
            others: docs.data().others,
            logo: docs.data().logo,
            rating: docs.data().rating,
            thumbnail: docs.data().thumbnail,
            hashtag: docs.data().hashtag,
            type: docs.data().type,
            promising: docs.data().promising,
            description: docs.data().description,
            assessment: docs.data().assessment,
            rate: docs.data().rate,
            cmcLink: docs.data().cmcLink,
          };
        } else {
          cryptoObj = {
            id: docs.id,
            name: docs.data().name,
            code: docs.data().code,
            business: docs.data().business,
            technicality: docs.data().technicality,
            reliability: docs.data().reliability,
            logo: docs.data().logo,
            rating: docs.data().rating,
            thumbnail: docs.data().thumbnail,
            hashtag: docs.data().hashtag,
            type: docs.data().type,
            promising: docs.data().promising,
            description: docs.data().description,
            assessment: docs.data().assessment,
            cmcLink: docs.data().cmcLink,
          };
        }
      } else {
        if (docs.data().type === "coin") {
          cryptoObj = {
            id: docs.id,
            name: docs.data().name,
            code: docs.data().code,
            security: docs.data().security,
            scalability: docs.data().scalability,
            decentralization: docs.data().decentralization,
            others: docs.data().others,
            rating: docs.data().rating,
            hashtag: docs.data().hashtag,
            type: docs.data().type,
            promising: docs.data().promising,
            cmcLink: docs.data().cmcLink,
          };
        } else {
          cryptoObj = {
            id: docs.id,
            name: docs.data().name,
            code: docs.data().code,
            business: docs.data().business,
            technicality: docs.data().technicality,
            reliability: docs.data().reliability,
            rating: docs.data().rating,
            hashtag: docs.data().hashtag,
            type: docs.data().type,
            promising: docs.data().promising,
            cmcLink: docs.data().cmcLink,
          };
        }
      }

      setPromising((prev) => [cryptoObj, ...prev]);
    });
  };

  useEffect(() => {
    getReports();
    getCrypto();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Grid container direction="column" spacing={2}>
        <Grid item md={2}>
          <Header user={userObj} admin={admin} />
        </Grid>
        <Grid item md={10}>
          <Container maxWidth="lg" disableGutters>
            <Routes>
              <Route
                path="/"
                element={
                  <MainPage
                    result={result}
                    reports={reports}
                    crypto={promising}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route
                path="admin"
                element={<Admin admin={admin} isLoggedIn={isLoggedIn} />}
              />
              <Route
                path="adminweeklymain"
                element={
                  <AdminWeeklyMain admin={admin} isLoggedIn={isLoggedIn} />
                }
              />
              <Route
                path="admindailymain"
                element={
                  <AdminDailyMain admin={admin} isLoggedIn={isLoggedIn} />
                }
              />
              <Route
                path="adminpromising"
                element={
                  <AdminPromising admin={admin} isLoggedIn={isLoggedIn} />
                }
              />
              <Route path="/market" element={<MarketPage />} />
              <Route
                path="/promising"
                element={<PromisingList crypto={promising} />}
              />
              <Route path="/promising/:id" element={<PromisingReport user={userObj}/>} />
              <Route
                path="/reportMain"
                element={
                  <ReportMain
                    result={result}
                    reports={reports}
                    dailyReport={dailyReport}
                  />
                }
              />
              <Route
                path="/reportList"
                element={<ReportList result={result} reports={reports} />}
              />
              <Route
                path="/reportDailyList"
                element={
                  <DailyReportList result={result} dailyReport={dailyReport} />
                }
              />
              <Route
                path="/reportDetail/:id/:title/:writer/:date"
                element={<ReportWeeklyDetail user={userObj} />}
              />
              <Route
                path="/reportDailyDetail/:id/:title/:writer/:date"
                element={<ReportDailyDetail user={userObj} />}
              />
              <Route
                path="/profile"
                element={<MyPage user={userObj} refreshUser={refreshUser} />}
              />
              <Route path="/ranking" element={<Ranking crypto={crypto} />} />
            </Routes>
          </Container>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
