import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { signinRequest } from '../../redux/slice/authenticationSlice';
import { getValueRef } from '../../share/func';
import Axios from 'axios';
import useEncrypt from '../../share/useEncrypt';

const Recover = () => {
  const dispatch = useDispatch();
  const { isloggedIn, messageLog } = useSelector(state => state.authentication);
  const mailRef = useRef(null);
  const [encrypt] = useEncrypt();

  const handelRecover =async e => {
    e.preventDefault();
    const mailEncrypted = encrypt(getValueRef(mailRef.current.value));

    let filterModel = {
      email: mailEncrypted,
      url: 'http://localhost:9999/recover'
    };
    //dispatch(recoverPass(filterModel));
    const res = await Axios.get('')
  };

  return (
    <>
      {messageLog && <div>{messageLog}</div>}
      <div className='c-app c-default-layout flex-row align-items-center'>
        <CContainer>
          <CRow className='justify-content-center'>
            <CCol md='7' lg='5' xl='4'>
              <CCard className='p-4'>
                <CCardBody>
                  <CForm>
                    <h1>Khôi phục mật khẩu</h1>
                    <p className='text-muted'>Email</p>
                    <CInputGroup className='mb-3'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-user' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <input
                        type='text'
                        ref={mailRef}
                        placeholder='abc@gmail.com'
                        autoComplete='username'
                      />
                    </CInputGroup>
                    <div className='Recover-footer'>
                      <CButton onClick={e => handelRecover(e)} color='success'>
                        Gửi
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

export default Recover;
