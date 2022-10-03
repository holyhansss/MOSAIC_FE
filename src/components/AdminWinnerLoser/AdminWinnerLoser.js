import React, { useState, useEffect, useRef } from "react";
// react bootstrap
import {
  Dropdown,
  DropdownButton,
  Button,
  Form,
  Container,
  Spinner,
} from "react-bootstrap";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// react router dom
import { useNavigate } from "react-router-dom";
// components
import AdminTopicUploadForm from "../AdmimBox/AdmimBox";

// constants
import { FIREBASE_WEEKLY_REPORT_COLLECTION } from "../../constants/constants";

//Editor
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const AdminWinnerLoser = () => {
  const db = getFirestore();
  const storage = getStorage();

  const navigate = useNavigate();

  const [docs, setDocs] = useState([]);
  const [docsUID, setDocsUID] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDocUid, setSelectedDocUid] = useState();
  const [img1, setImg1] = useState();
  const [img1Url, setImg1Url] = useState(null);
  const [img2, setImg2] = useState();
  const [img2Url, setImg2Url] = useState(null);
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");

  const [lock, setLock] = useState(false);
  const [loading, setLoading] = useState(false);

  const content1Ref = useRef();
  const content2Ref = useRef();

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, FIREBASE_WEEKLY_REPORT_COLLECTION));

      const querySnapshot = await getDocs(q);
      await querySnapshot.forEach((doc) => {
        setDocs((current) => [...current, doc.data()]);
        setDocsUID((current) => [...current, doc.id]);
      });
    };
    getData();
  }, []);

  useEffect(() => {
    if (img1) {
      setImg1Url(URL.createObjectURL(img1));
    }
    if (img2) {
      setImg2Url(URL.createObjectURL(img2));
    }
  }, [img1, img2]);

  const onChangeDropDown = (selectedDoc, uid) => {
    console.log(uid);
    setSelectedDoc(selectedDoc);
    setSelectedDocUid(uid);
  };
  const Unix_timestampConv = () => {
    return Math.floor(new Date().getTime() / 1000);
  };

  const handleSubmit = async () => {
    const docRef = doc(db, FIREBASE_WEEKLY_REPORT_COLLECTION, selectedDocUid);
    const subColRef = collection(docRef, "WinnerLoser");

    if (lock === true) return;
    else setLock(true);

    const currentTime = Unix_timestampConv();
    let image1StorageRef = ref(
      storage,
      `winner&loser/${selectedDocUid}_1_${currentTime}`
    );
    let image2StorageRef = ref(
      storage,
      `winner&loser/${selectedDocUid}_2_${currentTime}`
    );
    await uploadBytes(image1StorageRef, img1);
    await uploadBytes(image2StorageRef, img2);
    const image1StorageURL = await getDownloadURL(image1StorageRef);
    const image2StorageURL = await getDownloadURL(image2StorageRef);

    // console.log(image1StorageURL);
    // console.log(image2StorageURL);

    // console.log(docRef);
    // console.log(subColRef);

    await setDoc(
      doc(
        db,
        `${FIREBASE_WEEKLY_REPORT_COLLECTION}/${selectedDocUid}/WinnerLoser`,
        "WinnerLoser"
      ),
      {
        img1: image1StorageURL,
        img2: image2StorageURL,
        desc1: desc1,
        desc2: desc2,
      }
    );

    // await addDoc(subColRef, {
    //     img1: image1StorageURL,
    //     img2: image1StorageURL,
    //     desc1: desc1,
    //     desc2: desc2,
    // });

    alert("upload success");
    setLock(false);
    navigate("/");
  };

  return (
    <div>
      <Container className="my-5">
        <DropdownButton title={"select Doc"}>
          {docs.map((doc, index) => {
            return (
              <Dropdown.Item
                key={index}
                eventKey={doc}
                onClick={() => {
                  onChangeDropDown(doc, docsUID[index]);
                }}
              >
                {doc.title}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>

        {selectedDoc === null ? (
          <h1>select Doc!!</h1>
        ) : (
          <h1>{selectedDoc.title}</h1>
        )}
      </Container>
      <Container className="my-5">
        <input
          accept="image/*"
          type="file"
          id="select-image1"
          className="d-none"
          onChange={(e) => setImg1(e.target.files[0])}
        />
        <Button variant="primary" className="my-2">
          <label htmlFor="select-image1">Upload Image 1 *</label>
        </Button>
        {img1Url && img1 ? (
          <div className="my-2">
            <img src={img1Url} alt={img1.name} height="300px" />
          </div>
        ) : (
          <div></div>
        )}
        {/* 
        <Form.Control
          key={"desc1"}
          className="me-1 col-9"
          type=""
          as="textarea"
          placeholder="설명"
          onChange={(e) => {
            setDesc1(e.target.value);
          }}
          style={{
            width: "67%",
            height: "150px",
          }}
        /> */}

        <Editor
          ref={content1Ref}
          initialEditType="WYSIWYG"
          initialValue="내용을 입력하세요"
          previewStyle="vertical"
          height="300px"
          useCommandShortcut={false}
          onChange={(e) => {
            setDesc1(content1Ref.current.getInstance().getMarkdown());
          }}
        />
      </Container>
      <Container className="my-5">
        <input
          accept="image/*"
          type="file"
          id="select-image2"
          className="d-none"
          onChange={(e) => setImg2(e.target.files[0])}
        />
        <Button variant="primary" className="my-2">
          <label htmlFor="select-image2">Upload Image 2 *</label>
        </Button>
        {img2Url && img2 ? (
          <div className="my-2">
            <img src={img2Url} alt={img2.name} height="300px" />
          </div>
        ) : (
          <div></div>
        )}

        {/* <Form.Control
          key={"desc2"}
          className="me-1 col-9"
          type=""
          as="textarea"
          placeholder="설명"
          onChange={(e) => {
            setDesc2(e.target.value);
          }}
          style={{
            width: "67%",
            height: "150px",
          }}
        /> */}

        <Editor
          ref={content2Ref}
          initialEditType="WYSIWYG"
          initialValue="내용을 입력하세요"
          previewStyle="vertical"
          height="300px"
          useCommandShortcut={false}
          onChange={(e) => {
            setDesc2(content2Ref.current.getInstance().getMarkdown());
          }}
        />
      </Container>
      <Container>
        <Button
          onClick={() => {
            handleSubmit();
            setLoading(true);
          }}
        >
          Submit
        </Button>
        {loading === true ? (
          <Spinner className="ms-2" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div></div>
        )}
      </Container>
    </div>
  );
};

export default AdminWinnerLoser;
