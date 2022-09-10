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
                    <Typography variant="subtitle2" sx={{ textAlign: 'right' }} >평가일. 2022. 09. 05
                    </Typography>
                </Typography>
              </Grid>

                <Grid item xs={9} container spacing={3}>
                    <Typography variant="subtitle2" component="div">스마트 컨트랙트(Smart Contracts) 기능을 구현하는 분산 컴퓨팅 플랫폼
                    </Typography>   
                    <p>오픈소스 기반의 이더리움은 디앱(dApps) 구동을 지원하는 분산 컴퓨팅 플랫폼입니다. 스마트 컨트랙트(Smart Contract) 플랫폼이라는 개념을 선도한 이더리움은 디앱들의 자체 실행을 가능하게 해주는 컨트랙트를 블록체인 위에 적용하였습니다. 이러한 개별 컨트랙트는 자체 토큰도 보관할 수 있습니다. 즉, 이더리움 네트워크에는 네이티브 가상자산인 이더리움(ETH)뿐만 아니라 애플리케이션별 토큰이 존재할 수 있습니다. 이더리움 디앱 개발자와 사용자는 이더리움 네트워크에 구동 가능한 디앱을 사용하거나 작동하기 위해서는 수수료 개념의 가스(Gas)를 네트워크에 지불해야 합니다.</p>  
                    <img src={Chart} alt="Chart" width={400}></img>
                    <Grid item xs={4} >    
                    
                      <Typography variant="h4" component="div">점수 요약</Typography>
                        <Typography variant="h8" component="div">기술: 78점</Typography>
                        <Typography variant="h8" component="div">토큰 이코노믹스: 88점</Typography>
                        <Typography variant="h8" component="div">마일스톤 및 평가: 56점</Typography>
                        <Typography variant="h8" component="div">예상 재무 지속성: 90점</Typography>
                        <Typography variant="h8" component="div">커뮤니티: 35점</Typography>
                        <Typography variant="h8" component="div">질적평가 42점</Typography>              
                    </Grid>
                    <Grid >
                      <Typography variant="h5" component="div" >
                            최근 이슈 
                        </Typography>
                        <Typography> 이더리움 머지 업그레이드 임박…요동치는 코인 시장</Typography>
                        <Typography> 코인게코 보고서 "이더리움 머지, 싱가포르가 제일 관심도 높아</Typography>
                        <Typography> 비트코인 시세 10% 이상 폭등, 이더리움,솔라리움 배경은? </Typography>
                    </Grid>
                    <Grid >
                      <Typography variant="h5" component="div" >
                           MOSAIC 스코어 
                        </Typography>
                        <StyleBox>
                          <img src={Score} alt="Score" width={600}></img>
                          <Typography variant="h6"> 기술</Typography>
                          <Typography variant="body1"> PoW에서 PoS로의 최초 합의 알고리즘 전환을 꾀하는 프로젝트</Typography>
                        </StyleBox>
                        <Typography> - 채굴 방식의 PoW 방식은 낮은 처리속도와 이로 인한 확장성 한계, 막대한 전력 소모 등의 한계점을 지니고 있음</Typography>
                        <Typography> - 스마트 컨트랙트 플랫폼으로써 지속적인 경쟁력을 갖기 위해 프로젝트 런칭 초기부터 PoS 전환을 목표로 하였으며, 2022년은 이더리움 2.0의 원년이 될 것으로 기대</Typography>
                        <Typography> - 2022년 이후 이더리움 2.0 로드맵 및 마일스톤 달성 시 기대되는 TPS 수준</Typography>
                        <Typography> - 2020년 12월, 합의 레이어인 비콘체인 제네시스 런칭: PoS 알고리즘인 캐스퍼를 탑재한 합의 레이어로, 향후 트랜잭션을 처리하는 샤드체인과 결합하여 확장성이 뛰어난 모듈형 블록체인으로 거듭날 예정</Typography>
                    </Grid>
                    <Grid >
                        <Typography variant="h5" component="div" >
                            MOSAIC 평가 기준
                        </Typography>
                        
                        <Typography>
                        <p> MOSAIC에서는 가상자산을 기반으로 하는 사업 모델과 실질적인 활용도에 대해 다각화 된 분석을 통한 평가결과를 제공합니다. 가상자산 시장은 아직 산업의 초기 단계에 있어, 투자자 보호를 위한 충분한 정보나 제도가 마련되어 있지 않습니다. 그럼에도 불구하고 높은 성장성이 기대되는 가상자산 시장에서 투명한 정보 제공과 깊이 있는 분석을 투자위험에 대한 불확실성을 낮추고 의사결정 과정에서 소요되는 비용과 시간을 절약할 수 있는 가치를 투자자분들께 제공하고자 이와 같은 평가 서비스를 운영하고 있습니다. </p>
                        <p> MOSAIC의 가상자산 평가는 다음과 같이 1)기술, 2) 토큰 이코노믹스, 3) 마일스톤 및 성과, 4) 예상 재무 지속성, 5) 커뮤니티 및 6) 정성 평가의 총 6개 부문으로 나누어 평가를 진행하고 있으며, 각 부문별 혹은 세부항목별 점수의 비중을 달리하고 있습니다. 이에 대한 결과는 0점부터 100점까지의 정량적인 점수와 이를 바탕으로 AAA부터 D까지 18개의 일정한 등급으로 기호화하였으며, 투자자들이 가상자산 투자의 위험 수준에 대한 정보를 쉽고, 직관적으로 얻을 수 있게 하였습니다. </p>
                        <p> 점수 및 등급에 대한 자세한 내용은 아래를 참고해주시기 바랍니다.</p>
                        <img src="https://d1kkf5jqktb75.cloudfront.net/images/content/common/211202-4b2d2c6c-df7a-4336-a266-ce88a0010684.png" alt="평가기준" width={600}></img>
                        </Typography>
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