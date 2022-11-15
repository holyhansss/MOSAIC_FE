import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import styled from "styled-components";

//icon
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import ChatIcon from '@mui/icons-material/Chat';

export const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
export default function Footer() {
    return (
      <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>MOSAIC</span>
          </div>
  
          <div>
            <StyledLink href='/' className='me-4 text-reset'>
              <MDBIcon fab icon="facebook-f" />
            </StyledLink>
            <StyledLink href='' className='me-4 text-reset'>
              <MDBIcon fab icon="twitter" />
            </StyledLink>
            <StyledLink href='' className='me-4 text-reset'>
              <MDBIcon fab icon="google" />
            </StyledLink>
            <StyledLink href='' className='me-4 text-reset'>
              <MDBIcon fab icon="github" />
            </StyledLink>
          </div>
        </section>
  
        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md="6" lg="6" xl="5" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon="gem" className="me-3" />
                  MOSAIC
                </h6>
                <p>
                Mosaic는 “건전한 암호화폐 투자의 대중화”를<br/>
                목적으로 설립되었습니다.
                </p>
                <p style={{fontSize:"80%"}}>
               (주)MOSAIC | 대표: 한성원
                </p>
              </MDBCol>
  
              {/* <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>MOSAIC</h6>
                <p>
                  <StyledLink href='/' className='text-reset'>
                    모자익 등급표
                  </StyledLink>
                </p>
                <p>
                  <StyledLink href='/'  target="_blank" className='text-reset'>
                    모자익 공지사항
                  </StyledLink>
                </p>
                <p>
                  <StyledLink href='/' className='text-reset'>
                    모자익 건의사항
                  </StyledLink>
                </p>
              </MDBCol> */}
  
              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>추천 메뉴</h6>
                <p style={{fontSize:"80%"}}>
                  <StyledLink href='/reportMain' className='text-reset'>
                    데일리 리포트
                  </StyledLink>
                </p>
                <p style={{fontSize:"80%"}}>
                  <StyledLink href='/promising' className='text-reset'>
                    유망코인
                  </StyledLink>
                </p>
                <p style={{fontSize:"80%"}}>
                  <StyledLink href='/ranking' className='text-reset'>
                    MOSAIC 랭킹
                  </StyledLink>
                </p>
              </MDBCol>
  
              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p style={{fontSize:"80%"}}>
                <ContactsIcon />
                  경상북도.포항시.북구.흥해읍.한동로
                </p>
                <p style={{fontSize:"80%"}}>
                <AlternateEmailIcon/>
                  mosaic.team.tech@gmail.com
                </p>
                <p style={{fontSize:"80%"}}>
                <ChatIcon/>
                  <StyledLink href='https://open.kakao.com/o/gdQximie' className='text-reset'>
                    모자익 오픈 채팅방
                  </StyledLink>
                </p>
                
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
  
        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2022 Copyright:
          <StyledLink className='text-reset fw-bold' href='https://mdbootstrap.com/'>
           MOSAIC
          </StyledLink>
        </div>
      </MDBFooter>
    );
  };