// import styles from '../styles/header.module.css';
// import Header from '../components/Header.js';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react';
// import Footer from '../components/Footer.js';
import { Container } from 'react-bootstrap';
import { signInWithGoogle } from '../firebase';

function Login() {
    return(
        <div>
            <Container>
                <div>
                    <div>
                        <div>로그인</div>
                        <form method="POST">
                            <input type="text" placeholder='ID'></input><br/>
                            <input type="text" placeholder='PASSWORD'></input><br/>
                            <button type="submit" >로그인</button>
                        </form>
                        <div><span>비밀번호 찾기</span><span>         </span><span>회원가입</span></div>
                        <button onClick={signInWithGoogle}>Sign in with Google</button>
                    </div>
                </div>
            </Container>
        </div>

    );
}

export default Login;