import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validate } from 'email-validator';
import useEncrypt from '../../hook/useEncrypt';
import { axiosPost } from '../../../share/axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CContainer,
  CLink,
  CListGroup,
  CListGroupItem,
  CRow
} from '@coreui/react';
import { mdiAccountEditOutline } from '@mdi/js';
import Icon from '@mdi/react';
import CIcon from '@coreui/icons-react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { getValueRef } from '../../../share/func';
import { StatusMiddleWare } from '../../../share/Alert';
const GeneralEdit = () => {
  return (
    <>
      <OneItemCanEdit
        keyQuery='fullname'
        label='Họ và tên'
        placeholder='nguyen van a'
        type='text'
        apiPostURL={'http://localhost:9999/api/profile/name'}
        apiGetURL={'http://localhost:9999/api/profile'}
      />
      <OneItemCanEdit
        label='SĐT'
        keyQuery='phone'
        placeholder='0123456789'
        type='text'
        apiPostURL={'http://localhost:9999/api/profile/phone'}
        apiGetURL={'http://localhost:9999/api/profile'}
      />
    </>
  );
};
const Password = () => {
  return (
    <OneItemCanEdit label='Mật khẩu' placeholder='*******' type='password' />
  );
};

const OneItemCanEdit = props => {
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
  const [isViewMode, setIsViewMode] = useState(true);
  const [mahoa] = useEncrypt();
  const [value, setValue] = useState(placeholder);

  const inputRef = useRef();

  const handleSave = async () => {
    const model = {
      email: email,
      value: needEncrypt ? mahoa(getValueRef(inputRef)) : getValueRef(inputRef)
    };
    const res = await Axios.post(apiPostURL, model);
    StatusMiddleWare(res.status, res.data) && setIsViewMode(true);
  };
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const response = await Axios.get(apiGetURL, {
        params: {
          email
        }
      });
      if (!cancelled) {
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
  const renderBtn = isShow => {
    if (isShow)
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
            onClick={() => setIsViewMode(true)}>
            Hủy
          </CButton>
        </>
      );
    return null;
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
          //  placeholder={placeholder}
          value={value}
          disabled={isViewMode}
          onChange={e => handleChange(e.target.value)}
        />
        <span className='item-control'>
          {renderBtn(!isViewMode)}
          {isViewMode && (
            <span
              className='item-btnEdit'
              size='l'
              color='primary'
              onClick={() => setIsViewMode(false)}
              variant='outline'>
              Chỉnh sửa
            </span>
          )}
        </span>
      </CCol>
    </CRow>
  );
};

const ConfigList = () => {
  const listTabProfile = [
    {
      id: 0,
      label: 'Chung',
      childComponent: <GeneralEdit />
    },
    {
      id: 1,
      label: 'Bảo mật và đăng nhập',
      childComponent: <Password />
    }
  ];
  const [activeTab, setActiveTab] = React.useState(listTabProfile[0].id);

  const handleActiveTab = id => {
    setActiveTab(id);
  };
  return (
    <div>
      <CRow>
        <CCol sm='12' md='4' className='profile-left'>
          <div className='profile-nav-header'>Cài đặt</div>
          <CListGroup className='profile-nav-list'>
            {listTabProfile.map(item => {
              return (
                <CListGroupItem
                  key={item.id}
                  onClick={() => handleActiveTab(item.id)}
                  className={`${activeTab === item.id ? 'active-tab' : ''}`}>
                  {item.label}
                </CListGroupItem>
              );
            })}
          </CListGroup>
        </CCol>
        <CCol sm='12' md='8' className='profile-right'>
          {listTabProfile.map(item => {
            return (
              activeTab === item.id && (
                <div key={item.id}>{item.childComponent}</div>
              )
            );
          })}
        </CCol>
      </CRow>
    </div>
  );
};

const Profile2 = () => {
  return <ConfigList />;
};
export default Profile2;
