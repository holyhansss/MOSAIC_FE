import React, { useState, useEffect } from 'react';
import { Avatar, List, ListItem,Typography, ListItemText, ListItemAvatar, IconButton, TextField, Box, Button  } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { query,addDoc, collection, getDocs, orderBy } from 'firebase/firestore';
import { dbService, auth } from '../../firebase.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';





function SingleComment({comment, username, pic,value, subid, id, cdate}) {
  // let isLogin = sessionStorage.getItem("isLogin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [useId, setUserId] = useState("");
  const [ava, setAva] = useState(null);

  useEffect(() => {
      auth.onAuthStateChanged((user) => {
          if (user) {
              setIsLoggedIn(true);
              setAva(user.photoURL);
              setUserId(user.displayName);
          } else {
              setIsLoggedIn(false);
              setAva(null);
              setUserId(null);
          }
      })
  }, [])

  const [OpenReply, setOpenReply] = useState(false);
  const [Openlist, setOpenlist] = useState(false);
  const [reply, setReply] = useState('');

  const [sub_id, setSub_id ] = useState(subid);
  // const [like, setLike] = useState(0);

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onClickReplylistOpen = () => {
    setOpenlist(!Openlist);
  };

  const onHandleChange = (event) => {
    setReply(event.currentTarget.value);
  };

  const onsubmit = async(event) => {
      event.preventDefault();
      const time = Date;
      await addDoc(collection(dbService, "weekly_report", id, 'comment', sub_id, "reply"), {
        comment: reply,
        avatar: ava,
        nickname: useId,
        created_at: time.now(),
        // like : like
      });
      setReply("");
      setUserId("");
      setAva("");
      window.location.reload();
      // setLike(0);
     };

  const [replylist, setReplylist] = useState([]);

  const getReplies = async() => {
  const repl = query(collection(dbService,'weekly_report', id,'comment',sub_id, "reply" ), orderBy("created_at","desc"));
  const querySnapShot = await getDocs(repl);
  
  querySnapShot.forEach((collection)=> {
      const replyObj = {
          id : collection.id,
          recomment : collection.data().comment,
          credate : collection.data().created_at,
          avat: collection.data().avatar,
          name: collection.data().nickname,
      };
      setReplylist(prev => [replyObj, ...prev]);
  });
  };
  
  useEffect(() => { getReplies() }, []);

  return (
    <div>
      <List>
        <ListItem  alignItems="flex-start" 
                    secondaryAction={ 
                      <div>
                    <IconButton key={value} edge="end" aria-label="comments" onClick={onClickReplyOpen}>
                      <CommentIcon fontSize="small"/>
                    </IconButton>
                    <IconButton edge="end" aria-label="comment" onClick={onClickReplylistOpen}>
                      <KeyboardArrowDownIcon fontSize="small" />
                    </IconButton>
                    </div>
                  }>
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
              <br />
              <Typography variant="caption">
                {moment(cdate).format('YYYY.MM.DD')}
              </Typography>
            </React.Fragment>
          }
        />
        </ListItem>
      </List>


        {OpenReply && ( //openReply값이 true일때만 대댓글창을 보이게만듬
          <form style={{ display: 'flex' }} onSubmit={onsubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', ml:'5%' }}>
            <Avatar src={ava} sx={{ color: 'action.active', mr: 1, my: 0.5, width: 24, height: 24 }} />
          </Box>
          <TextField id="input-with-sx" label="코멘트를 작성해 주세요" variant="standard" sx={{ color: 'action.active', width: '80%'}} onChange={onHandleChange} />
          
          <br />
          {
            isLoggedIn === true ? 
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

      {Openlist && ( //openReply값이 true일때만 대댓글창을 보이게만듬
          <List >
            {
              replylist.map((rep,idx) => (
                <div key={idx}>
                <ListItem alignItems="flex-start" sx={{ml: '3%'}}>
                  <ListItemAvatar>
                    <Avatar src={rep.avat} sx={{ color: 'action.active', mr: 1, my: 0.5, width: 24, height: 24 }}/>
                  </ListItemAvatar>
                  <ListItemText
                  primary={rep.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                      {rep.recomment}
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        { moment(rep.credate).format('YYYY.MM.DD')}
                      </Typography>
                      
                    </React.Fragment>
                  }
                />
                </ListItem>
                </div>
              ))
            }
          
        </List>
      )}

    </div>
  );
}

export default SingleComment;