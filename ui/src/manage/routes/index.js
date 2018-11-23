import Admin from './Admin';
import Login from './Login';

export const routes = [
   {
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