import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { auth } from '../../firebase';
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";

function ProfileModal({ user, refreshUser }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newName, setNewName] = useState("");
    
    const handleOnChange = (e) => {
        const type = e.target.name;
        if (type === 'name') {
            setNewName(e.target.value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (user.displayName !== newName) {
            await updateProfile(auth.currentUser, { displayName: newName });
        }
        refreshUser();
    };

    const handleOnClick = (e) => {
        sendPasswordResetEmail(auth, user.email)
            .then(() => alert("비밀번호 재설정 이메일이 발송되었습니다. \n이메일을 확인하지 못한 경우 스팸 메일함을 확인해주세요."))
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                프로필 수정
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>프로필 수정</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="editName"
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
                        <Button variant="primary" onClick={handleOnClick}>비밀번호 재설정</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                        <Button variant="primary" type='submit' onClick={handleClose}>
                            저장
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>          
        </>
    );
};

export default ProfileModal;