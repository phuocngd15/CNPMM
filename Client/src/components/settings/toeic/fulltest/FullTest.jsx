import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CCarousel,
  CCarouselCaption,
  CCarouselControl,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
  CNav,
  CNavItem,
  CNavLink
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const slides = [1, 2, 3, 4, 5, 6];

const FullTest = () => {
  return (
    <CContainer className='fullTest-page'>
      <CContainer className='fullTest-header'>
        <CRow>
          <CCol md lg='7' className='fullTest-header-subject'>
            <div>THI THỬ TOEIC</div>
            <div>ĐỀ THI THẬT 2020</div>
          </CCol>
          <CCol md lg='5'>
            <img
              src='image/Capture.JPG'
              alt='advertise 1'
              loading='lazy'
              align='left'
              className='fullTest-image'
            />
          </CCol>
        </CRow>
      </CContainer>
      <CContainer className='fullTest-exams'>
        <div className='fullTest-exams-title'>
          Danh sách đề thi: (120 phút iconThemSau)
        </div>
        <CRow className='fullTest-exams-list'>
          <CCol lg='4' className='fullTest-exams-list-child'>
            <ul>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 8</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 6</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 4</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 1</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 3</a>
              </li>
            </ul>
          </CCol>
          <CCol lg='4' className='fullTest-exams-list-child'>
            <ul>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
            </ul>
          </CCol>
          <CCol lg='4' className='fullTest-exams-list-child'>
            <ul>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
              <li>
                <a href='#'>Thi thử TOEIC 2020 - Đề 10</a>
              </li>
            </ul>
          </CCol>
        </CRow>
      </CContainer>
    </CContainer>
  );
};

export default FullTest;
