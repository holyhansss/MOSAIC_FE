import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../firebase";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 15vh;
  z-index: 2;
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
  height: 80%;
  border: 1px solid white;
  border-radius: 20px;
`;

const NavSideContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavCenterContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 40%;
    height: 100%
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavMain = styled.div`
  color: white;
  font-size: 1.5em;
`;

const NavMenuContainer = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavMenu = styled.div`
  color: white;
`;

const NavProfile = styled.img`
  border-radius: 50%;
`;

function Header({ user, admin }) {
  console.log(user)
  return (
    <Container>
      <Navbar>
        <NavSideContainer>
          <StyledLink to="/">
            <NavMain>MOSAIC</NavMain>
          </StyledLink>
        </NavSideContainer>
        <NavCenterContainer>
          <NavMenuContainer>
            <StyledLink to="/promising">
              <NavMenu>유망 코인</NavMenu>
            </StyledLink>
          </NavMenuContainer>
          <NavMenuContainer>
            <StyledLink to="/market">
              <NavMenu>시장 동향</NavMenu>
            </StyledLink>
          </NavMenuContainer>
          <NavMenuContainer>
            <StyledLink to="/reportList">
              <NavMenu>리포트</NavMenu>
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
        </NavSideContainer>
      </Navbar>
    </Container>
  );
}

export default Header;
