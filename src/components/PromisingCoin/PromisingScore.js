import React from "react";
import { Grid, Tooltip, IconButton, LinearProgress } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function PromisingScore({ type, score1, score2, score3 }) {
  let criteria1 = ""
  let criteria2 = ""
  let criteria3 = ""
  let total1 = 0
  let total2 = 0
  let total3 = 0
  let desc1 = ""
  let desc2 = ""
  let desc3 = ""

  if (type === "coin") {
    criteria1 = "확장성";
    criteria2 = "탈중앙성";
    criteria3 = "보안성";
    total1 = 35;
    total2 = 35;
    total3 = 30;
    desc1 = "사용자 수와 거래건수가 늘어나도 유연하게 대응할 수 있는가를 파악";
    desc2 = "중앙집중화를 벗어나 분산된 소규모 단위로 자율적으로 운영되는 정도";
    desc3 = "블록체인 내의 데이터를 권한이 없는 이용자가 사용할 수 없도록 하는지를 파악";
  } else {
    criteria1 = "사업성";
    criteria2 = "기술성";
    criteria3 = "신뢰성";
    total1 = 40;
    total2 = 20;
    total3 = 40;
    desc1 = "사용자 수와 거래건수가 늘어나도 유연하게 대응할 수 있는가를 파악";
    desc2 = "중앙집중화를 벗어나 분산된 소규모 단위로 자율적으로 운영되는 정도";
    desc3 = "블록체인 내의 데이터를 권한이 없는 이용자가 사용할 수 없도록 하는지를 파악";
  }

  return (
    <Grid
      item
      xs={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <>{criteria1}</>
          <Tooltip
            title={desc1}
            disableInteractive
          >
            <IconButton>
              <HelpOutlineIcon sx={{ fontSize: "medium" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={7}>
          <LinearProgress
            variant="determinate"
            value={(score1 / total1) * 100}
            sx={{ borderRadius: "100px", height: "1.5em" }}
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "end" }}>
          {score1}/{total1}
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={3}>
          <>{criteria2}</>
          <Tooltip
            title={desc2}
            disableInteractive
          >
            <IconButton>
              <HelpOutlineIcon sx={{ fontSize: "medium" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={7}>
          <LinearProgress
            variant="determinate"
            value={(score2 / total2) * 100}
            sx={{ borderRadius: "100px", height: "1.5em" }}
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "end" }}>
          {score2}/{total2}
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={3}>
          <>{criteria3}</>
          <Tooltip
            title={desc3}
            disableInteractive
          >
            <IconButton>
              <HelpOutlineIcon sx={{ fontSize: "medium" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={7}>
          <LinearProgress
            variant="determinate"
            value={(score3 / total3) * 100}
            sx={{ borderRadius: "100px", height: "1.5em" }}
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: "end" }}>
          {score3}/{total3}
        </Grid>
      </Grid>
    </Grid>
  );
}
