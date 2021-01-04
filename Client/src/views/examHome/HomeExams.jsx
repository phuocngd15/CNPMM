import React from 'react';
import { CCol, CRow } from '@coreui/react';

const HomeExams = () => {
  return (
    <div className='fullTest-page'>
      <div className='fullTest-header '>
        <CRow>
          <CCol lg='7' className='fullTest-header-subject'>
            <div>Practice makes perfect</div>
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
      </div>
    </div>
  );
};

export default HomeExams;
