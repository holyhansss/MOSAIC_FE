import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signInWithGoogle, signInWithEmail } from "../firebase";
import styled from "styled-components";
import gooLogo from "../img/logo_google.png";
import { StyledLink } from "../components/Header/Header";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
`;

export const Box = styled(Container)`
  width: 450px;
  height: 450px;
  border-radius: 10px;
  margin: 2rem 0 4rem 0;
  border: 1px solid darkgrey;
  display: flex;
  box-shadow: 1px 1px 10px grey;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  border-style: hidden hidden solid;
  border-bottom: 1px solid darkgrey;
  width: 13rem;
  height: 2rem;
  background-color: transparent;
  margin: 0.8rem 0;
  font-weight: lighter;
`;

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#000",
    },
    secondary: {
      main: "#fff",
      contrastText: "#000"
    }
  },
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const signInResult = signInWithEmail(email, password);
  };

  const handleOnChange = (e) => {
    const type = e.target.name;
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <Container>
        <Box>
          <Form onSubmit={onSubmit}>
            <label
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
              }}
            >
              로그인
            </label>
            <ThemeProvider theme={theme}>
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
              <Button
                sx={{
                  margin: "0.5rem 0.1rem 0.1rem",
                }}
                variant="contained"
                type="submit"
                color="secondary"
              >
                로그인
              </Button>
              <ButtonGroup
                sx={{ margin: "0.8rem" }}
                variant="text"
                aria-label="login page button group"
              >
                <Button size="small">아이디 찾기</Button>
                <Button size="small">비밀번호 찾기</Button>
                <Button size="small">
                  <StyledLink to="/join">회원 가입</StyledLink>
                </Button>
              </ButtonGroup>
              <Button
                sx={{
                  margin: "1.8rem",
                  height: "3.5rem",
                }}
                size="large"
                variant="contained"
                onClick={signInWithGoogle}
                color="secondary"
              >
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
