// import styles from '../styles/header.module.css';
// import Header from '../components/Header.js';
// import Footer from '../components/Footer.js';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { Container, Form, Button, ButtonGroup } from 'react-bootstrap';

import { signInWithGoogle, signInWithEmail } from '../firebase';
import gooLogo from '../img/logo_google.png';
import Header from '../components/Header/Header';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        signInWithEmail(email, password);
    };

    const handleOnChange = (e) => {
        const type = e.target.name;
        if (type === "email") {
            setEmail(e.target.value);
        } else if (type === "password") {
            setPassword(e.target.value);
        }
    };

    return(
        <>
            {/* <Header /> */}
            <Container>
                <Form
                    onSubmit={onSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContents: 'center',
                        alignItems: 'center'  
                    }}
                    className="mt-5"
                >
                    <Form.Label>로그인</Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            placeholder='아이디(이메일)'
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder='비밀번호'
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" >로그인</Button> <br/>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="light">아이디 찾기</Button>
                        <Button variant="light">비밀번호 찾기</Button>
                        <Link to='/join'>
                            <Button variant="primary">회원가입</Button>
                        </Link>
                    </ButtonGroup> <br/><br/>
                    <Button variant="light" onClick={signInWithGoogle}>
                        <img alt="Google" width={30} height={30} src={gooLogo} />
                        구글 아이디로 로그인
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default Login;