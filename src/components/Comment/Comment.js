import React, { useState, useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { dbService } from '../../firebase.js';
import { Avatar, TextField, Box, Button} from '@mui/material';

//components
import SingleComment from './SingleComment.js';



function Comment({ user, id, title, rep, writer, date }) {
  const [useId, setUserId] = useState("");
  const [pic, setpic] = useState('');
  const [Uid, setUid] = useState('');
  useEffect(() => {
    if (user !== null) {
      setUserId(user.displayName);
      setpic(user.photoURL);
      setUid(user.uid);
    }
  }, [user])


  //코멘트 저장하기
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.currentTarget.value);
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    const time= Date.now();
    await setDoc(doc(dbService, "weekly_report", id, 'comment', String(time)), {
      comment: comment,
      avatar: pic,
      nickname: useId,
      created_at: time,
      user_uid: Uid,
      show : true,
      isreply: false
    });

    // 유저별 '댓글 단 글' 저장
    // await setDoc(doc(dbService, 'users', user.uid, 'comment', id), {
    //   title: title,
    //   writer: writer,
    //   date: date
    // });

    // // 유저가 리포트에 작성한 댓글을 저장 (하나도 없을 때 마이페이지에서 삭제되도록)
    // await setDoc(doc(dbService, 'weekly_report', id, 'users', user.uid, 'comments', String(time)), {
    //   comment: comment
    // });

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
          user !== null  ? 
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
            {/* <SingleComment cdate={repl.created_at} comment={repl.comment} pic={repl.avatar} username={repl.nickname} value={index} subid={repl.subid} id={id} user={user} title={title} writer={writer} date={date} user_uid={repl.user_uid} subid/> */}
            <SingleComment value={index} id={id} user={user} title={title} writer={writer} date={date} commentObj={repl}/>

          </div>
        ))
      }
    </div>
  );
}

export default Comment;