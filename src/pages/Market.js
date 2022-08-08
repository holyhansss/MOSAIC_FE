import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";

// Components
import FearandGreed from "../components/FearAndGreed/FearandGreed";
import Index1d from "../components/LineGraph/LineGraph1d";
import Index1mo from "../components/LineGraph/LineGraph1mo";
import Index1y from "../components/LineGraph/LineGraph1y";

// 시장동향
// S&P 500 지수와 CMC 200 그래프(line) 불러옴
// 공포탐욕지수 이미지 불러옴
// 카테고리별 그래프 불러옴
// 위너 코인 (카테고리별 ) 리스트 나타냄

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

// const StyleButton = styled(ToggleButton)`
//   background: linear-gradient(-45deg, #0b062d 5%, #230b65 90%);
// `;

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

function Marketpage() {
  const [range, setRange] = useState("1d");
  const [content, setContent] = useState(0);

  const buttonValueSetting = (e, newValue) => {
    setRange(newValue);
    if (newValue === "1d") {
      setContent(0);
    } else if (newValue === "1mo") {
      setContent(1);
    } else if (newValue === "1y") {
      setContent(2);
    }
  };

  const selectComponent = [<Index1d />, <Index1mo />, <Index1y />];

  return (
    <MainContainer maxWidth="md">
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom component="div">
            시장 동향
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="div">
            S&P 500 vs CMC 200 (22:30~05:00)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
              size="small"
              value={range}
              onChange={buttonValueSetting}
              exclusive
            >
              <ToggleButton sx={{ color: "gray" }} value="1d">
                1D
              </ToggleButton>
              <ToggleButton sx={{ color: "gray" }} value="1mo">
                1M
              </ToggleButton>
              <ToggleButton sx={{ color: "gray" }} value="1y">
                1Y
              </ToggleButton>
            </ToggleButtonGroup>
          </ThemeProvider>
          {content !== null && <div>{selectComponent[content]}</div>}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="div">
            공포 탐욕 지수
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FearandGreed />
        </Grid>
      </Grid>
    </MainContainer>
  );
}
export default Marketpage;
