import React from "react";
import {
  Grid,
  Tooltip,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function PromisingScore({
  type,
  score1,
  score2,
  score3,
  score4,
}) {
  let criteria1 = "";
  let criteria2 = "";
  let criteria3 = "";
  let criteria4 = "";
  let total1 = 0;
  let total2 = 0;
  let total3 = 0;
  let total4 = 0;
  let desc1 = "";
  let desc2 = "";
  let desc3 = "";
  let desc4 = "";

  if (type === "coin") {
    criteria1 = "확장성";
    criteria2 = "탈중앙성";
    criteria3 = "보안성";
    criteria4 = "기타";
    total1 = 25;
    total2 = 25;
    total3 = 25;
    desc1 = "사용자 수와 거래건수가 늘어나도 유연하게 대응할 수 있는가를 파악";
    desc2 = "중앙집중화를 벗어나 분산된 소규모 단위로 자율적으로 운영되는 정도";
    desc3 =
      "블록체인 내의 데이터를 권한이 없는 이용자가 사용할 수 없도록 하는지를 파악";
    desc4 =
      "해당 코인의 토큰 활성화 수준을 통한 사용성과 기관 투자유치 횟수와 규모를 파악";
  } else {
    criteria1 = "사업성";
    criteria2 = "기술성";
    criteria3 = "신뢰성";
    total1 = 40;
    total2 = 20;
    total3 = 40;
    desc1 =
      "기존에 존재하는 토큰과의 차별성 및 시장성, 상품성을 분석하여 성장 가능성과 지속성을 평가";
    desc2 =
      "토큰이 기술적 결함이 있는지 확인하는 절차로, Auditing 이력과 지원하는 블록체인을 평가";
    desc3 =
      "토큰이 유저가 신뢰하고 사용 할 수 있는지를 검증하기 위해 탈중앙성과 Developer team을 평가";
  }

  return (
    <>
      {type === "coin" ? (
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
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5">
              {score1 + score2 + score3 + score4}
            </Typography>
          </Grid>
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
              <Tooltip title={desc1} disableInteractive>
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
              {score1} / {total1}
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{criteria2}</>
              <Tooltip title={desc2} disableInteractive>
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
              {score2} / {total2}
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{criteria3}</>
              <Tooltip title={desc3} disableInteractive>
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
              {score3} / {total3}
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{criteria4}</>
              <Tooltip title={desc4} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score4 / total3) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
              {score4} / {total1}
            </Grid>
          </Grid>
        </Grid>
      ) : (
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
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {score1 + score2 + score3} / 100
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={2.5}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <>{criteria1}</>
              <Tooltip title={desc1} disableInteractive>
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
            <Grid item xs={2.5} sx={{ textAlign: "end" }}>
              {score1} / {total1}
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={2.5}>
              <>{criteria2}</>
              <Tooltip title={desc2} disableInteractive>
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
            <Grid item xs={2.5} sx={{ textAlign: "end" }}>
              {score2} / {total2}
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={2.5}>
              <>{criteria3}</>
              <Tooltip title={desc3} disableInteractive>
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
            <Grid item xs={2.5} sx={{ textAlign: "end" }}>
              {score3} / {total3}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
