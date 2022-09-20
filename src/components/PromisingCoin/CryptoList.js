import React, { useRef, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

//image
import cardimage001 from "../../img/PromisingCoins/001.jpg";
import cardimage002 from "../../img/PromisingCoins/002.jpg";
import cardimage003 from "../../img/PromisingCoins/003.jpg";
import cardimage004 from "../../img/PromisingCoins/004.jpg";
import cardimage005 from "../../img/PromisingCoins/005.jpg";



export default function CryptoCard() {
  return (
    <Grid container direction="row" spacing={5}>
        <Grid item xs="auto">
            <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={cardimage001}
                    alt="Cryptoimage"
                />
            </Card>
        </Grid> 
        <Grid item xs="auto">
            <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={cardimage002}
                    alt="Cryptoimage"
                />
            </Card>
        </Grid>
        <Grid item xs="auto">
            <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={cardimage003}
                    alt="Cryptoimage"
                />
            </Card>
        </Grid>
        <Grid item xs="auto">
            <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={cardimage004}
                    alt="Cryptoimage"
                />
            </Card>
        </Grid>
        <Grid item xs="auto">
            <Card sx={{ maxWidth: 350 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={cardimage005}
                    alt="Cryptoimage"
                />
            </Card>
        </Grid>
    </Grid>
  );
}
