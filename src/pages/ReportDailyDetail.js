import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  query,
  getDocs,
  collection,
  orderBy,
  deleteDoc,
  setDoc,
  doc,
  where,
} from "firebase/firestore";
import { dbService } from "../firebase";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import { pink } from "@mui/material/colors";

//components
import DailyReportcontents from "../components/Report/DailyReportContents";
import { DailyComment } from "../components/Comment/Comment";

export default function ReportDailyDetail({ user }) {
  const { id, title, writer, date } = useParams();
  //코멘트 가져오기
  const [reply, setReply] = useState([]);

  const getReplies = async () => {
    const repl = query(
      collection(dbService, "daily_report", id, "comment"),
      where("isreply", "==", false),
      orderBy("created_at", "desc")
    );
    const querySnapShot = await getDocs(repl);

    querySnapShot.forEach((collection) => {
      const replyObj = {
        subid: collection.id,
        comment: collection.data().comment,
        date: collection.data().created_at,
        avatar: collection.data().avatar,
        nickname: collection.data().nickname,
        user_uid: collection.data().user_uid,
        show: collection.data().show,
      };
      setReply((prev) => [replyObj, ...prev]);
    });
  };

    //좋아요 가져오기
  // const [likenum, setLikenum] = useState([]);
  const [clickICon, setClickIcon] = useState(false);
  const [likescount, setLikescount] = useState([]);
  const [count, setCount] = useState(0);
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (user !== null) {
      setUid(user.uid);
    }
  }, [user]);

  //전체 좋아요 개수
  const getLikes = async () => {
    const Likes = query(collection(dbService, "daily_report", id, "like"));
    const QuerySnapShot = await getDocs(Likes);
    QuerySnapShot.forEach((collection) => {
      const lkeObj = {
        likename: collection.data().likename,
        likeuid: collection.data().likeuid,
      };
      setLikescount((prev) => [lkeObj, ...prev]);
    });
  };
  
// user가 이전에 좋아요를 눌렀는지 안눌렀는지 확인
  const getUserLike = async () => {
    if (likescount.length !== 0) {
      const getUserLike = likescount.find(userid => userid.likeuid === uid)
      if (getUserLike !== undefined) {
        setClickIcon(true);
      } else {
        setClickIcon(false);
      }
    };
    };

  useEffect(() => {
    getReplies();
    getLikes();
    getUserLike();
  }, []);

  useEffect(() => {
    getUserLike();
    setCount(likescount.length);
  }, [likescount]);
 
  // 좋아요 클릭
  const onclick = async () => {
    if (user !== null) {
      setClickIcon(!clickICon);

      if (clickICon === false) {
        await setDoc(doc(dbService, "daily_report", id, "like", user.uid), {
          likename: user.displayName,
          likeuid: user.uid,
        });
        setCount(count+1);
        // 유저별 좋아요 정보 firestore에 저장
        await setDoc(doc(dbService, "users", user.uid, "liked", id), {
          title: title,
          writer: writer,
          date: date,
        });
      } else {
        await deleteDoc(doc(dbService, "daily_report", id, "like", user.uid));
        await deleteDoc(doc(dbService, "users", user.uid, "liked", id));
        setCount(count-1);
      }

      // window.location.reload();
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const copyLinkRef = useRef();
  const copyTextUrl = () => {
    copyLinkRef.current.focus();
    // copyLinkRef.current.select();
    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      alert("링크를 복사했습니다.");
    });
  };

  return (
    <div>
        <DailyReportcontents
        user={user}
        id={id}
        title={title}
        writer={writer}
        date={date}
        />

      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ButtonGroup variant="outlined">
              <IconButton onClick={onclick}>
                {clickICon === true ? (
                  <>
                    <FavoriteIcon sx={{ color: pink[500] }} />
                    <Typography variant="body1" >
                      {count}
                    </Typography>
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon sx={{ color: pink[500] }} />
                    <Typography variant="body1">
                      {count}
                    </Typography>
                  </>
                )}
              </IconButton>

              <IconButton onClick={handleOpen}>
                <SendIcon />
              </IconButton>
            </ButtonGroup>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <Typography variant="h6" component="h2">
                  공유하기
                </Typography>
                <p />
                <input
                  type="text"
                  value={window.location.href}
                  ref={copyLinkRef}
                  disabled
                />
                <Button variant="text" onClick={copyTextUrl}>
                  복사
                </Button>
              </Box>
            </Modal>
          </Grid>
          <Grid item xs={12}>
            <DailyComment
              user={user}
              id={id}
              title={title}
              rep={reply}
              writer={writer}
              date={date}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
