import React from "react";
import Typography from "@mui/material/Typography";
import { Container, Button, Grid, Box } from "@mui/material";
import moment from "moment";
// import styled from "styled-components";
import styled from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { grey } from "@mui/material/colors";

//components
import {
  Reportlistcard,
  ReportlistFormDetail,
  ReportrecentcardDetail,
} from "../components/Report/Reportlistcard.js";

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

function ReportMain({ result, reports, dailyReport }) {
  let subreports = reports.slice(0, 4);
  let dailyports = dailyReport.slice(1, 4);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          backgroundColor: "#451776",
          background: 'linear-gradient(45deg, #451776 30%, #604D82 80%)',
          width: "calc(100vw - (100vw - 100%))",
          height: "20em",
        }}
      ></div>
      <MainContainer maxWidth="lg">
        <Grid container spacing={3} >
          <Grid item xs={6}>
            <Box
              sx={{
                height: "20em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ height: "2em" }} />
              <Typography
                variant="h3"
                sx={{ color: "white", marginBottom: "1rem" }}
              >
                리포트
              </Typography>
              <Typography variant="h5" sx={{ color: "white" }}>
                암호화폐 시장의 주요 이슈들을 정리한
              </Typography>
              <Typography variant="h5" sx={{ color: "white" }}>
                Mosaic 리포트를 만나보세요!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                height: "20em",
                display: "flex",
                flexDirection: "raw",
                justifyContent: "center",
              }}
            >
              <img
                  src="https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/service_info%2Fundraw_absorbed_in_re_ymd6%20(2).svg?alt=media&token=4b56ff8a-780b-4f35-8f10-5b840937026d"
                  alt="Promising"
                  width={260}
                />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom>
              일간 이슈
            </Typography>
          </Grid>
          <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end">
                <Button href="/reportDailyList" sx={{ color: grey[400] }}>
                  전체보기 <ArrowForwardIosIcon />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
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
          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <div>
              {dailyports.map((report, index) => (
                <div key={index}>
                  <ReportlistFormDetail
                    id={report.id}
                    title={report.title}
                    date={moment(report.date).format("YYYY.MM.DD")}
                    writer={report.writer}
                    thumbnail={report.thumbnail}
                  />
                </div>
              ))}
            </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
              주간 리포트
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button href="/reportList" sx={{ color: grey[400] }}>
                전체보기 <ArrowForwardIosIcon />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 4 }}
                columns={{ xs: 4, sm: 8, md: 20 }}
              >
                {subreports.map((subreports, index) => (
                  <Grid item xs={4} sm={4} md={5} key={index}>
                    <Reportlistcard
                      id={subreports.id}
                      title={subreports.title}
                      date={moment(subreports.date).format("YYYY.MM.DD")}
                      writer={subreports.writer}
                      thumbnail={subreports.thumbnail}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ height: "5rem" }} />
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
}

export default ReportMain;
