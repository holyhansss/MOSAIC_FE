import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled, {keyframes} from "styled-components";
import moment from "moment";
import Marquee from "react-fast-marquee";
import { func } from "prop-types";

//img
import Ranking from '../img/Ranking.jpg';
import Chart from '../img/Chart.jpg';
import Score from '../img/Score.jpg';


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
  border-radius: 5px;
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


const PromisingCoins = () => {
    return (
        <MainContainer maxWidth="md">
        <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom component="div">
                  유망 코인
              </Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h5" component="div" >
                    이더리움 ETH 
                    <ToggleButton sx={{ color: "red" }} >
                    S</ToggleButton>
                    <Typography variant="subtitle2" sx={{ textAlign: 'right' }} >ratedate. 2022. 09. 05"
                    </Typography>
                </Typography>
              </Grid>

                <Grid item xs={9} container spacing={3}>
                    <Typography variant="subtitle2" component="div">스마트 컨트랙트(Smart Contracts) 기능을 구현하는 분산 컴퓨팅 플랫폼
                    </Typography>   
                    <p>오픈소스 기반의 이더리움은 디앱(dApps) 구동을 지원하는 분산 컴퓨팅 플랫폼입니다. 스마트 컨트랙트(Smart Contract) 플랫폼이라는 개념을 선도한 이더리움은 디앱들의 자체 실행을 가능하게 해주는 컨트랙트를 블록체인 위에 적용하였습니다. 이러한 개별 컨트랙트는 자체 토큰도 보관할 수 있습니다. 즉, 이더리움 네트워크에는 네이티브 가상자산인 이더리움(ETH)뿐만 아니라 애플리케이션별 토큰이 존재할 수 있습니다. 이더리움 디앱 개발자와 사용자는 이더리움 네트워크에 구동 가능한 디앱을 사용하거나 작동하기 위해서는 수수료 개념의 가스(Gas)를 네트워크에 지불해야 합니다.</p>  
                    <img src={Chart} alt="Chart" width={400}></img>
                    <Grid item xs={4} >    
                    <StyleBox>
                      <Typography variant="h5" component="div">점수 요약</Typography>
                        <Typography variant="h6" component="div">기술: 30점</Typography>
                        <Typography variant="h6" component="div">성과: 20점</Typography>
                        <Typography variant="h6" component="div">질적 평가: 30점</Typography>
                        <Typography variant="h6" component="div">커뮤니티:10점</Typography>
                      </StyleBox>                
                        
                    </Grid>
                    <Grid item xs={9} >
                      <Typography variant="h5" component="div" >
                            최근 이슈 
                        </Typography>
                        <StyleBox>
                        
                        <p> 1. 이더리움 관련 기사 링크인</p>
                        <p> 2. 이더리움 관련 기사 링크인</p>
                        <p> 3. 이더리움 관련 기사 링크인.</p>
                        </StyleBox>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="h5" component="div" >
                           MOSAIC 스코어 
                        </Typography>
                        <StyleBox>
                          <img src={Score} alt="Score" width={600}></img>
                          <p> 1. 기술</p>
                          <p> 2. 성과</p>
                          <p> 3. 질적평가</p>
                          <p> 4. 커뮤니티</p>
                        </StyleBox>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h5" component="div" >
                            MOSAIC 평가 기준
                        </Typography>
                        <StyleBox>
                        <p> 1. 이더리움은 거대주다.</p>
                        <p> 2. 이더리움의 행보가 곧 암호화페의 행보다.</p>
                        <p> 3. 이런 식으로 정보를 제공한다.</p>
                        <img src="https://d1kkf5jqktb75.cloudfront.net/images/content/common/211202-4b2d2c6c-df7a-4336-a266-ce88a0010684.png" alt="평가기준" width={600}></img>
                        </StyleBox>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h5" component="div" >
                            주의사항
                        </Typography>
                        <StyleBox>
                        <p> 모자익 등급 평가는 투자자의 개인 선택의 책임을 지지 않습니다. 투자에 대해 결정은 투자자의 몫입니다.</p>
                        </StyleBox>
                    </Grid>
            </Grid>
            
            <Grid item xs={3} >
                <Typography variant="h6" component="div">
                    MOSAIC 등급
                    
                </Typography>
                <ThemeProvider theme={theme}>
                <ToggleButtonGroup
                size="large"
                exclusive
                color="primary"
                >
                <ToggleButton sx={{ color: "gray" }} value="S">
                    S
                </ToggleButton>
                <ToggleButton sx={{ color: "gray" }} value="A">
                    A
                </ToggleButton>
                <ToggleButton sx={{ color: "gray" }} value="F">
                    F
                </ToggleButton>
                </ToggleButtonGroup>
                <img src={Ranking} alt="Ranking"></img>
            </ThemeProvider>
            </Grid>
        </Grid>
        
      </MainContainer>
    );
  };
export default PromisingCoins;