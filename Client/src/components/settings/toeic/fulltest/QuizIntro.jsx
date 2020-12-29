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
  CNavLink,
  CForm
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import routes from '../../../containers/routes';
import '../../../scss/style.scss';

const QuizIntro = () => {
  return (
    <CContainer className='quizintro'>
      <CRow>
        <CCol lg='3'></CCol>
        <CCol lg='6'>
          <h1>Test Number 10 - ETS 2020</h1>
          <h3>Total time: 120 minutes</h3>
          <p>
            <CIcon name='cil-bell' className='mfe-2' />
            Listening: 45 minutes
          </p>
          <p>
            <CIcon name='cil-bell' className='mfe-2' />
            Reading: 75 minutes
          </p>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default QuizIntro;
