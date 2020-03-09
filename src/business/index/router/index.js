// 默认路由地址
// import DemoPage from './demopage.js';
// import Loan from './loan.js';
import Compress from './compress.js';

export default function(VueRouter) {
  return new VueRouter({
    base: __dirname,
    routes: [...Compress, {
      path: '*',
      redirect: '/index'
    }]
  });
};