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
import grade from "../img/AA+.jpg";
import CryptoScore from "../components/PromisingCoin/CryptoScore";

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

function CryptoReport() {
  // 유망코인 정보
  const { id } = useParams();
  const [promising, setPromising] = useState(null);

  const getContents = async () => {
    const docRef = doc(dbService, "cryptocurrency", id);
    const docSnap = await getDoc(docRef);
    setPromising(docSnap.data());
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
            <img src={grade} alt="Pomising Coin Grade" width="100%"></img>
          </Grid>
          {promising.type === "coin" ? (
            <CryptoScore
              type={promising.type}
              score1={promising.scalability}
              score2={promising.decentralization}
              score3={promising.security}
            />
          ) : (
            <CryptoScore
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
}

export default CryptoReport;
