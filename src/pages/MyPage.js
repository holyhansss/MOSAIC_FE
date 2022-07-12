import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import Header from '../components/Header/Header';


function MyPage() {
    return (
        <>
            <Header/>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="8">
                        <Row className="justify-content-md-center">
                            <Col xs md lg="4">
                                <Row className="my-5">
                                    <Col xs md lg="4" className="text-center">
                                        <img src={sessionStorage.getItem("profilePic")}/>
                                    </Col>
                                    <Col
                                        xs md lg="8"
                                        className="text-center"
                                        style={{margin: 'auto'}}
                                    >
                                        <div>{sessionStorage.getItem("name")}</div><br/>
                                        <Button variant="light" type="submit">프로필 수정</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MyPage;