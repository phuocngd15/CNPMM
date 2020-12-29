import React from 'react';

const Exams = React.lazy(() => import('../components/settings/exams/Exams'));

const UploadFile = React.lazy(() =>
  import('../components/uploadFile/UploadFile')
);
const ThongKeGiaiDe = React.lazy(() =>
  import('../components/thongke/ThongKeGiaiDe')
);

const Admin = React.lazy(() => import('../components/settings/users/Admins'));
const Clients = React.lazy(() =>
  import('../components/settings/users/Clients')
);

const profile = React.lazy(() =>
  import('../components/settings/profile/Profile')
);

const routes = [
  /* { path: '/', exact: true, name: 'Home' }, */
  { path: '/ThongTinCaNhan', name: 'Thông tin cá nhân', component: profile },
  {
    path: '/TaiKhoanAdmin',
    name: 'Tài khoản Admin',
    component: Admin,
    exact: true
  },
  {
    path: '/TaiKhoanNguoiDung',
    name: 'Tài khoản người dùng',
    component: Clients,
    exact: true
  },
  {
    path: '/TaiKhoanNguoiDung',
    name: 'Tài khoản',
    component: Admin,
    exact: true
  },
  { path: '/DeThi', name: 'Đề thi', component: Exams, exact: true },
  {
    path: '/ThemDeThi',
    name: 'Thêm đề thi',
    component: UploadFile,
    exact: true
  },
  {
    path: '/ThongKeGiaiDe',
    name: 'Thống kê giải đề của user',
    component: ThongKeGiaiDe,
    exact: true
  }
];
export default routes;
