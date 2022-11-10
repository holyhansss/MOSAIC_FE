import React from "react";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import ProfileModal from "../components/Modal/ProfileModal";
import PostList from "../components/MyPage/PostList";

function MyPage({ user, refreshUser }) {
  return (
    <>
      {user !== null ? (
        <Container>
          <Row className="justify-content-md-center">
            <Col xs lg="8">
              <Row className="justify-content-md-center">
                <Col xs md lg="6">
                  <Row className="my-5">
                    <Col xs md="6" lg="4" className="text-center">
                      <img
                        src={user.photoURL}
                        alt=""
                        width="100"
                        height="100"
                        style={{ borderRadius: "50%" }}
                      />
                    </Col>
                    <Col
                      xs
                      md="6"
                      lg="8"
                      className="text-center"
                      style={{ margin: "auto" }}
                    >
                      <div style={{ paddingBottom: "1.2rem" }}>
                        {user.displayName}
                      </div>
                      <ProfileModal user={user} refreshUser={refreshUser} />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row style={{ marginBottom: "50.5vh" }}>
                <Tabs
                  defaultActiveKey="liked"
                  id="uncontrolled-tab"
                  className="mb-3"
                  justify
                >
                  {/* <Tab eventKey="posts" title="작성한 글">
                    <PostList user={user} kind="post" />
                  </Tab> */}
                  <Tab eventKey="liked" title="좋아요한 글">
                    <PostList user={user} kind="liked" />
                  </Tab>
                  <Tab eventKey="comments" title="댓글단 글">
                    <PostList user={user} kind="comment" />
                  </Tab>
                  <Tab eventKey="scrap" title="스크랩한 글">
                    <PostList user={user} kind="scrap" />
                  </Tab>
                </Tabs>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : null}
    </>
  );
}

export default MyPage;
