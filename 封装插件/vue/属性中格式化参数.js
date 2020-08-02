// 不能写为过滤器,只能写成函数的形式，然后挂载到原型上进行全局注册使用
// 将值格式化为万
export function formatNumber (number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}

// =====================================使用【3步】=======================================
// 1. 可能需要先进行全局注册，在utils文件夹下新建一个global.js文件夹，然后挂载到原型上
import * as utils from "./index"

export default {
  install (Vue) {
    Vue.prototype.$utils = utils
  }
}

// 2. 在main.js中引入注册
import global from './utils/global.js'
Vue.use(global)

// 3. 在需要格式化的文件中直接使用
$utils.formatNumber(item.playCount)
{/* <PlayListCard
  v-for="item in playlists"
  :key="item.id"
  :desc="'播放量：'+$utils.formatNumber(item.playCount)"
/> */}