import React from "react";
import { Grid, Tooltip, IconButton, LinearProgress } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { COIN_CRITERIA, COIN_SCORE, COIN_DESCRIPTION, TOKEN_CRITERIA, TOKEN_SCORE, TOKEN_DESCRIPTION } from "../../constants/constants";

//Responsive Web
import {Pc, Mobile} from "../Responsive/Responsive";

export default function PromisingScore({
  type,
  score1,
  score2,
  score3,
  score4,
}) {

  return (
    <>
    <Pc>
      {type === "coin" ? (
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <>{COIN_CRITERIA[0]}</>
              <Tooltip title={COIN_DESCRIPTION[0]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score1 / COIN_SCORE) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
              {Math.round((score1 / COIN_SCORE) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{COIN_CRITERIA[1]}</>
              <Tooltip title={COIN_DESCRIPTION[1]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score2 / COIN_SCORE) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
            {Math.round((score2 / COIN_SCORE) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{COIN_CRITERIA[2]}</>
              <Tooltip title={COIN_DESCRIPTION[2]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score3 / COIN_SCORE) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
            {Math.round((score3 / COIN_SCORE) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{COIN_CRITERIA[3]}</>
              <Tooltip title={COIN_DESCRIPTION[3]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score4 / COIN_SCORE) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
             {Math.round((score4 / COIN_SCORE) * 100)}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <>{TOKEN_CRITERIA[0]}</>
              <Tooltip title={TOKEN_DESCRIPTION[0]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score1 / TOKEN_SCORE[0]) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
             {Math.round((score1 / TOKEN_SCORE[0]) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{TOKEN_CRITERIA[1]}</>
              <Tooltip title={TOKEN_DESCRIPTION[1]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score2 / TOKEN_SCORE[1]) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
            {Math.round((score2 / TOKEN_SCORE[1]) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{TOKEN_CRITERIA[2]}</>
              <Tooltip title={TOKEN_DESCRIPTION[2]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score3 / TOKEN_SCORE[2]) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
            {Math.round((score3 / TOKEN_SCORE[2]) * 100)} 
            </Grid>
          </Grid>
        </Grid>
        
      )}
      </Pc>
      <Mobile>
      {type === "coin" ? (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <>{COIN_CRITERIA[0]}</>
              <Tooltip title={COIN_DESCRIPTION[0]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score1 / COIN_SCORE) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
              {Math.round((score1 / COIN_SCORE) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{COIN_CRITERIA[1]}</>
              <Tooltip title={COIN_DESCRIPTION[1]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score2 / COIN_SCORE) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
            {Math.round((score2 / COIN_SCORE) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{COIN_CRITERIA[2]}</>
              <Tooltip title={COIN_DESCRIPTION[2]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score3 / COIN_SCORE) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
            {Math.round((score3 / COIN_SCORE) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{COIN_CRITERIA[3]}</>
              <Tooltip title={COIN_DESCRIPTION[3]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score4 / COIN_SCORE) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
             {Math.round((score4 / COIN_SCORE) * 100)}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <>{TOKEN_CRITERIA[0]}</>
              <Tooltip title={TOKEN_DESCRIPTION[0]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score1 / TOKEN_SCORE[0]) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
             {Math.round((score1 / TOKEN_SCORE[0]) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{TOKEN_CRITERIA[1]}</>
              <Tooltip title={TOKEN_DESCRIPTION[1]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score2 / TOKEN_SCORE[1]) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
            {Math.round((score2 / TOKEN_SCORE[1]) * 100)} 
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item xs={3}>
              <>{TOKEN_CRITERIA[2]}</>
              <Tooltip title={TOKEN_DESCRIPTION[2]} disableInteractive>
                <IconButton>
                  <HelpOutlineIcon sx={{ fontSize: "medium" }} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={7}>
              <LinearProgress
                variant="determinate"
                value={(score3 / TOKEN_SCORE[2]) * 100}
                sx={{ borderRadius: "100px", height: "1.5em" }}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "end" }}>
            {Math.round((score3 / TOKEN_SCORE[2]) * 100)} 
            </Grid>
          </Grid>
        </Grid>
        
      )}
      </Mobile>
    </>
  );
}
