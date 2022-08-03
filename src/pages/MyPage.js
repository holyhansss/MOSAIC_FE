import React from 'react';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import ProfileModal from '../components/Modal/ProfileModal';
import PostList from '../components/MyPage/PostList';

function MyPage({ user, refreshUser }) {    
    return (
        <>
            {
                user !== null ? (
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col xs lg="8">
                                <Row className="justify-content-md-center">
                                    <Col xs md lg="6">
                                        <Row className="my-5">
                                            <Col xs md="6" lg="4" className="text-center">
                                                <img
                                                    alt={user.photoURL}
                                                    src={user.photoURL}
                                                    width='100'
                                                    height='100'
                                                    style={{borderRadius:'50%', }}/>
                                            </Col>
                                            <Col
                                                xs md="6" lg="8"
                                                className="text-center"
                                                style={{margin: 'auto'}}
                                            >
                                                <div>{user.displayName}</div><br/>
                                                <ProfileModal user={user} refreshUser={refreshUser}/>
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
                                            <PostList user={user} kind="post" />
                                        </Tab>
                                        <Tab eventKey="comments" title="댓글단 글">
                                            <PostList user={user} kind="comment" />
                                        </Tab>
                                        <Tab eventKey="liked" title="좋아요한 글">
                                            <PostList user={user} kind="liked" />
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