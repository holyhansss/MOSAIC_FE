import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { auth, updateProfileData } from '../../firebase';

function ProfileModal({ name }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newName, setNewName] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);
    
    const handleOnChange = (e) => {
        const type = e.target.name;
        if (type === 'name') {
            setNewName(e.target.value);
        } else if (type === 'password') {
            setNewPassword(e.target.value);
        } else if (type === 'passwordCheck') {
            setPasswordCheck(e.target.value);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name !== newName) {
            updateProfileData(newName);
        }
        console.log(auth.currentUser);
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                프로필 수정
            </Button>
            <Form onSubmit={onSubmit}>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>프로필 수정</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                name="name"
                                value={newName}
                                placeholder="이름"
                                autoFocus
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                value={newPassword}
                                placeholder="비밀번호"
                                autoFocus
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control
                                name="passwordCheck"
                                type="password"
                                value={passwordCheck}
                                placeholder="비밀번호 확인"
                                autoFocus
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleClose}>
                            저장
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </>
    );
};

export default ProfileModal;