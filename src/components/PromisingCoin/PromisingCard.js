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
    <Grid
      item
      xs={12}
      md={5}
      lg={4}
      sx={{ display: "flex", justifyContent: "center" }}
    >
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
          <Typography gutterBottom variant="h5" component="div">
            {crypto.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {crypto.hashtag}
          </Typography>
        </CardContent>
      </div>
    </Grid>
  );
}
