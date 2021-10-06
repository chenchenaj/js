# Echart

## 基本使用

- 引入echart
- 准备一个呈现图表的盒子
- 初始化echarts实例对象
- 准备配置锁
- 将配置项设置给echarts实例对象



## 配置项

### X 轴

配置要在 X 轴显示的项:

```js
xAxis: {
	type: 'category', // 类目轴
    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
}
```

### Y 轴

配置要在 Y 轴显示的项。

```js
yAxis: {
	type: 'value', // 数值轴，可以不需要设置data，会直接到series下找对应的data
}
```

### 系列列表

每个系列通过 type 决定自己的图表类型:

```js
series: [{
    name: '销量',  // 系列名称
    type: 'bar',  // 系列图表类型
    data: [5, 20, 36, 10, 10, 20]  // 系列中的数据内容
}]
```

### 柱状图特有(series中的配置)

#### 图表标注markPoint

```js
markPoint: {
    data: [
        {name:"最大值"，type:"max"}
        {name:"最小值"，type:"min"}

    ],
    label: {
        formatter: '{c}℃'//单位
    }
},
```

#### 图表标线markLine

```js
markLine: {
    data: [
        {name:"平均值"，type:"average"}
    ],
},
```

#### 图形上的数值label

是否显示标签show

标签位置position

标签旋转rotate

```js
label: {
    show: true,
    rotate: 60,
    position: 'top'
}
```

#### 柱宽度barWidth

```js
barWidth: '30%'
```

#### 横向柱状图

将xAxis和yAxis的值调换，即xAxis中的type为value，不写data，yAxis中的值是category，需要写data



### 折线图特有(series配置)

#### 图表标注markPoint

```js
markPoint: {
    data: [
        {name:"最大值"，type:"max"}
        {name:"最小值"，type:"min"}

    ],
    label: {
        formatter: '{c}℃'//单位
    }
},
```

#### 图表标线markLine

```js
markLine: {
    data: [
        {name:"平均值"，type:"average"}
    ],
},
```

#### 区域标注markArea

```js
markArea: [
    data:[
        [
            {
                xAxis: '1月'
            },
            {
                xAxis: '2月'
            }
        ],
        [
            {
                xAxis: '7月'
            },
            {
                xAxis: '9月'
            }
        ]
    ],
]
```

#### 平滑smooth

```js
smooth: true
```

#### 设置线条样式

```js
lineStyle:{
    color: 'green',
    type: 'dashed'
}
```

#### 线条与X轴的区域填充

```js
areaStyle: {}
```

#### 紧挨边缘boundaryGap(配置在x或y轴中)

```js
xAxis: [{
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    boundaryGap: false
}],
```

#### 缩放scale：脱离0值比例(设置有x或y轴，只有type为value才有用)

```js
yAxis: [{
    type: "value",
    scale: true
  }],
```

#### 堆叠图

```js
series: [
    {
        name: '销量',  // 系列名称
        type: 'line',  // 系列图表类型
        data: [5, 20, 36, 10, 10, 20],  // 系列中的数据内容
        stack: 'all',
        areaStyle: {}
    },
    {
        name: '库存',  // 系列名称
        type: 'line',  // 系列图表类型
        data: [15, 5, 22, 7, 16, 14],  // 系列中的数据内容
        stack: 'all',
        areaStyle: {}
    },
]
```

### 散点图

series中需要的data是二维数组，xAxis和yAxis的类型都是type

```js
option:{
    xAxis:{
        type: 'value',
        scale: true
    },
    yAxis:{
        type: 'value',
        scale: true
    },
    series:[
        {
            type: 'scatter',
            data: [[10.0, 8.04],[8.0, 6.95]]
        }
    ]
}
```

#### 气泡图效果

散点大小不同：symbolSize

散点颜色不同：color

```js
series: [{
        name: '1990',
        data: data[0],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        emphasis: {
            label: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: 'rgb(251, 118, 123)'
            }, {
                offset: 1,
                color: 'rgb(204, 46, 72)'
            }])
        }
    }, {
        name: '2015',
        data: data[1],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        emphasis: {
            label: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: 'rgb(129, 227, 238)'
            }, {
                offset: 1,
                color: 'rgb(25, 183, 207)'
            }])
        }
    }]
```



#### 涟漪动画效果

开启涟漪动画type:effectScatter

作用时机showEffectOn: `'render'` 绘制完成后显示特效；`'emphasis'` 高亮（hover）的时候显示特效

涟漪特效rippleEffect:{}



## 直角坐标系配置

### 网格grid

### 坐标轴xAxis yAxis

### 区域缩放dataZoom

## 通用配置

### 标题title

```js
title:{
    text: '成绩',
    textStyle: 'yellow',// 标题边框
    top: 50,
    left: 200, // 标题位置
}
```

### 提示框tooltip

触发时机trigger：'item','axis','none'

提示框触发的条件triggerOn：'mousemove|click'

提示框浮层内容格式器formatter: 接受string和function

```js
tooltip:{
    formatter: '${b}的成绩是${c}',
    或
    formatter: function(arg){
        return arg[0].name + '的分数是:' + arg[0].data
    }
}
```

### 工具栏toolbox

```js
toolbox: {
    show: true,
    feature: {
      dataZoom: { // 区域缩放
          yAxisIndex: 'none' // 区域缩放的时候y轴不发生变化
      }, 
      dataView: { // 数据视图
          readOnly: true // 开启后无法修改数据
      }, 
      magicType: { // 动态图表类型的切换
        type: ["line", "bar"]
      },
      restore: {}, // 重置
      saveAsImage: {} // 导出图片
    }
  },
```

### 图例legend

用于筛选series中的name

```js
legend:{
    data: [{
        name: '语文',
        // 强制设置图形为圆。
        icon: 'circle',
        // 设置文本为红色
        textStyle: {
            color: 'red'
        }
    }]
    or
    data: ['语文', '数学'],series中的name必须有这两个值
}
```





## 零散API

### 平滑线条smooth

在series中添加`smooth: true`

```js
series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
```



### 封闭面积图

boundaryGap：默认为 `true`，这时候[刻度](https://echarts.apache.org/zh/option.html#xAxis.axisTick)只是作为分隔线，标签和数据点都会在两个[刻度](https://echarts.apache.org/zh/option.html#xAxis.axisTick)之间的带(band)中间。非类目轴，包括时间，数值，对数轴，`boundaryGap`是一个两个值的数组，分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 [min](https://echarts.apache.org/zh/option.html#xAxis.min) 和 [max](https://echarts.apache.org/zh/option.html#xAxis.max) 后无效。

areaStyle：开启面积图

```js
xAxis: {
	boundaryGap: false,
},
series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }
]
```



### 提示tooltip

- `'line'` 直线指示器
- `'shadow'` 阴影指示器
- `'none'` 无指示器
- `'cross'` 十字准星指示器。

```js
tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross', // 形成纵横交错的坐标轴
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
```



### emphasis

```js
{
  name: 'Email',
  type: 'line',
  stack: 'Total',
  areaStyle: {},
  emphasis: {
    focus: 'series'
  },
  data: [120, 132, 101, 134, 90, 230, 210]
},
```



### 颜色渐变LinearGradient

new echarts.graphic.LinearGradient

```js
areaStyle: {
    opacity: 0.8,
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // x1, y1, x2, y2代表从哪个方向
      {
        offset: 0,
        color: 'rgba(128, 255, 165)'
      },
      {
        offset: 1,
        color: 'rgba(1, 191, 236)'
      }
    ])
  },
```





### 是否显示线上面的点&折线宽度&点大小

是否显示 symbol, 如果 `false` 则只有在 tooltip hover 的时候显示

```js
{
      name: 'Line 2',
      type: 'line',
      stack: 'Total', // 使用堆叠形成面积
      smooth: true, // 线开启平滑模式
      lineStyle: { // 折线宽度
        width: 0
      },
      showSymbol: false, // 默认是否显示折线上的点
      symbolSize: 8, // 线上点的大小
      label: {  // 显示线上面文字且文字位置在顶部
        show: true,
        position: 'top'
      },
      emphasis: { // 高亮时隐藏其他图例，只显示当前hover的图例
        focus: 'series'
      },
}
```



### 坐标轴显示特定内容

```js
yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C' // 注：此处也可以使用函数
    }
  },
```



### 最大值最小值平均值

```js
series: [
    {
      name: 'Highest',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: { // 点的最大值最小值
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: { // 线的平均值
        silent: true, // 鼠标移上是否有响应（线变粗）
        data: [
            { type: 'average', name: 'Avg' },
            [ // 开启线右侧往左侧延伸的最大值
                {
                  symbol: 'none', // 虚线且没有箭头
                  x: '90%',
                  yAxis: 'max'
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: 'Max'
                  },
                  type: 'max',
                  name: '最高点'
                }
              ]
        ]
      }
    },
]
```



### 标轴指示器是否自动吸附到点上

```js
yAxis: {
    type: 'value',
    axisPointer: {
      snap: true // 鼠标移动到坐标轴指示器就是吸附到点上
    }
  },
```



### x轴y轴刻度间隔N

```js
yAxis: {
    splitNumber: 3
 },
```



### 显示刻度线刻度坐标

```js
xAxis: {
    name: 'x',
    minorTick: { // 显示刻度坐标
      show: true
    },
    minorSplitLine: { // 显示刻度线
      show: true
    }
  },
```



### 不同系列的柱间距离

```js
{
  name: 'Forest',
  type: 'bar',
  barGap: 0, //柱子与柱子之间的间隔
},
```



### [左右坐标轴]([Examples - Apache ECharts](https://echarts.apache.org/examples/zh/editor.html?c=mix-line-bar))

```js
 yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
```



### [数据动态增长]([Examples - Apache ECharts](https://echarts.apache.org/examples/zh/editor.html?c=bar-race))

```js
const data = [];
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200));
}
option = {
  xAxis: {
    max: 'dataMax'
  },
  yAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E'],
    inverse: true,
    animationDuration: 300, // y轴做动画的速度是多少ms
    animationDurationUpdate: 300, // y轴更新的速度多少ms
    max: 4 // 显示在画布上最大的数量
  },
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: data,
      label: {
        show: true,
        position: 'right',
        valueAnimation: true
      }
    }
  ],
  legend: {
    show: true
  },
  animationDuration: 0,
  animationDurationUpdate: 3000, // 动画更新时的速度
  animationEasing: 'linear', // 动画效果
  animationEasingUpdate: 'linear'
};
function run() {
  for (var i = 0; i < data.length; ++i) {
    if (Math.random() > 0.9) {
      data[i] += Math.round(Math.random() * 2000);
    } else {
      data[i] += Math.round(Math.random() * 200);
    }
  }
  myChart.setOption({
    series: [
      {
        type: 'bar',
        data
      }
    ]
  });
}
setTimeout(function () {
  run();
}, 0);
setInterval(function () {
  run();
}, 3000);
```



### 饼图文字线的左对齐和右对齐

```js
series:{
     label: {
        alignTo: 'edge', // 指示线的靠左侧和靠右侧对其，'labelLine': 靠指示线中心对其， 'none': 随意对其
        edgeDistance: 10, // 文字距离饼图的距离
        lineHeight: 15, // 文字间距的高度
     }
}
```



### 地图上使用散点图

 如果想在地图中显示散点的数据, 我们需要给散点的图表增加一个配置, coordinateSystem:geo

```js
const seriesArr = this.allData.map((item) => {
    return {
      name: item.name, // 配置legend必写项
      type: "effectScatter",
      data: item.children,
      coordinateSystem: "geo",
    }
  })
  const option = {
    series: seriesArr,
  }
  this.chartInstance.setOption(option)
```





## echarts4

版本号："echarts": "^4.9.0"

### 动态加载地图

```vue
<template>
  <div>
    <div id="main" style="width: 1000px; height: 500px;"></div>
  </div>
</template>

<script>
import { ROOT_PATH } from "@/contextPath";
import axios from "axios";
// 引入 ECharts 主模块
const echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
require("echarts/lib/chart/sankey"); // 桑基图
require("echarts/lib/chart/parallel"); // 平行坐标系
require("echarts/lib/chart/sunburst"); // 旭日图
require("echarts/lib/chart/funnel"); // 漏斗圖
require("echarts/lib/chart/gauge"); // 仪表盘
require("echarts/lib/chart/pictorialBar"); // 象形柱图
require("echarts/lib/chart/scatter"); // 散點
require("echarts/lib/chart/effectScatter"); // 漣漪散點
require("echarts/lib/chart/map");
require("echarts/extension/bmap/bmap"); // 要在index.html中結合引入<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=wRXgYrEFzBEnWYDSDP5X4EjPC7Urn04F">

// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/toolbox");
// 引入legend模块
require("echarts/lib/component/legend");
// 视觉映射组件
require("echarts/lib/component/visualMap");

export default {
  data() {
    return {
      mapType: ""
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById("main"));

    this.batchImport("全国", [{ name: "全国", value: "全国" }]);

    let option = {
      geo: {
        map: this.mapType,
        roam: true,
        selectedMode: "single",
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "rgba(0,0,0,0.4)"
            }
          }
        }
      }
    };

    myChart.setOption(option);

    myChart.on("geoselectchanged", arg => {
      console.log(arg)
      // 当前的数据是写死的，后续需要根据调整
      this.batchImport("jiangxi", [{ name: "jiangxi", value: "江西" }]);
      option = {
        geo: {
          map: this.mapType,
          roam: true,
          selectedMode: "single",
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "rgba(0,0,0,0.4)"
              }
            }
          }
        }
      };
      myChart.setOption(option);
    });
  },
  methods: {
    // 动态引入哪一个地图
    batchImport(name, pro) {
      pro.forEach(obj => {
        if (obj.name === name) {
          if (name === "全国") {
            require("echarts/map/js/china");
            this.mapType = "china";
            return false;
          }

          require("echarts/map/js/province/" + obj.name);
          this.mapType = obj.value;
          return false;
        }
      });
    }
  }
};
</script>
```





局部引入雷达图

```vue
<template>
  <div ref="charts" class="echarts" />
</template>

<script>
var echarts = require('echarts/lib/echarts') // 引入echarts主模块
require('echarts/lib/chart/radar') // 引入雷达图
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  mounted() {
    const EchartsInstants = echarts.init(this.$refs.charts)

    const options = {
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        // 每个区域的最高值
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [10, 1, 100, 5, 100, 0],
            name: '张三'
          },
          {
            value: [50, 50, 50, 50, 50, 10],
            name: '李四'
          }
        ]
      }]
    }

    EchartsInstants.setOption(options)
  }
}
</script>

<style lang="scss" scoped>
.echarts {
    width: 600px;
    height: 400px;
}
</style>
```

