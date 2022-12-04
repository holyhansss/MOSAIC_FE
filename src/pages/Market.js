import React, { useState } from "react";
//components
import {
  Container,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Box,
  Tooltip,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Components
import FearandGreed from "../components/FearAndGreed/FearandGreed";
import Index1d from "../components/LineGraph/LineGraph1d";
import Index1mo from "../components/LineGraph/LineGraph1mo";
import Index1y from "../components/LineGraph/LineGraph1y";
import CategoryLineGraph1y from "../components/CategoryLineGraph/CategoryLineGraph_1y.js";
import CategoryLineGraph1mo from "../components/CategoryLineGraph/CategoryLineGraph_1mo.js";
import CategoryLineGraph1d from "../components/CategoryLineGraph/CategoryLineGraph_1d.js";
//Responsive Web
import { Pc, Mobile } from "../components/Responsive/Responsive";

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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderWidth: 1,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

// const StyledButton = styled(Button)`
//   background: linear-gradient(-45deg, #242F9B 5%, #646FD4 80%);
// `;

function Marketpage() {
  const [snpRange, setSnpRange] = useState("1mo");
  const [snpIndex, setSnpIndex] = useState(1);

  const [categoryRange, setCategoryRange] = useState("1mo");
  const [categoryIndex, setCategoryIndex] = useState(1);
  const [categoryArray, setCategoryArray] = useState([
    true,
    true,
    false,
    false,
    false,
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
        <Pc>
          <div>
            {categoryArray[0] ? (
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
                  color: "#FFB404",
                  border: "1px solid #FFB404",
                }}
              >
                Currency
              </Button>
            ) : (
              <Button
                onClick={buttonToggleArrayElement}
                variant="contained"
                size="small"
                name="Currency"
                sx={{
                  width: "15.5em",
                  height: "6em",
                  margin: "0.3rem 0",
                  fontSize: "8px",
                  color: "black",
                  background: "#FFB404",
                }}
              >
                Currency
              </Button>
            )}
          </div>
          <div>
            {categoryArray[1] ? (
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
                  color: "#BCCF5F",
                  border: "1px solid #BCCF5F",
                }}
              >
                Smart Contract Platform
              </Button>
            ) : (
              <Button
                onClick={buttonToggleArrayElement}
                variant="contained"
                size="small"
                name="Smart Contract Platform"
                sx={{
                  width: "15.5em",
                  margin: "0.3rem 0",
                  height: "6em",
                  fontSize: "8px",
                  color: "black",
                  background: "#BCCF5F",
                }}
              >
                Smart Contract Platform
              </Button>
            )}
          </div>
          <div>
            {categoryArray[2] ? (
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
                  color: "#01EDA5",
                  border: "1px solid #01EDA5",
                }}
              >
                Computing
              </Button>
            ) : (
              <Button
                onClick={buttonToggleArrayElement}
                variant="contained"
                size="small"
                name="Computing"
                sx={{
                  width: "15.5em",
                  margin: "0.3rem 0",
                  height: "6em",
                  fontSize: "8px",
                  color: "black",
                  background: "#01EDA5",
                }}
              >
                Computing
              </Button>
            )}
          </div>
          <div>
            {categoryArray[3] ? (
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
                  color: "#24C6FE",
                  border: "1px solid #24C6FE",
                }}
              >
                DeFi
              </Button>
            ) : (
              <Button
                onClick={buttonToggleArrayElement}
                size="small"
                variant="contained"
                name="DeFi"
                sx={{
                  width: "15.5em",
                  margin: "0.3rem 0",
                  height: "6em",
                  fontSize: "8px",
                  color: "black",
                  background: "#24C6FE",
                }}
              >
                DeFi
              </Button>
            )}
          </div>
          <div>
            {categoryArray[4] ? (
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
                  color: "#5D5CB0",
                  border: "1px solid #5D5CB0",
                }}
              >
                Culture & Entertainment
              </Button>
            ) : (
              <Button
                onClick={buttonToggleArrayElement}
                variant="contained"
                size="small"
                name="Culture & Entertainment"
                sx={{
                  width: "15.5em",
                  margin: "0.3rem 0",
                  height: "6em",
                  fontSize: "8px",
                  color: "black",
                  background: "#5D5CB0",
                }}
              >
                Culture & Entertainment
              </Button>
            )}
          </div>
        </Pc>
        <Mobile>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              {categoryArray[0] ? (
                <Button
                  onClick={buttonToggleArrayElement}
                  variant="text"
                  size="small"
                  name="Currency"
                  sx={{
                    width: "12.5em",
                    height: "6em",
                    margin: "0.3rem 0.5rem",
                    fontSize: "8px",
                    color: "#FFB404",
                    border: "1px solid #FFB404",
                  }}
                >
                  Currency
                </Button>
              ) : (
                <Button
                  onClick={buttonToggleArrayElement}
                  variant="contained"
                  size="small"
                  name="Currency"
                  sx={{
                    width: "12.5em",
                    height: "6em",
                    margin: "0.3rem 0.5rem",
                    fontSize: "8px",
                    color: "black",
                    background: "#FFB404",
                  }}
                >
                  Currency
                </Button>
              )}
            </div>
            <div>
              {categoryArray[1] ? (
                <Button
                  onClick={buttonToggleArrayElement}
                  variant="text"
                  size="small"
                  name="Smart Contract Platform"
                  sx={{
                    width: "12.5em",
                    height: "6em",
                    margin: "0.3rem 0.5rem",
                    fontSize: "8px",
                    color: "#BCCF5F",
                    border: "1px solid #BCCF5F",
                  }}
                >
                  Smart Contract Platform
                </Button>
              ) : (
                <Button
                  onClick={buttonToggleArrayElement}
                  variant="contained"
                  size="small"
                  name="Smart Contract Platform"
                  sx={{
                    width: "12.5em",
                    margin: "0.3rem 0.5rem",
                    height: "6em",
                    fontSize: "8px",
                    color: "black",
                    background: "#BCCF5F",
                  }}
                >
                  Smart Contract Platform
                </Button>
              )}
            </div>
            <div>
              {categoryArray[2] ? (
                <Button
                  onClick={buttonToggleArrayElement}
                  variant="text"
                  size="small"
                  name="Computing"
                  sx={{
                    width: "12.5em",
                    height: "6em",
                    margin: "0.3rem 0.5rem",
                    fontSize: "8px",
                    color: "#01EDA5",
                    border: "1px solid #01EDA5",
                  }}
                >
                  Computing
                </Button>
              ) : (
                <Button
                  onClick={buttonToggleArrayElement}
                  variant="contained"
                  size="small"
                  name="Computing"
                  sx={{
                    width: "12.5em",
                    margin: "0.3rem 0.5rem",
                    height: "6em",
                    fontSize: "8px",
                    color: "black",
                    background: "#01EDA5",
                  }}
                >
                  Computing
                </Button>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              {categoryArray[3] ? (
                <Button
                  onClick={buttonToggleArrayElement}
                  variant="text"
                  size="small"
                  name="DeFi"
                  sx={{
                    width: "12.5em",
                    height: "6em",
                    margin: "0.3rem 0.5rem",
                    fontSize: "8px",
                    color: "#24C6FE",
                    border: "1px solid #24C6FE",
                  }}
                >
                  DeFi
                </Button>
              ) : (
                <Button
                  onClick={buttonToggleArrayElement}
                  size="small"
                  variant="contained"
                  name="DeFi"
                  sx={{
                    width: "12.5em",
                    margin: "0.3rem 0.5rem",
                    height: "6em",
                    fontSize: "8px",
                    color: "black",
                    background: "#24C6FE",
                  }}
                >
                  DeFi
                </Button>
              )}
            </div>
            <div>
              {categoryArray[4] ? (
                <Button
                  onClick={buttonToggleArrayElement}
                  variant="text"
                  size="small"
                  name="Culture & Entertainment"
                  sx={{
                    width: "12.5em",
                    height: "6em",
                    margin: "0.3rem 0.5rem",
                    fontSize: "8px",
                    color: "#5D5CB0",
                    border: "1px solid #5D5CB0",
                  }}
                >
                  Culture & Entertainment
                </Button>
              ) : (
                <Button
                  onClick={buttonToggleArrayElement}
                  variant="contained"
                  size="small"
                  name="Culture & Entertainment"
                  sx={{
                    width: "12.5em",
                    margin: "0.3rem 0.5rem",
                    height: "6em",
                    fontSize: "8px",
                    color: "black",
                    background: "#5D5CB0",
                  }}
                >
                  Culture & Entertainment
                </Button>
              )}
            </div>
          </div>
        </Mobile>
      </>
    );
  };

  const selectComponent = [<Index1d />, <Index1mo />, <Index1y />];

  const [expanded, setExpanded] = useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Pc>
        <div
          style={{
            position: "absolute",
            left: 0,
            backgroundColor: "#00297F",
            width: "calc(100vw - (100vw - 100%))",
            height: "20em",
          }}
        ></div>
        <MainContainer maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  height: "20em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ height: "2em" }} />
                <Typography
                  variant="h4"
                  sx={{ color: "white", marginBottom: "1rem" }}
                >
                  시장 동향
                </Typography>
                <Typography variant="body1" sx={{ color: "lightgrey" }}>
                  거시적 지표들을 통해 실시간으로 시장의 흐름을 파악하고
                </Typography>
                <Typography variant="body1" sx={{ color: "lightgrey" }}>
                  전통 금융 시장과 비교할 수 있습니다.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "5rem" }}>
              <Typography variant="h5" gutterBottom>
                S&P 500 vs CMC 200
              </Typography>
              <Typography
                align="left"
                gutterBottom
                component="div"
                sx={{ letterSpacing: 0.25, color: "#7F8487" }}
              >
                주식시장과 암호화폐 시장의 시세를 비교하는 지표입니다.
                <br />
                안전자산 대비 위험자산의 선호도, 주식과 암호화폐 간의 변동성
                비교, 두 자산간의 자금 유입도 등을 파악할 수 있습니다.
              </Typography>
              <ThemeProvider theme={theme}>
                <ToggleButtonGroup
                  value={snpRange}
                  onChange={snpButtonChange}
                  exclusive
                  sx={{ height: "2.5em" }}
                >
                  {/* <ToggleButton sx={{ color: "#7F8487" }} value="1d">
                    1D
                  </ToggleButton> */}
                  <ToggleButton sx={{ color: "#7F8487" }} value="1mo">
                    1M
                  </ToggleButton>
                  <ToggleButton sx={{ color: "#7F8487" }} value="1y">
                    1Y
                  </ToggleButton>
                </ToggleButtonGroup>
              </ThemeProvider>
              <p />
              {snpIndex !== null && <div>{selectComponent[snpIndex]}</div>}
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "5rem" }}>
              <Typography variant="h5" gutterBottom>
                카테고리별 인덱스
                <Tooltip
                  title="오른쪽 버튼을 눌러 섹터별 인덱스를 확인하세요!"
                  disableInteractive
                >
                  <IconButton>
                    <HelpOutlineIcon sx={{ fontSize: "large" }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Typography
                align="left"
                gutterBottom
                component="div"
                sx={{ letterSpacing: 0.25, color: "#7F8487" }}
              >
                Currency, Smart Contract Platform, Computing, DeFi, Culture &
                Entertainment의 5가지 섹터로 나누어 상위 10개 종목으로 구성한
                지수를 보여줍니다.
                <br />
                어떤 섹터의 코인/토큰들의 수익률이 우수한지 비교할 수 있으며,
                시세를 통해 어떤 산업이 강세인지를 파악할 수 있습니다.
              </Typography>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{ boxShadow: 0 }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography sx={{ fontSize: "1rem" }}>
                    카테고리 설명 보기
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    gutterBottom
                    variant="caption"
                    sx={{ color: "#7F8487" }}
                  >
                    Currency: BaaS, 스테이블 코인, 사설 화폐 등 <br />
                    Smart Contract Platform: 멀티체인, 싱글체인 <br />
                    Computing: IoT, 클라우드, 공유 네트워크, 공유 스토리지 등{" "}
                    <br />
                    DeFi: DAO, 파생, 거래소, 보험, 스테이킹 등 <br />
                    Culture & Entertainment: 예술, 미디어, 메타버스, NFT 등
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <ThemeProvider theme={theme}>
                <ToggleButtonGroup
                  value={categoryRange}
                  onChange={categoryButtonChange}
                  exclusive
                  sx={{ height: "2.5em" }}
                >
                  {/* <ToggleButton sx={{ color: "#7F8487" }} value="1d">
                    1D
                  </ToggleButton> */}
                  <ToggleButton sx={{ color: "#7F8487" }} value="1mo">
                    1M
                  </ToggleButton>
                  <ToggleButton sx={{ color: "#7F8487" }} value="1y">
                    1Y
                  </ToggleButton>
                </ToggleButtonGroup>
              </ThemeProvider>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  {/* {categoryIndex === 0 && <CategoryLineGraph1d {...props} />} */}
                  {categoryIndex === 1 && <CategoryLineGraph1mo {...props} />}
                  {categoryIndex === 2 && <CategoryLineGraph1y {...props} />}
                  {/* {categoryIndex === 3 && <CategoryLineGraph1d {...props} />} */}
                  {categoryIndex === 4 && <CategoryLineGraph1mo {...props} />}
                  {categoryIndex === 5 && <CategoryLineGraph1y {...props} />}
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
            <Grid item xs={12} sx={{ marginBottom: "5rem" }}>
              <Typography variant="h5" gutterBottom>
                공포 탐욕 지수
              </Typography>
              <Typography
                align="left"
                gutterBottom
                component="div"
                sx={{ letterSpacing: 0.25, color: "#7F8487" }}
              >
                투자자의 감정을 나타내는 지수로, 하락장에서는 공포가,
                상승장에서는 탐욕이 지배적입니다.
                <br />
                주식시장과 마찬가지로 선행지표이며, 보다 변동성이 심한 암호화폐
                시장에서 미래 동향을 유추할 수 있는 지표로 활용됩니다.
              </Typography>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{ boxShadow: 0 }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography sx={{ fontSize: "1rem" }}>
                    상태별 설명 보기
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    justifyContent="center"
                    sx={{ marginTop: "0.5rem" }}
                  >
                    <Card sx={{ minWidth: 200 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="#DBDFFD"
                          gutterBottom
                        >
                          매우 공포 (0~25)
                        </Typography>
                        <Typography variant="body2">
                          극심한 공포로 인해 과도하게 매도
                          <br />
                          {'"시장의 변동성 증가"'}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="#9BA3EB"
                          gutterBottom
                        >
                          공포 (26~45)
                        </Typography>
                        <Typography variant="body2">
                          자산 하락의 두려움이 생김
                          <br />
                          {'"거래량 증가, 자산 가격 하락"'}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="#646FD4"
                          gutterBottom
                        >
                          중립 (46~54)
                        </Typography>
                        <Typography variant="body2">
                          저항과 지지를 동시에 받음
                          <br />
                          {'"자산 가격 행보 예측 힘듦"'}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="#242F9B"
                          gutterBottom
                        >
                          탐욕 (55~75)
                        </Typography>
                        <Typography variant="body2">
                          매수에 대한 관심이 증가
                          <br />
                          {'"단기차익을 노린 투자자들이 투입"'}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 200 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="#210B61"
                          gutterBottom
                        >
                          매우 탐욕 (76~100)
                        </Typography>
                        <Typography variant="body2">
                          매수에 대한 관심이 매우 증가
                          <br />
                          {'"시장의 변동성 증가"'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <FearandGreed />
            </Grid>
          </Grid>
        </MainContainer>
      </Pc>
      {/* Mobile */}
      <Mobile>
        <div
          style={{
            position: "absolute",
            left: 0,
            backgroundColor: "#00297F",
            width: "calc(100vw - (100vw - 100%))",
            height: "20em",
          }}
        ></div>
        <MainContainer maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  height: "20em",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ height: "2em" }} />
                <Typography
                  variant="h4"
                  sx={{ color: "white", marginBottom: "1rem" }}
                >
                  시장 동향
                </Typography>
                <Typography variant="body1" sx={{ color: "lightgrey" }}>
                  거시적 지표들을 통해 실시간으로 시장의 흐름을 파악하고
                </Typography>
                <Typography variant="body1" sx={{ color: "lightgrey" }}>
                  전통 금융 시장과 비교할 수 있습니다.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7" gutterBottom>
                S&P 500 vs CMC 200
              </Typography>
              <Typography
                align="left"
                gutterBottom
                component="div"
                sx={{ letterSpacing: 0.25, color: "#7F8487", fontSize: "80%" }}
              >
                주식시장과 암호화폐 시장의 시세를 비교하는 지표입니다.
                <br />
                안전자산 대비 위험자산의 선호도, 주식과 암호화폐 간의 변동성
                비교, 두 자산간의 자금 유입도 등을 파악할 수 있습니다.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ThemeProvider theme={theme}>
                  <ToggleButtonGroup
                    value={snpRange}
                    onChange={snpButtonChange}
                    exclusive
                    sx={{ height: "2.5em" }}
                  >
                    {/* <ToggleButton sx={{ color: "#7F8487" }} value="1d">
                      1D
                    </ToggleButton> */}
                    <ToggleButton sx={{ color: "#7F8487" }} value="1mo">
                      1M
                    </ToggleButton>
                    <ToggleButton sx={{ color: "#7F8487" }} value="1y">
                      1Y
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ThemeProvider>
              </div>
              <p />
            </Grid>
            <Grid item xs={12}>
              {snpIndex !== null && <div>{selectComponent[snpIndex]}</div>}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7" gutterBottom>
                카테고리별 인덱스
                <Tooltip
                  title="아래 버튼을 눌러 섹터별 인덱스를 확인하세요!"
                  disableInteractive
                >
                  <IconButton>
                    <HelpOutlineIcon sx={{ fontSize: "large" }} />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                align="left"
                gutterBottom
                component="div"
                sx={{ letterSpacing: 0.25, color: "#7F8487", fontSize: "80%" }}
              >
                Currency, Smart Contract Platform, Computing, DeFi, Culture &
                Entertainment의 5가지 섹터로 나누어 상위 10개 종목으로 구성한
                지수를 보여줍니다. 어떤 섹터의 코인/토큰들의 수익률이 우수한지
                비교할 수 있으며, 시세를 통해 어떤 산업이 강세인지를 파악할 수
                있습니다.
              </Typography>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{ boxShadow: 0 }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography sx={{ fontSize: "0.5rem" }}>
                    카테고리 설명 보기
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    align="left"
                    gutterBottom
                    variant="caption"
                    sx={{ color: "#7F8487" }}
                  >
                    Currency: BaaS, 스테이블 코인, 사설 화폐 등 <br />
                    Smart Contract Platform: 멀티체인, 싱글체인 <br />
                    Computing: IoT, 클라우드, 공유 네트워크, 공유 스토리지 등{" "}
                    <br />
                    DeFi: DAO, 파생, 거래소, 보험, 스테이킹 등 <br />
                    Culture & Entertainment: 예술, 미디어, 메타버스, NFT 등
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ThemeProvider theme={theme}>
                  <ToggleButtonGroup
                    value={categoryRange}
                    onChange={categoryButtonChange}
                    exclusive
                    sx={{ height: "2.5em" }}
                  >
                    {/* <ToggleButton sx={{ color: "#7F8487" }} value="1d">
                      1D
                    </ToggleButton> */}
                    <ToggleButton sx={{ color: "#7F8487" }} value="1mo">
                      1M
                    </ToggleButton>
                    <ToggleButton sx={{ color: "#7F8487" }} value="1y">
                      1Y
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ThemeProvider>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div>
                {/* {categoryIndex === 0 && <CategoryLineGraph1d {...props} />} */}
                {categoryIndex === 1 && <CategoryLineGraph1mo {...props} />}
                {categoryIndex === 2 && <CategoryLineGraph1y {...props} />}
                {/* {categoryIndex === 3 && <CategoryLineGraph1d {...props} />} */}
                {categoryIndex === 4 && <CategoryLineGraph1mo {...props} />}
                {categoryIndex === 5 && <CategoryLineGraph1y {...props} />}
              </div>
            </Grid>
            <Grid item xs={12}>
              <CategoryButton />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7" gutterBottom>
                공포 탐욕 지수
              </Typography>

              <Typography
                align="left"
                gutterBottom
                component="div"
                sx={{ letterSpacing: 0.25, color: "#7F8487", fontSize: "80%" }}
              >
                투자자의 감정을 나타내는 지수로, 하락장에서는 공포가,
                상승장에서는 탐욕이 지배적입니다.
                <br />
                주식시장과 마찬가지로 선행지표이며, 보다 변동성이 심한 암호화폐
                시장에서 미래 동향을 유추할 수 있는 지표로 활용됩니다.
              </Typography>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
                sx={{ boxShadow: 0 }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography sx={{ fontSize: "0.5rem" }}>
                    상태별 설명 보기
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="caption"
                    sx={{ color: "#7F8487" }}
                    gutterBottom
                  >
                    매우 공포 (0~25): 극심한 공포로 인해 과도하게 매도
                    <br />
                    공포 (26~45): 자산 하락의 두려움이 생김
                    <br />
                    중립 (46~54): 저항과 지지를 동시에 받음
                    <br />
                    탐욕 (55~75):매수에 대한 관심이 증가
                    <br />
                    매우 탐욕 (76~100): 매수에 대한 관심이 매우 증가
                    <br />
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item xs={12}>
              <FearandGreed />
            </Grid>
          </Grid>
        </MainContainer>
      </Mobile>
    </>
  );
}
export default Marketpage;
