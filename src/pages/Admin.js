import { React, useEffect, useState } from "react";

// react bootstrap
import { Container, Row } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
const Admin = () => {
    const [firsts, setFirsts] = useState([]);

    const [countFirsts, setCountFirsts] = useState([0]);

    const inputFirst = (bool) => {
        if(bool === true){
            let countArr = [...countFirsts]
            let counter = countArr.slice(-1)[0]
        
            counter += 1
            countArr.push(counter)
            setCountFirsts(countArr)
            addFirstsArray()
        }
        else {
            let countArr = [...countFirsts]
            countArr.pop()
            if (firsts.length <= 0) {} else {
                setCountFirsts(countArr)
                subFirstsArray()
            }
        }
    }
    const addFirstsArray = () => {
        const newFirst = {
            id: firsts.length,
            name: '',
            URL: ''
        }
        setFirsts(firsts.concat(newFirst))
    }
    const subFirstsArray = () => {
        let firstsArr = [...firsts]
        firstsArr.pop()
        setFirsts(firstsArr)
    }

    useEffect(() => { }, [countFirsts]);

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

                                    }}
                                    label=''/>
                                <Form.Control
                                    key={"desc" + index}
                                    className="me-1 col-9"
                                    type=''
                                    as='textarea'
                                    placeholder='설명'
                                    onChange={(e) => {
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
                            inputFirst(true)
                        }}>
                        Add
                    </Button>
                    <Button
                        variant='outline-secondary'
                        style={{
                            width: '60px',
                        }}
                        onClick={() => {
                            inputFirst(false)
                        }}>
                        Del
                    </Button>
                </Row>
            </Container>
            <Container>
                크립토 규제/정책
                <Row>
                    <Form.Control
                        className='me-1 col-3'
                        type=''
                        placeholder='제목'
                        style={{
                            width: '15%',
                            height: '50px',
                        }}
                        onChange={(e) => {

                        }}
                        label=''/>
                    <Form.Control
                        className="me-1 col-9"
                        type=''
                        as='textarea'
                        placeholder='설명'
                        onChange={(e) => {
                        }}
                        style={{
                            width: '75%',
                            height: '150px'
                        }}/>
                </Row>
            </Container>
            <Container>
                크립토 기술/투자 이슈
                <Row>
                    <Form.Control
                        className='me-1 col-3'
                        type=''
                        placeholder='제목'
                        style={{
                            width: '15%',
                            height: '50px',
                        }}
                        onChange={(e) => {

                        }}
                        label=''/>
                    <Form.Control
                        className="me-1 col-9"
                        type=''
                        as='textarea'
                        placeholder='설명'
                        onChange={(e) => {
                        }}
                        style={{
                            width: '75%',
                            height: '150px'
                        }}/>
                </Row>
            </Container>
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