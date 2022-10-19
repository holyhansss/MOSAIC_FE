import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { Typography, Grid } from "@mui/material";

// 공포탐욕지수
function FearandGreed() {
  const [FearNGreed, setFearNGreed] = useState([]);
  const [FnGState, setFnGState] = useState([]);
  const [FnGIcon, setFnGIcon] = useState([]);
  const [desc, setDesc] = useState([]);
  const getFeerNGreed = async () => {
    const response = await axios.get("https://api.alternative.me/fng/");
    setFearNGreed(response.data.data[0].value);
    if (response.data.data[0].value_classification === "Extreme Fear") {
      setFnGState("매우 공포");
      setFnGIcon("https://img.icons8.com/emoji/48/000000/confounded-face.png");
      setDesc([
        "시장 참여자들의 매수에 대한 관심이 매우 떨어진 상태를 의미합니다.",
        "극심한 공포로 인해 과도하게 매도하여, 자산 가격이 급격하게 떨어집니다.",
        "과도한 하락이 일어나면서 시장의 변동성 또한 증가합니다.",
      ]);
    } else if (response.data.data[0].value_classification === "Fear") {
      setFnGState("공포");
      setFnGIcon(
        "https://img.icons8.com/emoji/48/000000/face-with-raised-eyebrow.png"
      );
      setDesc(
        "시장 참여자들이 자산 하락의 두려움으로 인해 시장에서 빠져나오면서 연쇄적으로 가격 하락이 일어납니다.",
        "참여자들이 자산을 시장에 매도하여 거래량은 증가하고 자산 가격은 떨어지게 됩니다."
      );
    } else if (response.data.data[0].value_classification === "Neutral") {
      setFnGState("중립");
      setFnGIcon(
        "https://img.icons8.com/emoji/48/000000/face-without-mouth.png"
      );
      setDesc(
        "시장 참여자들이 저항과 지지를 동시에 받고 있음을 의미합니다.",
        "심리적인 요소가 크게 작용하며, 단기간 자산 가격 움직임의 향방을 알 수 없는 국면입니다."
      );
    } else if (response.data.data[0].value_classification === "Greed") {
      setFnGState("탐욕");
      setFnGIcon("https://img.icons8.com/emoji/48/000000/woozy-face.png");
      setDesc(
        "시장 참여자들의 매수에 대한 관심이 일정 수준 증가한 상태를 의미합니다.",
        "거래량과 자산 가격이 증가할 여지가 있으며, 단기 차익을 노린 투자자들이 시장에 참여하기 시작합니다."
      );
    } else if (response.data.data[0].value_classification === "Extreme Greed") {
      setFnGState("매우 탐욕");
      setFnGIcon("https://img.icons8.com/emoji/48/000000/money-mouth-face.png");
      setDesc(
        "시장 참여자들의 매수에 대한 관심이 매우 증가한 상태를 의미합니다.",
        "거래량과 자산 가격이 급격히 증가할 수 있으며, 단기 차익을 노린 투자자들이 시장에 매우 적극적으로 참여하면서 시장의 변동성 또한 증가합니다."
      );
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
          segmentColors={[
            "#DBDFFD",
            "#9BA3EB",
            "#646FD4",
            "#242F9B",
            "#210B61",
          ]}
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
        <img src={FnGIcon} alt="Fear and Greed" />
        {desc && desc.map((d, idx) => <Typography key={idx}>{d}</Typography>)}
      </Grid>
    </Grid>
  );
}
export default FearandGreed;
