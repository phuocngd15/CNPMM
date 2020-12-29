import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react';

const TheHeaderExam = () => {
  let history = useHistory();

  const handleMiniTest = () => {
    history.push('/miniTest');
  };
  const handleFullTest = () => {
    history.push('/fullTest');
  };
  return (
    <CDropdown inNav className='c-header-nav-items mx-2' direction='down'>
      <CDropdownToggle className='c-header-nav-link' caret={false}>
        <div>Đề thi thử</div>
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-start'>
        <CDropdownItem onClick={handleMiniTest}>Đề thi 30 phút</CDropdownItem>
        <CDropdownItem
          className='header-dropdown-profile'
          onClick={handleFullTest}>
          Đề thi 120 phút
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderExam;
