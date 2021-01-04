import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

// sidebar nav config
import navigation from './_nav';
import { showHideSidebar } from '../../redux/slice/sidebarSlice';

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.sidebarShow);
  return (
    <CSidebar
      show={show.isShow}
      onShowChange={val => dispatch(showHideSidebar(val))}>
      <CSidebarBrand className='d-md-down-none' to='/'>
        {/* icon bran set here */}
        {/* <CIcon
          className='c-sidebar-brand-full'
          name='logo-negative'
          height={35}
        />
        <CIcon
          className='c-sidebar-brand-minimized'
          name='sygnet'
          height={35}
        /> */} 
        <h2>SPE Center</h2>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className='c-d-md-down-none' />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
