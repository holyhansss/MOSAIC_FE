import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Typography, Grid } from "@mui/material";

//공포탐욕지수
function FearandGreed() {
  const [FearNGreed, setFearNGreed] = useState([]);
  const [FnGState, setFnGState] = useState([]);
  const [FnGIcon, setFnGIcon] = useState([]);
  const getFeerNGreed = async () => {
    const response = await axios.get("https://api.alternative.me/fng/");
    setFearNGreed(response.data.data[0].value);
    if (response.data.data[0].value_classification === "Extreme Fear") {
      setFnGState("매우 공포");
      setFnGIcon("https://img.icons8.com/emoji/48/000000/confounded-face.png");
    } else if (response.data.data[0].value_classification === "Fear") {
      setFnGState("공포");
      setFnGIcon("https://img.icons8.com/emoji/48/000000/face-with-raised-eyebrow.png");
    } else if (response.data.data[0].value_classification === "Neutral") {
      setFnGState("중립");
      setFnGIcon("https://img.icons8.com/emoji/48/000000/face-without-mouth.png");
    } else if (response.data.data[0].value_classification === "Greed") {
      setFnGState("탐욕");
      setFnGIcon("https://img.icons8.com/emoji/48/000000/woozy-face.png");
    } else if (response.data.data[0].value_classification === "Extreme Greed") {
      setFnGState("매우 탐욕");
      setFnGIcon("https://img.icons8.com/emoji/48/000000/money-mouth-face.png");
    }
  };
  useEffect(() => {
    getFeerNGreed();
  }, []);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid
        item
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ReactSpeedometer
          needleColor="grey"
          paddingVertical={50}
          paddingHorizontal={30}
          width={300}
          height={250}
          needleTransition="easeBounceInOut"
          minValue={0}
          maxValue={100}
          customSegmentStops={[0, 25, 46, 54, 75, 100]}
          segmentColors={["#DBDFFD", "#9BA3EB", "#646FD4", "#242F9B", "#210B61"]}
          value={Number(FearNGreed)}
        />
      </Grid>
      <Grid
        item
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {FnGState}
        </Typography>
        <img src={FnGIcon} alt="Fear and Greed"/>
        <Typography>[설명]</Typography>
      </Grid>
    </Grid>
  );
}
export default FearandGreed;
