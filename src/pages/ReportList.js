import React from "react";
import Typography from "@mui/material/Typography";
import { Container, Grid, Box } from "@mui/material";
import moment from "moment";
import styled from "styled-components";

//components
import {
  Reportlistcard,
  Reportrecentcard,
} from "../components/Report/Reportlistcard.js";

function ReportList({ result, reports }) {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ marginTop: 5 }}>
            최신리포트
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
          <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
            주간리포트
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 20 }}
            >
              {reports.slice(1).map((report, index) => (
                <Grid item xs={2} sm={4} md={5} key={index}>
                  <Reportlistcard
                    id={report.id}
                    title={report.title}
                    date={moment(report.date).format("YYYY.MM.DD")}
                    writer={report.writer}
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

export default ReportList;
