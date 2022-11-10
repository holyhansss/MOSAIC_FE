import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../firebase";
import { Container, Grid, Typography } from "@mui/material";

//Responsive Web
import {Pc, Mobile} from "../Responsive/Responsive";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 200;
  background-color: #f2f2f2;
  height: 4rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  box-shadow: 0 2px 5px lightgrey;
`;

function Header({ user, admin }) {
  return (
    <>
    <Pc>
    <HeaderContainer>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ diplay: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3} md={2.5} lg={2} alignItems="center">
            <StyledLink to="/">
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/main_logo%2Ffavicon.png?alt=media&token=20eb3567-702e-4f24-a985-823060370a14"
                  alt="main"
                  width="30"
                  height="30"
                />
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.2em",
                    marginLeft: "0.2rem",
                  }}
                >
                  MOSAIC
                </Typography>
              </Grid>
            </StyledLink>
          </Grid>
          <Grid
            item
            xs={7}
            md={5.5}
            lg={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid item>
              <StyledLink to="/ranking">
                <Typography>Mosaic 순위</Typography>
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/promising">
                <Typography>유망 코인</Typography>
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/market">
                <Typography>시장 동향</Typography>
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/reportMain">
                <Typography>리포트</Typography>
              </StyledLink>
            </Grid>
          </Grid>
          <Grid
            item
            xs={0}
            md={2.5}
            lg={4}
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          />
          <Grid
            item
            xs={2}
            md={1.5}
            lg={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {user != null ? (
              <NavDropdown
                title={
                  <img
                    referrerPolicy="no-referrer"
                    src={user.photoURL}
                    alt=""
                    style={{ borderRadius: "50%" }}
                    width="30"
                    height="30"
                  />
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">마이페이지</NavDropdown.Item>
                {admin === true && (
                  <NavDropdown.Item href="/admin">관리자</NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <StyledLink to="/login">로그인</StyledLink>
            )}
          </Grid>
        </Grid>
      </Container>
    </HeaderContainer>
    </Pc>
    <Mobile>
    <HeaderContainer>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ diplay: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3} md={2.5} lg={2} alignItems="center">
            <StyledLink to="/">
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/main_logo%2Ffavicon.png?alt=media&token=20eb3567-702e-4f24-a985-823060370a14"
                  alt="main"
                  width="30"
                  height="30"
                />
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.2em",
                    marginLeft: "0.2rem",
                  }}
                >
                  MOSAIC
                </Typography>
              </Grid>
            </StyledLink>
          </Grid>
          <Grid
            item
            xs={6}
            md={5.5}
            lg={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Grid item>
              <StyledLink to="/ranking">
                <Typography sx={{fontSize:"75%"}}>Mosaic 순위</Typography>
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/promising">
                <Typography sx={{fontSize:"75%"}}>유망 코인</Typography>
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/market">
                <Typography sx={{fontSize:"75%"}}>시장 동향</Typography>
              </StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/reportMain">
                <Typography sx={{fontSize:"75%"}}>리포트</Typography>
              </StyledLink>
            </Grid>
          </Grid>
          <Grid
            item
            xs={0}
            md={2.5}
            lg={4}
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          />
          <Grid
            item
            xs={2.5}
            md={1.5}
            lg={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {user != null ? (
              <NavDropdown
                title={
                  <img
                    referrerPolicy="no-referrer"
                    src={user.photoURL}
                    alt=""
                    style={{ borderRadius: "50%" }}
                    width="30"
                    height="30"
                  />
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">마이페이지</NavDropdown.Item>
                {admin === true && (
                  <NavDropdown.Item href="/admin">관리자</NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <StyledLink to="/login">로그인</StyledLink>
            )}
          </Grid>
        </Grid>
      </Container>
    </HeaderContainer>
    </Mobile>
    </>
  );
}

export default Header;
