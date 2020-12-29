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
import Axios from 'axios';

const MiniExams = () => {
  const [listMiniExam, setListMiniExam] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const response = await Axios.get('http://localhost:9999/api/fullexam/');
      if (!cancelled && response) {
        /* const { data } = response;
        setListExam(data); */
        setListMiniExam([
          { _id: '123456', title: 'Đề thi số 1' },
          { _id: '123456', title: 'Đề thi số 2' }
        ]);
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
            Mini Test - Kiểm tra trình độ
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
              Thời lượng: 30 phút
            </span>
          </div>
          <CRow className='fullTest-exams-list'>
            <CCol lg='4' className='fullTest-exams-list-child'>
              {listMiniExam.map(exam => (
                <Exam _id={exam._id} title={exam.title} />
              ))}
            </CCol>
          </CRow>
        </div>
      </div>
    </Fragment>
  );
};

export default MiniExams;
