import React from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid, Box } from "@mui/material";
import moment from "moment";
// import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { grey } from "@mui/material/colors";
// import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";

//components
import {
  Reportlistcard,
  Reportrecentcard,
  ReportlistForm
} from "../components/Report/Reportlistcard.js";

function ReportMain({ result, reports }) {
    let subreports = reports.slice(0,4);
    let dailyports = reports.slice(0,3);
    
    // const navigate = useNavigate();
    // const onclick = () => {
    //     navigate("/reportList", {
    //       });
    // }; 
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          backgroundColor: "rgba(0,0,0,0.1)",
          width: "calc(100vw - (100vw - 100%))",
          height: "20em",
        }}
      ></div>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Box sx={{ height: "20em" }} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom>
            데일리 리포트
          </Typography>
        </Grid>
        <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end" >
                <Button href="/reportList" sx={{ color : grey[400] }}>
                    전체보기 <ArrowForwardIosIcon/>
                </Button>
            </Box>
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <div>
            {dailyports.map((report, index) => (
              <div key={index}>
                <ReportlistForm
                    id={report.id}
                    title={report.title}
                    date={moment(report.date).format("YYYY.MM.DD")}
                    writer={report.writer}
                />
            </div>
            ))}
          </div>
        </Grid>
        {/* <Grid item xs={12}>
            <Divider/>
        </Grid> */}
        <Grid item xs={6}>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
            주간리포트
          </Typography>
        </Grid>
        <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end" >
                <Button href="/reportList" sx={{ color : grey[400] }}>
                    전체보기 <ArrowForwardIosIcon/>
                </Button>
            </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 20 }}
            >
              {subreports.map((subreports, index) => (
                <Grid item xs={2} sm={4} md={5} key={index}>
                  <Reportlistcard
                    id={subreports.id}
                    title={subreports.title}
                    date={moment(subreports.date).format("YYYY.MM.DD")}
                    writer={subreports.writer}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ReportMain;
