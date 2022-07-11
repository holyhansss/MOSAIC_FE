// import styles from '../styles/header.module.css';
// import Header from '../components/Header.js';
// import Footer from '../components/Footer.js';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { signInWithGoogle, signInWithEmail } from '../firebase';
import gooLogo from '../img/logo_google.png';

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
        <div>
            <Container>
                <div>
                    <div>
                        <div>로그인</div>
                        <form onSubmit={onSubmit}>
                            <input
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                placeholder='아이디(이메일)'
                                required
                            /><br/>
                            <input
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder='비밀번호'
                                required
                            /><br/>
                            <button type="submit" >로그인</button>
                        </form>
                        <div>
                            <span>비밀번호 찾기</span><span>         </span>
                            <Link to='/join'>
                                <button>회원가입</button>
                            </Link>
                        </div>
                        <button onClick={signInWithGoogle}>
                            <img width={30} height={30} src={gooLogo} />
                            구글 아이디로 로그인
                        </button>
                    </div>
                </div>
            </Container>
        </div>

    );
}

export default Login;