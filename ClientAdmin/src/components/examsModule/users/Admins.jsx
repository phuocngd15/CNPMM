import React, { lazy, useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CDataTable
} from '@coreui/react';
import Icon from '@mdi/react';
import CIcon from '@coreui/icons-react';
import { mdiAccountPlus } from '@mdi/js';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteAdminRequest,
  getAdminRequest
} from '../../../redux/slice/userSlide';
import CreateAdmin from './CreateAdmin';
import { decrypt } from '../../../share/decrypt';
import ToDateForView from '../../../share/ConvertDateForView'
const fields = [
  // { key: '_id', label: 'Số thứ tự', _style: { width: '5%' } },
  { key: 'email', label: 'Email', _style: { width: '30%' } },
  { key: 'createdAt', label: 'Ngày tạo', _style: { width: '30%' } },
  { key: 'action', label: 'ACTION', _style: { width: '10%' } }
];
const Admins = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.authentication);
  const [islogin, setIsLogin] = useState(isLogin);
  const admins = useSelector(state => state.user).admins;
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { loginState } = useSelector(state => state.authentication);
  const rule = decrypt(loginState.rule);
  const setRule = 3;

  const createSuccess = () => {
    setSuccess(!success);
  };

  const filterModelGet = {
    url: `http://localhost:9999/api/account/${setRule}`
  };

  const handleDelete = item => {
    const model = {
      url: `http://localhost:9999/api/account/deleteAdmin/${item._id}`
    };
    dispatch(deleteAdminRequest(model));

    setSuccess(!success);
  };

  useEffect(() => {
    if (islogin || success) {
      dispatch(getAdminRequest(filterModelGet));
      setSuccess(false);
    }
  }, [islogin, success]);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <CCard>
        <CCardHeader className='users-title'>
          QUẢN LÝ TÀI KHOẢN ADMIN
          {rule !== '2' ? (
            <></>
          ) : (
            <div className='card-header-actions'>
              <CButton
                onClick={toggleModal}
                block
                variant='outline'
                color='primary'
                size='sm'
                className='users-title-btn-add'>
                <Icon
                  path={mdiAccountPlus}
                  size={1}
                  title='Create Admin'
                  className='mr-1'
                />
                Thêm admin
              </CButton>
            </div>
          )}
        </CCardHeader>
        <CCardBody className='users-content'>
          <CDataTable
            items={admins}
            fields={fields}
            striped
            responsive
            hover
            sorter
            tableFilter
            scopedSlots={{
              index: item => <td>{item._id}</td>,
              name: item => <td>{item.email}</td>,
              createdAt:item=> <td>{ToDateForView(item.createdAt)}</td>,
              action: item => (
                <td style={{ display: 'flex', justifyContent: 'start' }}>
                  {rule !== '2' ? (
                    <></>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        width: '80%',
                        justifyContent: 'space-between'
                      }}>
                      <span
                        className='c-subheader-nav-link'
                        onClick={() => handleDelete(item)}>
                        <CIcon
                          style={{ color: 'red' }}
                          name='cil-trash'
                          alt='Delete'
                        />
                      </span>
                    </div>
                  )}
                </td>
              )
            }}
          />
        </CCardBody>
        <CreateAdmin
          modal={modal}
          toggleModal={toggleModal}
          createSuccess={createSuccess}
        />
      </CCard>
    </>
  );
};

export default Admins;
