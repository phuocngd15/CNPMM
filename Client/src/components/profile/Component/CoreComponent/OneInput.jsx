import { CButton, CCol, CLabel, CRow } from '@coreui/react';
import Axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusMiddleWare } from '../../../../share/Alert';
import { axiosGet, axiosPost } from '../../../../share/axios';
import { getValueRef } from '../../../../share/func';
import useEncrypt from '../../../../share/useEncrypt';

const OneInput = props => {
  const email = useSelector(state => state.authentication.loginState.email);
  const {
    label,
    placeholder,
    type,
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
    const model = {
      url: apiPostURL,
      email: email,
      value: needEncrypt ? mahoa(getValueRef(inputRef)) : getValueRef(inputRef)
    };
    const res = await axiosPost(model);
    StatusMiddleWare(res.status, res.data) && setIsEditing(false);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const model = {
        url: apiGetURL,
        email
      };
      const response = await axiosGet(model);
      if (!cancelled && response) {
        const { data } = response;
        setValue(data[keyQuery]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiGetURL, email, keyQuery, placeholder]);
  const handleChange = e => {
    setValue();
  };
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
  return (
    <CRow className='item'>
      <CCol xs='12' md='2'>
        <CLabel className='item-label'>{label}</CLabel>
      </CCol>
      <CCol xs='12' md='10'>
        <input
          ref={inputRef}
          type={type}
          value={value}
          disabled={!isEditing}
          onChange={e => handleChange(e.target.value)}
        />
        <span className='item-control'>{renderBtn(isEditing)}</span>
      </CCol>
    </CRow>
  );
};

export { OneInput };
