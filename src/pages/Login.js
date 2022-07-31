import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithGoogle, signInWithEmail } from '../firebase';
import styled from 'styled-components';
import gooLogo from '../img/logo_google.png';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Box = styled(Container)`
    width: 450px;
    height: 450px;
    border-radius: 10px;
    margin-top: 2rem;
    border: 1px solid white;
    display: flex;
    box-shadow: 1px 1px 10px grey;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
`;

export const Input = styled.input`
    border-style: hidden hidden solid;
    border-bottom: 1px solid white;
    width: 13rem;
    height: 2rem;
    background-color: transparent;
    margin: 0.8rem 0;
    color: white;
    font-weight: lighter;
`;

export const theme = createTheme({
	palette: {
		primary: {
            main: '#ffffff',
            contrastText: '#000000',
        },
	},
});

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
                        <ThemeProvider theme={theme}>
                            <Input
                                sx={{color:'white'}}
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                id="input-id"
                                placeholder="아이디(이메일)"
                                required
                            />
                            <Input
                                sx={{color:'white'}}
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleOnChange}
                                id="input-password"
                                placeholder="비밀번호"
                                required
                            />                      
                            <Button sx={{margin:'0.5rem 0.1rem 0.1rem'}} variant="contained" type="submit" >로그인</Button>
                            <ButtonGroup sx={{margin:'0.8rem'}} variant='text' aria-label="login page button group">
                                <Button sx={{color:'white'}} size='small'>아이디 찾기</Button>
                                <Button sx={{color:'white'}} size='small'>비밀번호 찾기</Button>
                                <Button sx={{color:'white'}} size='small'><Link to='/join'>회원 가입</Link></Button>
                            </ButtonGroup>
                            <Button sx={{margin:'1.8rem', borderColor:'white', height:'3.5rem'}} size="large" variant="contained" onClick={signInWithGoogle}>
                                <img alt="Google" width={30} height={30} src={gooLogo} />
                                구글 아이디로 로그인
                            </Button>
                        </ThemeProvider>
                    </Form>
                </Box>
            </Container>
        </>
    );
}

export default Login;