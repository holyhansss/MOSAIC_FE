import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import styled from "styled-components";
import grade from "../../img/AA+.jpg";
import logo from "../../img/Ethereum_logo.png";

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

function CryptoReport() {
  return (
    <MainContainer maxWidth="md" disableGutters="true">
      <Grid container direction="row" spacing={5}>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", m: 1 }}
            >
              이더리움 ETH
            </Typography>
            <img src={logo} alt="logo" width={30} />
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              #PoS #Smart Contract Platform #L2
            </Typography>
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
              <>보안성</>
              <Tooltip
                title="블록체인 내의 데이터를 권한이 없는 이용자가 사용할 수 없도록 하는지를 파악"
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
                value={(26 / 30) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
              26/30
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>확장성</>
              <Tooltip
                title="사용자 수와 거래건수가 늘어나도 유연하게 대응할 수 있는가를 파악"
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
                value={(14 / 35) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
              14/35
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>탈중앙성</>
              <Tooltip
                title="중앙집중화를 벗어나 분산된 소규모 단위로 자율적으로 운영되는 정도"
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
                value={(27 / 35) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
              27/35
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
