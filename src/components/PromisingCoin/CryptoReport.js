import React, { useRef, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  LinearProgress,
} from "@mui/material";
import styled from "styled-components";
import grade from "../../img/Grade.jpg";
import logo from "../../img/Ethereum_logo.png";

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
function CryptoReport() {
  return (
    <MainContainer maxWidth="md" disableGutters="true">
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            spacing={3}
            justifyContent="center"
            sx={{ margin: "2rem 0" }}
          >
            <Typography
              variant="h4"
              align="left"
              gutterBottom
              sx={{ fontWeight: "bold", m: 1 }}
            >
              이더리움 ETH
            </Typography>
            <img src={logo} alt="logo" width={30} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <img src={grade} alt="Pomising Coin Grade" width="100%"></img>
        </Grid>
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
            spacing={1}
            justifyContent="space-between"
          >
            <Grid item xs={2}>
              보안성
            </Grid>
            <Grid item xs={8} sx={{ textAlign: "center" }}>
              <LinearProgress
                variant="determinate"
                value={96}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "end" }}>
              96
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            spacing={1}
            justifyContent="space-between"
          >
            <Grid item xs={2}>
              확장성
            </Grid>
            <Grid item xs={8} sx={{ textAlign: "center" }}>
              <LinearProgress
                variant="determinate"
                value={86}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "end" }}>
              86
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            spacing={1}
            justifyContent="space-between"
          >
            <Grid item xs={2}>
              탈중앙성
            </Grid>
            <Grid item xs={8} sx={{ textAlign: "center" }}>
              <LinearProgress
                variant="determinate"
                value={90}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={1} sx={{ textAlign: "end" }}>
              90
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            align="left"
            gutterBottom
            component="div"
            sx={{ lineHeight: 2, letterSpacing: 0.25 }}
          >
            오픈소스 기반의 이더리움은 디앱(dApps) 구동을 지원하는 분산 컴퓨팅
            플랫폼입니다. 스마트 컨트랙트(Smart Contract) 플랫폼이라는 개념을
            선도한 이더리움은 디앱들의 자체 실행을 가능하게 해주는 컨트랙트를
            블록체인 위에 적용하였습니다. 이러한 개별 컨트랙트는 자체 토큰도
            보관할 수 있습니다. 즉, 이더리움 네트워크에는 네이티브 가상자산인
            이더리움(ETH)뿐만 아니라 애플리케이션별 토큰이 존재할 수 있습니다.
            이더리움 디앱 개발자와 사용자는 이더리움 네트워크에 구동 가능한
            디앱을 사용하거나 작동하기 위해서는 수수료 개념의 가스(Gas)를
            네트워크에 지불해야 합니다.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              paddingTop: 2,
            }}
          />
          <Typography
            variant="h5"
            align="left"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            선정 이유
          </Typography>
          <Box
            sx={{
              paddingTop: 3,
            }}
          />
          <Typography
            variant="body1"
            align="left"
            gutterBottom
            component="div"
            sx={{ lineHeight: 2, letterSpacing: 0.25 }}
          >
            오픈소스 기반의 이더리움은 디앱(dApps) 구동을 지원하는 분산 컴퓨팅
            플랫폼입니다. 스마트 컨트랙트(Smart Contract) 플랫폼이라는 개념을
            선도한 이더리움은 디앱들의 자체 실행을 가능하게 해주는 컨트랙트를
            블록체인 위에 적용하였습니다. 이러한 개별 컨트랙트는 자체 토큰도
            보관할 수 있습니다. 즉, 이더리움 네트워크에는 네이티브 가상자산인
            이더리움(ETH)뿐만 아니라 애플리케이션별 토큰이 존재할 수 있습니다.
            이더리움 디앱 개발자와 사용자는 이더리움 네트워크에 구동 가능한
            디앱을 사용하거나 작동하기 위해서는 수수료 개념의 가스(Gas)를
            네트워크에 지불해야 합니다.
          </Typography>
          <Box
            sx={{
              paddingTop: 3,
            }}
          />
        </Grid>
      </Grid>
    </MainContainer>
  );
}

export default CryptoReport;
