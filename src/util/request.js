import axios from "axios";
import {Loading} from "element-ui";
import router from "vue-router";
let loading = ''
let baseURL = 'http://localhost:8080/api'
// 定义请求头及过期时间
const http = axios.create({
  timeout: 1000 * 5,
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  }
});
http.__proto__ = axios;
/**
 * 请求拦截 配置header请求参数
 */
http.interceptors.request.use(
  config => {
    // 拦截请求，显示loading界面
    loading = Loading.service({
      lock: true,
      text: "加载中...",
      spinner: "el-icon-loading",
      background: "rgba(255,255,255,0.7)",
      customClass: "request-loading",
    });
    config.headers.sn = new Date().getTime();
    config.headers.token = window.localStorage.getItem('token');
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
http.interceptors.response.use(
  response => {
    // 响应请求，关闭loading页面
    loading.close();
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 请求地址处理
 */
http.adornUrl = actionName => {
  return baseURL + actionName;
};


/**
 * 封装ajax请求
 * 1.reqUrl、reqMethod为必填选项
 * 2.type存在时导出数据
 * @param {String}   reqUrl                   请求地址
 * @param {String}   reqMethod                请求方式
 * @param {JSON}     reqData                  请求数据
 * @param {Function} callback                 回调函数
 * @param {Function} dir                      直接返回响应数据
 */

const myAjax = (reqUrl, reqMethod, reqData, callback, dir) => {
  http({
    url: http.adornUrl(reqUrl),
    method: reqMethod,
    data: reqData
  })
    .then(({ data }) => {
      if (dir) {
        callback(data);
      } else if (data && data.code === 200) {
        callback(data.data);
      }
      // else {
      //   this.$toast(data.msg, {duration: 1500})
      // }
    })
    .catch(({ error }) => {return error});
};


export default {
  myAjax,
};
