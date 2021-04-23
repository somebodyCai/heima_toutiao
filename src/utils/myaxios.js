import axios from 'axios'

axios.defaults.baseURL = 'http://157.122.54.189:9083'

// 设置请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('haimatoken')
    if (token) {
        // 添加请求头设置 设置身份认证 token 
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log(response.data.message);
    if (response.data.message == '用户信息验证失败!') {
        location.href = '#/login'
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default axios