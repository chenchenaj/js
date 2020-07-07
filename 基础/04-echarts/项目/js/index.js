// 时间
(function () {
  var t = null;
  t = setTimeout(time, 1000);//開始运行
  function time () {
    clearTimeout(t);//清除定时器
    dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours();//获取时
    var m = dt.getMinutes();//获取分
    var s = dt.getSeconds();//获取秒
    document.querySelector(".showTime").innerHTML = '当前时间：' + y + "年" + mt + "月" + day + '日' + "-" + h + "时" + m + "分" + s + "秒";
    t = setTimeout(time, 1000); //设定定时器，循环运行     
  }
})();

// 柱状图1
(function () {
  // 初始化
  const barChart = echarts.init(document.querySelector('.bar1 .chart'));

  // 配置项
  let option = {
    color: ['#2f89cf'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {    // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '4%',
      top: '10px',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ["旅游", "教育培训", "游戏", "医疗", "电商", "社交", "金融"],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: "rgba(255, 255, 255, .6)",
          fontSize: 10
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        // 坐标轴样式
        axisLabel: {
          color: "rgba(255, 255, 255, .6)",
          fontSize: 12
        },
        // 是否显示坐标线
        axisLine: {
          show: true,
          // 坐标线条样式
          lineStyle: {
            color: "rgba(255,255,255,.5)",
            width: 2
          }
        },
        // 分割线
        splitLine: {
          // 分割线样式设置
          lineStyle: {
            color: "rgba(255,255,255,.5)"
          }
        }
      },
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '35%',
        data: [200, 300, 300, 900, 1500, 1200, 600],
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5
        }
      }
    ]
  };

  // 设置内容
  barChart.setOption(option)
  // 图表自适应
  window.addEventListener("resize", function () {
    barChart.resize();
  });
})();

(function () {
  // 初始化
  const barChart = echarts.init(document.querySelector('.bar2 .chart'));

  // 配置项
  let option = {
    grid: {
      top: "10%",
      left: "22%",
      bottom: "10%",
    },
    xAxis: {
      show: false
    },
    yAxis: {
      type: 'category',
      data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
      //不显示y轴线条
      axisLine: {
        show: false
      },
      // 不显示刻度
      axisTick: {
        show: false
      },
      axisLabel: {
        color: "#fff"
      },
    },
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: [18203, 23489, 29034, 104970, 131744, 630230]
      },
      {
        name: '2012年',
        type: 'bar',
        data: [19325, 23438, 31000, 121594, 134141, 681807]
      }
    ]
  };

  // 设置内容
  barChart.setOption(option)
  // 图表自适应
  window.addEventListener("resize", function () {
    barChart.resize();
  });
})();