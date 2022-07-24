import React, { useEffect, useState } from 'react';
import { Grid, Container} from '@mui/material';
import { getDocs, collection} from 'firebase/firestore';
import { dbService } from '../../firebase.js';

//components
import Reportcard from './Reportcard.js';


function ReportContents({user, id, title, writer, date}) {
    //Reportdetail 로 이동
    // const location = useLocation();
    // const id = location.state.id;
    // const title = location.state.title;
    // const writer = location.state.writer;
    // const date = moment(location.state.date).format('YYYY.MM.DD');
    
    const [investments, setInvestments] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [marcro, setMarcro] = useState([]);

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

// //(Reportdetail로 이동) 코멘트 가져오기+ 좋아요
//   const [reply, setReply] = useState([]);

//   const getReplies = async() => {
//     const repl = query(collection(dbService,'weekly_report', id,'comment'), orderBy("created_at","desc"));
//     const querySnapShot = await getDocs(repl);

//     querySnapShot.forEach((collection)=> {
//         const replyObj = {
//             subid: collection.id,
//             comment : collection.data().comment,
//             date : collection.data().created_at,
//             avatar: collection.data().avatar,
//             nickname: collection.data().nickname,
//             user_uid: collection.data().user_uid
//         };
//         setReply(prev => [replyObj, ...prev]);
//     });
//   };

//   useEffect(() => { getReplies() }, []);


//좋아요 가져오기
// const [likenum, setLikenum] = useState([]);
// const [clickICon, setClickIcon] = useState(false);
// const [likescount, setLikescount] = useState([]);
// const [count, setCount] = useState(null);

//   const getLikes = async() => {
//     if (user !== null) {
//         const likequ = query(collection(dbService,'weekly_report', id,'like'), where("likeuid","==", user.uid));
//         const Likes = query(collection(dbService,'weekly_report', id,'like'));
//         const querySnapShot = await getDocs(likequ);
//         const QuerySnapShot = await getDocs(Likes);
    
//         querySnapShot.forEach((collection)=> {
//             const likeObj = {
//                 likename : collection.data().likename,
//                 likeuid : collection.data().likeuid
//             };
//             setClickIcon(true);
//             setLikenum(prev => [likeObj, ...prev]);
//         });

//         QuerySnapShot.forEach((collection)=> {
//             const lkeObj = {
//                 likename : collection.data().likename,
//                 likeuid : collection.data().likeuid
//             };
//             setLikescount(prev => [lkeObj, ...prev]);
//             // setCount(likescount.length);
//         });
//     };

//   };
//   useEffect(() => { getLikes() }, [user]);
//   useEffect(()=>{setCount(likescount.length);})


// // 좋아요 클릭
//     const onclick = async() => {
//         setClickIcon(!clickICon);

//         if (clickICon === false) {
//             await setDoc(doc(dbService, "weekly_report", id, 'like', user.uid), {
//                 likename : user.displayName,
//                 likeuid: user.uid
//             });
//             // 유저별 좋아요 정보 firestore에 저장
//             await setDoc(doc(dbService, "users", user.uid, 'liked', id), {
//                 title: title,
//                 writer: writer,
//                 date: date
//             });
//         } else {
//             await deleteDoc(doc(dbService, 'weekly_report', id,'like', user.uid));
//             await deleteDoc(doc(dbService, 'users', user.uid, 'liked', id));
//         };

//         window.location.reload();
//     };

    return ( 
        <div>
            <p />
            <Container maxWidth="md" >
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <Reportcard id={id} title={title} writer={writer} date={date} inve={investments} poli={policies} mac={marcro}/>
                </Grid>
                </Grid>
            </Container>
        </div>
    )
};

export default ReportContents;
