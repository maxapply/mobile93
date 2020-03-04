// 导入axios
import axios from 'axios'

// 导入bigint
import JSONBig from 'json-bigint'

// 导入store
import store from '@/store/index.js'

// 导入路由，使得可以执行跳转
import router from '@/router/index.js'

// 创建一个axios对象，和原来的axios没有关系，进行配置
const instance = axios.create({
// 请求基地址
  baseURL: 'http://ttapi.research.itcast.cn/',
  // 超大型数字转换器
  transformResponse: [function (data) {
    try {
      // data 是实体字符串进行转换
      return JSONBig.parse(data)
    } catch (err) {
      // 报错，就说明data是空字符串，parse处理不来，会被catch捕捉处理
      return data
    }
  }]
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // 判断token 在做设置（vuex判断）
  if (store.state.user.token) {
    // token前面添加 Bearer
    config.headers.Authorization = 'Bearer' + store.state.user.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 正常响应
  // 返回data数据
  try {
    return response.data.data
  } catch (err) {
    return response.data
  }
}, function (error) {
  // 非正常响应
  if (error.response.status === 401) {
    // token 2小时失效， 跳到登录页面
    router.push('/login')
    return new Promise(function () {})
  }
  return Promise.reject(error)
})

export default instance
