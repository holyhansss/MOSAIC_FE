import React, { useState, useEffect } from 'react';
import { addDoc, collection} from 'firebase/firestore';
import { dbService, auth } from '../../firebase.js';
import { Avatar, TextField, Box, Button} from '@mui/material';

//components
import SingleComment from './SingleComment.js';



function Comment({id, rep, likes}) {
  // let isLogin = sessionStorage.getItem("isLogin");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [useId, setUserId] = useState("");
  const [pic, setpic] = useState(sessionStorage.getItem("profilePic"));

  useEffect(() => {
      auth.onAuthStateChanged((user) => {
          if (user) {
              setIsLoggedIn(true);
              setpic(user.photoURL);
              setUserId(user.displayName);
          } else {
              setIsLoggedIn(false);
              setpic(null);
              setUserId(null);
          }
      })
  }, [])



  //코멘트 저장하기
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.currentTarget.value);
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    const time = Date;
    await addDoc(collection(dbService, "weekly_report", id, 'comment'), {
      comment: comment,
      avatar: pic,
      nickname: useId,
      created_at: time.now(),
    });
    window.location.reload();
    setComment("");
    setUserId("");
    setpic("");
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* <SingleComment /> */}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Avatar src={pic} sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Box>
        <TextField id="input-with-sx" label="코멘트를 작성해 주세요" variant="standard" sx={{ color: 'action.active', width: '80%'}} onChange={handleChange} />
        
        <br />
        {
          isLoggedIn === true ? 
          (
            <Button variant="contained" sx={{ width: '10%', height: '40px', borderRadius: '5px' }} onClick={onSubmit} >
              댓글
            </Button>
          ) :
          <Button disabled variant="contained" sx={{ width: '10%', height: '40px', borderRadius: '5px' }}>
            댓글
          </Button>
        }

      </form>

      {/* Comment Lists */}
      {
        rep.map((repl,index) => (
          <div key={index}>
            <SingleComment cdate={repl.created_at} comment={repl.comment} pic={repl.avatar} username={repl.nickname} value={index} subid={repl.subid} id={id}/>
          </div>
        ))
      }
    </div>
  );
}

export default Comment;