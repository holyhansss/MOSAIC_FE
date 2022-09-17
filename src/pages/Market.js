import React, { useState } from "react";
//components
import {
  Container,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
// Components
import FearandGreed from "../components/FearAndGreed/FearandGreed";
import Index1d from "../components/LineGraph/LineGraph1d";
import Index1mo from "../components/LineGraph/LineGraph1mo";
import Index1y from "../components/LineGraph/LineGraph1y";
import CategoryLineGraph_1y from "../components/CategoryLineGraph/CategoryLineGraph_1y.js";
import CategoryLineGraph_1mo from "../components/CategoryLineGraph/CategoryLineGraph_1mo.js";
import CategoryLineGraph_1d from "../components/CategoryLineGraph/CategoryLineGraph_1d.js";

import axios from "axios";

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
          // Selected button style
          "&.Mui-selected": {
            color: "#000",
            fontWeight: "bold",
            backgroundColor: "rgba(0,0,0,0)",
          },
        },
      },
    },
  },
});

const StyleButton = styled(Button)`
  background: linear-gradient(-45deg, #0b062d 5%, #230b65 90%);
`;

function Marketpage() {
  const [snpRange, setSnpRange] = useState("1d");
  const [snpIndex, setSnpIndex] = useState(0);

  const [categoryRange, setCategoryRange] = useState("1mo");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categoryArray, setCategoryArray] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [props, setProps] = useState({
    dateRange: "1d",
    categoryArray: categoryArray,
  });

  const snpButtonChange = (e, newValue) => {
    setSnpRange(newValue);
    if (newValue === "1d") {
      setSnpIndex(0);
    } else if (newValue === "1mo") {
      setSnpIndex(1);
    } else if (newValue === "1y") {
      setSnpIndex(2);
    }
  };
  const categoryButtonChange = (e, newValue) => {
    setCategoryRange(newValue);
    if (newValue === "1d") {
      setProps({
        dateRange: newValue,
        categoryArray: categoryArray,
      });
      setCategoryIndex(0);
    } else if (newValue === "1mo") {
      setProps({
        dateRange: newValue,
        categoryArray: categoryArray,
      });
      setCategoryIndex(1);
    } else if (newValue === "1y") {
      setProps({
        dateRange: newValue,
        categoryArray: categoryArray,
      });
      setCategoryIndex(2);
    }
  };

  const CategoryButton = () => {
    const buttonToggleArrayElement = (e) => {
      e.preventDefault();
      const arrayToReplace = [...categoryArray];
      if (e.target.name === "Currency") {
        arrayToReplace[0] = !arrayToReplace[0];
      } else if (e.target.name === "Smart Contract Platform") {
        arrayToReplace[1] = !arrayToReplace[1];
      } else if (e.target.name === "Computing") {
        arrayToReplace[2] = !arrayToReplace[2];
      } else if (e.target.name === "DeFi") {
        arrayToReplace[3] = !arrayToReplace[3];
      } else if (e.target.name === "Culture & Entertainment") {
        arrayToReplace[4] = !arrayToReplace[4];
      }
      setCategoryArray(arrayToReplace);
      if (categoryIndex === 0) setCategoryIndex(3);
      else if (categoryIndex === 3) {
        setCategoryIndex(0);
      } else if (categoryIndex === 1) setCategoryIndex(4);
      else if (categoryIndex === 4) {
        setCategoryIndex(1);
      } else if (categoryIndex === 2) setCategoryIndex(5);
      else if (categoryIndex === 5) {
        setCategoryIndex(2);
      } else {
        console.error("Wrong categoryIndex; out of bounds");
      }

      setProps({
        ...props,
        dateRange: categoryRange,
        categoryArray: arrayToReplace,
      });
    };

    return (
      <>
        <div>
          {categoryArray[0] ? (
            <StyleButton
              onClick={buttonToggleArrayElement}
              variant="contained"
              size="small"
              name="Currency"
              sx={{
                width: "15.5em",
                height: "6em",
                margin: "0.3rem 0",
                fontWeight: "bold",
                fontSize: "8px",
                color: "#F2789F",
              }}
            >
              Currency
            </StyleButton>
          ) : (
            <Button
              onClick={buttonToggleArrayElement}
              variant="text"
              size="small"
              name="Currency"
              sx={{
                width: "15.5em",
                height: "6em",
                margin: "0.3rem 0",
                fontSize: "8px",
              }}
            >
              Currency
            </Button>
          )}
        </div>
        <div>
          {categoryArray[1] ? (
            <StyleButton
              onClick={buttonToggleArrayElement}
              variant="contained"
              size="small"
              name="Smart Contract Platform"
              sx={{
                width: "15.5em",
                fontWeight: "bold",
                margin: "0.3rem 0",
                height: "6em",
                fontSize: "8px",
                color: "#F999B7",
              }}
            >
              Smart Contract Platform
            </StyleButton>
          ) : (
            <Button
              onClick={buttonToggleArrayElement}
              variant="text"
              size="small"
              name="Smart Contract Platform"
              sx={{
                width: "15.5em",
                height: "6em",
                margin: "0.3rem 0",
                fontSize: "8px",
              }}
            >
              Smart Contract Platform
            </Button>
          )}
        </div>
        <div>
          {categoryArray[2] ? (
            <StyleButton
              onClick={buttonToggleArrayElement}
              variant="contained"
              size="small"
              name="Computing"
              sx={{
                width: "15.5em",
                fontWeight: "bold",
                margin: "0.3rem 0",
                height: "6em",
                fontSize: "8px",
                color: "#F9C5D5",
              }}
            >
              Computing
            </StyleButton>
          ) : (
            <Button
              onClick={buttonToggleArrayElement}
              variant="text"
              size="small"
              name="Computing"
              sx={{
                width: "15.5em",
                height: "6em",
                margin: "0.3rem 0",
                fontSize: "8px",
              }}
            >
              Computing
            </Button>
          )}
        </div>
        <div>
          {categoryArray[3] ? (
            <StyleButton
              onClick={buttonToggleArrayElement}
              size="small"
              variant="contained"
              name="DeFi"
              sx={{
                width: "15.5em",
                fontWeight: "bold",
                margin: "0.3rem 0",
                height: "6em",
                fontSize: "8px",
                color: "#794C74",
              }}
            >
              DeFi
            </StyleButton>
          ) : (
            <Button
              onClick={buttonToggleArrayElement}
              variant="text"
              size="small"
              name="DeFi"
              sx={{
                width: "15.5em",
                height: "6em",
                margin: "0.3rem 0",
                fontSize: "8px",
              }}
            >
              DeFi
            </Button>
          )}
        </div>
        <div>
          {categoryArray[4] ? (
            <StyleButton
              onClick={buttonToggleArrayElement}
              variant="contained"
              size="small"
              name="Culture & Entertainment"
              sx={{
                width: "15.5em",
                fontWeight: "bold",
                margin: "0.3rem 0",
                height: "6em",
                fontSize: "8px",
                color: "#867AE9",
              }}
            >
              Culture & Entertainment
            </StyleButton>
          ) : (
            <Button
              onClick={buttonToggleArrayElement}
              variant="text"
              size="small"
              name="Culture & Entertainment"
              sx={{
                width: "15.5em",
                height: "6em",
                margin: "0.3rem 0",
                fontSize: "8px",
              }}
            >
              Culture & Entertainment
            </Button>
          )}
        </div>
      </>
    );
  };

  const selectComponent = [<Index1d />, <Index1mo />, <Index1y />];

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ marginTop: 5 }}>
            S&P 500 vs CMC 200
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
              value={snpRange}
              onChange={snpButtonChange}
              exclusive
              sx={{ height: "2.5em" }}
            >
              <ToggleButton sx={{ color: "darkgrey" }} value="1d">
                1D
              </ToggleButton>
              <ToggleButton sx={{ color: "darkgrey" }} value="1mo">
                1M
              </ToggleButton>
              <ToggleButton sx={{ color: "darkgrey" }} value="1y">
                1Y
              </ToggleButton>
            </ToggleButtonGroup>
          </ThemeProvider>
          <p />
          {snpIndex !== null && <div>{selectComponent[snpIndex]}</div>}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            코인 카테고리
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
              value={categoryRange}
              onChange={categoryButtonChange}
              exclusive
              sx={{ height: "2.5em" }}
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              {categoryIndex == 0 && <CategoryLineGraph_1d {...props} />}
              {categoryIndex == 1 && <CategoryLineGraph_1mo {...props} />}
              {categoryIndex == 2 && <CategoryLineGraph_1y {...props} />}
              {categoryIndex == 3 && <CategoryLineGraph_1d {...props} />}
              {categoryIndex == 4 && <CategoryLineGraph_1mo {...props} />}
              {categoryIndex == 5 && <CategoryLineGraph_1y {...props} />}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CategoryButton />
            </div>
          </div>
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
    </>
  );
}
export default Marketpage;
