import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
    <CardActionArea onClick={move}>
      <StyleCard
        sx={() => ({
          height: "280px",
          py: "32px",
          borderRadius: "20px",
          color: "white",
        })}
      >
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Typography variant="h6">{writer}</Typography>
          <p />
          <Typography variant="caption">
            더보기
            <ArrowForwardIcon fontSize="small" />
          </Typography>
        </CardContent>
      </StyleCard>
    </CardActionArea>
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
    <CardActionArea onClick={move}>
      <StyleCardSmall
        sx={{
          width: 1,
          height: 180,
          margin: 1,
          borderRadius: "10px",
          color: "white",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2">{writer}</Typography>
        </CardContent>
      </StyleCardSmall>
    </CardActionArea>
  );
}

export { Reportlistcard };
