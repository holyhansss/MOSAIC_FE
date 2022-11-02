import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PostListCard({
  id,
  title,
  date,
  writer,
  thumbnail,
  type,
}) {
  const navigate = useNavigate();
  const move = () => {
    if (type === "weekly") {
      navigate(
        "/reportDetail/" + id + "/" + title + "/" + writer + "/" + date,
        {
          state: {
            id: id,
            title: title,
            writer: writer,
            date: date,
            thumbnail: thumbnail,
          },
        }
      );
    } else {
      navigate(
        "/reportDailyDetail/" + id + "/" + title + "/" + writer + "/" + date,
        {
          state: {
            id: id,
            title: title,
            writer: writer,
            date: date,
            thumbnail: thumbnail,
          },
        }
      );
    }
  };

  return (
    <Card sx={{ maxWidth: 1 }}>
      <CardActionArea onClick={move}>
        <CardMedia
          component="img"
          height="90"
          src={thumbnail}
          alt="thumbnail"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {writer}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
