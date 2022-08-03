import React, { forwardRef, useState, useImperativeHandle} from 'react';

import { Container, Row } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore";


// props: title, firebaseCollectionName, firebaseSubCollectionName, db
const AdminTopicUploadForm = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        uploadtoDatabase(uid){
            uploadtoDatabaseInternal(uid);
        },
    }));

    const newContent = {
        id: 0,
        title: '',
        content: '',
    }
    
    const [contents, setContents] = useState([newContent]);
    const [count, setCount] = useState([0]);

    const inputContent = (bool) => {
        let countArr = [...count];

        if(bool === true){    
            let counter = countArr.slice(-1)[0];
            counter += 1;
            countArr.push(counter);
            addContentsArray(countArr)  
        }else {
            if (countArr.length <= 1) {} 
            else {
                countArr.pop();
                subContentsArray(countArr)
            }
        }
    }
    const addContentsArray = (countArr) => {
        let content = {        
            id: countArr.length-1,
            title: '',
            content: '',
        }
        setCount(countArr);
        setContents(contents.concat(content))
    }
    const subContentsArray = (countArr) => {
        let contentArr = [...contents];
            contentArr.pop();
            setCount(countArr);
            setContents(contentArr);
    }
    const handleTitleChange = (targetId, title) => {
        setContents(contents.map((content) => content.id === targetId
            ? { ...content, title: title }
            : content        
        ));
    }
    const handleDescChange = (targetId, desc) => {
        setContents(contents.map((content) => content.id === targetId
            ? { ...content, content: desc }
            : content 
        ));
    }

    const uploadtoDatabaseInternal = async (uid) => {
        const docRef = doc(props.db, props.firebaseCollectionName , uid);
        const subColRef = collection(docRef, props.firebaseSubCollectionName);

        for(let i=0; i<contents.length; i++){
            await addDoc(subColRef,{
                title: contents[i].title,
                content: contents[i].content,
            });
        }
    }

    return(
        <Container>
                {props.title}
                    {count.map((x, index) => {
                        return(
                            <Row key={index} className="my-2">
                                <Form.Control
                                    key={"title" + index}
                                    className='me-1 col-3'
                                    type=''
                                    placeholder='제목'
                                    style={{
                                        width: '20%',
                                        height: '50px',
                                    }}
                                    onChange={(e) => {
                                        handleTitleChange(index, e.target.value)
                                    }}
                                    label=''/>
                                <Form.Control
                                    key={"desc" + index}
                                    className="me-1 col-9"
                                    type=''
                                    as='textarea'
                                    placeholder='설명'
                                    onChange={(e) => {
                                        handleDescChange(index, e.target.value)
                                    }}
                                    style={{
                                        width: '67%',
                                        height: '150px'
                                    }}/>
                            </Row>
                            
                        );
                    })}
                <Row 
                    className="justify-content-md-center">
                    <Button
                        variant='outline-secondary'
                        className='me-1'
                        style={{
                            width: '60px',
                        }}
                        onClick={() => {
                            inputContent(true)
                        }}>
                        Add
                    </Button>
                    <Button
                        variant='outline-secondary'
                        style={{
                            width: '60px',
                        }}
                        onClick={() => {
                            inputContent(false)
                        }}>
                        Del
                    </Button>
                </Row>
            </Container>
    );
});

export default AdminTopicUploadForm;