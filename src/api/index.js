import axios from 'axios';
import JSONbig from 'json-bigint';

// 创建JSON解析器实例
const jsonBigParser = JSONbig({
  storeAsString: true, // 将大整数转换为字符串而不是BigInt对象，便于前端处理
  strict: true
});

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  transformResponse: [function (data) {
    // 使用json-bigint解析响应数据
    try {
      return jsonBigParser.parse(data);
    } catch (e) {
      // 如果解析失败，返回原始数据
      return data;
    }
  }]
});

// 添加请求拦截器，自动在请求头中添加token
api.interceptors.request.use(function (config) {
  // 从localStorage中获取用户信息
  const userInfoStr = localStorage.getItem('userInfo');
  if (userInfoStr) {
    try {
      const userInfo = JSON.parse(userInfoStr);
      if (userInfo.token) {
        // 将token添加到请求头
        config.headers['Authorization'] = `Bearer ${userInfo.token}`;
      }
    } catch (e) {
      console.error('解析用户信息失败:', e);
    }
  }
  return config;
}, function (error) {
  // 处理请求错误
  return Promise.reject(error);
});

export default api;