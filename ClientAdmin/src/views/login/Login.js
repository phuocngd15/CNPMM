import React, { useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { signIn } from '../../redux/slice/authenticationSlice';
import { getValueRef } from '../../share/func';
import useEncrypt from '../../components/hook/useEncrypt';

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.authentication.isLogin);
  const emailRef = useRef();
  const passRef = useRef();
  const [encrypt, giaima] = useEncrypt();

  const handelLogin = e => {
    e.preventDefault();
    const emailEncrypted = encrypt(getValueRef(emailRef));
    const passEncrypted = encrypt(getValueRef(passRef));
    let filterModel = {
      email: emailEncrypted,
      password: passEncrypted,
      url: 'http://localhost:9999/signin'
    };
    dispatch(signIn(filterModel));
  };
  if (isLogin) return <Redirect to='/' />;

  const handleRecoverPass = () => {
    history.push('/recover');
  };

  return (
    <>
      <div className='c-app c-default-layout flex-row align-items-center'>
        <CContainer>
          <CRow className='justify-content-center'>
            <CCol md='7' lg='5' xl='4'>
              <CCard className='p-4'>
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className='text-muted'>Sign In to your account</p>
                    <CInputGroup className='mb-3'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-user' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        type='text'
                        ref={emailRef}
                        placeholder='email@gmail.com'
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
                        type='password'
                        ref={passRef}
                        placeholder='Password'
                        autoComplete='current-password'
                        required
                      />
                    </CInputGroup>
                    <div className='login-footer'>
                      <Link to='/recover'>
                        <CButton color='link' onClick={handleRecoverPass}>
                          Forgot password?
                        </CButton>
                      </Link>
                      <CButton onClick={e => handelLogin(e)} color='success'>
                        Login
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
