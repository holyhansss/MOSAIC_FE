import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function ProfileModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>이름</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="이름"
                                autoFocus
                            />
                        </Form.Group>
                        {/* 프로필 사진 변경 추가 */}

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