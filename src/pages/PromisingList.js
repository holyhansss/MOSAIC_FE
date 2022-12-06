import React from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import PromisingCard from "../components/PromisingCoin/PromisingCard";

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

export default function PromisingList({ crypto, crypto_fliter }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          backgroundColor: "#3C1A7D",
          width: "calc(100vw - (100vw - 100%))",
          height: "20em",
        }}
      ></div>
      <MainContainer maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
                variant="h4"
                sx={{ color: "white", marginBottom: "1rem" }}
              >
                유망 코인
              </Typography>
              <Typography variant="body1" sx={{ color: "lightgrey" }}>
                Mosaic이 발굴한 유망 코인을 만나보세요!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              유망코인 리스트
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacting={1}>
              {crypto !== null &&
                crypto.map(
                  (content, index) =>
                    content.promising === true && (
                      <Grid
                        item
                        xs={12}
                        md={5}
                        lg={4}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <PromisingCard crypto={content} key={index} />
                      </Grid>
                    )
                )}
            </Grid>
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
}
