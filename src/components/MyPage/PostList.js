import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { query, getDocs, collection } from "firebase/firestore";
import { dbService } from "../../firebase.js";

function PostList({ user, kind }) {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const q = query(collection(dbService, "users", user.uid, kind));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((collection) => {
      const postObj = {
        id: collection.id,
        title: collection.data().title,
        writer: collection.data().writer,
        date: collection.data().date,
      };
      setPosts((prev) => [postObj, ...prev]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <Link
          to={`/reportDetail/${post.id}/${post.title}/${post.writer}/${post.date}`}
          state={{
            id: post.id,
            title: post.title,
            writer: post.writer,
            date: post.date,
          }}
        >
          <Card key={index} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                {post.writer} {post.date}
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Link>
      ))}
    </>
  );
}

export default PostList;
