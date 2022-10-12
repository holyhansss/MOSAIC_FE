import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import styled from "styled-components";


//icon
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import ChatIcon from '@mui/icons-material/Chat';

export default function Footer() {
    return (
      <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>MOSAIC</span>
          </div>
  
          <div>
            <a href='/' className='me-4 text-reset'>
              <MDBIcon fab icon="facebook-f" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="twitter" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="google" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="instagram" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>
  
        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon="gem" className="me-3" />
                  MOSAIC
                </h6>
                <p>
                Mosaic는 “건전한 암호화폐 투자의 대중화”를 목적으로 설립되었습니다.
                </p>
              </MDBCol>
  
              <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>MOSAIC</h6>
                <p>
                  <a href='/' className='text-reset'>
                    모자익 등급표
                  </a>
                </p>
                <p>
                  <a href='/'  target="_blank" className='text-reset'>
                    모자익 공지사항
                  </a>
                </p>
                <p>
                  <a href='/' className='text-reset'>
                    모자익 건의사항
                  </a>
                </p>
              </MDBCol>
  
              <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>추천 메뉴</h6>
                <p>
                  <a href='/reportMain' className='text-reset'>
                    데일리 리포트
                  </a>
                </p>
                <p>
                  <a href='/promising' className='text-reset'>
                    유망코인
                  </a>
                </p>
                <p>
                  <a href='/ranking' className='text-reset'>
                    MOSAIC 랭킹
                  </a>
                </p>
                <p>
                  <a href='/help' className='text-reset'>
                    Help
                  </a>
                </p>
              </MDBCol>
  
              <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <ContactsIcon />
                  경상북도.포항시.북구.흥해읍.한동로
                </p>
                <p>
                  <AlternateEmailIcon/>
                  mosaic.team.tech@gmail.com
                </p>
                <p>
                  <ChatIcon/>
                  <a href='https://open.kakao.com/o/gdQximie' className='text-reset'>
                    모자익 오픈 채팅방
                  </a>
                </p>
                <p>
                  <BusinessIcon />
                  (주)MOSAIC | 대표: 한성원
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
  
        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2022 Copyright:
          <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
           MOSAIC
          </a>
        </div>
      </MDBFooter>
    );
  }
