import React, { useState, useEffect } from 'react';
import { query,addDoc, collection, getDocs, orderBy } from 'firebase/firestore';
import { dbService } from '../../firebase.js';
import { Avatar, TextField, Box, Button} from '@mui/material';

//components
import SingleComment from './SingleComment.js';



function Comment({id}) {
  let isLogin = sessionStorage.getItem("isLogin");


  //코멘트 가져오기
  const [reply, setReply] = useState([]);

  const getReplies = async() => {
    const reply = query(collection(dbService,'weekly_report', id,'comment'), orderBy("created_at","desc"));
    const querySnapShot = await getDocs(reply);

    querySnapShot.forEach((collection)=> {
        const replyObj = {
            comment : collection.data().comment,
            date : collection.data().created_at,
            avatar: collection.data().avatar,
            nickname: collection.data().nickname,
        };
        setReply(prev => [replyObj, ...prev]);
    });
  };
  useEffect(() => { getReplies() }, []);


  //코멘트 저장하기
  const [comment, setComment] = useState('');
  const [useId, setUserId] = useState(sessionStorage.getItem("name"));
  const [pic, setpic] = useState(sessionStorage.getItem("profilePic"));

  const handleChange = (event) => {
    setComment(event.currentTarget.value);
  };

  const onSubmit = async(event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "weekly_report", id, 'comment'), {
      comment: comment,
      avatar: pic,
      nickname: useId,
      created_at: new Date()
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
          isLogin ==='true' ? 
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
        reply.map((rep,index) => (
          <div key={index}>
            <SingleComment comment={rep.comment} pic={rep.avatar} username={rep.nickname} value={index}/>
          </div>
        ))
      }
    </div>
  );
}

export default Comment;