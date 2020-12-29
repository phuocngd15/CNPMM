import React, { useRef } from 'react';
import { validate } from 'email-validator';

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCardHeader,
  CCardFooter
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch } from 'react-redux';
import { signupRequest } from '../../redux/slice/authenticationSlice';
import { useHistory } from 'react-router-dom';
import { getValueRef } from '../../share/func';
import useEncrypt from '../../share/useEncrypt';
import { axiosPost } from '../../share/axios';

const Register = () => {
  const [mahoa] = useEncrypt();
  const dispatch = useDispatch();
  const history = useHistory();
  let usernameRef = useRef();
  let emailRef = useRef();
  let passRef = useRef();

  const handelCreateAccount = async () => {
    const fullname = getValueRef(usernameRef);
    const email = getValueRef(emailRef);
    const password = getValueRef(passRef);
    const isCall = fullname && email && password;
    const filterModel = {
      fullname: mahoa(fullname),
      email: mahoa(email),
      password: mahoa(password),
      url: 'http://localhost:9999/signup'
    };

    const res = isCall && (await axiosPost(filterModel));
    if (res) {
      history.push('/login');
    }
  };
  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='7' lg='5' xl='4'>
            <CCard className='p-4'>
              <CCardHeader className='ccardheader'>
                <h2>Đăng ký</h2>
                <p>Tạo tài khoản</p>
              </CCardHeader>
              <CCardBody>
                <CForm>
                  <CInputGroup className='mb-3'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-user' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <input
                      ref={usernameRef}
                      type='text'
                      placeholder='Họ tên'
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className='mb-3'>
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <input
                      ref={emailRef}
                      type='email'
                      className='email_input'
                      placeholder='Email'
                      autoComplete='email'
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className='mb-3'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-lock-locked' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <input
                      ref={passRef}
                      type='password'
                      placeholder='Mật khẩu'
                      autoComplete='new-password'
                      required
                    />
                  </CInputGroup>
                  <div className='login-footer'>
                    <CButton
                      color='success'
                      block
                      onClick={handelCreateAccount}>
                      Đăng ký
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
