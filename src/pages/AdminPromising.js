import React, { useState, useEffect } from "react";
// react bootstrap
import { Container, Row, Spinner, Col } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import AdminRating from "../components/AdminRating/AdminRating";



const AdminPromising = () => {
  const db = getFirestore();
  const storage = getStorage();

  const [loading, setLoading] = useState("");
  const [cryptoName, setCryptoName] = useState('');
  const [cryptoTag, setCryptoTag] = useState('');
  const [cryptoType, setCryptoType] = useState(null);
  const [isPromising, setIsPromising] = useState(false);
  const [standard1, setStandard1] = useState('');
  const [standard2, setStandard2] = useState('');
  const [standard3, setStandard3] = useState('');
  const [standard1num, setStandard1Num] = useState(0);
  const [standard2num, setStandard2Num] = useState(0);
  const [standard3num, setStandard3Num] = useState(0);
  const [rating, setRating] = useState(0);
  const [thumbnail, setThumnail] = useState('');
  const [thumbnail1Url, setThumbnailUrl] = useState(null);
  const [logo, setLogo] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [assessment, setAssessment] = useState('');
  const [description, setDescription] = useState('');
 


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
  const handleOnChangeStandard1 = (value, num ) => {
    setStandard1(value);
    setStandard1Num(Number(num));
  }
  const handleOnChangeStandard2 = (value, num ) => {
    setStandard2(value);
    setStandard2Num(Number(num));
  }
  const handleOnChangeStandard3 = (value, num ) => {
    setStandard3(value);
    setStandard3Num(Number(num));
  }
  const handleOnChangeAssess = (value ) => {
    setAssessment(value);
  }
  const handleOnChangeDescription = (value) => {
    setDescription(value);
  }

  useEffect(() => {
    if (thumbnail) {
      setThumbnailUrl(URL.createObjectURL(thumbnail));
    }
    if (logo) {
      setLogoUrl(URL.createObjectURL(logo));
    }
  }, [thumbnail, logo]);


  const submitContent = async () => {
    let thumbnailStorageRef = ref(
      storage,
      `thumbnail/promising/${cryptoName}`
    );
    let logoStorageRef = ref(
      storage,
      `logo/${cryptoName}`
    );

  await uploadBytes(thumbnailStorageRef, thumbnail);
  await uploadBytes(logoStorageRef, logo);
  const thumbnailStorageURL = await getDownloadURL(thumbnailStorageRef);
  const logoStorageURL = await getDownloadURL(logoStorageRef);
  const time = Date;

  if (isPromising == false) {
    const docRef = await addDoc(collection(db, "cryptocurrency"), {
      name : cryptoName,
      hashtag : cryptoTag,
      type : cryptoType,
      promising : isPromising,
      [standard1]: standard1num,
      [standard2]: standard2num,
      [standard3]: standard3num,
    });

  } else {
    const docRef = await addDoc(collection(db, "cryptocurrency"), {
      name : cryptoName,
      hashtag : cryptoTag,
      type : cryptoType,
      promising : isPromising,
      [standard1]: standard1num,
      [standard2]: standard2num,
      [standard3]: standard3num,
      logo : logoStorageURL,
      thumbnail : thumbnailStorageURL,
      assessment : assessment,
      description : description,
    });
  }

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
            value="coin"
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
            value="token"
            onClick={(e) => {
              handleOnChangeCryptoType(e.target.value);
            }}
          />
        </Container>
        {/* <AdminCryptoType cryptoType={cryptoType}/> */}
        {
          cryptoType == null ?(
            null
          ):(
            cryptoType === "token" ? (
              <Container>
                <Row>
                    <Typography variant="h5">
                      Business
                    </Typography>
                    <Form.Control
                    key={"business"}
                    className=""
                    type=""
                    placeholder="점수를 입력하세요"
                    style={{
                      width: "30%",
                      height: "50px",
                    }}
                    id="business"
                    onChange={(e) => {
                      handleOnChangeStandard1(e.target.id, e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  <Typography variant="h5" gutterBottom>
                    Reliability
                  </Typography>
                  <Form.Control
                  key={"reliability"}
                  className=""
                  type=""
                  placeholder="점수를 입력하세요"
                  style={{
                    width: "30%",
                    height: "50px",
                  }}
                  id="reliability"
                  onChange={(e) => {
                    handleOnChangeStandard2(e.target.id, e.target.value);
                  }}
                />
                </Row>
                <Row>
                  <Typography variant="h5">
                    Technicality
                  </Typography>
                  <Form.Control
                  key={"technicality"}
                  className=""
                  type=""
                  placeholder="점수를 입력하세요"
                  style={{
                    width: "30%",
                    height: "50px",
                  }}
                  id="technicality"
                  onChange={(e) => {
                    handleOnChangeStandard3(e.target.id, e.target.value);
                  }}
                />
                </Row>
                <Container>
                  <Typography variant="h5">
                    Rating
                  </Typography>
                  {/* <AdminRating rating={rating} /> */}
                  {/* <Typography variant="h5">
                    {rating}
                  </Typography> */}

                </Container>
          </Container>
            ):(
              <Container>
                <Row>
                    <Typography variant="h5">
                      Decentralization
                    </Typography>
                    <Form.Control
                    key={"Decentralization"}
                    className=""
                    type=""
                    placeholder="점수를 입력하세요"
                    style={{
                      width: "30%",
                      height: "50px",
                    }}
                    id="decentralization"
                    onChange={(e) => {
                      handleOnChangeStandard1(e.target.id, e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  <Typography variant="h5" gutterBottom>
                    Scalability
                  </Typography>
                  <Form.Control
                  key={"scalability"}
                  className=""
                  type=""
                  placeholder="점수를 입력하세요"
                  style={{
                    width: "30%",
                    height: "50px",
                  }}
                  id="scalability"
                  onChange={(e) => {
                    handleOnChangeStandard2(e.target.id, e.target.value);
                  }}
                />
                </Row>
                <Row>
                  <Typography variant="h5">
                    Security
                  </Typography>
                  <Form.Control
                  key={"security"}
                  className=""
                  type=""
                  placeholder="점수를 입력하세요"
                  style={{
                    width: "30%",
                    height: "50px",
                  }}
                  id="security"
                  onChange={(e) => {
                    handleOnChangeStandard3(e.target.id, e.target.value);
                  }}
                />
                </Row>
          </Container>
            )
          )
        }


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
              handleOnChangeCryptoPromi(true);
            }}
          />
          <Form.Check
            inline
            type="radio"
            label="X"
            value={Boolean(false)}
            name="group2"
            onClick={(e) => {
              handleOnChangeCryptoPromi(false);
            }}
          />
        </Container>
        {
          isPromising == true ? (
            <Container>
                <Row>
                    <Typography variant="h5">
                      평가
                    </Typography>
                    <Form.Control
                    key={"assessment"}
                    className=""
                    type=""
                    placeholder="유망 크립토에 대한 평가를 입력하세요"
                    style={{
                      width: "30%",
                      height: "50px",
                    }}
                    id="assessment"
                    onChange={(e) => {
                      handleOnChangeAssess(e.target.value);
                    }}
                  />
                </Row>
                <Row>
                  <Typography variant="h5" gutterBottom>
                    설명
                  </Typography>
                  <Form.Control
                  key={"description"}
                  className=""
                  type=""
                  placeholder="유망 크립토에 대한 설명을 입력하세요"
                  style={{
                    width: "30%",
                    height: "50px",
                  }}
                  id="description"
                  onChange={(e) => {
                    handleOnChangeDescription(e.target.value);
                  }}
                />
                </Row>
                <Container className="my-5">
                  <input
                    accept="image/*"
                    type="file"
                    id="select-thumbnail"
                    className="d-none"
                    
                  />
                  <Button variant="primary" className="my-2">
                    <label htmlFor="select-thumbnail">썸네일 업로드 *</label>
                  </Button>
                  {thumbnail1Url && thumbnail ? (
                    <div className="my-2">
                      <img src={thumbnail1Url} alt={thumbnail.name} height="300px" />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Container>
                <Container className="my-5">
                  <input
                    accept="image/*"
                    type="file"
                    id="select-logo"
                    className="d-none"
                    
                  />
                  <Button variant="primary" className="my-2">
                    <label htmlFor="select-logo">로고 업로드 *</label>
                  </Button>
                  {logoUrl && logo ? (
                    <div className="my-2">
                      <img src={logoUrl} alt={logo.name} height="300px" />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Container>
          </Container>
          ) : (
            null
          )
        }

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
