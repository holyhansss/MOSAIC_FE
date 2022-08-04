import React, { useState, useEffect } from "react";
import {
  Avatar,
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  IconButton,
  TextField,
  Box,
  Button,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import {
  query,
  collection,
  getDocs,
  orderBy,
  setDoc,
  doc,
  deleteDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "../../firebase.js";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { grey } from "@mui/material/colors";
import styled from "styled-components";


//style
const StyleButton = styled(Button)`
background: linear-gradient(-45deg, #0b062d 5%, #230b65 90%);
`;

function SingleComment({ value, id, user, title, writer, date, commentObj }) {
  const [useId, setUserId] = useState("");
  const [ava, setAva] = useState(null);
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (user !== null) {
      setUserId(user.displayName);
      setAva(user.photoURL);
      setUid(user.uid);
    }
  }, [user]);

  const [OpenReply, setOpenReply] = useState(false);
  const [Openlist, setOpenlist] = useState(false);
  const [reply, setReply] = useState("");

  //댓글 삭제하기(대댓글 삭제는 onclick 에 직접 들어있음)
  const ondelete = async (event) => {
    await updateDoc(
      doc(dbService, "weekly_report", id, "comment", commentObj.subid),
      {
        show: false,
      }
    );

    const q = query(
      collection(dbService, "weekly_report", id, "comment"),
      where("user_uid", "==", uid),
      where("show", "==", true)
    );
    const querySnapShot = await getDocs(q);
    if (querySnapShot.empty) {
      console.log(querySnapShot);
      await deleteDoc(doc(dbService, "users", user.uid, "comment", id));
    }
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
  const onsubmit = async (event) => {
    event.preventDefault();
    const time = Date.now();
    // const timeString = time.toString();
    await setDoc(doc(dbService, "weekly_report", id, "comment", String(time)), {
      comment: reply,
      avatar: ava,
      nickname: useId,
      created_at: time,
      user_uid: uid,
      show: true,
      isreply: true,
      replyid: commentObj.subid,
    });

    // 유저별 '댓글 단 글' 저장
    await setDoc(doc(dbService, "users", user.uid, "comment", id), {
      title: title,
      writer: writer,
      date: date,
    });

    setReply("");
    setUserId("");
    setAva("");
    window.location.reload();
    // setLike(0);
  };

  //대댓글 정보 가져오기
  const [replylist, setReplylist] = useState([]);
  const [replyId, setReplyId] = useState("");

  const getReplies = async () => {
    const repl = query(
      collection(dbService, "weekly_report", id, "comment"),
      where("isreply", "==", true),
      where("replyid", "==", commentObj.subid),
      orderBy("created_at", "desc")
    );
    const querySnapShot = await getDocs(repl);

    querySnapShot.forEach((collection) => {
      const replyObj = {
        id: collection.id,
        recomment: collection.data().comment,
        credate: collection.data().created_at,
        avat: collection.data().avatar,
        name: collection.data().nickname,
        user_uid: collection.data().user_uid,
        show: collection.data().show,
      };
      setReplyId(replyObj.id);
      setReplylist((prev) => [replyObj, ...prev]);
    });
  };
  useEffect(() => {
    getReplies();
  }, []);

  return (
    <div>
      {/* 댓글리스트 */}
      <List>
        <ListItem
          alignItems="flex-start"
          secondaryAction={
            <div key={value}>
              {commentObj.user_uid === uid && commentObj.show === true ? (
                <IconButton edge="end" aria-label="comment" onClick={ondelete}>
                  <DeleteIcon fontSize="small" sx={{ color: grey[50] }} />
                </IconButton>
              ) : null}
            </div>
          }
        >
          <ListItemAvatar>
            <Avatar src={commentObj.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={commentObj.nickname}
            secondary={
              <React.Fragment>
                {commentObj.show === true ? (
                  <Typography
                    sx={{ display: "inline", color: grey[50] }}
                    component="span"
                    variant="body2"
                  >
                    {commentObj.comment}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      display: "inline",
                      fontStyle: "italic",
                      color: grey[500],
                    }}
                    component="span"
                    variant="body2"
                  >
                    삭제된 댓글입니다
                  </Typography>
                )}
                <br />
                <Typography variant="caption" sx={{ color: grey[50] }}>
                  {moment(commentObj.date).format("YYYY.MM.DD HH:mm:ss")}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={onClickReplyOpen}
                >
                  <CommentIcon fontSize="small" sx={{ color: grey[50] }} />
                </IconButton>
                {replylist.length !== 0 ? (
                  <IconButton
                    edge="end"
                    aria-label="comment"
                    onClick={onClickReplylistOpen}
                  >
                    {Openlist === false ? (
                      <KeyboardArrowDownIcon
                        fontSize="small"
                        sx={{ color: grey[50] }}
                      />
                    ) : (
                      <KeyboardArrowUpIcon
                        fontSize="small"
                        sx={{ color: grey[50] }}
                      />
                    )}
                  </IconButton>
                ) : null}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>

      {/* 대댓글 작성칸 */}
      {OpenReply && ( //openReply값이 true일때만 대댓글창을 보이게만듬
        <form style={{ display: "flex" }} onSubmit={onsubmit}>
          <Box sx={{ display: "flex", alignItems: "flex-end", ml: "5%" }}>
            <Avatar
              src={ava}
              sx={{
                color: "action.active",
                mr: 1,
                my: 0.5,
                width: 24,
                height: 24,
              }}
            />
          </Box>
          <TextField
            id="input-with-sx"
            label="코멘트를 작성해 주세요"
            variant="standard"
            sx={{ color: "action.active", width: "80%" }}
            onChange={onHandleChange}
            inputProps={{ style: { color: "white" } }}
          />

          <br />
          {user !== null ? (
            <StyleButton
              variant="contained"
              sx={{ width: "10%", height: "40px", borderRadius: "5px" }}
              onClick={onsubmit}
            >
              댓글
            </StyleButton>
          ) : (
            <Button
              disabled
              variant="contained"
              sx={{ width: "10%", height: "40px", borderRadius: "5px" }}
            >
              댓글
            </Button>
          )}
        </form>
      )}

      {/* 대댓글 목록 */}
      {Openlist && ( //openReply값이 true일때만 대댓글창을 보이게만듬
        <List>
          {replylist.map((rep, idx) => (
            <div key={idx}>
              <ListItem
                alignItems="flex-start"
                sx={{ ml: "3%" }}
                secondaryAction={
                  <div>
                    {rep.user_uid === uid && rep.show === true ? (
                      <IconButton
                        edge="end"
                        aria-label="comment"
                        onClick={async () => {
                          await updateDoc(
                            doc(
                              dbService,
                              "weekly_report",
                              id,
                              "comment",
                              rep.id
                            ),
                            {
                              show: false,
                            }
                          );
                          const q2 = query(
                            collection(
                              dbService,
                              "weekly_report",
                              id,
                              "users",
                              user.uid,
                              "comments"
                            )
                          );
                          const querySnapShot2 = await getDocs(q2);
                          if (querySnapShot2.empty) {
                            await deleteDoc(
                              doc(dbService, "users", user.uid, "comment", id)
                            );
                          }

                          window.location.reload();
                        }}
                      >
                        <DeleteIcon fontSize="small" sx={{ color: grey[50] }} />
                      </IconButton>
                    ) : null}
                  </div>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={rep.avat}
                    sx={{
                      color: "action.active",
                      mr: 1,
                      my: 0.5,
                      width: 24,
                      height: 24,
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={rep.name}
                  secondary={
                    <React.Fragment>
                      {rep.show === true ? (
                        <Typography
                          sx={{ display: "inline", color: grey[50] }}
                          component="span"
                          variant="body2"
                        >
                          {rep.recomment}
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            display: "inline",
                            fontStyle: "italic",
                            color: grey[500],
                          }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          삭제된 댓글입니다
                        </Typography>
                      )}
                      <br />
                      <Typography variant="caption" sx={{ color: grey[50] }}>
                        {moment(rep.credate).format("YYYY.MM.DD HH:mm:ss")}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          ))}
        </List>
      )}
    </div>
  );
}

export default SingleComment;
