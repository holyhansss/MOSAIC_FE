import React from "react";
import Typography from "@mui/material/Typography";
import { Container, Grid, Box } from "@mui/material";
import moment from "moment";
import styled from "styled-components";

//components
import {
  ReportlistFormAll,
} from "../components/Report/Reportlistcard.js";

function ReportList({ result, reports }) {
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
                  />
                  </div>
              ))}
        </Grid>
      </Grid>
    </>
  );
}

export default ReportList;
