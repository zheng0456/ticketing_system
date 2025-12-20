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

export default api;