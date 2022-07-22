import React, { useEffect, useState } from 'react';
import { Grid, Container} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { query, getDocs, collection, orderBy, deleteDoc, setDoc, doc} from 'firebase/firestore';
import { dbService, auth } from '../../firebase.js';
import FavoriteIcon from '@mui/icons-material/Favorite';

//components
import Comment from '../Comment/Comment.js';
import Reportcard from './Reportcard.js';


function ReportContents() {
    const location = useLocation();
    const id = location.state.id;
    const title = location.state.title;
    const writer = location.state.writer;
    const likes = location.state.likes;
    const date = moment(location.state.date).format('YYYY.MM.DD');
    
    const [investments, setInvestments] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [marcro, setMarcro] = useState([]);

    const [useId, setUserId] = useState("");
  
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.displayName);
            } else {
                setUserId(null);
            }
        })

    }, [])


    
    const getContents = async() => {
        const invest = collection(dbService,'weekly_report', id,'investment');
        const policy = collection(dbService,'weekly_report', id,'policy');
        const macroeconomic = collection(dbService,'weekly_report', id,'macroeconomic');
        const querySnapShot = await getDocs(invest);
        const querySnaphot = await getDocs(policy);
        const querySnasphot = await getDocs(macroeconomic);

        querySnapShot.forEach((collection)=> {
            const investObj = {
                title : collection.data().title,
                content : collection.data().content,
            };
            setInvestments(prev => [investObj, ...prev]);
        });

        querySnaphot.forEach((collection)=> {
            const poliObj = {
                title : collection.data().title,
                content : collection.data().content,
            };
            setPolicies(prev => [poliObj, ...prev]);
        });

        querySnasphot.forEach((collection)=> {
            const macroObj = {
                title : collection.data().title,
                content : collection.data().content,
            };
            setMarcro(prev => [macroObj, ...prev]);
        });
    };

    useEffect(() => { getContents() }, []);

//코멘트 가져오기
  const [reply, setReply] = useState([]);

  const getReplies = async() => {
    const repl = query(collection(dbService,'weekly_report', id,'comment'), orderBy("created_at","desc"));
    const querySnapShot = await getDocs(repl);

    querySnapShot.forEach((collection)=> {
        const replyObj = {
            subid: collection.id,
            comment : collection.data().comment,
            date : collection.data().created_at,
            avatar: collection.data().avatar,
            nickname: collection.data().nickname
        };
        setReply(prev => [replyObj, ...prev]);
    });
  };

  useEffect(() => { getReplies() }, []);


//좋아요 가져오기
const [likenum, setLikenum] = useState([]);

  const getLikes = async() => {
    const likequ = query(collection(dbService,'weekly_report', id,'like'));
    const querySnapShot = await getDocs(likequ);

    querySnapShot.forEach((collection)=> {
        const likeObj = {
            likename : collection.data().likename,
            likecount : collection.data().like_count
        };
        setLikenum(prev => [likeObj, ...prev]);
    });
  };

  useEffect(() => { getLikes() }, []);
//   console.log(likenum)
//   console.log(likenum.length)


  const [clickICon, setClickIcon] = useState(false);
  const [likescount, setLikescount] = useState(likes);

//   useEffect(() => {
//     likenum.map(data => {
//         if (data.likename === useId) {
//             console.log("hey")
//             setClickIcon(true);
//     }
//     else {
//         setClickIcon(false);
//     }
//     })

// },[]);


const onclick = async() =>{
    setClickIcon(!clickICon);
    // console.log(clickICon)
    if (clickICon === false) {
        console.log("hey")
        await setDoc(doc(dbService, "weekly_report", id, 'like', useId), {
            likename : useId,
            like_count: true
        });
        // setLikescount(likescount);
        // console.log(likescount);
        // setLike(like-1);
    }
    else {
        await deleteDoc(doc(dbService, 'weekly_report', id,'like', useId));  
        // setLike(like+1);
    }

}

    return ( 
        <div>
            <p />
            <Container maxWidth="md" >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <Reportcard id={id} title={title} writer={writer} date={date} inve={investments} poli={policies} mac={marcro}/>
                </Grid>
                    <Grid item xs={4}>
                        <VisibilityIcon />
                        <IconButton onClick={onclick} >
                            {clickICon === true ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
                        </IconButton>
                        <IconButton>
                            <ShareIcon />
                        </IconButton>

                    </Grid> 

                    <Grid item xs={12}>
                        <Comment id={id} rep={reply} likes={likes} />
                    </Grid>
                </Grid>
            </Container>
        </div>




    )
};

export default ReportContents;
