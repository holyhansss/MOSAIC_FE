import React, { useState } from "react";
//components
import {
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

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

function Marketpage() {
  const [snpRange, setSnpRange] = useState("1d");
  const [snpIndex, setSnpIndex] = useState(0);

  const [categoryRange, setCategoryRange] = useState("1d");
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
      } else {
        console.log(
          "wrong category name '" +
            e.target.name +
            "' at buttonAddCategoryArray"
        );
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

      // console.log("Category Index:", categoryIndex);
      setProps({
        ...props,
        dateRange: categoryRange,
        categoryArray: arrayToReplace,
      });

      console.log("props categoryIndex checkwise:", categoryIndex);
      console.log("props dateRange checkwise:", props.dateRange);
      console.log("props categoryArray checkwise:", props.categoryArray);
    };

    return (
      <div>
        {categoryArray[0] ? (
          <button
            onClick={buttonToggleArrayElement}
            name="Currency"
            color="green"
          >
            Currency hide
          </button>
        ) : (
          <button
            onClick={buttonToggleArrayElement}
            name="Currency"
            color="green"
          >
            Currency show
          </button>
        )}{" "}
        {categoryArray[1] ? (
          <button
            onClick={buttonToggleArrayElement}
            name="Smart Contract Platform"
            theme="grey"
          >
            Smart Contract Platform hide
          </button>
        ) : (
          <button
            onClick={buttonToggleArrayElement}
            name="Smart Contract Platform"
            theme="grey"
          >
            Smart Contract Platform show
          </button>
        )}
        {categoryArray[2] ? (
          <button
            onClick={buttonToggleArrayElement}
            name="Computing"
            theme="skyblue"
          >
            Computing hide
          </button>
        ) : (
          <button
            onClick={buttonToggleArrayElement}
            name="Computing"
            theme="skyblue"
          >
            Computing show
          </button>
        )}
        {categoryArray[3] ? (
          <button onClick={buttonToggleArrayElement} name="DeFi" theme="pink">
            DeFi hide
          </button>
        ) : (
          <button onClick={buttonToggleArrayElement} name="DeFi" theme="pink">
            DeFi show
          </button>
        )}
        {categoryArray[4] ? (
          <button
            onClick={buttonToggleArrayElement}
            name="Culture & Entertainment"
            theme="orange"
          >
            Culture & Entertainment hide
          </button>
        ) : (
          <button
            onClick={buttonToggleArrayElement}
            name="Culture & Entertainment"
            theme="orange"
          >
            Culture & Entertainment show
          </button>
        )}
      </div>
    );
  };

  const selectComponent = [<Index1d />, <Index1mo />, <Index1y />];

  // const categoryComponent = [
  //   <CategoryLineGraph_1d {...props} />,
  //   <CategoryLineGraph_1mo {...props} />,
  //   <CategoryLineGraph_1y {...props} />,
  // ];

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
            S&P 500 vs CMC 200
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
              size="large"
              value={snpRange}
              onChange={snpButtonChange}
              exclusive
              color="primary"
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
          <p />
          {snpIndex !== null && <div>{selectComponent[snpIndex]}</div>}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom component="div">
            코인 카테고리
          </Typography>
          <ThemeProvider theme={theme}>
            <ToggleButtonGroup
              size="large"
              value={categoryRange}
              onChange={categoryButtonChange}
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
          <div>
            {/* <div>{categoryComponent[categoryIndex]}</div> */}
            <div>
              {categoryIndex == 0 && <CategoryLineGraph_1d {...props} />}
              {categoryIndex == 1 && <CategoryLineGraph_1mo {...props} />}
              {categoryIndex == 2 && <CategoryLineGraph_1y {...props} />}
              {categoryIndex == 3 && <CategoryLineGraph_1d {...props} />}
              {categoryIndex == 4 && <CategoryLineGraph_1mo {...props} />}
              {categoryIndex == 5 && <CategoryLineGraph_1y {...props} />}
            </div>
          </div>
          <CategoryButton />
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
