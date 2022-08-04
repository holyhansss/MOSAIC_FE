import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Typography, Box, Grid, Container } from "@mui/material";
import styled from "styled-components";

//style
const StyleBox = styled(Box)`
background: linear-gradient(-45deg, #0b062d 5%, #230b65 90%);
border-radius: 10px;
`;

//공포탐욕지수
function FearandGreed() {
  const [FearNGreed, setFearNGreed] = useState([]);
  const [FnGState, setFnGState] = useState([]);
  const getFeerNGreed = async () => {
    const response = await axios.get("https://api.alternative.me/fng/");
    setFearNGreed(response.data.data[0].value);
    setFnGState(response.data.data[0].value_classification);
  };
  useEffect(() => {
    getFeerNGreed();
  }, []);


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <StyleBox sx={{ paddingTop: "10%", paddingLeft: "12%", flexGrow: 1 }}>
          <ReactSpeedometer
            needleColor="grey"
            textColor="white"
            width={300}
            height={270}
            needleTransition="easeBounceInOut"
            minValue={0}
            maxValue={100}
            customSegmentStops={[0, 24, 50, 75, 100]}
            segmentColors={["#DBDFFD", "#9BA3EB", "#646FD4", "#242F9B"]}
            value={Number(FearNGreed)}
          />
        </StyleBox>
        <Box sx={{ paddingRight: "7%" }}></Box>

        <StyleBox sx={{ paddingTop: "20%", paddingLeft: "12%", flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            {FnGState}
          </Typography>
        </StyleBox>
      </Box>
    </>
  );
}
export default FearandGreed;
