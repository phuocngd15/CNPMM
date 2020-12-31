import React from 'react';

const HomeExams = React.lazy(() => import('../views/examHome/HomeExams'));
const MiniExams = React.lazy(() =>
  import('../components/settings/fullexam/MiniExams')
);
const FullExams = React.lazy(() =>
  import('../components/settings/fullexam/FullExams')
);
const intro = React.lazy(() =>
  import('../components/settings/fullexam/PrepareDoExam')
);
const doExam = React.lazy(() =>
  import('../components/settings/fullexam/DoExam')
);

const profile = React.lazy(() => import('../components/profile/Profile'));
const ToeicScale = React.lazy(() =>
  import('../components/settings/ToeicScale')
);
const ToeicGeneral = React.lazy(() =>
  import('../views/ToeicGeneral/ToeicGeneral')
);
const AnalyzeExam = React.lazy(() => import('../views/analyzeExam/index'));

const routes = [
  { path: '/', name: 'Trang chủ', component: HomeExams, exact: true },
  {
    path: '/miniTest',
    name: 'Đề thi 30 phút',
    component: MiniExams,
    exact: true
  },
  {
    path: '/fullTest',
    name: 'Đề thi 120 phút',
    component: FullExams,
    exact: true
  },
  {
    path: '/ThangDiemToeic',
    name: 'Thang điểm Toeic',
    component: ToeicScale,
    exact: true
  },
  {
    path: '/BauDauThi/:id',
    name: 'Bắt đầu thi',
    component: intro,
    exact: true
  },
  { path: '/ThongTinCaNhan', name: 'Thông tin cá nhân', component: profile },
  { path: '/doExam', name: 'Làm bài thi', component: doExam },
  {
    path: '/intro-toeic',
    name: 'Tổng quan Toeic',
    component: ToeicGeneral,
    exact: true
  },
  {
    path: '/exam-history',
    name: 'Thống kê',
    component: AnalyzeExam,
    exact: true
  }
];
export default routes;
