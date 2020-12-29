import React, { Fragment, useEffect, useState } from 'react';
import { CCol, CRow, CContainer, CLink } from '@coreui/react';
import { mdiClockAlertOutline } from '@mdi/js';
import Icon from '@mdi/react';
import {
  getExamRequest,
  getExamsRequest
} from '../../../redux/slice/examSlide';
import { Link, Redirect } from 'react-router-dom';
import Exam from './Exam';
import { useDispatch, useSelector } from 'react-redux';
import { axiosGet } from '../../../share/axios';

const FullExams = () => {
  const [listFullExam, setListFullExam] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const reqModel = {
        url: 'http://localhost:9999/api/Fullexam/'
      };
      const response = await axiosGet(reqModel);
      if (!cancelled && response) {
        const { data } = response;
        if (data) setListFullExam(data.listExam);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <Fragment>
      <div className='fullTest-page'>
        <div className='fullTest-header '></div>
        <div className='fullTest-exams col-sm-12'>
          <div className='fullTest-exams-title'>
            Full Test - Thi thử đề thật
            <span className='fullTest-exams-title-child'>
              <Icon
                path={mdiClockAlertOutline}
                title='User Profile'
                size={1}
                horizontal
                vertical
                rotate={180}
                color='red'
                className='mr-2'
              />
              Thời lượng: 120 phút
            </span>
          </div>
          <CRow className='fullTest-exams-list'>
            <CCol lg='4' className='fullTest-exams-list-child'>
              {listFullExam.map(exam => (
                <Exam _id={exam._id} title={exam.title} />
              ))}
            </CCol>
          </CRow>
        </div>
      </div>
    </Fragment>
  );
};

export default FullExams;
