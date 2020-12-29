import React, { useState } from 'react';
import {
  CButton,
  CModal,
  CModalHeader,
  CFormGroup,
  CInputRadio,
  CContainer,
  CRow,
  CCol,
  CSelect,
  CImg,
  CLabel,
  CInputFile
} from '@coreui/react';
import { useSelector, useDispatch } from 'react-redux';
import useEncrypt from '../hook/useEncrypt';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';

const Profiles = () => {
  const [encrypt, giaima] = useEncrypt();
  const [profile, setProfile] = useState({});
  const [success, setSuccess] = useState(false);
  const { email } = useSelector(state => state.authentication).loginState;
  const emailEncrypted = giaima(email);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:9999/api/profile/${emailEncrypted}`
      );
      setProfile(response.data);
    };

    fetchData();
  }, [emailEncrypted, success]);
  const fullname = giaima(profile.fullname);
  return (
    <div>
      <CContainer className='edit-`profile-content'>
        <CRow className='field'>
          <CCol lg='10'>
            <CRow>
              <CCol lg='5' className='pt-2'>
                Họ tên
              </CCol>
              <CCol>
                <input
                  type='text'
                  placeholder='Nhập họ tên'
                  className='inp'
                  style={{ width: '100%' }}
                  required
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow className='field'>
          <CCol lg='10'>
            <CRow>
              <CCol lg='5' className='pt-2'>
                Email
              </CCol>
              <CCol>
                <CLabel>{emailEncrypted}</CLabel>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <CRow className='field'>
          <CCol lg='10'>
            <CRow>
              <CCol lg='5' className='pt-2'>
                Giới tính
              </CCol>
              <CCol>
                <CFormGroup variant='custom-radio' inline>
                  <CInputRadio
                    custom
                    id='nam'
                    name='inline-radios'
                    value='nam'
                  />
                  <CLabel variant='custom-checkbox' htmlFor='nam'>
                    Nam
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol>
                <CFormGroup variant='custom-radio' inline>
                  <CInputRadio custom id='nu' name='inline-radios' value='nu' />
                  <CLabel variant='custom-checkbox' htmlFor='nu'>
                    Nữ
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow className='field'>
          <CCol lg='10'>
            <CRow>
              <CCol lg='5' className='pt-2'>
                Số điện thoại
              </CCol>
              <CCol>
                <input
                  type='number'
                  placeholder='Nhập số điện thoại'
                  className='inp'
                  style={{ width: '100%' }}
                  required
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>

        <CRow className='field'>
          <CCol lg='10'>
            <CRow>
              <CCol lg='5' className='pt-2'>
                Cấp độ
              </CCol>
              <CCol>
                <input
                  type='text'
                  placeholder='Cấp độ'
                  className='inp'
                  style={{ width: '100%' }}
                />
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Profiles;
