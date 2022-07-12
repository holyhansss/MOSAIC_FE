import React from "react";
import { Container, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import DefaultImg from '../../img/profile.png';
import { auth, logout } from '../../firebase';

function Header() {
    let isLogin = sessionStorage.getItem("isLogin");
    let profile = sessionStorage.getItem("profilePic");

    const onError = (e) => {
        e.target.onerror = null;
        e.target.src = DefaultImg;
    };

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Col className="md-4">
                        <Navbar.Brand href="/">MOSAIC</Navbar.Brand>
                    </Col>
                    <Col className="md-4">
                        <Nav className="justify-content-around"> 
                            <Nav.Link href="/">홈</Nav.Link>
                            <Nav.Link href="/market">시장 동향</Nav.Link>
                            <Nav.Link href="/report">리포트</Nav.Link>
                        </Nav>
                    </Col>
                    <Col className="md-4">
                        <Nav className="justify-content-end"> 
                            {
                                isLogin ==='true' ? 
                                (
                                    <NavDropdown title={<img src={profile?profile:DefaultImg} width="30" height="30" onError={onError}/>} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">마이페이지</NavDropdown.Item>
                                        <NavDropdown.Item onClick={logout}>로그아웃</NavDropdown.Item>
                                    </NavDropdown>
                                ) :
                                <Nav.Link href="/login">로그인</Nav.Link>   
                            }
                        </Nav>
                    </Col>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;