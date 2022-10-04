import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import CryptoCard from "../components/PromisingCoin/CryptoList";

const PromisingCoins = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          backgroundColor: "rgba(0,0,0,0.1)",
          width: "calc(100vw - (100vw - 100%))",
          height: "20em",
        }}
      ></div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ height: "20em" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            유망코인 리스트
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CryptoCard />
        </Grid>
      </Grid>
      {/* <CryptoReport /> */}
    </>
  );
};
export default PromisingCoins;
