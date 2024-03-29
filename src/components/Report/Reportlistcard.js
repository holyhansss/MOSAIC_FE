import React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

//Responsive Web
import {Pc, Mobile} from "../Responsive/Responsive";

// 주간 리포트 - 최신 리포트 (큰 사이즈)
function Reportrecentcard({ id, title, writer, date, thumbnail, hashtag }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다.
    navigate("/reportDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
        thumbnail: thumbnail,
        hashtag: hashtag,
      },
    });
  };

  return (

    <Card sx={{ maxWidth: 1 }}>
      <CardActionArea onClick={move}>
        <CardMedia
          component="img"
          height="240"
          image={thumbnail}
          alt='thumbnail'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hashtag}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{display: "block"}}>
            {writer}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
          {/* <Typography variant="caption">
            더보기 <ArrowForwardIcon fontSize="small" />
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export { Reportrecentcard };

// 주간 리포트
function Reportlistcard({ id, title, date, writer, thumbnail }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다.
    navigate("/reportDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
        thumbnail: thumbnail,
      },
    });
  };
  return (

    <Card sx={{ maxWidth: 1 }}>
      <CardActionArea onClick={move}>
        <CardMedia
          component="img"
          height="90"
          image={thumbnail}
          alt="thumbnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{display : 'block'}}>
            {writer}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export { Reportlistcard };

// 일간 리포트 리스트 (메인)
function ReportlistForm({ id, title, date, writer, thumbnail }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다.
    navigate("/reportDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
        thumbnail: thumbnail,
      },
    });
  };
  return (
    <List sx={{ width: "75%", bgcolor: "background.paper", mx: "auto" }}>
      <ListItem button alignItems="flex-start" onClick={move}>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="subtitle1"
                color="text.primary"
              >
                {title}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <p />
                {writer}
              </Typography>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="caption"
                color="text.primary"
              >
                {date}
              </Typography>
            </React.Fragment>
          }

        />
        <ListItemAvatar sx={{ pb: 1 }}>
          <Avatar
            alt="Remy Sharp"
            src={thumbnail}
            variant="square"
            sx={{ borderRadius: "8%", width: "6rem", height: "4rem" }}
          />
        </ListItemAvatar>
      </ListItem>
      <Divider sx={{ width: "100%", mt: 1 }} />
    </List>
  );
}

export { ReportlistForm };

// 리포트 전체 보기
function ReportlistFormAll({ id, title, date, writer, thumbnail }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
    navigate("/reportDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
        thumbnail: thumbnail,
      },
    });
  };
  return (
    <>
    <Pc>
    <List sx={{ width: "75%", bgcolor: "background.paper", mx: "auto" }}>
      <ListItem button alignItems="flex-start" onClick={move}>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="h5"
                color="text.primary"
              >
                {title}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <p />
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {writer}
              </Typography>
              <p />
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {date}
              </Typography>
            </React.Fragment>
          }
          sx={{ py: 5, px: 3 }}
        />
        <ListItemAvatar sx={{ pb: 1 }}>
          <Avatar
            alt="Remy Sharp"
            src={thumbnail}
            variant="square"
            sx={{ borderRadius: "8%", width: "15rem", height: "10rem" }}
          />
        </ListItemAvatar>
      </ListItem>
      <Divider sx={{ width: "100%", mt: 3 }} />
    </List>
    </Pc>
    <Mobile>
    <List sx={{ width: "100%", bgcolor: "background.paper", mx: "auto" }}>
      <ListItem button alignItems="flex-start" onClick={move}>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="h5"
                color="text.primary"
              >
                {title}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <p />
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {writer}
              </Typography>
              <p />
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {date}
              </Typography>
            </React.Fragment>
          }
          sx={{ py: 5, px: 3 }}
        />
        <ListItemAvatar sx={{ pb: 1 }}>
          <Avatar
            alt="Remy Sharp"
            src={thumbnail}
            variant="square"
            sx={{ borderRadius: "8%", width: "15rem", height: "10rem" }}
          />
        </ListItemAvatar>
      </ListItem>
      <Divider sx={{ width: "100%", mt: 3 }} />
    </List>
    </Mobile>
    </>
  );
}

export { ReportlistFormAll };

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////For Daily Report////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function ReportrecentcardDetail({ id, title, writer, date, thumbnail, hashtag }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
    navigate("/reportDailyDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
        thumbnail: thumbnail,
        hashtag: hashtag,
      },
    });
  };

  return (

    <Card sx={{ maxWidth: 1 }}>
      <CardActionArea onClick={move}>
        <CardMedia
          component="img"
          height="240"
          image={thumbnail}
          alt='thumbnail'
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hashtag}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{display: "block"}}>
            {writer}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export { ReportrecentcardDetail };

function ReportlistFormDetail({ id, title, date, writer, thumbnail }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
    navigate("/reportDailyDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
        thumbnail: thumbnail,
      },
    });
  };
  return (
    <>
    <Pc>
    <List sx={{ width: "80%", bgcolor: "background.paper", mx: "auto" }}>
      <ListItem button alignItems="flex-start" onClick={move}>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="subtitle1"
                color="text.primary"
              >
                {title}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <p />
                {writer}
              </Typography>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="caption"
                color="text.primary"
              >
                {date}
              </Typography>
            </React.Fragment>
          }
          
        />
        <ListItemAvatar sx={{ pb: 1 }}>
          <Avatar
            alt="Remy Sharp"
            src={thumbnail}
            variant="square"
            sx={{ borderRadius: "8%", width: "6rem", height: "4rem" }}
          />
        </ListItemAvatar>
      </ListItem>
      <Divider sx={{ width: "100%", mt: 1 }} />
    </List>
    </Pc>
    <Mobile>
    <List sx={{ width: "100%", bgcolor: "background.paper", mx: "auto" }}>
      <ListItem button alignItems="flex-start" onClick={move}>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="subtitle1"
                color="text.primary"
              >
                {title}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <p />
                {writer}
              </Typography>
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="caption"
                color="text.primary"
              >
                {date}
              </Typography>
            </React.Fragment>
          }
          
        />
        <ListItemAvatar sx={{ pb: 1 }}>
          <Avatar
            alt="Remy Sharp"
            src={thumbnail}
            variant="square"
            sx={{ borderRadius: "8%", width: "6rem", height: "4rem" }}
          />
        </ListItemAvatar>
      </ListItem>
      <Divider sx={{ width: "100%", mt: 1 }} />
    </List>
    </Mobile>
    </>
  );
}

export { ReportlistFormDetail };

function DailyReportlistFormAll({ id, title, date, writer, thumbnail }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
    navigate("/reportDailyDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
        thumbnail: thumbnail,
      },
    });
  };
  return (
    <>
    <Pc>
    <List sx={{ width: "100%", bgcolor: "background.paper", mx: "auto" }}>
      <ListItem button alignItems="flex-start" onClick={move}>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="h5"
                color="text.primary"
              >
                {title}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <p />
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {writer}
              </Typography>
              <p />
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {date}
              </Typography>
            </React.Fragment>
          }
          sx={{ py: 5, px: 3 }}
        />
        <ListItemAvatar sx={{ pb: 1 }}>
          <Avatar
            alt="Remy Sharp"
            src={thumbnail}
            variant="square"
            sx={{ borderRadius: "8%", width: "15rem", height: "10rem" }}
          />
        </ListItemAvatar>
      </ListItem>
      <Divider sx={{ width: "100%", mt: 3 }} />
    </List>
    </Pc>
    <Mobile>
    <List sx={{ width: "100%", bgcolor: "background.paper"}}>
      <ListItem button alignItems="flex-start" onClick={move}>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                fontSize="100%"
                color="text.primary"
              >
                {title}
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <p />
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {writer}
              </Typography>
              <p />
              <Typography
                sx={{ display: "block" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {date}
              </Typography>
            </React.Fragment>
          }
          sx={{ py: 5 }}
        />
        <ListItemAvatar sx={{ pb: 1 ,display:"flex",justifyContent:"right",alignItems:"center"}}>
          <Avatar
            alt="Remy Sharp"
            src={thumbnail}
            variant="square"
            sx={{ borderRadius: "8%", width: "150px", height: "100px" }}
          />
        </ListItemAvatar>
      </ListItem>
      <Divider sx={{ width: "100%", mt: 3 }} />
    </List>
    </Mobile>
    </>
  );
}

export { DailyReportlistFormAll };