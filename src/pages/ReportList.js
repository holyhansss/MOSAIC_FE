import React from "react";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";
import moment from "moment";
// import styled from "styled-components";

//components
import { ReportlistFormAll, DailyReportlistFormAll } from "../components/Report/Reportlistcard.js";
//Responsive Web
import { Pc, Mobile } from "../components/Responsive/Responsive";

function ReportList({ reports }) {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ height: "5em" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
            전체 글
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {reports.map((report, index) => (
            <div key={index}>
              <ReportlistFormAll
                id={report.id}
                title={report.title}
                date={moment(report.date).format("YYYY.MM.DD")}
                writer={report.writer}
                thumbnail={report.thumbnail}
              />
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export {ReportList};

function DailyReportList({ dailyReport }) {
  return (
    <>
    <Pc>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ height: "5em" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
          전체 글
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {dailyReport.map((report, index) => (
            <div key={index}>
              <DailyReportlistFormAll
                id={report.id}
                title={report.title}
                date={moment(report.date).format("YYYY.MM.DD")}
                writer={report.writer}
                thumbnail={report.thumbnail}
              />
            </div>
          ))}
        </Grid>
      </Grid>
      </Pc>
      <Mobile>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ height: "5em" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
            전체 글
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {dailyReport.map((report, index) => (
            <div key={index}>
              <DailyReportlistFormAll
                id={report.id}
                title={report.title}
                date={moment(report.date).format("YYYY.MM.DD")}
                writer={report.writer}
                thumbnail={report.thumbnail}
              />
            </div>
          ))}
        </Grid>
      </Grid>
      </Mobile>
    </>
  );
}

export {DailyReportList};

