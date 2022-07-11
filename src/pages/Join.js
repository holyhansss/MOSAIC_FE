import React, { useState } from 'react';
// import { Container } from 'react-bootstrap';
import { signUpWithEmailAndPassword } from '../firebase';

function Join() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // const handleOnChange = (e) => {
    //     const type = e.target.name;
    //     if (type === "name") {
    //         setName(e.target.value);
    //     } else if (type === "email") {
    //         setEmail(e.target.value);
    //     } else if (type === "password") {
    //         setPassword(e.target.value);
    //     }
    // };
    const onSubmit = (e) => {
        e.preventDefault();
        email && signUpWithEmailAndPassword(email, password);
    }

    const handleOnChangeName = (e) => setName(e.target.value);
    const handleOnChangeEmail = (e) => setEmail(e.target.value);
    const handleOnChangePassword = (e) => setPassword(e.target.value);

    return(
        <div>
            <div>회원가입</div>
            <form onSubmit={onSubmit}>
                <input
                    name="name"
                    value={name}
                    onChange={handleOnChangeName}
                    type="text"
                    placeholder="이름"
                    required
                /><br/>
                <input
                    name="email"
                    value={email}
                    onChange={handleOnChangeEmail}
                    type="text"
                    placeholder="이메일"
                    required
                /><br/>
                <input
                    name="password"
                    value={password}
                    onChange={handleOnChangePassword}
                    type="password"
                    placeholder="비밀번호"
                    required
                /><br/>
                <button type="submit"> 회원가입</button>
            </form>
        </div>
    );
}

export default Join;