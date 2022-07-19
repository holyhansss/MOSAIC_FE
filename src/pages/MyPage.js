import React from 'react';
import { Container, Row, Col, Button, Tab, Tabs } from 'react-bootstrap';

import Header from '../components/Header/Header';
import ProfileModal from '../components/Modal/ProfileModal';

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
                                    <Col xs md="6" lg="4" className="text-center">
                                        <img alt="profile" src={sessionStorage.getItem("profilePic")} width='100' height='100'/>
                                    </Col>
                                    <Col
                                        xs md="6" lg="8"
                                        className="text-center"
                                        style={{margin: 'auto'}}
                                    >
                                        <div>{sessionStorage.getItem("name")}</div><br/>
                                        <ProfileModal/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Tabs
                                defaultActiveKey="posts"
                                id="uncontrolled-tab"
                                className="mb-3"
                                justify
                            >
                                <Tab eventKey="posts" title="작성한 글">
                                    글 목록
                                </Tab>
                                <Tab eventKey="comments" title="댓글단 글">
                                    글 목록
                                </Tab>
                                <Tab eventKey="scrap" title="스크랩">
                                    글 목록
                                </Tab>
                            </Tabs>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default MyPage;