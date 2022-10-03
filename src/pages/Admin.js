import React from "react";

import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import HistoryEduTwoToneIcon from '@mui/icons-material/HistoryEduTwoTone';

import {
    Grid,
    Box,
    Button
  } from "@mui/material";

const Admin = () => {
  return (
    <Grid container spacing={10} justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ height: "10em" }} />
        </Grid>
        <Grid item xs={6}>
            <Button href="/admindailymain" variant="outlined" startIcon={<ChatTwoToneIcon/>} sx={{ mx : 'auto', px : 10, py : 10}}>
              일간 리포트
            </Button>
        </Grid>
        <Grid item xs={6}>
              <Button href="/adminweeklymain" variant="outlined" startIcon={<HistoryEduTwoToneIcon/>} sx={{ mx : 'auto', px : 10, py : 10}}>
                주간 리포트
              </Button>
        </Grid>
    </Grid>
  );
};

export default Admin;
