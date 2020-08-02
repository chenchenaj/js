参考地址：https://gitee.com/rzi2016/iloveSakuraForever/blob/master/src/base/play-icon.vue
<template>
  <div class="music-icon" :style="wrapStyle">
    <i class="iconfont icon-play"></i>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    };
  },
  computed: {
    wrapStyle () {
      return { width: `${this.size}px`, height: `${this.size}px`, lineHeight: `${this.size}px` }
    },
  },
  props: {
    size: {
      type: Number,
      default: 24
    },
  }
}

</script>
<style lang='less' scoped>
.music-icon {
  opacity: 0;
  transition: all 0.5s;
  color: @theme-color;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  text-align: center;
  cursor: pointer;
}
</style>
