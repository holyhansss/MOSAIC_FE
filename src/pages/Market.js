import React ,{useState, useEffect}from "react";
import {Box,Container, Grid, Typography, Button} from '@mui/material';
import styled from "styled-components";


//components
import FearandGreed from "../components/FearAndGreed/FearandGreed";
import Index1d from "../components/LineGraph/LineGraph1d";
import Index1mo from "../components/LineGraph/LineGraph1mo";
import Index1y from "../components/LineGraph/LineGraph1y";

// 시장동향
// S&P 500 지수와 CMC 200 그래프(line) 불러옴
//공포탐욕지수 이미지 불러옴
//카테고리별 그래프 불러옴
// 위너 코인 (카테고리별 ) 리스트 나타냄

function Marketpage() {
    const range = ["1d","1mo", "1y"];
    const [content, setContent] = useState(null);
    
    const buttonValueSetting = e => {
        if (e.target.name === "1d") {   
            setContent(0)
        } else if (e.target.name === "1mo") {
            setContent(1)
        } else if (e.target.name === "1y") {
            setContent(2)
        }
      };

    const selectComponent = [
        <Index1d />,
        <Index1mo />,
        <Index1y />,
    ];

    const StyleButton = styled(Button)`
        background: linear-gradient(-45deg, #0B062D 5%, #230B65 90%);
    `;
    const MainContainer = styled(Container)`
        position: relative;
        z-index: 1;
    `;
  
    return (
        <MainContainer maxWidth="md" >
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom component="div">
              Market page
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ flexGrow:  1 }}>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 12, md: 12 }}>
                      {range.map((data,idx) => (
                      <Grid item xs={2} sm={4} md={4} key={idx} >
                         <StyleButton onClick={buttonValueSetting} name={data}>
                          {data}
                        </StyleButton>  
                      </Grid>
                      ))}
                  </Grid>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {content !== null &&<div>{selectComponent[content]}</div>}
            </Grid>
            <Grid item xs={12} >
              <Typography variant="h5" gutterBottom component="div">
                공포탐욕지수
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FearandGreed />
            </Grid>
          </Grid>
        </MainContainer>  
      );
  };
export default  Marketpage;