import React, { useState, useEffect } from "react";
import moment from "moment";
import { Grid } from "@mui/material";
import { query, getDocs, collection } from "firebase/firestore";
import { dbService } from "../../firebase.js";
import { Reportlistcard } from "../Report/Reportlistcard.js";

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
    <Grid container spacing={3}>
      {posts.map((post, index) => (
        <Grid item xs={6} sm={6} md={6} lg={4} key={index}>
          <Reportlistcard
            id={post.id}
            title={post.title}
            writer={post.writer}
            date={moment(post.date).format("YYYY.MM.DD")}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default PostList;
