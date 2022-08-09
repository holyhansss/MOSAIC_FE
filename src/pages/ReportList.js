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

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

function ReportList({result, reports}) {

  return (
    <div>
      <p />
      <MainContainer maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{paddingTop: 3}}/>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom component="div">
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
            <Typography variant="h5" gutterBottom component="div">
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
                      date={moment(report.date).format("YYYY.MM.DD") }
                      writer={report.writer}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </MainContainer>
    </div>
  );
}

export default ReportList;
