// 需要先下载better-scroll
<template>
  <div class="ScrollWrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data () {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          mouseWheel: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad,
          pullDownRefresh: this.pullDownRefresh
        });

        if (this.probeType !== 0) {
          // 监测滚动位置
          this.scroll.on("scroll", position => {
            this.$emit("scrollPosition", position);
          });

          // 监测滚动条最末端的位置
          this.scroll.on("scrollEnd", position => {
            this.$emit("scrollEndPosition", position);
          });
        }

        if (this.pullUpLoad) {
          this.scroll.on("pullingUp", () => {
            // this.scroll.finishPullUp()

            this.$emit("pullingUp");
          });
        }
      }
    },

    // 到达指定的位置
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 刷新
    refresh () {
      this.scroll && this.scroll.refresh();
    },

    // 重复加载
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp();
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
    })
  }
};
</script>
<style lang="less" scoped>
</style>
