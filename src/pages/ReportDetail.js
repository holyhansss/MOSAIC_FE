import React, { useEffect, useState } from 'react';
import {Box, Tab, Container, Grid} from '@mui/material';
import {TabList, TabPanel, TabContext} from '@mui/lab';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { query, getDocs, collection, orderBy, deleteDoc, setDoc, doc, where} from 'firebase/firestore';
import { dbService } from '../firebase';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';




//components
import ReportContents from '../components/Report/ReportContents';
import Winner from '../components/Report/Winner';
import Comment from '../components/Comment/Comment';


export default function ReportDetail({user}) {

  const location = useLocation();
  const id = location.state.id;
  const title = location.state.title;
  const writer = location.state.writer;
  const date = moment(location.state.date).format('YYYY.MM.DD');
  const [value, setValue] = React.useState('1');


  //코멘트 가져오기
  const [reply, setReply] = useState([]);

  const getReplies = async() => {
    const repl = query(collection(dbService,'weekly_report', id,'comment'), where("isreply","==", false), orderBy("created_at","desc"));
    const querySnapShot = await getDocs(repl);

    querySnapShot.forEach((collection)=> {
        const replyObj = {
            subid: collection.id,
            comment : collection.data().comment,
            date : collection.data().created_at,
            avatar: collection.data().avatar,
            nickname: collection.data().nickname,
            user_uid: collection.data().user_uid,
            show: collection.data().show,
        };
        setReply(prev => [replyObj, ...prev]);
    });
  };

  useEffect(() => { getReplies() }, []);

//좋아요 가져오기
const [likenum, setLikenum] = useState([]);
const [clickICon, setClickIcon] = useState(false);
const [likescount, setLikescount] = useState([]);
const [count, setCount] = useState(null);

  const getLikes = async() => {
    if (user !== null) {
        const likequ = query(collection(dbService,'weekly_report', id,'like'), where("likeuid","==", user.uid));
        const Likes = query(collection(dbService,'weekly_report', id,'like'));
        const querySnapShot = await getDocs(likequ);
        const QuerySnapShot = await getDocs(Likes);
    
        querySnapShot.forEach((collection)=> {
            const likeObj = {
                likename : collection.data().likename,
                likeuid : collection.data().likeuid
            };
            setClickIcon(true);
            setLikenum(prev => [likeObj, ...prev]);
        });

        QuerySnapShot.forEach((collection)=> {
            const lkeObj = {
                likename : collection.data().likename,
                likeuid : collection.data().likeuid
            };
            setLikescount(prev => [lkeObj, ...prev]);
            // setCount(likescount.length);
        });
    };

  };
  useEffect(() => { getLikes() }, [user]);
  useEffect(()=>{setCount(likescount.length);})


// 좋아요 클릭
    const onclick = async() => {
        setClickIcon(!clickICon);

        if (clickICon === false) {
            await setDoc(doc(dbService, "weekly_report", id, 'like', user.uid), {
                likename : user.displayName,
                likeuid: user.uid
            });
            // 유저별 좋아요 정보 firestore에 저장
            await setDoc(doc(dbService, "users", user.uid, 'liked', id), {
                title: title,
                writer: writer,
                date: date
            });
        } else {
            await deleteDoc(doc(dbService, 'weekly_report', id,'like', user.uid));
            await deleteDoc(doc(dbService, 'users', user.uid, 'liked', id));
        };

        window.location.reload();
    };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
    <p />
      <TabContext value={value}>
        <Container maxWidth="md">
          <Box sx={{  borderColor: 'divider', position: "relative", left:"35%"}} >
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{justifyContent: 'center'}}>
              
              <Tab label="주간이슈" value="1" />
              <Tab label="Winner & Loser" value="2" />
            
            </TabList>
          </Box> 
        </Container>
        <p/>
        <TabPanel value="1"><ReportContents user={user} id={id} title={title} writer={writer} date={date}/></TabPanel>
        <TabPanel value="2"><Winner user={user} id={id} title={title} writer={writer} date={date}/></TabPanel>
      </TabContext>

      <Container maxWidth="md" >
        <Grid container spacing={1}>
          
          <Grid item xs={4}>
              {/* <VisibilityIcon /> */}
              <IconButton onClick={onclick} >
                  {clickICon === true ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
              </IconButton>
                {count}
              <IconButton>
                  <ShareIcon />
              </IconButton>
          </Grid> 
          <Grid item xs={12}>
            <Comment user={user} id={id} title={title} rep={reply} writer={writer} date={date}/>
          </Grid>
        </Grid>
      </Container>


    </div>

  );
}
