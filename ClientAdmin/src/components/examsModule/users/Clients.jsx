import React, { lazy, useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CDataTable } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Icon from '@mdi/react';
import { mdiAccountPlus } from '@mdi/js';
import { useSelector, useDispatch } from 'react-redux';
import { getClientRequest } from '../../../redux/slice/userSlide';

const fields = [
  // { key: '_id', label: 'Số thứ tự', _style: { width: '5%' } },
  // { key: 'fullname', label: 'Tên', _style: { width: '30%' } },
  { key: 'email', label: 'Email', _style: { width: '30%' } },
  { key: 'createdAt', label: 'Ngày tạo', _style: { width: '30%' } }
];

const Clients = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.authentication);
  const [islogin, setIsLogin] = useState(isLogin);
  const clients = useSelector(state => state.user).clients;
  const rule = 4;

  const filterModel = {
    url: `http://localhost:9999/api/account/${rule}`
  };
  useEffect(() => {
    if (islogin) {
      dispatch(getClientRequest(filterModel));
    }
  }, [islogin]);

  return (
    <>
      <CCard>
        <CCardHeader className='users-title'>
          DANH SÁCH TÀI KHOẢN NGƯỜI DÙNG
        </CCardHeader>
        <CCardBody className='users-content'>
          <CDataTable
            items={clients}
            fields={fields}
            striped
            responsive
            hover
            sorter
            tableFilter
            scopedSlots={{
              index: item => <td>{item._id}</td>,
              name: item => <td>{item.email}</td>
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Clients;
