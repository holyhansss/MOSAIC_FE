import React, { useState, useEffect, useRef } from "react";
import AdminWeeklyReport from "../components/AdminWeeklyReport/AdminWeeklyReport";
import AdminWinnerLoser from "../components/AdminWinnerLoser/AdminWinnerLoser";

import { Box, Tab, Container } from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";

const Admin = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <Container maxWidth="md">
          <Box
            sx={{ borderColor: "divider", position: "relative", left: "35%" }}
          >
            <TabList
              onChange={handleChange}
              aria-label=""
              sx={{ justifyContent: "center" }}
            >
              <Tab label="주간 리포트" value="1" />
              <Tab label="Winner & Loser" value="2" />
            </TabList>
          </Box>
        </Container>
        <p />
        <TabPanel value="1">
          <AdminWeeklyReport />
        </TabPanel>
        <TabPanel value="2">
          <AdminWinnerLoser />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default Admin;
