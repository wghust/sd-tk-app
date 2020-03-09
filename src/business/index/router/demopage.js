import form from '../views/demo/form';
import index from '../views/demo/index';
import data from '../views/demo/data';
import profile from '../views/demo/profile';
import login from '../views/demo/login';
import sex from '../views/demo/404';

const routerPath = [{
  path: '/index',
  component: index
}, {
  path: '/form',
  component: form,
  meta: {
    keepAlive: true
  }
}, {
  path: '/data',
  component: data
}, {
  path: '/profile/:type',
  component: profile
}, {
  path: '/profile',
  component: profile
}, {
  path: '/login',
  component: login
}, {
  path: '/404',
  component: sex
}]

export default routerPath;