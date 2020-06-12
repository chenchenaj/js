import axios from 'axios'
import store from '../store'
import router from '../router'

// 默认请求的基础地址
const request = axios.create({
  baseURL: '...',
  timeout: 5000
})

request.interceptors.request.use(function (config) {
  // 看请求体格式，如果是urlencode则需要写
  const { method, data } = config
  if (method.toLowerCase() === 'post' && data instanceof Object) {
    config.data = qs.stringify(data)
  }

  // 判断是否需携带token
  const token = JSON.parse(localStorage.getItem('token'))
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error);
})


// 响应拦截器
request.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  // 权限过期
  if (error.response.status == 401 || error.response.status == 402) {
    // 调用退出登录的方法
    store.dispatch('resetUser')
    if (router.currentRoute.path !== '/login') {
      alert(error.response.data.message)
      router.push('/login')
    }
  } else {
    alert(error.response.data.message)
  }
  return new Promise(() => { })
})

export default request


// =====================store.js======================
const actions = {
  resetUser({ commit }) {
    commit(RESET_USER)
    commit(RESET_TOKEN)
    // 清除内存中的token
    window.localStorage.removeItem('token_key')
  }
}
const mutations ={
  
  [RESET_USER](state){
    state.user = {}
  },

  [RESET_TOKEN](state){
    state.token = ''
  },
}