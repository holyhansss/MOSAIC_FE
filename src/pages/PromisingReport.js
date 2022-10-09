import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../firebase";

import styled from "styled-components";
import PromisingScore from "../components/PromisingCoin/PromisingScore";

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

export default function PromisingReport() {
  // 유망코인 정보
  const { id } = useParams();
  const [promising, setPromising] = useState(null);
  const [gradeImg, setGradeImg] = useState("");

  const getContents = async () => {
    const docRef = doc(dbService, "cryptocurrency", id);
    const docSnap = await getDoc(docRef);
    setPromising(docSnap.data());

    if (docSnap.data().rating === "D") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FD.png?alt=media&token=40028589-56a7-49a5-a023-d7fdf8d161db");
    } else if (docSnap.data().rating === "C") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FC.png?alt=media&token=eb431bcc-e143-42c4-81fa-2179917a1665");
    } else if (docSnap.data().rating === "CC") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FCC.png?alt=media&token=be352712-5cd4-424a-b318-54aa331eaf33");
    } else if (docSnap.data().rating === "CCC") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FCCC.png?alt=media&token=852594c4-693c-4240-830b-1621cd22d914");
    } else if (docSnap.data().rating === "B-") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FB-.png?alt=media&token=ccb8a295-5858-4855-8968-8dca9df38b63");
    } else if (docSnap.data().rating === "B") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FB.png?alt=media&token=89f3b699-dee5-4c99-a561-d74041abfbc7");
    } else if (docSnap.data().rating === "B+") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FB%2B.png?alt=media&token=e0409b64-02eb-473d-8814-f28828ab03a6");
    } else if (docSnap.data().rating === "BB-") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBB-.png?alt=media&token=d674256a-11c0-4e3b-96d4-af2403a59da4");
    } else if (docSnap.data().rating === "BB") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBB.png?alt=media&token=f0b0d805-b156-48fc-bbfc-61df5b72d514");
    } else if (docSnap.data().rating === "BB+") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBB%2B.png?alt=media&token=bcb7dcaf-9487-4bf4-9f6e-05fca003ef5d");
    } else if (docSnap.data().rating === "BBB") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBBB.png?alt=media&token=d947051c-2585-4583-9684-e0f77a01844e");
    } else if (docSnap.data().rating === "A-") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FA-.png?alt=media&token=c910c439-3498-4229-b020-06ef6a6aaa57");
    } else if (docSnap.data().rating === "A") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FA.png?alt=media&token=7ca26c52-f2e9-41e7-b718-599355ff78a0");
    } else if (docSnap.data().rating === "A+") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FA%2B.png?alt=media&token=34dde87b-ba6e-45e4-8d28-eb73120f5ea7");
    } else if (docSnap.data().rating === "AA-") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAA-.png?alt=media&token=dd3615e5-392f-4bd5-813a-ce4c2b158189");
    } else if (docSnap.data().rating === "AA") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAA.png?alt=media&token=5aa7548a-a644-41d9-ba71-4a831c46d325");
    } else if (docSnap.data().rating === "AA+") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAA%2B.png?alt=media&token=bc997102-479c-41f8-9251-d43e56bf9c0a");
    } else if (docSnap.data().rating === "AAA") {
      setGradeImg("https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAAA.png?alt=media&token=3d878b71-2020-49a3-97fd-006e42d0e8da");
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  return (
    <MainContainer maxWidth="md" disableGutters>
      {promising !== null && (
        <Grid container direction="row" spacing={5}>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", m: 1 }}
              >
                {promising.name}
              </Typography>
              <img src={promising.logo} alt="logo" width={30} />
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">{promising.hashtag}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <img src={gradeImg} alt="Pomising Coin Grade" width="100%"></img>
          </Grid>
          {promising.type === "coin" ? (
            <PromisingScore
              type={promising.type}
              score1={promising.scalability}
              score2={promising.decentralization}
              score3={promising.security}
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
              variant="body1"
              align="left"
              gutterBottom
              component="div"
              sx={{ lineHeight: 2, letterSpacing: 0.25 }}
            >
              {promising.description}
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
                paddingTop: 3,
              }}
            />
            <Typography
              variant="body1"
              align="left"
              gutterBottom
              component="div"
              sx={{ lineHeight: 2, letterSpacing: 0.25 }}
            >
              {promising.assessment}
            </Typography>
            <Box
              sx={{
                paddingTop: 3,
              }}
            />
          </Grid>
        </Grid>
      )}
    </MainContainer>
  );
};
