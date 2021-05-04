import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'

// ajax请求方法
import httpRequest from "./util/request";
Vue.prototype.$myAjax = httpRequest.myAjax;


// Toast
import './components/Toast/index.css';
import Toast from './components/Toast/index';
Vue.use(Toast);


Vue.use(router)
Vue.use(Element)
Vue.prototype.axios = axios

/* eslint-disable no-new */


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App) //ElementUI
})
