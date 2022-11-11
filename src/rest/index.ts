import axios from 'axios';

// 基本配置
axios.defaults.baseURL = 'https://0633-58-37-58-180.jp.ngrok.io'; //api前缀

const rest = axios.create({
  timeout: 20000, // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers':
  //     'Content-Type, X-CSRF-Token, Authorization, AccessToken, Token',
  //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  //   'Access-Control-Expose-Headers':
  //     'Content-Length, Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers',
  //   'Access-Control-Allow-Credentials': true,
  // },
});

rest.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
rest.interceptors.response.use(
  function (response) {
    return response; // 下节详述
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default rest;
