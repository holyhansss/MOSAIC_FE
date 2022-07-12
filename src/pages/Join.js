import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { signUpWithEmailAndPassword } from '../firebase';
import Header from '../components/Header/Header';


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
        if (password !== passwordCheck){
            setPasswordError(true);
        } else {
            email !== "" && signUpWithEmailAndPassword(email, password, name);
        }
    };

    return(
        <>
        <Header/>
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
                    <Form.Label>회원가입</Form.Label>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control
                            name="name"
                            value={name}
                            onChange={handleOnChange}
                            type="text"
                            placeholder="이름"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            name="email"
                            value={email}
                            onChange={handleOnChange}
                            type="text"
                            placeholder="이메일"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            type="password"
                            placeholder="비밀번호"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordCheck">
                        <Form.Control
                            name="passwordCheck"
                            value={passwordCheck}
                            onChange={handleOnChange}
                            type="password"
                            placeholder="비밀번호 확인"
                            required
                        />
                    </Form.Group>
                    {
                        passwordError ?
                        <Button variant="primary" onClick={() => alert("비밀번호 확인란을 정확히 입력해주세요.")}>회원가입</Button>
                        : <Button variant="primary" type="submit">회원가입</Button>
                    }
                </Form>
            </Container>
        </>
    );
}

export default Join;