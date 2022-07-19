import React, { useState } from 'react';
import { Avatar, List, ListItem,Typography, ListItemText, ListItemAvatar, IconButton, TextField, Box, Button  } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { query,addDoc, collection, getDocs, orderBy } from 'firebase/firestore';



function SingleComment({comment, username, pic,value}) {
  let isLogin = sessionStorage.getItem("isLogin");

  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');



  const onsubmit = (event) => {
    event.preventDefault();
    // await addDoc(collection(dbService, "weekly_report", id, 'comment', ), {
    //   comment: comment,
    //   avatar: pic,
    //   nickname: useId,
    //   created_at: new Date()
    // });
    // window.location.reload();
    // setComment("");
    // setUserId("");
    // setpic("");
     };
    
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  return (
    <div>
      <List>
        <ListItem  alignItems="flex-start" 
                    secondaryAction={ 
                    <IconButton key={value} edge="end" aria-label="comments" onClick={onClickReplyOpen}>
                      <CommentIcon />
                    </IconButton>}>
          <ListItemAvatar>
            <Avatar src={pic}/>
          </ListItemAvatar>
          <ListItemText
          primary={username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {comment}
              </Typography>
            </React.Fragment>
          }
        />
        </ListItem>
      </List>

      {OpenReply && ( //openReply값이 true일때만 대댓글창을 보이게만듬
        <form style={{ display: 'flex' }} onSubmit={onsubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Avatar src={pic} sx={{ color: 'action.active', mr: 1, my: 0.5, width: 24, height: 24 }} />
        </Box>
        <TextField id="input-with-sx" label="코멘트를 작성해 주세요" variant="standard" sx={{ color: 'action.active', width: '80%'}} onChange={onHandleChange} />
        
        <br />
        {
          isLogin ==='true' ? 
          (
            <Button variant="contained" sx={{ width: '10%', height: '40px', borderRadius: '5px' }} onClick={onsubmit} >
              댓글
            </Button>
          ) :
          <Button disabled variant="contained" sx={{ width: '10%', height: '40px', borderRadius: '5px' }}>
            댓글
          </Button>
        }

        </form>
      )}
    </div>
  );
}

export default SingleComment;