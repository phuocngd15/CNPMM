import React, { useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './scss/style.scss';
import Recover from './views/recover/recover';
const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./views/baseView/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/login/Login'));
const PageIntro = React.lazy(() =>
  import('./views/introduction/IntroductionPage')
);
const Register = React.lazy(() => import('./views/register/Register'));
const Page404 = React.lazy(() => import('./views/page404/Page404'));
const Page500 = React.lazy(() => import('./views/page500/Page500'));

const App = () => {
  const isLogin = useSelector(state => state.authentication.isLogin);
  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path='/intro' name='Introduction Page'>
            <PageIntro />
          </Route>
          <Route exact path='/login' name='Login Page'>
            {!isLogin ? <Login /> : <Redirect to='/' />}
          </Route>
          <Route exact path='/register' name='Register Page'>
            <Register />
          </Route>
          <Route exact path='/404' name='Page 404'>
            <Page404 />
          </Route>
          <Route exact path='/500' name='Page 500'>
            <Page500 />
          </Route>
          <Route path='/recover' name='Recover'>
            <Recover />
          </Route>
          <Route path='/' name='Home'>
            {isLogin ? <TheLayout /> : <Redirect to='/intro' />}
          </Route>
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
