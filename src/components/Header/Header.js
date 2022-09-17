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
  background-color: #f2f2f2;
  height: 4rem;
  display: flex;
  align-items: center;
`;

const NavMain = styled.div`
  font-size: 1.5em;
`;

function Header({ user, admin }) {
  return (
    <HeaderContainer>
      <Container
        maxWidth="lg"
        disableGutters="true"
        sx={{ diplay: "flex", alignItems: "center" }}
      >
        <Grid container alignItems="center">
          <Grid item md={2} alignItems="center">
            <StyledLink to="/">
              <NavMain>MOSAIC</NavMain>
            </StyledLink>
          </Grid>
          <Grid container direction="row" alignItems="center" md={8}>
            <Grid item md={2}>
              <StyledLink to="/promising">유망 코인</StyledLink>
            </Grid>
            <Grid item md={2}>
              <StyledLink to="/market">시장 동향</StyledLink>
            </Grid>
            <Grid item md={2}>
              <StyledLink to="/reportList">리포트</StyledLink>
            </Grid>
          </Grid>
          <Grid container md={2} alignItems="center" justifyContent="flex-end">
            <Grid item>
              {user != null ? (
                <NavDropdown
                  menuVariant="dark"
                  title={
                    <img
                      referrerpolicy="no-referrer"
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
        </Grid>
        {/* <NavSideContainer>
          <StyledLink to="/">
            <NavMain>MOSAIC</NavMain>
          </StyledLink>
        </NavSideContainer>
        <NavCenterContainer>
          <NavMenuContainer>
            <StyledLink to="/promising">
              유망 코인
            </StyledLink>
          </NavMenuContainer>
          <NavMenuContainer>
            <StyledLink to="/market">
              시장 동향
            </StyledLink>
          </NavMenuContainer>
          <NavMenuContainer>
            <StyledLink to="/reportList">
              리포트
            </StyledLink>
          </NavMenuContainer>
        </NavCenterContainer>
        <NavSideContainer>
          {user != null ? (
            <NavDropdown
              menuVariant="dark"
              title={
                <img
                  referrerpolicy="no-referrer"
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
        </NavSideContainer> */}
      </Container>
    </HeaderContainer>
  );
}

export default Header;
