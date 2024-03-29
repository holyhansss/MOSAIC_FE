import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import CryptoTable from "../components/Ranking/CryptoTable";
import RatingDes from "../components/Ranking/RatingDes";

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

export default function Ranking({ crypto }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          backgroundColor: "#3C1A7D",
          background: 'linear-gradient(45deg, #3C1A7D 30%, #BCB1E0 80%)',
          width: "calc(100vw - (100vw - 100%))",
          height: "20em",
        }}
      ></div>
      <MainContainer maxWidth="lg">
        <Grid container direction="row" spacing={3}>
          <Grid item xs={6}>
            <Box
              sx={{
                height: "20em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ height: "2em" }} />
              <Typography
                variant="h3"
                sx={{ color: "white", marginBottom: "1rem" }}
              >
                Mosaic 순위
              </Typography>
              <Typography variant="h5" sx={{ color: "lightgrey" }}>
                암호화폐가 지닌 내재가치를
              </Typography>
              <Typography variant="h5" sx={{ color: "lightgrey" }}>
                상세한 평가기준에 의거하여 평가한 순위입니다.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                height: "20em",
                display: "flex",
                flexDirection: "raw",
                justifyContent: "center",
              }}
            >
              <img
                  src="https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/service_info%2Fundraw_reviews_lp8w.svg?alt=media&token=67ea23a8-ea21-4cdd-9c73-5096420838cb"
                  alt="rating"
                  width={380}
                />
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <CryptoTable crypto={crypto} />
            <RatingDes></RatingDes>
            <Box sx={{ height: "5em" }} />
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
}
