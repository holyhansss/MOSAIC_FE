import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled, {keyframes} from "styled-components";
import moment from "moment";

//components
import {
  Reportrecentcard,
} from "../components/Report/Reportlistcard.js";
import MainSNPCMC from "../components/LineGraph/MainLineGraph1d";
import MainCategoryLineGraph from "../components/CategoryLineGraph/MainCategoryLineGraph.js"

// Style
const theme = createTheme({
  components: {
    MuiToggleButton: {
      selected: {
        disable: 'true'
      },
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#fff",
            fontWeight: 'bold',
            backgroundColor: "rgba(0,0,0,0)",
          },
        },
      },
    },
  },
});

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

const StyleBox = styled(Box)`
  background: linear-gradient(-45deg, #0b062d 5%, #230b65 90%);
  border-radius: 10px;
`;

const move = keyframes`
  0% {
    margin-left: 100%;
    width: 300%
  }

  100% {
    margin-left: 0%;
    width: 100%;
  }
`;

const SildeBox = styled(Box)`
  animation: ${move} 10s linear infinite;
`;

const scale = keyframes`
  0% {
      opacity: 0;
      transform: translateY(80%);
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`

const WelcomText = styled(Typography)`
  animation:2s ${scale} ease-out;
  `



const MainPage = ({result}) => {
  return (
    <MainContainer maxWidth="md">
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex"}}>
            <Box
              sx={{
                maxHeight: "10px",
                width: 1/5
              }}>
                <Typography variant="caption" >
                  Mosaic 공지
                </Typography>
            </Box>
            <Box
              sx={{
                maxHeight: "10px",
                width: 4/5
              }}>
                <SildeBox>
                  <Typography variant="caption" >
                    매주 새로운 모자익 리포트를 확인하세요!
                  </Typography>
                </SildeBox>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{paddingTop: 5}}/>
        </Grid>
        <Grid item xs={12}>
          <WelcomText variant="h3" >
            Welcome Mosaic
          </WelcomText>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{paddingTop: 5}}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom component="div">
            모자익 위클리 리서치
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div>
            {result !== undefined ? (
              <Reportrecentcard
                id={result.id}
                title={result.title}
                writer={result.writer}
                date={moment(result.date).format("YYYY.MM.DD")}
              />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom component="div">
              시장 동향
            </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex"}}>
            <StyleBox 
              sx={{
                height: 180,
                width: 2/5,
                borderRadius: "10px",
                color: "white",
                boxShadow: 3
              }}
              >
              <MainSNPCMC/>
            </StyleBox>
            <Box 
              sx={{
                height: 180,
                width: 1/5,
              }}
              >
            </Box>
            <StyleBox 
              sx={{
                height: 180,
                width: 2/5,
                borderRadius: "10px",
                color: "white",
                boxShadow: 3
              }}
              >
              <MainCategoryLineGraph/>
            </StyleBox>
          </Box>
        </Grid>
        <Grid item xs={12}> 
          <Typography variant="h5" gutterBottom component="div">
              발굴 코인
            </Typography>
        </Grid>
        <Grid item xs={12}>
          <StyleBox
            sx={{
              height: 500,
              width:1,
              borderRadius: "20px",
              color: "white",
              boxShadow: 3
            }}>
            발굴 코인 내용
          </StyleBox>
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default MainPage;
// 1. 주간 이슈: 뉴스 헤드라인 식으로 한줄로 작성
// <거시 경제>
// <크립토 규제/정책>
// <크립토 이슈>
// 2. 각 헤드라인별 부가 설명: 각 이슈별로 부가적인 설명
// 3. Winner & loser (금융자산별 비교 & 섹터별 비교)
// 4. 인사이트: 다음주, 내지는 앞으로 주목해야 할 부분들 설명
