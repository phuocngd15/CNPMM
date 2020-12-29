import React from 'react';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderNavItem,
  CHeaderNavLink
} from '@coreui/react';

const TheHeaderTestDropdown = () => {
  return (
    <CDropdown inNav className='c-header-nav-item mx-2'>
      <CDropdownToggle className='c-header-nav-link' caret={false}>
        <h4>Practice Toeic Test</h4>
      </CDropdownToggle>
      <CDropdownMenu placement='bottom-end' className='pt-0'>
        <CDropdownItem>
          <CHeaderNavItem className='px-3'>
            <CHeaderNavLink to='/toeictest/fulltest'>Full Test</CHeaderNavLink>
          </CHeaderNavItem>
        </CDropdownItem>
        <CDropdownItem>
          <CHeaderNavItem className='px-3'>
            <CHeaderNavLink to='/dashboard'>Single Test</CHeaderNavLink>
          </CHeaderNavItem>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderTestDropdown;
