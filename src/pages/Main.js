import React from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
// Components
import {
  ReportrecentcardDetail,
  ReportlistForm,
} from "../components/Report/Reportlistcard.js";
import CryptoCard from "../components/PromisingCoin/CryptoCard";
// Images
import Sample from "../img/logo_mosaic.jpg";

// Style
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

const MainPage = ({ result, reports, crypto }) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "4rem",
          width: "calc(100vw - (100vw - 100%))",
          maxHeight: "10rem",
        }}
      >
        <Carousel>
          <Carousel.Item
            style={{ backgroundColor: "#BA6BC6", textAlign: "center" }}
          >
            <Link to="/ranking">
              <img
                className="mw-100 w-auto"
                src="https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/banner%2FRanking.jpg?alt=media&token=f3d66167-c25a-4417-809b-16a8b90df16a"
                alt="Ranking slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item
            style={{ backgroundColor: "#A2D9DC", textAlign: "center" }}
          >
            <Link to="/promising">
              <img
                className="mw-100 w-auto"
                src="https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/banner%2FRating.jpg?alt=media&token=e124885f-c6d1-4c4f-8ee8-ec9529570dfc"
                alt="Rating slide"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item
            style={{ backgroundColor: "#000000", textAlign: "center" }}
          >
            <Link to="market">
              <img
                className="mw-100 w-auto"
                src="https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/banner%2FMarket.jpg?alt=media&token=50353301-5ea7-467f-a473-7992c2feece3"
                alt="Market slide"
              />
            </Link>
          </Carousel.Item>
        </Carousel>
      </div>
      <Grid container spacing={10} justifyContent="center">
        <Grid item xs={12}>
          <img
            className="w-100"
            src="https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/banner%2Fhidden.png?alt=media&token=5ede2848-db74-4880-b929-ab81f5b0bf71"
            alt="hidden"
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ marginBottom: "3rem", lineHeight: 2 }}>
            <div>
              MOSAIC은{" "}
              <span style={{ fontWeight: 900 }}>건전한 암호화폐 투자</span>를
              선도하기 위해
            </div>
            <div>다음과 같은 서비스를 제공합니다.</div>
          </Typography>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4}>
              <img src={Sample} alt="rating" width={150} />
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
              <img src={Sample} alt="fund" width={150} />
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
              <img src={Sample} alt="report" width={150} />
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
        {/* 리포트 */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Divider component="div" role="presentation">
            <Typography
              variant="h5"
              sx={{ margin: "0 3.5rem", fontWeight: 900 }}
            >
              최신 리포트
            </Typography>
          </Divider>
        </Grid>
        <Grid item xs={6}>
          <div>
            {result !== undefined ? (
              <ReportrecentcardDetail
                id={result.id}
                title={result.title}
                writer={result.writer}
                date={moment(result.date).format("YYYY.MM.DD")}
                thumbnail={result.thumbnail}
                hashtag={result.hashtag}
              />
            ) : null}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            {reports.slice(0, 3).map((report, index) => (
              <div key={index}>
                <ReportlistForm
                  id={report.id}
                  title={report.title}
                  date={moment(report.date).format("YYYY.MM.DD")}
                  writer={report.writer}
                  thumbnail={report.thumbnail}
                />
              </div>
            ))}
          </div>
        </Grid>
        {/* 유망 코인 */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Divider component="div" role="presentation">
            <Typography
              variant="h5"
              sx={{ margin: "0 3.5rem", fontWeight: 900 }}
            >
              최신 유망 코인
            </Typography>
          </Divider>
          <Grid item xs={12}>
            <Box sx={{ height: "5rem" }} />
          </Grid>
          <Grid container direction="row" spacing={5} justifyContent="center">
            {crypto !== null &&
              crypto.map(
                (content, index) =>
                  content.promising === true && (
                    <CryptoCard crypto={content} idx={index} />
                  )
              )}
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
