import React, { Fragment, useEffect, useState } from 'react';
import { CCol, CRow, CContainer, CLink } from '@coreui/react';
import { mdiClockAlertOutline } from '@mdi/js';
import Icon from '@mdi/react';
import {
  getExamRequest,
  getExamsRequest
} from '../../redux/slice/examSlide';
import { Link, Redirect } from 'react-router-dom';
import Exam from '../../components/settings/fullexam/Exam';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';

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
