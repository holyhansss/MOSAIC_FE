import React, { useState, useEffect } from 'react';
import { Avatar, List, ListItem,Typography, ListItemText, ListItemAvatar, IconButton, TextField, Box, Button  } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { query, addDoc, collection, getDocs, orderBy, setDoc, doc, deleteDoc, where } from 'firebase/firestore';
import { dbService } from '../../firebase.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function SingleComment({comment, username, pic,value, subid, id, cdate, user, title, writer, date, user_uid}) {
  // let isLogin = sessionStorage.getItem("isLogin");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [useId, setUserId] = useState("");
  const [ava, setAva] = useState(null);
  const [uid, setUid] = useState("")

  useEffect(() => {
    if (user !== null) {
      setUserId(user.displayName);
      setAva(user.photoURL);
      setUid(user.uid);
    }
  }, [user])

  const [OpenReply, setOpenReply] = useState(false);
  const [Openlist, setOpenlist] = useState(false);
  const [reply, setReply] = useState('');

  const [sub_id, setSub_id ] = useState(subid);

  //댓글 삭제하기(대댓글 삭제는 onclick 에 직접 들어있음)
  const ondelete = async(event) => {
    await deleteDoc(doc(dbService, 'weekly_report', id, 'comment', sub_id));
    // await deleteDoc(doc(dbService, 'weekly_report', id, 'users', user.uid, sub_id));
    // const q = query(collection(dbService, 'weekly_report', id, 'users', user.uid));
    // const querySnapShot = await getDocs(q);
    // if (querySnapShot.empty) {
    //   await deleteDoc(doc(dbService, 'users', user.uid, 'comment', id));
    // };
    window.location.reload();
  };

  //대댓글 작성칸 open
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  //대댓글 리스트 open
  const onClickReplylistOpen = () => {
    setOpenlist(!Openlist);
  };

  const onHandleChange = (event) => {
    setReply(event.currentTarget.value);
  };

  //대댓글 저장하기
  const onsubmit = async(event) => {
      event.preventDefault();
      const time = Date;
      await addDoc(collection(dbService, "weekly_report", id, 'comment', sub_id, "reply"), {
        comment: reply,
        avatar: ava,
        nickname: useId,
        created_at: time.now(),
        user_uid_re : uid
      });

      // 유저별 '댓글 단 글' 저장
      await setDoc(doc(dbService, 'users', user.uid, 'comment', id), {
        title: title,
        writer: writer,
        date: date
      });

      setReply("");
      setUserId("");
      setAva("");
      window.location.reload();
      // setLike(0);
     };


  //대댓글 정보 가져오기
  const [replylist, setReplylist] = useState([]);
  const [replyId, setReplyId] = useState('');

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
            user_uid_re : collection.data().user_uid_re,
        };
        setReplyId(replyObj.id);
        setReplylist(prev => [replyObj, ...prev]);
    });
    // 유저가 리포트에 작성한 댓글을 저장 (하나도 없을 때 마이페이지에서 삭제되도록)
    await setDoc(collection(dbService, 'weekly_report', id, 'users', user.uid, replyId), {
      comment: comment
    });
  };
  useEffect(() => { getReplies() }, []);

  // console.log(user_uid);

  return (
    <div>
      {/* 댓글리스트 */}
      <List>
        <ListItem  alignItems="flex-start" 
                    secondaryAction={ 
                      <div key={value}>
                    {
                      user_uid === uid ?
                      (
                        <IconButton edge="end" aria-label="comment" onClick={ondelete}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      ) : null
                    }

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
                <IconButton  edge="end" aria-label="comments" onClick={onClickReplyOpen}>
                      <CommentIcon fontSize="small"/>
                </IconButton>
              {
                replylist.length !== 0 ?
                  <IconButton edge="end" aria-label="comment" onClick={onClickReplylistOpen}>
                    { Openlist === false ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowUpIcon fontSize="small"/>}
                  </IconButton> 
                  : null
              }
            </React.Fragment>
            
          }
        />
        </ListItem>
      </List>

        {/* 대댓글 작성칸 */}
        {OpenReply && ( //openReply값이 true일때만 대댓글창을 보이게만듬
          <form style={{ display: 'flex' }} onSubmit={onsubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', ml:'5%' }}>
            <Avatar src={ava} sx={{ color: 'action.active', mr: 1, my: 0.5, width: 24, height: 24 }} />
          </Box>
          <TextField id="input-with-sx" label="코멘트를 작성해 주세요" variant="standard" sx={{ color: 'action.active', width: '80%'}} onChange={onHandleChange} />
          
          <br />
          {
            user !== null ? 
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

      {/* 대댓글 목록 */}
      {Openlist && ( //openReply값이 true일때만 대댓글창을 보이게만듬
          <List >
            {
              replylist.map((rep,idx) => (
                <div key={idx}>
                <ListItem alignItems="flex-start" sx={{ml: '3%'}} secondaryAction={ 
                      <div>
                    {
                      rep.user_uid_re === uid ?
                      (
                        <IconButton edge="end" aria-label="comment" 
                        onClick={async() => {
                          await deleteDoc(doc(dbService, 'weekly_report', id,'comment', sub_id, "reply", rep.id)) ;
                          await deleteDoc(doc(dbService, 'weekly_report', id, 'users', user.uid, rep.id));
                          const q2 = query(collection(dbService, 'weekly_report', id, 'users', user.uid));
                          const querySnapShot2 = await getDocs(q2);
                          if (querySnapShot2.empty) {
                            await deleteDoc(doc(dbService, 'users', user.uid, 'comment', id));
                          };
                          window.location.reload();
                        }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      ) : null
                    }

                    </div>
                  }>
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