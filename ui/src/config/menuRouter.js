import Admin from '../manage/routes/Admin';
import Login from '../manage/routes/Login';
import Colors from '../pages/routes/colors';

export const routes = [{
  path: '/',
  component: Colors
}, {
    path: '/manage/',
    component: Login
  }, {
    path: '/manage/login',
    component: Login
  }, {
    path: '/manage/admin',
    component: Admin
  }
]