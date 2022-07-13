import React, { useState, useEffect, useRef} from "react";

// react bootstrap
import { Container, Row } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// components
import AdminTopicUploadForm from "../components/AdmimBox/AdmimBox";
import { reload } from "firebase/auth";

const Admin = () => {

    const db = getFirestore();
    let childRef1 = useRef(null);
    let childRef2 = useRef(null);
    let childRef3 = useRef(null);

    // contents
    const [title, setTitle] = useState('');


    const submitContent = async () => {
        const time = Date;
        const docRef = await addDoc(collection(db, "weekly_report"), {
            title: title,
            date: time.now(),
            writer: "Mosaic",
        });

        await childRef1.current.uploadtoDatabase(docRef.id);
        await childRef2.current.uploadtoDatabase(docRef.id);
        await childRef3.current.uploadtoDatabase(docRef.id);

        alert("uploaded to database!!");
        window.location.reload();
    }
    const handleOnChangeTitle = (value) => {
        setTitle(value);
    }

    return (
        <Container>
            <Container className="my-5">
                <Form.Control
                    key={"title"}
                    className='me-1 col-3'
                    type=''
                    placeholder='Title'
                    style={{
                        width: '100%',
                        height: '50px',
                    }}
                    onChange={(e) => {
                        handleOnChangeTitle(e.target.value)
                    }}
                    label=''/>  
            </Container>
            <AdminTopicUploadForm ref={childRef1} title="거시경제" firebaseCollectionName="weekly_report" firebaseSubCollectionName="macroeconomic" db={db}/>
            <AdminTopicUploadForm ref={childRef2} title="크립토 규제/정책" firebaseCollectionName="weekly_report" firebaseSubCollectionName="policy" db={db}/>
            <AdminTopicUploadForm ref={childRef3} title="크립토 기술/투자 이슈" firebaseCollectionName="weekly_report" firebaseSubCollectionName="investment" db={db}/>
            <Row className="justify-content-md-center my-5">
                <Button
                    variant='outline-primary'
                    style={{
                        width: '100px',
                    }}
                    onClick={() => {
                        submitContent();
                    }}>
                    Upload
                </Button>

            </Row>
        </Container>
    );
}

export default Admin;