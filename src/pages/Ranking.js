import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import CryptoTable from "../components/PromisingCoin/CryptoTable";

const StyleBox = styled(Box)`
  background: linear-gradient(-45deg, #1a1a40 5%, #270082 90%);
  border-radius: 10px;
`;
var x = document.getElementById("grade");
const Styleli = styled.li`
  color: white;
`;
const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

export default function Ranking() {
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
      <MainContainer maxWidth="lg">
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ height: "20em" }} />
          </Grid>
          <Grid item xs={12}>
            <CryptoTable />
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
}
