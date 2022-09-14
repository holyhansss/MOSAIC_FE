import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Tab,
  Container,
  Grid,
  Modal,
  Typography,
  Button,
  ButtonGroup
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
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
import { pink, grey } from "@mui/material/colors";

//components
import ReportContents from "../components/Report/ReportContents";
import Winner from "../components/Report/Winner";
import Comment from "../components/Comment/Comment";

export default function ReportDetail({ user }) {
  const [value, setValue] = React.useState("1");
  const { id, title, writer, date } = useParams();
  //코멘트 가져오기
  const [reply, setReply] = useState([]);

  const getReplies = async () => {
    const repl = query(
      collection(dbService, "weekly_report", id, "comment"),
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

  useEffect(() => {
    getReplies();
  }, []);

  //좋아요 가져오기
  const [likenum, setLikenum] = useState([]);
  const [clickICon, setClickIcon] = useState(false);
  const [likescount, setLikescount] = useState([]);
  const [count, setCount] = useState(null);
  const [countValue, setCountValue] = useState(null);


  //전체 좋아요 개수
  const getLikes = async () => {
    const Likes = query(collection(dbService, "weekly_report", id, "like"));
    const QuerySnapShot = await getDocs(Likes);
    QuerySnapShot.forEach((collection) => {
      const lkeObj = {
        likename: collection.data().likename,
        likeuid: collection.data().likeuid,
      };
      setLikescount((prev) => [lkeObj, ...prev]);
    });
  };
  useEffect(() => {
    getLikes();
  }, []);
  useEffect(() => {
    setCount(likescount.length);
    setCountValue(likescount.length);
  });

  // user가 이전에 좋아요를 눌렀는지 안눌렀는지 확인
  const getUserLike = async () => {
    if (user !== null) {
      const likequ = query(
        collection(dbService, "weekly_report", id, "like"),
        where("likeuid", "==", user.uid)
      );
      const querySnapShot = await getDocs(likequ);
      querySnapShot.forEach((collection) => {
        const likeObj = {
          likename: collection.data().likename,
          likeuid: collection.data().likeuid,
        };
        setClickIcon(true);
        setLikenum((prev) => [likeObj, ...prev]);
      });
    }
  };

  useEffect(() => {
    getUserLike();
  }, [user]);

  // 좋아요 클릭
  const onclick = async () => {
    if (user !== null) {
      setClickIcon(!clickICon);

      if (clickICon === false) {
        await setDoc(doc(dbService, "weekly_report", id, "like", user.uid), {
          likename: user.displayName,
          likeuid: user.uid,
        });
        // 유저별 좋아요 정보 firestore에 저장
        await setDoc(doc(dbService, "users", user.uid, "liked", id), {
          title: title,
          writer: writer,
          date: date,
        });
      } else {
        await deleteDoc(doc(dbService, "weekly_report", id, "like", user.uid));
        await deleteDoc(doc(dbService, "users", user.uid, "liked", id));
      }

      // window.location.reload();
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <TabContext value={value}>
        <Container maxWidth="md">
          <Box
            sx={{ borderColor: "divider", position: "relative", left: "35%" }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{ justifyContent: "center" }}
            >
              <Tab label="주간이슈" value="1" sx={{ color: "white" }} />
              <Tab label="Winner & Loser" value="2" sx={{ color: "white" }} />
            </TabList>
          </Box>
        </Container>
        <p />
        <TabPanel value="1">
          <ReportContents
            user={user}
            id={id}
            title={title}
            writer={writer}
            date={date}
          />
        </TabPanel>
        <TabPanel value="2">
          <Winner
            user={user}
            id={id}
            title={title}
            writer={writer}
            date={date}
          />
        </TabPanel>
      </TabContext>

      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ButtonGroup variant="outlined">
              <IconButton onClick={onclick}>
                {clickICon === true ? (
                  <>
                    <FavoriteIcon sx={{ color: pink[500] }} />
                    <Typography variant="body1" sx={{ color: grey[50]}}>{countValue}</Typography>
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon sx={{ color: pink[500] }} />
                    <Typography variant="body1" sx={{ color: grey[50] }}>{countValue}</Typography>
                  </>
                )}
              </IconButton>
              
              <IconButton onClick={handleOpen}>
                <SendIcon sx={{ color: grey[50] }} />
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
            <Comment
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
