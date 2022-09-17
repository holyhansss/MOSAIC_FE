import React from "react";
import { Box, Container,Grid,Typography, } from "@mui/material";
import styled from "styled-components";
import { grey } from "@mui/material/colors";

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
    <MainContainer maxWidth="lg">
      <Grid container direction="row" spacing ={3}>
      <Grid item xs={12}>
        <Box sx={{ paddingTop: 2,}}/>
          <Typography
            variant="h5"
            align="left"
            gutterBottom
          >
            MOSAIC Ranking
          </Typography>
          <Box sx={{ paddingTop: 2,}}/>
          <Typography
            variant="body1"
            align="left"
            gutterBottom
          >
            [설명]
          </Typography>
        </Grid>
        <Grid item xs={12}><CryptoTable/></Grid>
      </Grid>
    </MainContainer>
    
  );
}
