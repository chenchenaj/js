import Vue from 'vue'
import Vuex from 'vuex'
import msite from './modules/msite'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  // 严格模式，确保修改的数据都在store中修改
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    msite: msite,
    user: user
  }
})
