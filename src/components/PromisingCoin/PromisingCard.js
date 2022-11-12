import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PromisingCard({ crypto }) {
  const navigate = useNavigate();
  const move = () => {
    navigate("/promising/" + crypto.id, {
      state: {
        id: crypto.id,
      },
    });
  };
  return (
    <div onClick={move}>
      <Card sx={{ maxWidth: 350 }}>
        <CardMedia
          component="img"
          height="200"
          image={crypto.thumbnail}
          alt="Cryptoimage"
        />
      </Card>
      <CardContent>
        <div
          style={{
            display: "flex",
            flexDrection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {crypto.name}
          </Typography>
          <Typography gutterBottom variant="body1" sx={{ color: "gray" }}>
            　{crypto.code}
          </Typography>
        </div>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          {crypto.hashtag}
        </Typography>
      </CardContent>
    </div>
  );
}
