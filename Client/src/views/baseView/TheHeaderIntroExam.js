import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react';

const TheHeaderIntroExam = () => {
  let history = useHistory();

  return (
    <CDropdown inNav className='c-header-nav-items mx-2' direction='down'>
      <CDropdownToggle className='c-header-nav-link' caret={false}>
        <div>Tổng quan Toeic</div>
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-start'>
        <CDropdownItem onClick={() => history.push('/intro-toeic')}>
          Toeic là gì
        </CDropdownItem>
        <CDropdownItem
          className='header-dropdown-profile'
          onClick={() => history.push('/tips')}>
          Mẹo thi Toeic
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderIntroExam;
