import React, { useState } from "react";
import { signUpWithEmailAndPassword } from "../firebase";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Box, Form, Input, theme } from "./Login";

function Join() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(true);

  const handleOnChange = (e) => {
    const type = e.target.name;
    if (type === "name") {
      setName(e.target.value);
    } else if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    } else if (type === "passwordCheck") {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      setPasswordError(true);
    } else if (email !== "") {
      signUpWithEmailAndPassword(email, password, name);
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
                color: "white",
                fontWeight: "bold",
                marginBottom: "1.2rem",
              }}
            >
              회원가입
            </label>
            <Input
              sx={{ color: "white" }}
              name="name"
              value={name}
              onChange={handleOnChange}
              id="input-name"
              placeholder="이름"
              required
            />
            <Input
              sx={{ color: "white" }}
              name="email"
              value={email}
              onChange={handleOnChange}
              id="input-email"
              placeholder="이메일"
              required
            />
            <Input
              sx={{ color: "white" }}
              name="password"
              value={password}
              onChange={handleOnChange}
              type="password"
              id="input-password"
              placeholder="비밀번호"
              required
            />
            <Input
              sx={{ color: "white" }}
              name="passwordCheck"
              value={passwordCheck}
              onChange={handleOnChange}
              type="password"
              id="input-password-check"
              placeholder="비밀번호 확인"
              required
            />
            <ThemeProvider theme={theme}>
              {" "}
              {passwordError ? (
                <Button
                  sx={{ marginTop: "1.2rem" }}
                  variant="contained"
                  onClick={() =>
                    alert("비밀번호 확인란을 정확히 입력해주세요.")
                  }
                >
                  회원가입
                </Button>
              ) : (
                <Button
                  sx={{ marginTop: "1.2rem" }}
                  variant="contained"
                  type="submit"
                >
                  회원가입
                </Button>
              )}
            </ThemeProvider>
          </Form>
        </Box>
      </Container>
    </>
  );
}

export default Join;
