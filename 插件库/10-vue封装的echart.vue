// 注: 内含有点击echart伸缩功能，如果新的插件不需要请去除 isCollapse 这部分内容 // 包含坐标轴颜色，坐标轴文字颜色，图例，提示工具，位置偏移，echart根据大小会整体发生变化，渲染什么结构的图【折线，柱状，饼图】
<template>
  <div ref="mychart" style="height: 100%;"></div>
</template>

<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      echart: null, // 在data中定义一个属性，名字可以任意改
      axisOption: {
        // 图例
        legend: {
          textStyle: {
            color: '#333',
          },
        },
        // 提示
        tooltip: {
          trigger: 'axis', // 坐标轴触发
        },
        // 相对于原位置偏移
        grid: {
          left: '20%',
        },
        // 有坐标轴
        xAxis: {
          type: 'category', // x轴类名
          data: [], // 横轴数据
          axisLine: {
            lineStyle: {
              // x轴颜色
              color: '#2ec7c9',
            },
          },
          axisLabel: {
            color: '#333', // x轴文字颜色
          },
        },
        yAxis: {
          type: 'value', // value： 代表y轴数据是通过值渲染的，会随着series的data的值增大或减小
          axisLine: {
            lineStyle: {
              color: '#b6a2de',
            },
          },
        },
        color: [
          // 更改坐标轴颜色
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089',
        ],
        series: [],
      },
      normalOption: {
        // 没有坐标轴
        series: [],
        tooltip: {
          trigger: 'item', // 悬浮到某一块的时候触发
        },
        color: [
          // 更改坐标轴颜色
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089',
        ],
        legend: {
          textStyle: {
            color: '#333',
          },
        },
      },
    }
  },
  methods: {
    // 初始化图表
    initChart() {
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.mychart)
        this.echart.setOption(this.options)
      }
    },

    // 初始化数据
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    },

    // 重新设置表格大小
    resizeChart() {
      this.echart ? this.echart.resize() : ''
    },
  },
  mounted() {
    this.initChart()

    // 监听表格有没有发生改变
    window.addEventListener('resize', this.resizeChart)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart)
  },
  watch: {
    chartData: {
      // 数组和对象需要深度监听
      handler: function () {
        this.initChart()
      },
      deep: true,
    },

    // 点击收缩面板延时缩放
    isCollapse() {
      setTimeout(() => {
        this.resizeChart()
      }, 300)
    },
  },
  computed: {
    options() {
      // 通过传入的内容来判断需要使用有坐标轴配置还是没有坐标轴的配置
      return this.isAxisChart ? this.axisOption : this.normalOption
    },

    ...mapState({
      isCollapse: (state) => state.tabs.isCollapse,
    }),
  },
  props: {
    isAxisChart: {
      // 是否需要开启坐标轴，默认开启
      type: Boolean,
      default: true,
    },
    chartData: {
      // 渲染的数据
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        }
      },
    },
  },
}
</script>
<style lang="less" scoped></style>
