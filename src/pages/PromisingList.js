import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PromisingCard from "../components/PromisingCoin/PromisingCard";

export default function PromisingList({ crypto }) {
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
          <Grid container spacting={1}>
            {crypto !== null &&
              crypto.map(
                (content) =>
                  content.promising === true && <PromisingCard crypto={content} />
              )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
