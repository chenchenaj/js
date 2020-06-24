/* 封装插件使用方式:
  一：在 filter 文件夹下的 index.js文件中 
  二：在 main.js 中引入和注册使用
  */

filters/index.js
import dayjs from 'dayjs'
import marked from 'marked'

export default {
  install (Vue) {
    Vue.filter('formatDate', (value, format = 'MMMM D, YYYY') => { // 将标准时间转化为 June 12, 2020
      return dayjs(value).format(format)
    })

    Vue.filter('formatMd', (value) => {
      return marked(value)
    })
  }
}


main.js
import filters from './filters/'
Vue.use(filters)