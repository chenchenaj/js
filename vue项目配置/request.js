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
  resetUser ({ commit }) {
    commit(RESET_USER)
    commit(RESET_TOKEN)
    // 清除内存中的token
    window.localStorage.removeItem('token_key')
  }
}
const mutations = {

  [RESET_USER] (state) {
    state.user = {}
  },

  [RESET_TOKEN] (state) {
    state.token = ''
  },
}



使用捕获的方法
const actions = {
  async getComment () {
    try {
      const result = await reqGetComment(this.$route.params.aid)
      this.comments = result.comments
    } catch (error) {
      console.log(error)
    }
  },
}

// ===================================================================================================
import axios from 'axios';
import qs from 'qs';
import {
  getCookie
} from '@/utils/cookie'
import {
  Toast
} from 'vant';

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 2000,
    forbidClick: true
  });
}

//创建axios实例
var instance = axios.create({
  timeout: 1000 * 12
});
instance.defaults.baseURL = '/api'
instance.defaults.withCredentials = true
instance.defaults.crossDomain = true
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


instance.interceptors.request.use(
  config => {
    const token = getCookie('MUSIC_U'); //获取Cookie
    token && (config.headers.Authorization = token);
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);


// 拦截响应数据：
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (err) {
  if (err && err.response) {
    // 如果有返回的错误信息，则直接提示错误信息
    if (err.response.data.message) {
      tip(err.response.data.message)
    };
    if (err.response.data.msg) {
      tip(err.response.data.msg)
    };
    // 否则根据状态码来判断：
    switch (err.response.status) {

      case 400:
        err.message = '昵称不符合规范';
        break;
      case 401:
        err.message = '未授权，请重新登录(401)';
        break;
      case 403:
        err.message = '拒绝访问(403)';
        break;
      case 404:
        err.message = '请求出错(404)';
        break;
      case 408:
        err.message = '操作过于频繁';
        break;
      case 500:
        err.message = '服务器错误(500)';
        break;
      case 501:
        err.message = '服务未实现(501)';
        break;
      case 502:
        err.message = '网络错误(502)';
        break;
      case 503:
        err.message = '验证码错误';
        break;
      case 504:
        err.message = '网络超时(504)';
        break;
      case 505:
        err.message = '该昵称已被占用';
        break;
      default:
        err.message = `连接出错(${err.response.status})!`;
    }
  } else {
    err.message = '连接服务器失败!'
  }
  return Promise.reject(err);
});

export function get (url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}
export function post (url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, qs.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}


// ===============================================================================================
import axios from 'axios'
import Vue from 'vue'
import { Loading } from 'element-ui'
import store from '@/store'
import qs from 'qs'

axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config;
})
axios.interceptors.response.use(response => {
  return response.data
}, (err) => {
  Vue.prototype.$message.error("快滚！快滚！快滚！内部错误，你无法解决！")
  return new Promise(() => { })
})

// mixinLoading(axios.interceptors)

let loading
let loadingCount = 0
function mixinLoading (interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(
    loadingResponseInterceptor,
    loadingResponseErrorInterceptor
  )

  function loadingRequestInterceptor (config) {
    if (!loading) {
      loading = Loading.service({
        target: 'body',
        background: 'transparent',
        text: '载入中',
      })
      store.commit('global/setAxiosLoading', true)
    }
    loadingCount++

    return config
  }

  function handleResponseLoading () {
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
      store.commit('global/setAxiosLoading', false)
    }
  }

  function loadingResponseInterceptor (response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor (e) {
    handleResponseLoading()
    throw e
  }
}
