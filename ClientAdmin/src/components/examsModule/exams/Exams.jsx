import React, { lazy, useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CLink
} from '@coreui/react';
import Icon from '@mdi/react';
import { mdiAccountPlus } from '@mdi/js';
import { useDispatch, useSelector } from 'react-redux';
import { getExamsRequest } from '../../../redux/slice/examSlide';
import Exam from './Exam';
const Exams = () => {
  const { isloggedIn } = useSelector(state => state.authentication);
  const [isLogin, setIsLogin] = useState(isloggedIn);
  const exams = useSelector(state => state.exam).exams;
  const dispatch = useDispatch();
  const filterModel = {
    url: 'http://localhost:9999/api/fullexam/'
  };
  useEffect(() => {
    if (isLogin) {
      dispatch(getExamsRequest(filterModel));
    }
  }, [isLogin]);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className='exams-title'>
              QUẢN LÝ ĐỀ THI
              <div className='card-header-actions'>
                <CLink to='/QuanLy/DeThi/ThemDeThi'>
                  <CButton
                    block
                    variant='outline'
                    color='primary'
                    size='sm'
                    className='exams-title-btn-add'>
                    <Icon
                      path={mdiAccountPlus}
                      size={1}
                      title='Create Exam'
                      className='mr-1'
                    />
                    Thêm đề thi
                  </CButton>
                </CLink>
              </div>
            </CCardHeader>
            <CCardBody className='exams-content'>
              <table className='table table-hover table-outline mb-0 d-none d-sm-table'>
                <thead className='thead-light'>
                  <tr>
                    <th className='text-center '>Số thứ tự</th>
                    <th scope='col' className='text-center'>
                      Tên đề thi
                    </th>
                    <th scope='col' className='text-center'>
                      Mô tả
                    </th>
                    <th scope='col' className='text-center'>
                      Ngày tạo
                    </th>
                    <th scope='col' className='text-center'>
                      Chỉnh sửa
                    </th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {exams.map((exam, index) => (
                    <Exam key={exam._id} exam={exam} stt={index + 1} />
                  ))}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Exams;
