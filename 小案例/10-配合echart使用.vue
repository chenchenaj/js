<template>
  <div>
    <!-- 折线图 -->
    <Echart style="height: 280px;" :chartData="echartData.order" />

    <!-- 柱状图 -->
    <Echart style="height: 260px;" :chartData="echartData.user" />

    <!-- 饼图 -->
    <Echart style="height: 260px;" :isAxisChart="false" :chartData="echartData.video" />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          xData: [],
          series: [],
        },
      },
    }
  },

  /**
   * 请求得到的数据
   * // 饼图
        videoData: [
          {
            name: 'springboot',
            value: 5421.8
          },
          {
            name: 'vue',
            value: 4235.2
          },
          {
            name: '小程序',
            value: 1424.5
          },
          {
            name: 'ES6',
            value: 7855.6
          },
          {
            name: 'Redis',
            value: 7254.9
          },
          {
            name: 'React',
            value: 2485.4
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 45,
            active: 72
          },
          {
            date: '周二',
            new: 15,
            active: 250
          },
          {
            date: '周三',
            new: 77,
            active: 421
          },
          {
            date: '周四',
            new: 12,
            active: 125
          },
          {
            date: '周五',
            new: 34,
            active: 215
          },
          {
            date: '周六',
            new: 57,
            active:125
          },
          {
            date: '周日',
            new: 36,
            active: 451
          }
        ],
        // 折线图
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          data: [
            vue: 423,
            wechat: 864.57,
            ES6: 5612.5,
            Redis: 5123.48,
            React: 321.6,
            springboot: 241.53
          ]
        },
  */
  methods: {
    async getTableData() {
      const res = await reqTableData()
      if (res.code === 20000) {
        this.tableData = res.data.tableData
        console.log(res.data)
        // 折线图数据
        this.echartData.order.xData = res.data.orderData.date
        const lineArr = Object.keys(res.data.orderData.data[0])

        lineArr.forEach((key) => {
          const dataObj = {
            name: key === 'wechat' ? '小程序' : key,
            type: 'line',
            data: res.data.orderData.data.map((item) => item[key]),
          }

          this.echartData.order.series.push(dataObj)
        })

        // 柱状图数据
        let newArr = []
        let activeArr = []
        res.data.userData.map((item) => {
          this.echartData.user.xData.push(item.date)
          newArr.push(item.new)
          activeArr.push(item.active)
        })
        this.echartData.user.series.push(
          {
            name: '新增用户',
            type: 'bar',
            data: newArr,
          },
          {
            name: '活跃用户',
            type: 'bar',
            data: activeArr,
          }
        )

        // 饼图数据
        this.echartData.video.series.push({
          data: res.data.videoData,
          type: 'pie',
        })
      }
    },
  },
}
</script>
<style lang="less" scoped></style>
