import React from 'react';
import { Container } from 'react-bootstrap';
import { signInWithGoogle } from '../firebase';

function Admin() {
    return(
        <div>
            <Container>
                
            </Container>
        </div>

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