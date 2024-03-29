import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Container,
  Grid,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import {
  query,
  doc,
  getDoc,
  collection,
  deleteDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { dbService } from "../firebase";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

//Viewer
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import styled from "styled-components";
import PromisingScore from "../components/PromisingCoin/PromisingScore";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";

import { GRADE_IMAGE } from "../constants/constants";

//Responsive Web
import { Pc, Mobile } from "../components/Responsive/Responsive";

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

export default function PromisingReport({ user }) {
  // 유망코인 정보
  const { id } = useParams();
  const [promising, setPromising] = useState(null);
  const [gradeImg, setGradeImg] = useState("");
  const [clickIcon, setClickIcon] = useState(false);

  const getContents = async () => {
    const docRef = doc(dbService, "cryptocurrency", id);
    const docSnap = await getDoc(docRef);
    setPromising(docSnap.data());

    setGradeImg(GRADE_IMAGE[docSnap.data().rating]);
    // if (docSnap.data().rating === "D") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FD.png?alt=media&token=7494f9d9-dd21-4d89-8ccb-a5a3d68d93cc"
    //   );
    // } else if (docSnap.data().rating === "C") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FC.png?alt=media&token=b28afc0b-0f9a-4d70-af88-604ce6432d33"
    //   );
    // } else if (docSnap.data().rating === "CC") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FCC.png?alt=media&token=dfd3bdce-7d2d-443e-a7c2-cdb1eda58703"
    //   );
    // } else if (docSnap.data().rating === "CCC") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FCCC.png?alt=media&token=8ab979bf-f05f-4b37-a305-f1c17b40cdcf"
    //   );
    // } else if (docSnap.data().rating === "B-") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FB-.png?alt=media&token=da27c7e2-7b0c-4c73-bedd-59cfb7033f61"
    //   );
    // } else if (docSnap.data().rating === "B") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FB.png?alt=media&token=44c2dd15-82a7-4610-ab5e-e84bb98288f9"
    //   );
    // } else if (docSnap.data().rating === "B+") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FB%2B.png?alt=media&token=48419489-7127-4ba6-80fb-144db7a0fc35"
    //   );
    // } else if (docSnap.data().rating === "BB-") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBB-.png?alt=media&token=811912dc-5845-41cf-990d-e1c396b72e4f"
    //   );
    // } else if (docSnap.data().rating === "BB") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBB.png?alt=media&token=127a30d6-d661-4fe6-876b-73e985147bda"
    //   );
    // } else if (docSnap.data().rating === "BB+") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBB%2B.png?alt=media&token=6fcee14d-d572-425a-91eb-303211ad16e0"
    //   );
    // } else if (docSnap.data().rating === "BBB") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBBB.png?alt=media&token=9e5ee3e7-8dd6-4034-a817-1dc6584bf79e"
    //   );
    // } else if (docSnap.data().rating === "A-") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FA-.png?alt=media&token=2d168ac1-c440-45e3-8bb6-cb2c0c971112"
    //   );
    // } else if (docSnap.data().rating === "A") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FA.png?alt=media&token=d791675d-cb8b-4dd0-be83-db337874230e"
    //   );
    // } else if (docSnap.data().rating === "A+") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FA%2B.png?alt=media&token=2ef9a10b-0619-4679-8248-94e3e3ec77e4"
    //   );
    // } else if (docSnap.data().rating === "AA-") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAA-.png?alt=media&token=9c953c8a-82cb-46e7-991b-40480e42db46"
    //   );
    // } else if (docSnap.data().rating === "AA") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAA.png?alt=media&token=729a2a96-6b1a-4b86-b189-b1625ff3acbc"
    //   );
    // } else if (docSnap.data().rating === "AA+") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAA%2B.png?alt=media&token=fa78cc19-c0d9-4387-baf0-2e0d10d36807"
    //   );
    // } else if (docSnap.data().rating === "AAA") {
    //   setGradeImg(
    //     "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAAA.png?alt=media&token=d1c9aeb6-8883-4dc5-9df3-c40657903b72"
    //   );
    // }
  };

  const onClick = async () => {
    if (user !== null) {
      setClickIcon(!clickIcon);
      if (clickIcon === false) {
        // 유저별 스크랩 정보 firestore에 저장
        await setDoc(doc(dbService, "users", user.uid, "scrap", id), {
          name: promising.name,
          code: promising.code,
          hashtag: promising.hashtag,
          date: promising.date,
          thumbnail: promising.thumbnail,
        });
      } else {
        await deleteDoc(doc(dbService, "users", user.uid, "scrap", id));
      }
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  const getUserScrap = async () => {
    const q = query(collection(dbService, "users", user.uid, "scrap"));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((collection) => {
      if (collection.id === id) {
        setClickIcon(true);
      }
    });
  };

  useEffect(() => {
    getContents();
    if (user !== null) {
      getUserScrap();
    }
  }, []);

  let email = "잘못된 정보가 있다면 Mosaic에게 메일을 보내주세요";
  const navigate = useNavigate();

  return (
    <>
      <Pc>
        <MainContainer maxWidth="md" disableGutters>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <IconButton
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={onClick}>
                {clickIcon ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
              <Tooltip title={email} disableInteractive>
                <IconButton>
                  <AttachEmailIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          {promising !== null && (
            <Grid container direction="row" spacing={5}>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img src={promising.logo} alt="logo" width={30} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "end",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", margin: "0 0.5rem" }}
                    >
                      {promising.name}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "gray" }}>
                      {promising.code}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center">{promising.hashtag}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    display="block"
                    align="center"
                    gutterBottom
                  >
                    {moment(promising.date).format("YYYY.MM.DD")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={gradeImg}
                  alt="Grade"
                  width="55%"
                  align="center"
                ></img>
              </Grid>
              {promising.type === "coin" ? (
                <PromisingScore
                  type={promising.type}
                  score1={promising.scalability}
                  score2={promising.decentralization}
                  score3={promising.security}
                  score4={promising.others}
                />
              ) : (
                <PromisingScore
                  type={promising.type}
                  score1={promising.business}
                  score2={promising.technicality}
                  score3={promising.reliability}
                />
              )}
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  align="left"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  개요
                </Typography>
                <Box
                  sx={{
                    paddingTop: 2,
                  }}
                />
                <Viewer initialValue={promising.description} />
                <Typography
                  variant="body1"
                  align="left"
                  component="div"
                  sx={{ lineHeight: 2, letterSpacing: 0.25, marginTop: 5 }}
                >
                  <Button
                    onClick={() => {
                      window.open(promising.cmcLink, "_blank");
                    }}
                    variant="contained"
                  >
                    {" "}
                    코인마켓캡에서 자세히 보기{" "}
                  </Button>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    paddingTop: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  align="left"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  선정 이유
                </Typography>
                <Box
                  sx={{
                    paddingTop: 2,
                  }}
                />
                <Viewer initialValue={promising.assessment} />
                <Typography
                  variant="caption"
                  align="right"
                  component="div"
                  sx={{ lineHeight: 2, letterSpacing: 0.25, marginTop: 5 }}
                >
                  <Button
                    onClick={() => {
                      window.open(promising.notionLink, "_blank");
                    }}
                    variant="contained"
                  >
                    {" "}
                    자세히보기{" "}
                  </Button>
                </Typography>
                <Box
                  sx={{
                    paddingTop: 3,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    paddingTop: 2,
                  }}
                />
              </Grid>
            </Grid>
          )}
        </MainContainer>
      </Pc>
      <Mobile>
        <MainContainer maxWidth="lg">
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <IconButton
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={onClick}>
                {clickIcon ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
              <Tooltip title={email} disableInteractive>
                <IconButton>
                  <AttachEmailIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          {promising !== null && (
            <Grid container direction="row" spacing={5}>
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img src={promising.logo} alt="logo" width={30} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "end",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", margin: "0 0.5rem" }}
                    >
                      {promising.name}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "gray" }}>
                      {promising.code}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center">{promising.hashtag}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    display="block"
                    align="center"
                    gutterBottom
                  >
                    {moment(promising.date).format("YYYY.MM.DD")}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={gradeImg}
                  alt="Grade"
                  width="40%"
                  align="center"
                ></img>
              </Grid>
              <Grid item xs={12}>
                {promising.type === "coin" ? (
                  <PromisingScore
                    type={promising.type}
                    score1={promising.scalability}
                    score2={promising.decentralization}
                    score3={promising.security}
                    score4={promising.others}
                  />
                ) : (
                  <PromisingScore
                    type={promising.type}
                    score1={promising.business}
                    score2={promising.technicality}
                    score3={promising.reliability}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  align="left"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  개요
                </Typography>
                <Box
                  sx={{
                    paddingTop: 2,
                  }}
                />
                <Viewer initialValue={promising.description} />
                <Typography
                  variant="body1"
                  align="left"
                  component="div"
                  sx={{ lineHeight: 2, letterSpacing: 0.25, marginTop: 5 }}
                >
                  <Button
                    onClick={() => {
                      window.open(promising.cmcLink, "_blank");
                    }}
                    variant="contained"
                  >
                    {" "}
                    코인마켓캡에서 자세히 보기{" "}
                  </Button>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    paddingTop: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  align="left"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  선정 이유
                </Typography>
                <Box
                  sx={{
                    paddingTop: 2,
                  }}
                />
                <Viewer initialValue={promising.assessment} />
                <Typography
                  variant="caption"
                  align="right"
                  component="div"
                  sx={{ lineHeight: 2, letterSpacing: 0.25, marginTop: 5 }}
                >
                  <Button
                    onClick={() => {
                      window.open(promising.notionLink, "_blank");
                    }}
                    variant="contained"
                  >
                    {" "}
                    자세히보기{" "}
                  </Button>
                </Typography>
                <Box
                  sx={{
                    paddingTop: 3,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    paddingTop: 2,
                  }}
                />
              </Grid>
            </Grid>
          )}
        </MainContainer>
      </Mobile>
    </>
  );
}
