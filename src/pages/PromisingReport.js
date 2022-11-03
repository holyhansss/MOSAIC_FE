import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Container,
  Grid,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
  Button
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Viewer
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import styled from "styled-components";
import PromisingScore from "../components/PromisingCoin/PromisingScore";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
const MainContainer = styled(Container)`
  position: relative;
  z-index: 1;
`;

// const MainViewer = styled(Viewer)`
//   &.toastui-editor-contents {
//     font-size : 50px;
//   }
// `;

export default function PromisingReport() {
  // 유망코인 정보
  const { id } = useParams();
  const [promising, setPromising] = useState(null);
  const [gradeImg, setGradeImg] = useState("");

  const getContents = async () => {
    const docRef = doc(dbService, "cryptocurrency", id);
    const docSnap = await getDoc(docRef);
    setPromising(docSnap.data());

    if (docSnap.data().rating === "D") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FD.png?alt=media&token=7494f9d9-dd21-4d89-8ccb-a5a3d68d93cc"
      );
    } else if (docSnap.data().rating === "C") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FC.png?alt=media&token=b28afc0b-0f9a-4d70-af88-604ce6432d33"
      );
    } else if (docSnap.data().rating === "CC") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FCC.png?alt=media&token=dfd3bdce-7d2d-443e-a7c2-cdb1eda58703"
      );
      } else if (docSnap.data().rating === "CCC") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FCCC.png?alt=media&token=8ab979bf-f05f-4b37-a305-f1c17b40cdcf"
      );
    } else if (docSnap.data().rating === "B-") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FB-.png?alt=media&token=da27c7e2-7b0c-4c73-bedd-59cfb7033f61"
      );
    } else if (docSnap.data().rating === "B") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FB.png?alt=media&token=44c2dd15-82a7-4610-ab5e-e84bb98288f9"
      );
    } else if (docSnap.data().rating === "B+") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FB%2B.png?alt=media&token=48419489-7127-4ba6-80fb-144db7a0fc35"
      );
    } else if (docSnap.data().rating === "BB-") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBB-.png?alt=media&token=811912dc-5845-41cf-990d-e1c396b72e4f"
      );
    } else if (docSnap.data().rating === "BB") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBB.png?alt=media&token=127a30d6-d661-4fe6-876b-73e985147bda"
      );
    } else if (docSnap.data().rating === "BB+") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBB%2B.png?alt=media&token=6fcee14d-d572-425a-91eb-303211ad16e0"
      );
    } else if (docSnap.data().rating === "BBB") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FBBB.png?alt=media&token=9e5ee3e7-8dd6-4034-a817-1dc6584bf79e"
      );
    } else if (docSnap.data().rating === "A-") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FA-.png?alt=media&token=2d168ac1-c440-45e3-8bb6-cb2c0c971112"
      );
    } else if (docSnap.data().rating === "A") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FA.png?alt=media&token=d791675d-cb8b-4dd0-be83-db337874230e"
      );
    } else if (docSnap.data().rating === "A+") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FA%2B.png?alt=media&token=2ef9a10b-0619-4679-8248-94e3e3ec77e4"
      );
    } else if (docSnap.data().rating === "AA-") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAA-.png?alt=media&token=9c953c8a-82cb-46e7-991b-40480e42db46"
      );
    } else if (docSnap.data().rating === "AA") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAA.png?alt=media&token=729a2a96-6b1a-4b86-b189-b1625ff3acbc"
      );
    } else if (docSnap.data().rating === "AA+") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAA%2B.png?alt=media&token=fa78cc19-c0d9-4387-baf0-2e0d10d36807"
      );
    } else if (docSnap.data().rating === "AAA") {
      setGradeImg(
        "https://firebasestorage.googleapis.com/v0/b/mosaic-db1e4.appspot.com/o/rank%2FAAA.png?alt=media&token=d1c9aeb6-8883-4dc5-9df3-c40657903b72"
      );
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  let email = "잘못된 정보가 있다면 Mosaic에게 메일을 보내주세요";
  const navigate = useNavigate();

  return (
    <div>
    <IconButton onClick={ () => {navigate(-1);}}>
      <ArrowBackIcon />
    </IconButton>
    <MainContainer maxWidth="md" disableGutters>
      {promising !== null && (
        <Grid container direction="row" spacing={5}>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", m: 1 }}
              >
                {promising.name}
              </Typography>
              <img src={promising.logo} alt="logo" width={30} />
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">{promising.hashtag}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                display="block"
                align="center"
                gutterBottom
              >
                {moment(promising.date).format("YYYY.MM.DD")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} display="flex"  justifyContent="center"
              alignItems="center">
            <img src={gradeImg} alt="Grade" width="55%" align="center"></img>
          </Grid>
          {promising.type === "coin" ? (
            <PromisingScore
              type={promising.type}
              score1={promising.scalability}
              score2={promising.decentralization}
              score3={promising.security}
              score4={promising.others}
            />
          ) : (
            <PromisingScore
              type={promising.type}
              score1={promising.business}
              score2={promising.technicality}
              score3={promising.reliability}
            />
          )}
          <Grid item xs={12}>
            <Viewer initialValue={promising.description} />

          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                paddingTop: 2,
              }}
            />
            <Typography
              variant="h5"
              align="left"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              선정 이유
            </Typography>
            <Box
              sx={{
                paddingTop: 3,
              }}
            />
            <Viewer initialValue={promising.assessment} />
            <Typography
              variant="body1"
              align="left"
              component="div"
              sx={{ lineHeight: 2, letterSpacing: 0.25, marginTop: 5 }}
            >
              {promising.general}
            </Typography>
            <Box
              sx={{
                paddingTop: 3,
              }}
            />
          </Grid>
          {/* <Grid item xs={12}>
            {promising.description.map((content) => (
              <Typography
                variant="body1"
                align="left"
                gutterBottom
                component="div"
                sx={{ lineHeight: 2, letterSpacing: 0.25 }}
              >
                {content}
              </Typography>
            ))}
          </Grid> */}
          <Grid item xs={12}>
            <Box
              sx={{
                paddingTop: 2,
              }}
            />
            <Typography
              variant="h5"
              align="left"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              코인마켓캡 링크
            </Typography>
            <Box
              sx={{
                paddingTop: 3,
              }}
            />
            <Typography
              variant="body1"
              align="left"
              component="div"
              sx={{ lineHeight: 2, letterSpacing: 0.25, marginTop: 5 }}
            >
              <Button onClick ={() => {window.open( promising.cmcLink, '_blank')}}> {promising.cmcLink} </Button>
             {/* <Link to={promising.cmcLink} /> */}
             {/* <a href={promising.cmcLink} /> */}
            </Typography>
            <Box
              sx={{
                paddingTop: 3,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Tooltip title={email} disableInteractive>
              <IconButton>
                <AttachEmailIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </MainContainer>
  </div>
  );
}
