import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
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


// components
import AdminTopicUploadForm from "../AdmimBox/AdmimBox";

// constants
import {
  FIREBASE_WEEKLY_REPORT_COLLECTION,
  FIREBASE_REPORT_SUBCOLLECTION,
  REPORT_TITLES,
} from "../../constants/constants";

// //Editor
// import { Editor } from "@toast-ui/react-editor";
// import "@toast-ui/editor/dist/toastui-editor.css";

const AdminWeeklyReport = (props) => {
  const db = getFirestore();
  // const auth = getAuth();
  // const navigate = useNavigate();
  // const location = useLocation();
  const storage = getStorage();

  let childRef1 = useRef(null);

  // contents
  const [title, setTitle] = useState("");
  // const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState("");
  const [admin, setAdmin] = useState([]);
  const [writer, setWriter] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [thumbnail1Url, setThumbnailUrl] = useState(null);

  const submitContent = async () => {
    let thumbnailStorageRef = ref(
      storage,
      `weekly_report`
    );

    await uploadBytes(thumbnailStorageRef, thumbnail);
    const thumbnailStorageURL = await getDownloadURL(thumbnailStorageRef);

    const time = Date;
    const docRef = await addDoc(collection(db, "weekly_report"), {
      title: title,
      date: time.now(),
      writer: writer,
      thumbnail: thumbnailStorageURL,
    });

    await childRef1.current.uploadtoDatabase(docRef.id);


    setTimeout(() => {
      alert("uploaded to database!!");
      setLoading(false);
      window.location.reload();
    }, 2000);
  };
  const handleOnChangeTitle = (value) => {
    setTitle(value);
  };

  const handleOnChangeWriter = (value) => {
    setWriter(value);
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
        <Container className="my-5">
          <Typography variant="h5" gutterBottom>
            Title
          </Typography>
          <Form.Control
            key={"title"}
            className=""
            type=""
            placeholder="Title"
            style={{
              width: "100%",
              height: "50px",
            }}
            onChange={(e) => {
              handleOnChangeTitle(e.target.value);
            }}
            label=""
          />
        </Container>
        <AdminTopicUploadForm
          ref={childRef1}
          title={REPORT_TITLES[0]}
          firebaseCollectionName={FIREBASE_WEEKLY_REPORT_COLLECTION}
          firebaseSubCollectionName={FIREBASE_REPORT_SUBCOLLECTION[0]}
          db={db}
        />
       
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
      {/* } */}
    </Container>
  );
};

export default AdminWeeklyReport;
