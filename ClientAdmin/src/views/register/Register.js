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
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useDispatch } from 'react-redux';
import { signupRequest } from '../../redux/slice/authenticationSlice';
import { axiosPost } from '../../share/axios';
import useEncrypt from '../../components/hook/useEncrypt';

const Register = () => {
  const [mahoa] = useEncrypt();
  const dispatch = useDispatch();
  let usernameRef = useRef();
  let emailRef = useRef();
  let passRef = useRef();

  const handelCreateAccount = async () => {
    if (
      !usernameRef.current.value ||
      !emailRef.current.value ||
      !passRef.current.value
    )
      return null;
    if (!validate(emailRef.current.value)) {
      alert('email invalid');
      return null;
    }
    const filterModel = {
      fullname: mahoa(usernameRef.current.value),
      email: mahoa(emailRef.current.value),
      password: mahoa(passRef.current.value),
      url: 'http://localhost:9999/signup'
    };
    const res = await axiosPost(filterModel);
    if (res) {
      alert('tao thanh cong');
    } else {
      alert('tao khong thanh cong');
    }
    // dispatch(signupRequest(filterModel))
  };
  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='7' lg='5' xl='4'>
            <CCard className='p-4'>
              <CCardBody>
                <CForm>
                  <h1>Register</h1>
                  <p className='text-muted'>Create your account</p>
                  <CInputGroup className='mb-3'>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name='cil-user' />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <input
                      ref={usernameRef}
                      type='text'
                      placeholder='Fullname'
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
                      placeholder='Password'
                      autoComplete='new-password'
                      required
                    />
                  </CInputGroup>
                  <div className='login-footer'>
                    <CButton
                      color='success'
                      block
                      onClick={handelCreateAccount}>
                      Create Account
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
