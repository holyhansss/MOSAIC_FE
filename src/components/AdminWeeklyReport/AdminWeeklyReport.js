import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

// components
import AdminTopicUploadForm from "../AdmimBox/AdmimBox";

// constants
import {
  FIREBASE_WEEKLY_REPORT_COLLECTION,
  FIREBASE_REPORT_SUBCOLLECTION,
  REPORT_TITLES,
} from "../../constants/constants";

//Editor
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const AdminWeeklyReport = (props) => {
  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  let childRef1 = useRef(null);
  let childRef2 = useRef(null);
  let childRef3 = useRef(null);

  // contents
  const [title, setTitle] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState("");
  const [admin, setAdmin] = useState([]);

  const submitContent = async () => {
    const time = Date;
    const docRef = await addDoc(collection(db, "weekly_report"), {
      title: title,
      date: time.now(),
      writer: "Mosaic",
      insight: insight,
    });

    await childRef1.current.uploadtoDatabase(docRef.id);
    await childRef2.current.uploadtoDatabase(docRef.id);
    await childRef3.current.uploadtoDatabase(docRef.id);

    const insightCol = collection(docRef, "insight");

    await addDoc(insightCol, {
      content: insight,
      includedDoc: docRef,
    });

    setTimeout(() => {
      alert("uploaded to database!!");
      setLoading(false);
      window.location.reload();
    }, 2000);
  };
  const handleOnChangeTitle = (value) => {
    setTitle(value);
  };
  const handleOnChangeInsight = (value) => {
    setInsight(value);
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

  const insightRef = useRef();

  return (
    <Container>
      {/* {console.log(location.state)}
            {location.state === null || !admin.includes(location.state.user.emial) 
            ? navigate("/") 
            :  */}
      <div>
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
        <AdminTopicUploadForm
          ref={childRef2}
          title={REPORT_TITLES[1]}
          firebaseCollectionName={FIREBASE_WEEKLY_REPORT_COLLECTION}
          firebaseSubCollectionName={FIREBASE_REPORT_SUBCOLLECTION[1]}
          db={db}
        />
        <AdminTopicUploadForm
          ref={childRef3}
          title={REPORT_TITLES[2]}
          firebaseCollectionName={FIREBASE_WEEKLY_REPORT_COLLECTION}
          firebaseSubCollectionName={FIREBASE_REPORT_SUBCOLLECTION[2]}
          db={db}
        />
        <Container className="mt-5 align-item-center">
          <Typography variant="h5" gutterBottom>
            Insight
          </Typography>
          {/* <Form.Control
            key={"insight"}
            className="mt-3"
            type=""
            as="textarea"
            placeholder="Insight"
            onChange={(e) => {
              handleOnChangeInsight(e.target.value);
            }}
            style={{
              // width: '67%',
              height: "200px",
            }}
          /> */}
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
