import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { dbService } from "../../firebase.js";
import { Grid, Container, Box, Typography, Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";

const Winner = ({ user, id, title, writer, date }) => {
  const [winner, setWinner] = useState([]);

  const getContents = async () => {
    const win = collection(dbService, "weekly_report", id, "WinnerLoser");
    const querySnapShot = await getDocs(win);

    querySnapShot.forEach((collection) => {
      const investObj = {
        desc1: collection.data().desc1,
        desc2: collection.data().desc2,
        img1: collection.data().img1,
        img2: collection.data().img2,
      };
      setWinner((prev) => [investObj, ...prev]);
    });
  };

  useEffect(() => {
    getContents();
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3" align="center">
              {title}
            </Typography>
            <p />
            <Typography
              variant="caption"
              display="block"
              align="center"
              gutterBottom
            >
              {date}
            </Typography>
            <p />

            <Box
              sx={{
                paddingTop: 10,
              }}
            />

            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", m: 1 }}
            >
              Winner&Loser
            </Typography>
            <Box
              sx={{
                paddingTop: 6,
              }}
            />

            <p />
            <div>
              {winner.map((invem, index) => (
                <div key={index}>
                  <p />
                  <Typography
                    variant="body1"
                    align="left"
                    gutterBottom
                    component="div"
                  >
                    {invem.desc1}
                  </Typography>
                  <p />
                  <Avatar
                    alt="pic1"
                    src={invem.img1}
                    variant="square"
                    sx={{ width: "53rem", height: "40rem" }}
                  />
                  <p />
                  <Typography
                    variant="body1"
                    align="left"
                    gutterBottom
                    component="div"
                  >
                    {invem.desc2}
                  </Typography>
                  <p />
                  <Avatar
                    alt="pic2"
                    src={invem.img2}
                    variant="square"
                    sx={{ width: "53rem", height: "40rem" }}
                  />
                  <p />
                </div>
              ))}
            </div>
            <p />
            <Box
              sx={{
                paddingTop: 10,
              }}
            />

            <div>
              <Typography
                variant="subtitle1"
                align="center"
                gutterBottom
                component="div"
                sx={{ textDecoration: "underline" }}
              >
                Credit
              </Typography>
            </div>
            <Typography
              variant="subtitle2"
              align="center"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold", m: 1 }}
            >
              {writer}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Winner;
