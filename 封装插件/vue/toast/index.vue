// 注册
在main.js中添加
import Toast from "components/common/toast/index.js";
Vue.use(Toast)

// 使用
this.$toast.show('请选择商品')

<template>
  <div class="toasts">
    <transition name="toast">
      <div class="toast_div" v-show="isShowTip">{{ message }}</div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShowTip: false,
      message: ""
    };
  },
  methods: {
    show (msg, delay = 1000) {
      this.isShowTip = true;
      this.message = msg;
      setTimeout(() => {
        this.isShowTip = false;
      }, delay);
    }
  }
};
</script>
<style scoped lang="less">
.toasts {
  .toast_div {
    font-size: 0.8rem;
    text-align: center;
    line-height: 2rem;
    height: 2rem;
    width: 10rem;
    background-color: rgba(29, 24, 24, 0.9);
    border-radius: 0.4rem;
    border: 0.04rem solid rgba(0, 0, 0, 0.4);
    color: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .toast-enter,
  .toast-leave-to {
    opacity: 0;
  }
  .toast-enter-active {
    transition: opacity 1s;
  }
  .toast-leave-active {
    transition: opacity 1s;
  }
}
</style>