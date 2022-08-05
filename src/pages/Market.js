import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import FearandGreed from "../components/FearAndGreed/FearandGreed.js";
import Index1d from "../components/LineGraph/LineGraph1d.js";
import Index1mo from "../components/LineGraph/LineGraph1mo.js";
import Index1y from "../components/LineGraph/LineGraph1y.js";
import CategoryLineGraph_1y from "../components/CategoryLineGraph/CategoryLineGraph_1y.js"
import CategoryLineGraph_1mo from "../components/CategoryLineGraph/CategoryLineGraph_1mo.js"
import CategoryLineGraph_1d from "../components/CategoryLineGraph/CategoryLineGraph_1d.js"
import axios from 'axios';

// import CategoryButton from "../components/CategoryLineGraph/CategoryButton.js"
import styled from "styled-components";


// 시장동향
// S&P 500 지수와 CMC 200 그래프(line) 불러옴
// 공포탐욕지수 이미지 불러옴
// 카테고리별 그래프 불러옴
// 위너 코인 (카테고리별 ) 리스트 나타냄

// Style
const StyleButton = styled(Button)`
  background: linear-gradient(-45deg, #0b062d 5%, #230b65 90%);
`;
const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

function Marketpage() {
    const range = ["1d","1mo", "1y"];
    const [content, setContent] = useState(null);
    const [dateRange, setDateRange] = useState("1y");
    const [categoryIndex, setCategoryIndex] = useState(null);
    const [categoryArray, setCategoryArray] = useState([true,true,true,true,true]);
    const [props, setProps] = useState({})
  
  const buttonValueSetting = (e) => {
    if (e.target.name === "1d") {
      setContent(0);
    } else if (e.target.name === "1mo") {
      setContent(1);
    } else if (e.target.name === "1y") {
      setContent(2);
    }
  };

    
  const buttonCategorySettings = e => {
    e.preventDefault();
    if (e.target.name === "1y") { 
      console.log("1y clicked!"); 
      setDateRange("1y")
      setProps( {
        dateRange: dateRange,
        categoryArray: categoryArray
      })
      setCategoryIndex(0)

    } else if (e.target.name === "1mo") {
      console.log("1mo clicked!");
      setDateRange("1mo")
      setProps( {
        dateRange: dateRange,
        categoryArray: categoryArray
      })
      setCategoryIndex(1)

    } else if (e.target.name === "1d") {
      console.log("1d clicked!");
      setDateRange("1d")
      setProps( {
        dateRange: dateRange,
        categoryArray: categoryArray
      })
      setCategoryIndex(2)
    }
  }

  const CategoryButton = () => {
    const buttonToggleArrayElement = e => {
      e.preventDefault();
      const arrayToReplace = [...categoryArray];
      if (e.target.name === "Currency" ){
        arrayToReplace[0] = !arrayToReplace[0];
      }else if (e.target.name === "Smart Contract Platform" ){
        arrayToReplace[1] = !arrayToReplace[1];
      }else if (e.target.name === "Computing" ){
        arrayToReplace[2] = !arrayToReplace[2];
      }else if (e.target.name === "DeFi" ){
        arrayToReplace[3] = !arrayToReplace[3];
      }else if (e.target.name === "Culture & Entertainment" ){
        arrayToReplace[4] = !arrayToReplace[4];
      } else {
        console.log("wrong category name '" + e.target.name + "' at buttonAddCategoryArray");
      }
      setCategoryArray(arrayToReplace);
      if (categoryIndex === 0)
        setCategoryIndex(3);
      else if (categoryIndex === 3) {
        setCategoryIndex(0);
      } else if (categoryIndex === 1)
        setCategoryIndex(4);
      else if (categoryIndex === 4){
        setCategoryIndex(1);
      } else if (categoryIndex === 2)
        setCategoryIndex(5);
      else if (categoryIndex === 5){
        setCategoryIndex(2);
      } else {
        console.error("Wrong categoryIndex; out of bounds");
      }
  

      // console.log("Category Index:", categoryIndex);  
      setProps( {
        ...props,
        dateRange: dateRange,
        categoryArray: arrayToReplace
      })

      console.log("props categoryIndex checkwise:", categoryIndex);
      console.log("props dateRange checkwise:", props.dateRange);
      console.log("props categoryArray checkwise:", props.categoryArray);
    }
  
  return (
    <div>
    {
      categoryArray[0] ? (
        <button onClick={buttonToggleArrayElement} name = "Currency" color="green"> Currency hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "Currency" color="green">Currency show </button>
        )
      } {
      categoryArray[1] ? (
        <button onClick={buttonToggleArrayElement} name = "Smart Contract Platform" theme="grey">Smart Contract Platform hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "Smart Contract Platform" theme="grey">Smart Contract Platform show </button>
        )
    }{
      categoryArray[2] ? (
        <button onClick={buttonToggleArrayElement} name = "Computing" theme="skyblue">Computing hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "Computing" theme="skyblue">Computing show </button>
        )
    }{
      categoryArray[3] ? (
        <button onClick={buttonToggleArrayElement} name = "DeFi" theme="pink">DeFi hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "DeFi" theme="pink">DeFi show </button>
        )
    }{
      categoryArray[4] ? (
        <button onClick={buttonToggleArrayElement} name = "Culture & Entertainment" theme="orange">Culture & Entertainment hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "Culture & Entertainment" theme="orange">Culture & Entertainment show </button>
        )
    }
    </div> 
  )
}
  
  const selectComponent = [
      <Index1d />,
      <Index1mo />,
      <Index1y />,
  ];

  const categoryComponent = [
    <CategoryLineGraph_1y {...props}/>,
    <CategoryLineGraph_1mo {...props}/>,
    <CategoryLineGraph_1d {...props}/>,
  ]
  

  return (
    <MainContainer maxWidth="md">
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom component="div">
            시장 동향
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 6, sm: 12, md: 12 }}
            >
              {range.map((data, idx) => (
                <Grid item xs={2} sm={4} md={4} key={idx}>
                  <StyleButton onClick={buttonValueSetting} name={data}>
                    {data}
                  </StyleButton>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {content !== null && <div>{selectComponent[content]}</div>}
        </Grid>

        <h5>Coin categories</h5>
        <Grid item xs={12}>
          <button onClick={buttonCategorySettings} name= "1d">
            1d
          </button>
          <button onClick={buttonCategorySettings} name= "1mo">
            1mo
          </button>
          <button onClick={buttonCategorySettings} name= "1y">
            1y
          </button>
          {/* <div>{categoryComponent[categoryIndex]}</div> */}
          <div>

            {categoryIndex == 0 && <CategoryLineGraph_1y {...props}/>}
            {categoryIndex == 1 && <CategoryLineGraph_1mo {...props}/>}
            {categoryIndex == 2 && <CategoryLineGraph_1d {...props}/>}
            {categoryIndex == 3 && <CategoryLineGraph_1y {...props}/>}
            {categoryIndex == 4 && <CategoryLineGraph_1mo {...props}/>}
            {categoryIndex == 5 && <CategoryLineGraph_1d {...props}/>}
          </div>

          <CategoryButton/>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom component="div">
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
