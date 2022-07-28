import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FormControl, Button, ButtonGroup } from '@mui/material';
import { signInWithGoogle, signInWithEmail } from '../firebase';
// import { Box } from '@mui/material';
import styled from 'styled-components';
import gooLogo from '../img/logo_google.png';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Box = styled(Container)`
    width: 450px;
    height: 450px;
    border-radius: 10px;
    margin-top: 2rem;
    border: 1px solid white;
    display: flex;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
`;

const Input = styled.input`
    border-style: hidden hidden solid;
    border-bottom: 1px solid white;
    width: 13rem;
    background-color: transparent;
    margin: 1.0rem 0;
`;

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
            <Container>
                <Box>
                    <Form onSubmit={onSubmit}>
                        <label style={{
                            fontSize: '1.5rem',
                            color: 'white',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem'
                        }}>로그인</label>
                        <Input
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            id="input-id"
                            placeholder="아이디(이메일)"
                            required
                        />
                        <Input
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleOnChange}
                            id="input-password"
                            placeholder="비밀번호"
                            required
                        />
                        <Button sx={{margin:'0.1rem'}} variant="contained" type="submit" >로그인</Button>
                        <ButtonGroup sx={{margin:'0.8rem'}} variant="contained" aria-label="login page button group">
                            <Button sx={{color:'white'}} size='small' variant='text'>아이디 찾기</Button>
                            <Button sx={{color:'white'}} size='small' variant='text'>비밀번호 찾기</Button>
                            <Button sx={{color:'white'}} size='small' variant='text'><Link to='/join'>회원가입</Link></Button>
                        </ButtonGroup>
                        <Button sx={{margin:'0.8rem', backgroundColor: 'white', color: 'black', borderColor:'white'}} size="large" variant="outlined" onClick={signInWithGoogle}>
                            <img alt="Google" width={30} height={30} src={gooLogo} />
                            구글 아이디로 로그인
                        </Button>
                    </Form>
                </Box>
            </Container>
        </>
    );
}

export default Login;