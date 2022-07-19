import React from "react";
import { Container, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logout } from '../../firebase';

function Header() {
    const isLogin = sessionStorage.getItem("isLogin");
    const profile = sessionStorage.getItem("profilePic");

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Col lg="4">
                        <Navbar.Brand href="/">MOSAIC</Navbar.Brand>
                    </Col>
                    <Col lg="4" md="6">
                        <Nav className="justify-content-around"> 
                            <Nav.Link href="/">홈</Nav.Link>
                            <Nav.Link href="/market">시장 동향</Nav.Link>
                            <Nav.Link href="/reportList">리포트</Nav.Link>
                        </Nav>
                    </Col>
                    <Col lg="4" >
                        <Nav className="justify-content-end"> 
                            {
                                isLogin ==='true' ? 
                                (
                                    <NavDropdown title={<img alt="profile" style={{borderRadius:'50%'}} src={profile} width="30" height="30"/>} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/profile">마이페이지</NavDropdown.Item>
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