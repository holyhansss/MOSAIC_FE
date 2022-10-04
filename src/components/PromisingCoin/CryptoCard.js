import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { StyledLink } from "../Header/Header";
//image
import cardimage001 from "../../img/PromisingCoins/Ethereum.jpg";
import cardimage002 from "../../img/PromisingCoins/Tezos.jpg";
import cardimage003 from "../../img/PromisingCoins/Lido Dao.jpg";
import cardimage004 from "../../img/PromisingCoins/Ultra.jpg";
import cardimage005 from "../../img/PromisingCoins/Reef.jpg";

export default function CryptoCard() {
  return (
    <Grid container direction="row" spacing={5}>
      <Grid item xs="auto">
        <StyledLink to="/promising/ethereum">
          <Card sx={{ maxWidth: 350 }}>
            <CardMedia
              component="img"
              height="200"
              image={cardimage001}
              alt="Cryptoimage"
            />
          </Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              이더리움
            </Typography>
            <Typography variant="body2" color="text.secondary">
              #이더리움 #기술성
            </Typography>
          </CardContent>
        </StyledLink>
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Tezos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #Tezos #기술성
          </Typography>
        </CardContent>
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lida Dao
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #Lida Dao #이더리움 #기술성
          </Typography>
        </CardContent>
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Ultra
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #Ultra #상승 #기술성
          </Typography>
        </CardContent>
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Reef
          </Typography>
          <Typography variant="body2" color="text.secondary">
            #잠재력 #기술성
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  );
}
