import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../firebase";

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
  return (
    <Container>
      <Navbar>
        <NavSideContainer>
          <Link to="/">
            <NavMain>MOSAIC</NavMain>
          </Link>
        </NavSideContainer>
        <NavCenterContainer>
          <NavMenuContainer>
            <Link to="/">
              <NavMenu>홈</NavMenu>
            </Link>
          </NavMenuContainer>
          <NavMenuContainer>
            <Link to="/market">
              <NavMenu>시장 동향</NavMenu>
            </Link>
          </NavMenuContainer>
          <NavMenuContainer>
            <Link to="/reportList">
              <NavMenu>리포트</NavMenu>
            </Link>
          </NavMenuContainer>
        </NavCenterContainer>
        <NavSideContainer>
          {user !== null ? (
            <NavDropdown
              menuVariant="dark"
              title={
                <img
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
                <Link to="/profile">마이페이지</Link>
              </NavDropdown.Item>
              {admin === true && (
                <NavDropdown.Item>
                  <Link
                    to={{
                      pathname: "/admin",
                      state: { user: user },
                    }}
                  >
                    관리자
                  </Link>
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </NavSideContainer>
      </Navbar>
    </Container>
  );
}

export default Header;
