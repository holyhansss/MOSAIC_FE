import React, {useState} from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import PromisingCard from "../components/PromisingCoin/PromisingCard";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

export default function PromisingList({ crypto, crypto_filter }) {

  const [filter, setFilter] = useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          backgroundColor: "#3C1A7D",
          background: 'linear-gradient(45deg, #3C1A7D 30%, #5C4D82 80%)',
          width: "calc(100vw - (100vw - 100%))",
          height: "20em",
        }}
      ></div>
      <MainContainer maxWidth="lg">
        <Grid container spacing={3}>
        <Grid item xs={6}>
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
                variant="h3"
                sx={{ color: "white", marginBottom: "1rem" }}
              >
                유망 코인
              </Typography>
              <Typography variant="h5" sx={{ color: "lightgrey" }}>
                Mosaic이 발굴한 유망 코인을 만나보세요!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                height: "20em",
                display: "flex",
                flexDirection: "raw",
                justifyContent: "center",
              }}
            >
              <img
                  src="https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/service_info%2Fundraw_content_structure_re_ebkv.svg?alt=media&token=3b215805-8336-4fc5-9875-71666030ae34"
                  alt="Promising"
                  width={200}
                />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" gutterBottom>
              유망코인 리스트
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ minWidth: 120 }} display="flex" justifyContent="flex-end">
              <FormControl sx={{ minWidth: 120 }} >
                <InputLabel id="demo-simple-select-label">정렬</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  label="정렬"
                  onChange={handleChange}
                >
                  <MenuItem value={'최신 순'}>최신 순</MenuItem>
                  <MenuItem value={'순위 순'}>순위 순</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {
            filter === "순위 순" ? (
              <Grid container spacting={1}>
                {crypto_filter !== null &&
                  crypto_filter.map(
                    (content, index) =>
                      content.promising === true && (
                        <Grid
                          item
                          xs={12}
                          md={5}
                          lg={4}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <PromisingCard crypto={content} key={index} />
                        </Grid>
                      )
                  )}
              </Grid>
            ) : (
              <Grid container spacting={1}>
                {crypto !== null &&
                  crypto.map(
                    (content, index) =>
                      content.promising === true && (
                        <Grid
                          item
                          xs={12}
                          md={5}
                          lg={4}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <PromisingCard crypto={content} key={index} />
                        </Grid>
                      )
                  )}
              </Grid>

            )
          }
          </Grid>
        </Grid>
      </MainContainer>
    </>
  );
}
