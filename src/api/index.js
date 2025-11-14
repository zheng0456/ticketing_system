import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://10.18.26.91:8000',
  timeout: 5000
});

export default api;