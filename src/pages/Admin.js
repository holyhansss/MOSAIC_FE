import React, { useState, useEffect} from "react";

// react bootstrap
import { Container, Row } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Admin = () => {

    const db = getFirestore();

    const newContent = {
        id: 0,
        title: '',
        description: '',
    }
    // contents
    const [title, setTitle] = useState('');
    const [firsts, setFirsts] = useState([newContent]);
    const [seconds, setSeconds] = useState([newContent]);
    const [thirds, setThirds] = useState([newContent]);

    // contents counts
    const [countFirsts, setCountFirsts] = useState([0]);
    const [countSeconds, setCountSeconds] = useState([0]);
    const [countThirds, setCountThirds] = useState([0]);

    const inputContent = (bool, number) => {
        let countArr;
        if(number === 0){
            countArr = [...countFirsts];
        }else if(number === 1){
            countArr = [...countSeconds];
        }else if(number === 2){
            countArr = [...countThirds];
        }

        if(bool === true){    
            let counter = countArr.slice(-1)[0];
            counter += 1;
            countArr.push(counter);
            addContentsArray(countArr, number)  
        }else {
            if (countArr.length <= 1) {} 
            else {
                countArr.pop();
                subContentsArray(countArr,number)
            }
        }
    }
    const addContentsArray = (countArr, number) => {
        let content = {        
            id: countArr.length-1,
            title: '',
            description: '',
        }
        if(number === 0){
            setCountFirsts(countArr);
            setFirsts(firsts.concat(content))
        }else if(number === 1){
            setCountSeconds(countArr);
            setSeconds(seconds.concat(content))

        }else if(number === 2){
            setCountThirds(countArr);
            setThirds(thirds.concat(content))
        }
        
    }
    const subContentsArray = (countArr, number) => {
        let contentArr;
        if(number === 0){
            contentArr = [...firsts]
            contentArr.pop();
            setCountFirsts(countArr);
            setFirsts(contentArr);
        }else if(number === 1){
            contentArr = [...seconds]
            contentArr.pop();
            setCountSeconds(countArr);
            setSeconds(contentArr);
        }else if(number === 2){
            contentArr = [...thirds]
            contentArr.pop();
            setCountThirds(countArr);
            setThirds(contentArr);
        }
    }
    const handleTitleChange = (targetId, title, number) => {
        if(number === 0){
            setFirsts(firsts.map((content) => content.id === targetId
                ? { ...content, title: title }
                : content        
            ));
        } else if(number === 1){
            setSeconds(seconds.map((content) => content.id === targetId
                ? { ...content, title: title }
                : content        
            ));
        } else if(number === 2){
            setThirds(thirds.map((content) => content.id === targetId
                ? { ...content, title: title }
                : content        
            ));
        }
    }
    const handleDescChange = (targetId, desc, number) => {
        if(number === 0){
            setFirsts(firsts.map((content) => content.id === targetId
                ? { ...content, description: desc }
                : content        
            ));
        } else if(number === 1){
            setSeconds(seconds.map((content) => content.id === targetId
                ? { ...content, description: desc }
                : content        
            ));
        } else if(number === 2){
            setThirds(thirds.map((content) => content.id === targetId
                ? { ...content, description: desc }
                : content        
            ));
        }
    }
    const submitContent = async () => {
        const docRef = await addDoc(collection(db, "weekly_report"), {
            title: "",
            date: "",
            writer: "",
          });
          
    }

    return (
        <Container>
            <Container>
                거시 경제
                    {countFirsts.map((x, index) => {
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
                                        handleTitleChange(index, e.target.value, 0)
                                    }}
                                    label=''/>
                                <Form.Control
                                    key={"desc" + index}
                                    className="me-1 col-9"
                                    type=''
                                    as='textarea'
                                    placeholder='설명'
                                    onChange={(e) => {
                                        handleDescChange(index, e.target.value, 0)
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
                            inputContent(true,0)
                        }}>
                        Add
                    </Button>
                    <Button
                        variant='outline-secondary'
                        style={{
                            width: '60px',
                        }}
                        onClick={() => {
                            inputContent(false,0)
                        }}>
                        Del
                    </Button>
                </Row>
            </Container>
            <Container>
                크립토 규제/정책
                {countSeconds.map((x, index) => {
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
                                        handleTitleChange(index, e.target.value, 1)
                                    }}
                                    label=''/>
                                <Form.Control
                                    key={"desc" + index}
                                    className="me-1 col-9"
                                    type=''
                                    as='textarea'
                                    placeholder='설명'
                                    onChange={(e) => {
                                        handleDescChange(index, e.target.value, 1)
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
                            inputContent(true,1)
                        }}>
                        Add
                    </Button>
                    <Button
                        variant='outline-secondary'
                        style={{
                            width: '60px',
                        }}
                        onClick={() => {
                            inputContent(false,1)
                        }}>
                        Del
                    </Button>
                </Row>
            </Container>
            <Container>
                크립토 기술/투자 이슈
                {countThirds.map((x, index) => {
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
                                        handleTitleChange(index, e.target.value, 2)
                                    }}
                                    label=''/>
                                <Form.Control
                                    key={"desc" + index}
                                    className="me-1 col-9"
                                    type=''
                                    as='textarea'
                                    placeholder='설명'
                                    onChange={(e) => {
                                        handleDescChange(index, e.target.value, 2)
                                    }}
                                    style={{
                                        width: '67%',
                                        height: '150px'
                                    }}/>
                            </Row>
                            
                        );
                    })}
                    <Row className="justify-content-md-center">
                    <Button
                        variant='outline-secondary'
                        className='me-1'
                        style={{
                            width: '60px',
                        }}
                        onClick={() => {
                            inputContent(true,2)
                        }}>
                        Add
                    </Button>
                    <Button
                        variant='outline-secondary'
                        style={{
                            width: '60px',
                        }}
                        onClick={() => {
                            inputContent(false,2)
                        }}>
                        Del
                    </Button>
                </Row>
            </Container>
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

// 1. 주간 이슈: 뉴스 헤드라인 식으로 한줄로 작성
// <거시 경제>
// <크립토 규제/정책>
// <크립토 이슈>
// 2. 각 헤드라인별 부가 설명: 각 이슈별로 부가적인 설명
// 3. Winner & loser (금융자산별 비교 & 섹터별 비교)
// 4. 인사이트: 다음주, 내지는 앞으로 주목해야 할 부분들 설명