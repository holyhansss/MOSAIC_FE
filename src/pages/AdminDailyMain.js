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


//Editor
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const AdminDailyMain = () => {
  const db = getFirestore();
  const storage = getStorage();

  let issue1contentRef = useRef(null);
  let issue2contentRef = useRef(null);
  let insightRef = useRef(null);

  // contents
  const [issue1_title, setIssue1_title] = useState("");
  const [issue2_title, setIssue2_title] = useState("");
  const [issue1_content, setIssue1_content] = useState("");
  const [issue2_content, setIssue2_content] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState("");
  const [admin, setAdmin] = useState([]);
  const [writer, setWriter] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [thumbnail1Url, setThumbnailUrl] = useState(null);
  const [hashtag, setHashtag] = useState("");


  const submitContent = async () => {

    let thumbnailStorageRef = ref(
      storage,
      `daily_report`
    );

    await uploadBytes(thumbnailStorageRef, thumbnail);
    const thumbnailStorageURL = await getDownloadURL(thumbnailStorageRef);

    const time = Date;
    const docRef = await addDoc(collection(db, "daily_report"), {
      issue1_title: issue1_title,
      issue2_title: issue2_title, 
      issue1_content: issue1_content,
      issue2_content: issue2_content,
      date: time.now(),
      writer: writer,
      insight: insight,
      thumbnail: thumbnailStorageURL,
      hashtag: hashtag,
    });

    setTimeout(() => {
      alert("uploaded to database!!");
      setLoading(false);
      window.location.reload();
    }, 2000);
  };


  const handleOnChangeIssue1Title = (value) => {
    setIssue1_title(value);
  };
  const handleOnChangeIssue1Con = (value) => {
    setIssue1_content(value);
  };
  const handleOnChangeIssue2Title = (value) => {
    setIssue2_title(value);
  };
  const handleOnChangeIssue2Con = (value) => {
    setIssue2_content(value);
  };
  const handleOnChangeWriter = (value) => {
    setWriter(value);
  };
  const handleOnChangeInsight = (value) => {
    setInsight(value);
  };
  const handleOnChangeHashtag = (value) => {
    setHashtag(value);
  };

  useEffect(() => {
    const getAdminFromDatabase = async () => {
      const adminColRef = collection(db, "admin_info");
      const q = await query(adminColRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const adminInfo = doc.data().admin_email;
        setAdmin((prev) => [adminInfo, ...prev]);
      });
    };
    getAdminFromDatabase();
  }, []);

 

  useEffect(() => {
    if (thumbnail) {
      setThumbnailUrl(URL.createObjectURL(thumbnail));
    }
  }, [thumbnail]);

  return (
    <Container>
      <div>
      <Container className="my-5">
        <input
          accept="image/*"
          type="file"
          id="select-thumbnail"
          className="d-none"
          onChange={(e) => setThumbnail(e.target.files[0])}
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
        <Container className="mt-5 align-item-center">
          <Typography variant="h5" gutterBottom>
            Issue1
          </Typography>
          <Form.Control
            key={"issue1"}
            className=""
            type=""
            placeholder="title"
            style={{
              width: "20%",
              height: "50px",
            }}
            onChange={(e) => {
              handleOnChangeIssue1Title(e.target.value);
            }}
            label=""
          />

          <Editor
            ref={issue1contentRef}
            initialEditType="WYSIWYG"
            initialValue="내용을 입력하세요"
            previewStyle="vertical"
            height="300px"
            useCommandShortcut={false}
            onChange={(e) => {
              handleOnChangeIssue1Con(
                issue1contentRef.current.getInstance().getMarkdown()
              );
            }}
          />
        </Container>

        <Container className="mt-5 align-item-center">
          <Typography variant="h5" gutterBottom>
            Issue2
          </Typography>
          <Form.Control
            key={"issue2"}
            className=""
            type=""
            placeholder="title"
            style={{
              width: "20%",
              height: "50px",
            }}
            onChange={(e) => {
              handleOnChangeIssue2Title(e.target.value);
            }}
            label=""
          />
          <Editor
            ref={issue2contentRef}
            initialEditType="WYSIWYG"
            initialValue="내용을 입력하세요"
            previewStyle="vertical"
            height="300px"
            useCommandShortcut={false}
            onChange={(e) => {
              handleOnChangeIssue2Con(
                issue2contentRef.current.getInstance().getMarkdown()
              );
            }}
          />
        </Container>

        <Container className="mt-5 align-item-center">
          <Typography variant="h5" gutterBottom>
            Insight
          </Typography>

          <Editor
            ref={insightRef}
            initialEditType="WYSIWYG"
            initialValue="내용을 입력하세요"
            previewStyle="vertical"
            height="300px"
            useCommandShortcut={false}
            onChange={(e) => {
              handleOnChangeInsight(
                insightRef.current.getInstance().getMarkdown()
              );
            }}
          />
        </Container>

        <Container className="my-5">
          <Typography variant="h5" gutterBottom>
            Hashtag
          </Typography>
          <Form.Control
            key={"Hashtag"}
            className=""
            type=""
            placeholder="#키워드"
            style={{
              width: "100%",
              height: "50px",
            }}
            onChange={(e) => {
              handleOnChangeHashtag(e.target.value);
            }}
            label=""
          />
        </Container>

        <Container className="my-5">
          <Typography variant="h5" gutterBottom>
            Writer
          </Typography>
          <Form.Control
            key={"Writer"}
            className=""
            type=""
            placeholder="Writer"
            style={{
              width: "100%",
              height: "50px",
            }}
            onChange={(e) => {
              handleOnChangeWriter(e.target.value);
            }}
            label=""
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

export default AdminDailyMain;
