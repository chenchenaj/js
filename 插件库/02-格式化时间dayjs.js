import dayjs from 'dayjs'

export default {
  install (Vue) {
    Vue.filter('formatRelativeTime', (value, format = 'MMMM D, YYYY') => { // 将标准时间转化为 June 12, 2020
      return dayjs(value).format(format)
    })
    
    Vue.filter('dataFormat', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
      return dayjs(value).format(format)
    })
  }
}