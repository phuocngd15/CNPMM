import {
  CButton,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
  CSelect
} from '@coreui/react';
import Axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusMiddleWare } from '../../../../share/Alert';
import { getValueRef } from '../../../../share/func';
import useEncrypt from '../../../../share/useEncrypt';

const TwoCheckBox = props => {
  const email = useSelector(state => state.authentication.loginState.email);
  const {
    label,
    placeholder,
    apiPostURL,
    apiGetURL,
    needEncrypt = false,
    keyQuery
  } = props;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [mahoa] = useEncrypt();
  const [value, setValue] = useState(placeholder);

  const inputRef = useRef();

  const handleSave = async () => {
    const newValue = document.getElementById('profile-gender').value;
    if (newValue) {
      const model = {
        email: email,
        value: newValue
      };
      const res = await Axios.post(apiPostURL, model);
      if (StatusMiddleWare(res.status, res.data)) {
        setIsEditing(false);
        setValue(newValue);
      }
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const response = await Axios.get(apiGetURL, {
        params: {
          email
        }
      });
      if (!cancelled && response) {
        const { data } = response;
        setValue(data[keyQuery]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiGetURL, email, keyQuery, placeholder]);

  const renderBtn = isEditing => {
    if (isEditing)
      return (
        <>
          <CButton
            type='submit'
            size='l'
            className='item-btn-success'
            color='primary'
            variant='outline'
            onClick={handleSave}>
            Lưu
          </CButton>
          <CButton
            type='submit'
            size='l'
            variant='outline'
            className='item-btn-cancel'
            color='dark'
            onClick={() => setIsEditing(false)}>
            Hủy
          </CButton>
        </>
      );
    return (
      <span
        className='item-btnEdit'
        size='l'
        color='primary'
        onClick={() => setIsEditing(true)}
        variant='outline'>
        Chỉnh sửa
      </span>
    );
  };
  const swap = isEditing => {
    if (isEditing)
      return (
        <CFormGroup innerRef={inputRef}>
          <CSelect custom name='ccmonth' id='profile-gender'>
            <option value='Nữ'>Nữ</option>
            <option value='Nam'>Nam</option>
            <option value='Không công khai'>Không công khai</option>
          </CSelect>
        </CFormGroup>
      );
    return <input ref={inputRef} type={'text'} value={value} disabled={true} />;
  };
  return (
    <CRow className='item'>
      <CCol xs='12' md='2'>
        <CLabel className='item-label'>{label}</CLabel>
      </CCol>
      <CCol xs='12' md={isEditing ? '3' : '10'}>
        {swap(isEditing)}
        <span className='item-control'>{renderBtn(isEditing)}</span>
      </CCol>
    </CRow>
  );
};

export { TwoCheckBox };
