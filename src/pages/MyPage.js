import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tab, Tabs } from 'react-bootstrap';
import Header from '../components/Header/Header';
import ProfileModal from '../components/Modal/ProfileModal';
import { auth } from '../firebase';

function MyPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImg, setProfileImg] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setProfileImg(user.photoURL);
                setUserName(user.displayName);
                console.log(user);
            } else {
                setIsLoggedIn(false);
                setProfileImg(null);
                setUserName(null);
            }
        })
    }, [])

    return (
        <>
            <Header/>
            {
                isLoggedIn ? (
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col xs lg="8">
                                <Row className="justify-content-md-center">
                                    <Col xs md lg="4">
                                        <Row className="my-5">
                                            <Col xs md="6" lg="4" className="text-center">
                                                <img alt="profile" src={profileImg} width='100' height='100'/>
                                            </Col>
                                            <Col
                                                xs md="6" lg="8"
                                                className="text-center"
                                                style={{margin: 'auto'}}
                                            >
                                                <div>{userName}</div><br/>
                                                <ProfileModal name={userName}/>
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
                ) : null
            }
            
        </>
    );
};

export default MyPage;