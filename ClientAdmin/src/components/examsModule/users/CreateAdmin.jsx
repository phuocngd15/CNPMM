import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validate } from 'email-validator';
import useEncrypt from '../../hook/useEncrypt';
import { axiosPost } from '../../../share/axios';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CRow,
  CContainer
} from '@coreui/react';
import { postAdminRequest } from '../../../redux/slice/userSlide';

const CreateAdmin = props => {
  const [encrypt] = useEncrypt();
  const dispatch = useDispatch();
  let fullnameRef = useRef();
  let emailRef = useRef();
  let password = encrypt('123456');
  let ruleAdmin = encrypt('3');

  const onSubmit = async () => {
    try {
      const filterModel = {
        fullname: encrypt(fullnameRef.current.value),
        email: encrypt(emailRef.current.value),
        password: password,
        rule: ruleAdmin,
        url: 'http://localhost:9999/api/account/createAdmin'
      };
      console.log(encrypt(fullnameRef.current.value));

      dispatch(postAdminRequest(filterModel));
      props.toggleModal();
      // props.createSuccess();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CModal show={props.modal} onClose={props.toggleModal} size='l'>
        <CModalHeader closeButton>
          {' '}
          <h3>Thêm mới admin</h3>
        </CModalHeader>
        <form onSubmit={onSubmit}>
          <CModalBody>
            <CContainer>
              <CRow>
                <CCol lg='6'>
                  <CRow>
                    <CCol md='3'>
                      <CLabel htmlFor='text-fullname'>Fullname</CLabel>
                    </CCol>
                    <CCol xs='12' md='9'>
                      <input
                        ref={fullnameRef}
                        type='text'
                        placeholder='Fullname'
                        autoComplete='fullname'
                        required
                      />
                    </CCol>
                    <CCol md='3'>
                      <CLabel htmlFor='text-email'>Email</CLabel>
                    </CCol>
                    <CCol xs='12' md='9'>
                      <input
                        ref={emailRef}
                        type='email'
                        className='email_input'
                        placeholder='Email'
                        autoComplete='email'
                        required
                      />
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton color='primary' type='submit'>
              Thêm mới
            </CButton>{' '}
            <CButton color='secondary' onClick={props.toggleModal}>
              Bỏ qua
            </CButton>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
};

export default CreateAdmin;
