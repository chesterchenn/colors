import ManageColors from '../routes/manage/Colors';
import ManageLogin from '../routes/manage/Login';
import Colors from '../routes/pages/Colors';
import NoMatch from '../routes/pages/NoMatch';

export const menu = [{
  path: '/',
  component: Colors
}, {
    path: '/manage/',
    component: ManageLogin
  }, {
    path: '/manage/login',
    component: ManageLogin
  }, {
    path: '/manage/colors',
    component: ManageColors
  }, {
    path: '',
    component: NoMatch
  }
]