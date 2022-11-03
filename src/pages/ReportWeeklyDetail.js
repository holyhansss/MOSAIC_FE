import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Tab,
  Container,
  Grid,
  Modal,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  query,
  getDocs,
  collection,
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//components
import ReportContents from "../components/Report/ReportContents";
import Winner from "../components/Report/Winner";
import { Comment } from "../components/Comment/Comment";

export default function ReportWeeklyDetail({ user }) {
  const { id, title, writer, date } = useParams();
  const location = useLocation();
  const thumbnail = location.state.thumbnail;

  const [value, setValue] = useState("1");

  //코멘트 가져오기
  const [reply, setReply] = useState([]);
  const getReplies = async () => {
    const repl = query(
      collection(dbService, "weekly_report", id, "comment"),
      where("isreply", "==", false)
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

  // user가 이전에 좋아요를 눌렀는지 안눌렀는지 확인
  const getUserLike = async () => {
    if (likescount.length !== 0) {
      const getUserLike = likescount.find((userid) => userid.likeuid === uid);
      if (getUserLike !== undefined) {
        setClickIcon(true);
      } else {
        setClickIcon(false);
      }
    }
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
        await setDoc(doc(dbService, "weekly_report", id, "like", user.uid), {
          likename: user.displayName,
          likeuid: user.uid,
        });
        setCount(count + 1);
        // 유저별 좋아요 정보 firestore에 저장
        await setDoc(doc(dbService, "users", user.uid, "liked", id), {
          title: title,
          writer: writer,
          date: date,
          thumbnail: thumbnail,
          type: "weekly",
        });
      } else {
        await deleteDoc(doc(dbService, "weekly_report", id, "like", user.uid));
        await deleteDoc(doc(dbService, "users", user.uid, "liked", id));
        setCount(count - 1);
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

  const navigate = useNavigate();
  return (
    <div>
      <IconButton onClick={ () => {navigate(-1);}}>
        <ArrowBackIcon />
      </IconButton>

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
              <Tab label="주간 이슈" value="1" />
              <Tab label="Winner & Loser" value="2" />
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
                    <Typography variant="body1">{count}</Typography>
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon sx={{ color: pink[500] }} />
                    <Typography variant="body1">{count}</Typography>
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
            <Comment
              user={user}
              id={id}
              title={title}
              rep={reply}
              writer={writer}
              date={date}
              thumbnail={thumbnail}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
