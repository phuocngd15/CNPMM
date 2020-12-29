import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CLink
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { logOut } from '../redux/slice/authenticationSlice';

const TheHeaderDropdown = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const handelLogout = () => {
    dispatch(logOut());
  };
  const handleRecoverPass = () => {
    history.push('/ThongTinCaNhan');
  };

  return (
    <CDropdown inNav className='c-header-nav-items mx-2' direction='down'>
      <CDropdownToggle className='c-header-nav-link' caret={false}>
        <div className='c-avatar'>
          <CImg
            src={'avatars/6.jpg'}
            className='c-avatar-img'
            alt='admin@bootstrapmaster.com'
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-end'>
        <CDropdownItem
          className='header-dropdown-profile'
          onClick={handleRecoverPass}>
          <CIcon name='cil-user' className='mfe-2' />
          Profile
        </CDropdownItem>
        <CDropdownItem onClick={handelLogout}>
          <CIcon name='cil-settings' className='mfe-2' />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
