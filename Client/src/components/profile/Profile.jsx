import React from 'react';
import { CCol, CListGroup, CListGroupItem, CRow } from '@coreui/react';
import { OneInput } from './Component/CoreComponent/OneInput';
import { TwoCheckBox } from './Component/CoreComponent/TwoCheckBox';

const GeneralEdit = () => {
  return (
    <>
      <OneInput
        keyQuery='fullname'
        label='Họ và tên'
        placeholder='nguyen van a'
        type='text'
        apiPostURL={'http://localhost:9999/api/profile/name'}
        apiGetURL={'http://localhost:9999/api/profile'}
      />
      <OneInput
        label='SĐT'
        keyQuery='phone'
        placeholder='0123456789'
        type='text'
        apiPostURL={'http://localhost:9999/api/profile/phone'}
        apiGetURL={'http://localhost:9999/api/profile'}
      />
      <TwoCheckBox
        label='Giới tính'
        keyQuery='gender'
        placeholder='0123456789'
        apiPostURL={'http://localhost:9999/api/profile/gender'}
        apiGetURL={'http://localhost:9999/api/profile'}
      />
    </>
  );
};
const Password = () => {
  return <OneInput label='Mật khẩu' placeholder='*******' type='password' />;
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
