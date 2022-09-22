import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import Marquee from "react-fast-marquee";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
// Components
import { Reportlistcard } from "../components/Report/Reportlistcard.js";
// Images
import RankingImage from "../img/MainPage/001.jpg";
import RatingImage from "../img/MainPage/002.jpg";
import MarketImage from "../img/MainPage/003.jpg";
import Sample from "../img/logo_mosaic.jpg";
import cardimage001 from "../img/PromisingCoins/001.jpg";
import cardimage002 from "../img/PromisingCoins/002.jpg";
import cardimage003 from "../img/PromisingCoins/003.jpg";

// Style
const theme = createTheme({
  components: {
    MuiToggleButton: {
      selected: {
        disable: "true",
      },
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#fff",
            fontWeight: "bold",
            backgroundColor: "rgba(0,0,0,0)",
          },
        },
      },
    },
  },
});

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
`;

const WelcomText = styled(Typography)`
  animation: 2s ${scale} ease-out;
`;

const MainPage = ({ result }) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "calc(100vw - (100vw - 100%))",
          height: "40em",
        }}
      >
        <Carousel>
          <Carousel.Item>
            <Link to="/ranking">
              <img
                className="d-block w-100"
                src={RankingImage}
                alt="Ranking slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/promising">
              <img
                className="d-block w-100"
                src={RatingImage}
                alt="Rating slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="market">
              <img
                className="d-block w-100"
                src={MarketImage}
                alt="Market slide"
              />
            </Link>
          </Carousel.Item>
        </Carousel>
      </div>
      <Grid container spacing={10} justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ height: "26em" }} />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ margin: "5rem 0", lineHeight: 2 }}>
            <div>
              MOSAIC은{" "}
              <span style={{ fontWeight: 900 }}>건전한 암호화폐 투자</span>를
              선도하기 위해
            </div>
            <div>다음과 같은 서비스를 제공합니다.</div>
          </Typography>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4}>
              <img src={Sample} alt="Image" width={150} />
              <Typography variant="h6" sx={{ margin: "1rem 0" }}>
                암호화폐 등급 평가
              </Typography>
              <Typography sx={{ color: "#7F8487" }}>
                암호화폐가 지닌 내재가치를
                <br />
                상세한 기준에 의거하여 평가한 등급을 통해
                <br />각 암호화폐의 강약점을 파악할 수 있습니다.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <img src={Sample} alt="Image" width={150} />
              <Typography variant="h6" sx={{ margin: "1rem 0" }}>
                펀드 상품
              </Typography>
              <Typography sx={{ color: "#7F8487" }}>
                정보 제공을 넘어서 자체적인 투자 철학을 기반으로
                <br />
                펀드를 운용합니다. 투자자는 자신의 성향과
                <br />
                위험선호도에 따라 펀드에 투자할 수 있습니다.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <img src={Sample} alt="Image" width={150} />
              <Typography variant="h6" sx={{ margin: "1rem 0" }}>
                경제 지표 & 리포트 제공
              </Typography>
              <Typography sx={{ color: "#7F8487" }}>
                암호화폐 시장의 현황을 알 수 있도록
                <br />
                공포탐욕지수, 섹터별 인덱스, 벤치마크(주식, 원자재)
                <br />
                등의 거시적 지표와 일간, 주간 리포트를 제공합니다.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Divider component="div" role="presentation">
            <Typography variant="h5" sx={{ margin: "3.5rem", fontWeight: 900 }}>
              최신 리포트
            </Typography>
          </Divider>
          <div>
            {result !== undefined
              ? result.slice(1).map((report, index) => (
                  <div key={index}>
                    <Reportlistcard
                      id={report.id}
                      title={report.title}
                      date={moment(report.date).format("YYYY.MM.DD")}
                      writer={report.writer}
                    />
                  </div>
                ))
              : null}
          </div>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Divider component="div" role="presentation">
            <Typography variant="h5" sx={{ margin: "3.5rem", fontWeight: 900 }}>
              최신 유망 코인
            </Typography>
          </Divider>
          <Grid container direction="row" spacing={5} justifyContent="center">
            <Grid item xs="auto">
              <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={cardimage001}
                  alt="Cryptoimage"
                />
              </Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  이더리움
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  #이더리움 #기술성
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs="auto">
              <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={cardimage002}
                  alt="Cryptoimage"
                />
              </Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tezos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  #Tezos #기술성
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs="auto">
              <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={cardimage003}
                  alt="Cryptoimage"
                />
              </Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lida Dao
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  #Lida Dao #이더리움 #기술성
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: "5rem" }} />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
