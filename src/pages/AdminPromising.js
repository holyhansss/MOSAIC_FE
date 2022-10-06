import React, { useState, useEffect, useRef } from "react";
// react bootstrap
import { Container, Row, Spinner } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";


const AdminPromising = () => {
  const db = getFirestore();
  const storage = getStorage();

  const [loading, setLoading] = useState("");
  const [cryptoName, setCryptoName] = useState('');
  const [cryptoTag, setCryptoTag] = useState('');
  const [cryptoType, setCryptoType] = useState('');
  const [isPromising, setIsPromising] = useState('');


  const handleOnChangeCryptoName = (value) => {
    setCryptoName(value);
  };
  const handleOnChangeCryptoTag = (value) => {
    setCryptoTag(value);
  };
  const handleOnChangeCryptoType = (value) => {
    setCryptoType(value);
  };
  const handleOnChangeCryptoPromi = (value) => {
    setIsPromising(value);
  };



  const submitContent = async () => {
  //   const currentTime = Unix_timestampConv();
  //   let thumbnailStorageRef = ref(
  //     storage,
  //     `thumbnail/daily_report/${currentTime}`
  //   );

  // await uploadBytes(thumbnailStorageRef, thumbnail);
  // const thumbnailStorageURL = await getDownloadURL(thumbnailStorageRef);

  // const time = Date;
  const docRef = await addDoc(collection(db, "cryptocurrency"), {
    name : cryptoName,
    hashtag : cryptoTag,
    type : cryptoType,
    promising : isPromising,
  });

  setTimeout(() => {
    alert("uploaded to database!!");
    setLoading(false);
    window.location.reload();
  }, 2000);
};

  return (
    <Container>
      <div>
        <Container className="my-5">
        <Typography variant="h5" gutterBottom>
          크립토 이름
        </Typography>
        <Form.Control
          key={"CryptoName"}
          className=""
          type=""
          placeholder="크립토 이름"
          style={{
            width: "100%",
            height: "50px",
          }}
          onChange={(e) => {
            handleOnChangeCryptoName(e.target.value);
          }}
          label=""
        />
        
      </Container>
          <Container className="my-5">
          <Typography variant="h5" gutterBottom>
            해시태그
          </Typography>
          <Form.Control
            key={"cryptoTag"}
            className=""
            type=""
            placeholder="크립토 이름"
            style={{
              width: "100%",
              height: "50px",
            }}
            onChange={(e) => {
              handleOnChangeCryptoTag(e.target.value);
            }}
            label=""
          />
        </Container>
        <Container className="my-5">
          <Typography variant="h5" gutterBottom>
            크립토 타입
          </Typography>
          <Form.Check
            inline
            type="radio"
            label="코인"
            value="코인"
            name="group1"
            onClick={(e) => {
              handleOnChangeCryptoType(e.target.value);
            }}
          />
          <Form.Check
            inline
            type="radio"
            label="토큰"
            name="group1"
            value="토큰"
            onClick={(e) => {
              handleOnChangeCryptoType(e.target.value);
            }}
          />
        </Container>

        <Container className="my-5">
          <Typography variant="h5" gutterBottom>
            유망 코인 여부
          </Typography>
          <Form.Check
            inline
            type="radio"
            label="O"
            name="group2"
            value={true}
            onClick={(e) => {
              handleOnChangeCryptoPromi(e.target.value);
            }}
          />
          <Form.Check
            inline
            type="radio"
            label="X"
            value={false}
            name="group2"
            onClick={(e) => {
              handleOnChangeCryptoPromi(e.target.value);
            }}
          />
        </Container>
       




        <Row className="justify-content-md-center my-5">
          <Button
            variant="outline-primary"
            style={{
              width: "100px",
            }}
            onClick={() => {
              setLoading(true);
              submitContent();
            }}
          >
            Upload
          </Button>
          {loading === true ? (
            <Spinner className="ms-2" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <div></div>
          )}
        </Row>
        
      </div>
    </Container>
    

  );
};

export default AdminPromising;
