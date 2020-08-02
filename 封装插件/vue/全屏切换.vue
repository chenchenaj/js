// 参考地址：https://gitee.com/rzi2016/iloveSakuraForever/blob/master/src/components/layout/01.header.vue
// https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullScreen
<template>
  <div>
    <button @click="getFullScreen">全屏切换</button>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      btnStatus: 0 // 0:全屏 1：非全屏
    };
  },
  methods: {
    //  点击实现全屏和退出全屏
    getFullScreen () {
      this.btnStatus++
      this.btnStatus % 2 == 0 ? this.outFullCreeen(document) : this.inFullCreeen(document.documentElement)
    },

    inFullCreeen (element) {
      let el = element
      let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
      if (typeof rfs != 'undefined' && rfs) {
        rfs.call(el)
      } else if (typeof window.ActiveXObject != 'undefined') {
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },

    outFullCreeen (element) {
      let el = element
      let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
      if (typeof cfs != 'undefined' && cfs) {
        cfs.call(el)
      } else if (typeof window.ActiveXObject != 'undefined') {
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  },
}

</script>
<style lang='less' scoped>
</style>