import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

// routes config
import routes from '../../route/routes';
import '../../scss/style.scss';

import { TheHeaderDropdown } from './index';
import TheHeaderExam from './TheHeaderExam';
import TheHeaderIntroExam from './TheHeaderIntroExam';

const TheHeader = () => {
  const exam = useSelector(state => state.exam).exam;

  return (
    <CHeader withSubheader id='modified-header' className='container-fluid'>
      <CHeaderBrand className='mx-auto d-lg-none' to='/'>
        <img
          src='image/logo.png'
          width='50'
          height='50'
          alt=''
          loading='lazy'
          className='ml-2'
        />
      </CHeaderBrand>
      <CHeaderNav className='d-md-down-none mr-auto header'>
        <CLink className='navbar-brand logo' to='/'>
          <img
            src='image/logo.png'
            width='50'
            height='50'
            alt=''
            loading='lazy'
            className='ml-2'
          />
        </CLink>
        <CHeaderNavItem className='px-2'>
          <TheHeaderExam />
        </CHeaderNavItem>
        <CHeaderNavItem className='px-2'>
          <TheHeaderIntroExam />
        </CHeaderNavItem>
      </CHeaderNav>
      <CHeaderNav className='px-3'>
        <TheHeaderDropdown />
      </CHeaderNav>
      {!exam && (
        <CSubheader
          className='px-3 justify-content-between modified-subheader'>
          <CBreadcrumbRouter
            className='border-0 c-subheader-nav m-0 px-0 px-md-3'
            routes={routes}
          />
        </CSubheader>
      )}
    </CHeader>
  );
};

export default TheHeader;
