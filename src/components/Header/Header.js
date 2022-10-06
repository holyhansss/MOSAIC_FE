import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../firebase";
import { Container, Grid } from "@mui/material";

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

const NavMain = styled.div`
  font-size: 1.5em;
`;

function Header({ user, admin }) {
  return (
    <HeaderContainer>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{ diplay: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3} md={1.5} lg={2} alignItems="center">
            <StyledLink to="/">
              <NavMain>MOSAIC</NavMain>
            </StyledLink>
          </Grid>
          <Grid
            item
            xs={7}
            md={6.5}
            lg={4}
            sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
          >
            <Grid item>
              <StyledLink to="/ranking">Mosaic 순위</StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/promising">유망 코인</StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/market">시장 동향</StyledLink>
            </Grid>
            <Grid item>
              <StyledLink to="/reportMain">리포트</StyledLink>
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
                <NavDropdown.Item>
                  <StyledLink to="/profile">마이페이지</StyledLink>
                </NavDropdown.Item>
                {admin === true && (
                  <NavDropdown.Item>
                    <StyledLink
                      to={{
                        pathname: "/admin",
                        state: { user: user },
                      }}
                    >
                      관리자
                    </StyledLink>
                  </NavDropdown.Item>
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
  );
}

export default Header;
