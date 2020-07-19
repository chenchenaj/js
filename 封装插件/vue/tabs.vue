<template>
  <div class="tab_control">
    <div
      class="tab_control_item"
      v-for="(item, index) in title"
      :key="item"
      @click="tabClick(index)"
    >
      <span :class="currentIndex === index ? 'active' : ''">{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    };
  },
  computed: {
    activeStyle () {
      return this.currentIndex === index
        ? { borderBottom: "2px solid skyblue" }
        : {};
    }
  },
  methods: {
    tabClick (index) {
      this.currentIndex = index;
      // 将当前点击事件传给父组件，父组件根据index来修改currentType的值从而筛选不同的商品列表
      this.$emit("tabClick", index)
    }
  }
};
</script>
<style lang="less" scoped>
.tab_control {
  display: flex;
  text-align: center;
  line-height: 30px;
  height: 33px;
  background-color: #fff;

  .tab_control_item {
    flex: 1;

    span.active {
      color: skyblue;
      padding-bottom: 5px;
      border-bottom: 2px solid skyblue;
    }
  }
}
</style>
