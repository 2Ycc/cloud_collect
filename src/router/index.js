import Vue from 'vue'
import router from 'vue-router'
import Login from "../views/Login";
import Register from "../views/Register";
import testAxios from "../test/testAxios";
import notfound from '../views/404'
import Home from "../views/Home";
import Collect from "../views/collect/Collect";
Vue.use(router)

const Router = new router({
  mode: 'history',
  routes:[
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: "/testAxios",
      component: testAxios
    },
    {
      path: '/home',
      component: Home,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: '/collect',
      component: Collect,
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      }
    },
    {
      path: '/404',
      component: notfound,
      hidden: true
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]

});

// 路由守卫，如果跳转路由需要登录认证，则进行判断
Router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    if (localStorage.getItem('token')) { // 查询本地存储信息是否已经登陆
      next();
    } else {
      next({
        path: '/login', // 未登录则跳转至login页面
        query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
      });
    }
  } else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if(to.fullPath === "/login"){
    if(localStorage.getItem('token')){
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
});

export default Router
