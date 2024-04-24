const doraemon = ` _       __     __                             ______           ____                                            
| |     / /__  / /________  ____ ___  ___     /_  __/___       / __ \\____  _________ ____  ____ ___  ____  ____ 
| | /| / / _ \\/ / ___/ __ \\/ __ \`__ \\/ _ \\     / / / __ \\     / / / / __ \\/ ___/ __ \`/ _ \\/ __ \`__ \\/ __ \\/ __ \\
| |/ |/ /  __/ / /__/ /_/ / / / / / /  __/    / / / /_/ /    / /_/ / /_/ / /  / /_/ /  __/ / / / / / /_/ / / / /
|__/|__/\\___/_/\\___/\\____/_/ /_/ /_/\\___/    /_/  \\____/    /_____/\\____/_/   \\__,_/\\___/_/ /_/ /_/\\____/_/ /_/                                                                                                                 
`

// api.js

import axios from 'axios';

const baseURL = 'http://localhost:8080/'; // 替换为你的 API 地址

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // 请求超时时间，单位毫秒
});


// 添加一个请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 在请求发送之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);


// 添加一个响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    // console.clear();
    // console.log(doraemon)
    return response;
  },
  error => {
    // 对响应错误做些什么
    // 如果存在响应并且是500错误或404错误，则重新发起请求
    return retryRequest(error.config).then(response => {
      // console.clear();
    console.log(doraemon)
      return response
    })
      .catch(error => {
        return Promise.reject(error);
      });
  }
);
async function retryRequest(config, retryCount = 0, maxRetries = 3, retryInterval = 2000) {
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    if (retryCount >= maxRetries) {
      // 达到最大重试次数，直接抛出错误
      throw new Error('Max retries exceeded');
    }

    console.log(`Retry attempt ${retryCount + 1}: ${error.message}`);

    // 等待一段时间后重试
    await new Promise(resolve => setTimeout(resolve, retryInterval));

    // 递归调用 retryRequest，并增加重试次数
    return retryRequest(config, retryCount + 1, maxRetries, retryInterval);
  }
}

export default axiosInstance;
