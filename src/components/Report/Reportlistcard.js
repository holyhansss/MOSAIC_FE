import React from "react";
import { List, ListItem, Divider,ListItemText, ListItemAvatar, Avatar, Typography, Card, CardActionArea, CardContent, CardMedia, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyleCard = styled(Card)`
  background: linear-gradient(-45deg, #0b062d 10%, #230b65 90%);
`;

const StyleCardSmall = styled(Card)`
  background: linear-gradient(-45deg, #0b062d 10%, #2e1c72 90%);
`;

function Reportrecentcard({ id, title, writer, date }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
    navigate("/reportDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
      },
    });
  };

  return (
    // <CardActionArea onClick={move}>
    //   <StyleCard
    //     sx={() => ({
    //       height: "280px",
    //       py: "32px",
    //       borderRadius: "20px",
    //       color: "white",
    //       boxShadow: 3
    //     })}
    //   >
    //     <CardContent>
    //       <Typography gutterBottom variant="h4" component="div">
    //         {title}
    //       </Typography>
    //       <Typography variant="h6">{writer}</Typography>
    //       <p />
    //       <Typography variant="caption">
    //         더보기
    //         <ArrowForwardIcon fontSize="small" />
    //       </Typography>
    //     </CardContent>
    //   </StyleCard>
    // </CardActionArea>
    <Card sx={{ maxWidth: 1 }}>
      <CardActionArea onClick={move}>
        <CardMedia
          component="img"
          height= "230"
          image="https://cdn.dribbble.com/users/30229/screenshots/16975390/ndax_dribbble_coins_2.png?compress=1&resize=400x300"
          alt="daily image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            암호화폐 거래업체 윈터뮤트 2200억 해킹
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

function Reportlistcard({ id, title, date, writer }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
    navigate("/reportDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
      },
    });
  };
  return (
      // <CardActionArea onClick={move}>
      //   <StyleCardSmall
      //     sx={{
      //       width: 1,
      //       height: 180,
      //       margin: 1,
      //       borderRadius: "10px",
      //       color: "white",
      //       boxShadow: 3
      //     }}
      //   >
      //     <CardContent>
      //       <Typography gutterBottom variant="h6" component="div">
      //         {title}
      //       </Typography>
      //       <Typography variant="body2">{writer}</Typography>
      //     </CardContent>
      //   </StyleCardSmall>
      // </CardActionArea>

      <Card sx={{ maxWidth: 1 }}>
        <CardActionArea onClick={move}>
          <CardMedia
            component="img"
            height= "230"
            image="https://cdn.dribbble.com/users/30229/screenshots/16975390/ndax_dribbble_coins_2.png?compress=1&resize=400x300"
            alt="daily image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
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

export { Reportlistcard };

function ReportlistForm({ id, title, date, writer }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
    navigate("/reportDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
      },
    });
  };
  return (
    
    <List sx={{ width: "75%", bgcolor: 'background.paper', mx: "auto"}}>
      <ListItem button alignItems="flex-start" onClick={move}>
        <ListItemText
          primary={            
          <React.Fragment>
            <Typography
              sx={{ display: 'inline'}}
              component="span"
              variant="h5"
              color="text.primary"
            >
              {title}
            </Typography>
          </React.Fragment>}

          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {writer}
              </Typography>
            </React.Fragment>
          }
          // sx={{py:5, px:3}}
        />
        <ListItemAvatar sx={{pb:1}}>
          <Avatar alt="Remy Sharp" src="https://blog.kakaocdn.net/dn/RbIRm/btqV8F1wVH3/cRKJ1lSX7buBlmQtCB7f6k/img.png" variant="square" sx={{borderRadius: '8%', width: "6rem", height: "4rem"}}  />
        </ListItemAvatar>
      </ListItem>
      <Divider sx={{ width:'100%', mt:1}}/>
    </List>

  );
}

export { ReportlistForm };

function ReportlistFormAll({ id, title, date, writer }) {
  const navigate = useNavigate();
  const move = () => {
    // 두번재 인자의 state 속성에 원하는 파라미터를 넣어준다. (id, job을 넣어봤다)
    navigate("/reportDetail/" + id + "/" + title + "/" + writer + "/" + date, {
      state: {
        id: id,
        title: title,
        writer: writer,
        date: date,
      },
    });
  };
  return (
    
    <List sx={{ width: "75%", bgcolor: 'background.paper', mx: "auto"}}>
      <ListItem button alignItems="flex-start" onClick={move}>
        <ListItemText
          primary={            
          <React.Fragment>
            <Typography
              sx={{ display: 'inline'}}
              component="span"
              variant="h5"
              color="text.primary"
            >
              {title}
            </Typography>
          </React.Fragment>}

          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {writer}
              </Typography>
            </React.Fragment>
          }
          sx={{py:5, px:3}}
        />
        <ListItemAvatar sx={{pb:1}}>
          <Avatar alt="Remy Sharp" src="https://blog.kakaocdn.net/dn/RbIRm/btqV8F1wVH3/cRKJ1lSX7buBlmQtCB7f6k/img.png" variant="square" sx={{borderRadius: '8%', width: "15rem", height: "10rem"}}  />
        </ListItemAvatar>
      </ListItem>
      <Divider sx={{ width:'100%', mt:3}}/>
    </List>

  );
}

export { ReportlistFormAll };
