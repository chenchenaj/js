<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.navbar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);

  /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99; */

  .left,
  .right {
    width: 60px;
  }
  .center {
    flex: 1;
    text-align: center;
  }
}
</style>