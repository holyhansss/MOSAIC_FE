import React, { useState, useEffect, useRef} from "react";
import {useNavigate} from 'react-router-dom';
// react bootstrap
import { Container, Row, Spinner } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { getFirestore, collection, addDoc, query, getDocs} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// components
import AdminTopicUploadForm from "../components/AdmimBox/AdmimBox";

// constants
import {FIREBASE_WEEKLY_REPORT_COLLECTION, FIREBASE_REPORT_SUBCOLLECTION, REPORT_TITLES} from "../constants/constants";


const Admin = () => {

    const db = getFirestore();
    const auth = getAuth();
    const navigate = useNavigate();
    let userEmail = sessionStorage.getItem("email");

    let childRef1 = useRef(null);
    let childRef2 = useRef(null);
    let childRef3 = useRef(null);

    // contents
    const [title, setTitle] = useState('');
    const [insight, setInsight] = useState('');
    const [loading, setLoading] = useState('');
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

        setTimeout(() => {
            alert("uploaded to database!!")
            setLoading(false);
            window.location.reload();    
        }, 2000);
    }
    const handleOnChangeTitle = (value) => {
        setTitle(value);
    }
    const handleOnChangeInsight = (value) => {
        setInsight(value);
    }

    useEffect(()=> {
        const getAdminFromDatabase = async () => {
            const adminColRef = collection(db, "admin_info");
            const q = await query(adminColRef);
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const adminInfo = doc.data().admin_email;
                setAdmin(prev => [adminInfo, ...prev])
            });
        }
        getAdminFromDatabase();
        
    },[]);

    
    return ( 
        <Container>
            {userEmail === null || !admin.includes(userEmail)
            ? navigate("/")
            : <div>
                <Container className="my-5 h3">
                    Title
                    <Form.Control
                        key={"title"}
                        className=''
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
                <AdminTopicUploadForm ref={childRef1} title={REPORT_TITLES[0]} firebaseCollectionName={FIREBASE_WEEKLY_REPORT_COLLECTION} firebaseSubCollectionName={FIREBASE_REPORT_SUBCOLLECTION[0]} db={db}/>
                <AdminTopicUploadForm ref={childRef2} title={REPORT_TITLES[1]} firebaseCollectionName={FIREBASE_WEEKLY_REPORT_COLLECTION} firebaseSubCollectionName={FIREBASE_REPORT_SUBCOLLECTION[1]} db={db}/>
                <AdminTopicUploadForm ref={childRef3} title={REPORT_TITLES[2]} firebaseCollectionName={FIREBASE_WEEKLY_REPORT_COLLECTION} firebaseSubCollectionName={FIREBASE_REPORT_SUBCOLLECTION[0]} db={db}/>
                <Container className="mt-5 align-item-center h3">
                    Insight
                    <Form.Control
                        key={"insight"}
                        className="mt-3"
                        type=''
                        as='textarea'
                        placeholder='Insight'
                        onChange={(e) => {
                            handleOnChangeInsight(e.target.value)
                        }}
                        style={{
                            // width: '67%',
                            height: '200px'
                        }}/>
                </Container>
                <Row className="justify-content-md-center my-5">
                    <Button
                        variant='outline-primary'
                        style={{
                            width: '100px',
                        }}
                        onClick={() => {
                            setLoading(true);
                            submitContent();
                        }}>
                        Upload
                    </Button>
                    {loading === true
                        ? <Spinner className="ms-2" animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        : <div></div>
                    }

                </Row>
            </div>
            }
        </Container>

    );
}

export default Admin;