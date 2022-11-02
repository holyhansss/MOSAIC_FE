import React, { useState, useEffect } from "react";
import moment from "moment";
import { Grid } from "@mui/material";
import { query, getDocs, collection, orderBy } from "firebase/firestore";
import { dbService } from "../../firebase.js";
import PostListCard from "./PostListCard.js";

function PostList({ user, kind }) {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const q = query(
      collection(dbService, "users", user.uid, kind),
      orderBy("date")
    );
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((collection) => {
      const postObj = {
        id: collection.id,
        title: collection.data().title,
        writer: collection.data().writer,
        date: collection.data().date,
        thumbnail: collection.data().thumbnail,
        type: collection.data().type,
      };
      setPosts((prev) => [postObj, ...prev]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Grid container spacing={3}>
      {posts.map((post, index) => (
        <Grid item xs={6} sm={6} md={6} lg={4} key={index}>
          <PostListCard
            id={post.id}
            title={post.title}
            writer={post.writer}
            date={moment(post.date).format("YYYY.MM.DD")}
            thumbnail={post.thumbnail}
            type={post.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default PostList;
