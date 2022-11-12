import React, { useState, useEffect } from "react";
import moment from "moment";
import { Grid } from "@mui/material";
import { query, getDocs, collection, orderBy } from "firebase/firestore";
import { dbService } from "../../firebase.js";
import PostListCard from "./PostListCard.js";
import PromisingCard from "../PromisingCoin/PromisingCard.js";

function PostList({ user, kind }) {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const q = query(
      collection(dbService, "users", user.uid, kind),
      orderBy("date")
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((collection) => {
      let postObj = {};
      if (kind === "scrap") {
        postObj = {
          id: collection.id,
          name: collection.data().name,
          code: collection.data().code,
          hashtag: collection.data().hashtag,
          date: collection.data().date,
          thumbnail: collection.data().thumbnail,
        };
      } else {
        postObj = {
          id: collection.id,
          title: collection.data().title,
          writer: collection.data().writer,
          date: collection.data().date,
          thumbnail: collection.data().thumbnail,
          type: collection.data().type,
        };
      }
      setPosts((prev) => [postObj, ...prev]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Grid container spacing={3}>
      {kind === "scrap"
        ? posts.map((post, index) => (
            <Grid
              item
              xs={12}
              lg={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <PromisingCard crypto={post} key={index} />
            </Grid>
          ))
        : posts.map((post, index) => (
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
