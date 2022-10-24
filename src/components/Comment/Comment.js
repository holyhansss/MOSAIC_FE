import React, { useState, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { dbService } from "../../firebase.js";
import { Avatar, TextField, Box, Button } from "@mui/material";
import styled from "styled-components";
import { grey } from "@mui/material/colors";

//components
import {SingleComment, DailySingleComment} from "./SingleComment.js";

//style
const StyleButton = styled(Button)`
  background: linear-gradient(-45deg, #0b062d 5%, #230b65 90%);
`;

function Comment({ user, id, title, rep, writer, date }) {
  const [useId, setUserId] = useState("");
  const [pic, setPic] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (user !== null) {
      setUserId(user.displayName);
      setPic(user.photoURL);
      setUid(user.uid);
    }
  }, [user]);

  //코멘트 저장하기
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.currentTarget.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const time = Date.now();
    await setDoc(doc(dbService, "weekly_report", id, "comment", String(time)), {
      comment: comment,
      avatar: pic,
      nickname: useId,
      created_at: time,
      user_uid: uid,
      show: true,
      isreply: false,
    });

    // 유저별 '댓글 단 글' 저장
    await setDoc(doc(dbService, "users", user.uid, "comment", id), {
      title: title,
      writer: writer,
      date: date,
    });

    window.location.reload();
    setComment("");
    setUserId("");
    setPic("");
  };

  return (
    <div>
      <br />
      <p>댓글 {rep.length}</p>
      <hr />

      {/* <SingleComment /> */}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Avatar src={pic} sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        </Box>
        <TextField
          id="input-with-sx"
          label="코멘트를 작성해 주세요"
          variant="standard"
          sx={{
            color: "primary",
            width: "80%",
            "& label": { color: grey[600] },
          }}
          onChange={handleChange}
          inputProps={{ style: { color: "black" } }}
        />

        <br />
        {user !== null ? (
          <StyleButton
            variant="contained"
            sx={{ width: "10%", height: "40px", borderRadius: "5px" }}
            onClick={onSubmit}
          >
            등록
          </StyleButton>
        ) : (
          <Button
            disabled
            variant="contained"
            sx={{ width: "10%", height: "40px", borderRadius: "5px" }}
          >
            등록
          </Button>
        )}
      </form>

      {/* Comment Lists */}
      {rep.map((repl, index) => (
        <div key={index}>
          {/* <SingleComment cdate={repl.created_at} comment={repl.comment} pic={repl.avatar} username={repl.nickname} value={index} subid={repl.subid} id={id} user={user} title={title} writer={writer} date={date} user_uid={repl.user_uid} subid/> */}
          <SingleComment
            value={index}
            id={id}
            user={user}
            title={title}
            writer={writer}
            date={date}
            commentObj={repl}
          />
        </div>
      ))}
    </div>
  );
}

export {Comment};

function DailyComment({ user, id, title, rep, writer, date }) {
  const [useId, setUserId] = useState("");
  const [pic, setPic] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (user !== null) {
      setUserId(user.displayName);
      setPic(user.photoURL);
      setUid(user.uid);
    }
  }, [user]);

  //코멘트 저장하기
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.currentTarget.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const time = Date.now();
    await setDoc(doc(dbService, "daily_report", id, "comment", String(time)), {
      comment: comment,
      avatar: pic,
      nickname: useId,
      created_at: time,
      user_uid: uid,
      show: true,
      isreply: false,
    });

    // 유저별 '댓글 단 글' 저장
    await setDoc(doc(dbService, "users", user.uid, "comment", id), {
      title: title,
      writer: writer,
      date: date,
    });

    window.location.reload();
    setComment("");
    setUserId("");
    setPic("");
  };

  return (
    <div>
      <br />
      <p>댓글 {rep.length}</p>
      <hr />

      {/* <SingleComment /> */}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Avatar src={pic} sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        </Box>
        <TextField
          id="input-with-sx"
          label="코멘트를 작성해 주세요"
          variant="standard"
          sx={{
            color: "primary",
            width: "80%",
            "& label": { color: grey[600] },
          }}
          onChange={handleChange}
          inputProps={{ style: { color: "black" } }}
        />

        <br />
        {user !== null ? (
          <StyleButton
            variant="contained"
            sx={{ width: "10%", height: "40px", borderRadius: "5px" }}
            onClick={onSubmit}
          >
            등록
          </StyleButton>
        ) : (
          <Button
            disabled
            variant="contained"
            sx={{ width: "10%", height: "40px", borderRadius: "5px" }}
          >
            등록
          </Button>
        )}
      </form>

      {/* Comment Lists */}
      {rep.map((repl, index) => (
        <div key={index}>
          <DailySingleComment
            value={index}
            id={id}
            user={user}
            title={title}
            writer={writer}
            date={date}
            commentObj={repl}
          />
        </div>
      ))}
    </div>
  );
}

export {DailyComment};
