import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ProfileModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    
const handleOnChange = (e) => {
    const type = e.target.name;
    if (type === 'email') {
        setEmail(e.target.value);
    } else if (type === "name") {
        setName(e.target.value);
    }
};

const onSubmit = (e) => {
    e.preventDefault();
    
}

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                프로필 수정
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>프로필 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                name="name"
                                type="name"
                                placeholder="이름"
                                autoFocus
                                onChange={handleOnChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProfileModal;