import React, { useState, useEffect, useRef} from "react";
// react bootstrap
import { Dropdown, DropdownButton, Button, Form, Container, Row} from "react-bootstrap";
import { getFirestore, collection, query, getDocs, addDoc, doc} from "firebase/firestore";

// components
import AdminTopicUploadForm from "../AdmimBox/AdmimBox";

// constants
import {FIREBASE_WEEKLY_REPORT_COLLECTION, FIREBASE_REPORT_SUBCOLLECTION, REPORT_TITLES} from "../../constants/constants";


const AdminWinnerLoser = () => {

    const db = getFirestore();
    const [docs, setDocs] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [selectedDocUid, setSelectedDocUid] = useState();
    const [img1, setImg1] = useState();
    const [img1Url, setImg1Url] = useState(null);
    const [img2, setImg2] = useState();
    const [img2Url, setImg2Url] = useState(null);
    const [desc1, setDesc1] = useState("");
    const [desc2, setDesc2] = useState("");


    useEffect(()=> {
        const getData = async () => {

            const q = query(collection(db, FIREBASE_WEEKLY_REPORT_COLLECTION));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setDocs(current => [
                    ...current,
                    doc.data()])
                setSelectedDocUid(doc.id);
            });
        }
        getData();
    },[])

    const onChangeDropDown = (selectedDoc) => {
        console.log(selectedDoc)
        setSelectedDoc(selectedDoc);
    }

    useEffect(()=> {
        if(img1){
            setImg1Url(URL.createObjectURL(img1));
        }
        if(img2){
            setImg2Url(URL.createObjectURL(img2));
        }
    },[img1, img2]);

    const handleSubmit = async () => { 
        const docRef = doc(db, FIREBASE_WEEKLY_REPORT_COLLECTION, selectedDocUid);
        const subColRef = collection(docRef, "WinnerLoser");

        await addDoc(subColRef, {
            // img1: img1,
            // img2: img2,
            desc1: desc1,
            desc2: desc2,
        });
    }

    return(
        <div>
            <Container className="my-5">
                <DropdownButton title={"select Doc"}>
                    {docs.map((doc, index)=> {
                        return(          
                            <Dropdown.Item key={index} eventKey={doc} 
                                onClick={()=> {
                                    onChangeDropDown(doc)
                                }}>{doc.title}</Dropdown.Item>
                        );

                    })}
                </DropdownButton>

                {selectedDoc === null
                    ? <h1>select Doc!!</h1>
                    : <h1>{selectedDoc.title}</h1>
                }
            </Container>
            <Container className="my-5">
                <input
                    accept='image/*'
                    type='file'
                    id='select-image1'
                    className='d-none'
                    onChange={e => setImg1(e.target.files[0])}/>
                <Button variant='primary' className="my-2">
                    <label htmlFor='select-image1'>
                        Upload Image 1 *
                    </label>
                </Button>
                {
                    img1Url && img1
                    ?
                    (
                        <div className='my-2'>
                            <img src={img1Url} alt={img1.name} height='300px'/>
                        </div>
                    )
                    : <div></div>
                }

                <Form.Control
                    key={"desc1"}
                    className="me-1 col-9"
                    type=''
                    as='textarea'
                    placeholder='설명'
                    onChange={(e) => {
                        setDesc1(e.target.value)
                    }}
                    style={{
                        width: '67%',
                        height: '150px'
                }}/>
            </Container>
            <Container className="my-5">
                <input
                    accept='image/*'
                    type='file'
                    id='select-image2'
                    className='d-none'
                    onChange={e => setImg2(e.target.files[0])}/>
                <Button variant='primary' className="my-2">
                    <label htmlFor='select-image2'>
                        Upload Image 2 *
                    </label>
                </Button>
                {
                    img2Url && img2
                    ?
                    (
                        <div className='my-2'>
                            <img src={img2Url} alt={img2.name} height='300px'/>
                        </div>
                    )
                    : <div></div>
                }

                <Form.Control
                    key={"desc2"}
                    className="me-1 col-9"
                    type=''
                    as='textarea'
                    placeholder='설명'
                    onChange={(e) => {
                        setDesc2(e.target.value)
                    }}
                    style={{
                        width: '67%',
                        height: '150px'
                    }}/>
            </Container>
            <Container><Button onClick={handleSubmit}>Submit</Button></Container>
        </div>
    );

}

export default AdminWinnerLoser;