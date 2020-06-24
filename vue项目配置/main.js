import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 如果是生产环境就不引入mock，如果是测试环境就引入mock
if (process.env.NODE_ENV !== 'production'){
  require('./mockjs')
}


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
