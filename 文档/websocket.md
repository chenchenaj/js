# websocket的基本使用

![image-20220301113736908](https://gitee.com/yx102/pic/raw/master/img/202203011137003.png)

## 后端

### 安装包

```shell
npm i ws -S
```

### 创建对象

```js
// 创建WebSocket服务端的对象, 绑定的端口号是9998
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 9998
})
```

### 监听事件

#### 连接事件

```js
// 对客户端的连接事件进行监听
// client:代表的是客户端的连接socket对象
wss.on('connection', client => {
  console.log('有客户端连接成功了...')
}
```

#### 接收数据事件

```js
wss.on('connection', client => {
  console.log('有客户端连接成功了...')
  client.on('message',async msg => {
      console.log('客户端发送数据给服务端了: ' + msg)
  }
}
```

### 发送数据

```js
wss.on('connection', client => {
  console.log('有客户端连接成功了...')
  client.on('message',async msg => {
      console.log('客户端发送数据给服务端了: ' + msg)
    // 由服务端往客户端发送数据
    client.send('hello socket from backend')
  }
}
```



### 完整的写法

```js
// 创建WebSocket服务端的对象, 绑定的端口号是9998
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 9998
})

wss.on('connection', client => {
  console.log('有客户端连接成功了...')
  client.on('message',async msg => {
      console.log('客户端发送数据给服务端了: ' + msg)
    // 由服务端往客户端发送数据
    client.send('hello socket from backend')
  }
}
```



## 前端

### 创建对象

WebSocket是Window内容的模块，不需要额外引入包进行配置

```js
const ws = new WebSocket('ws://localhost:9998')
```



### 监听事件

连接成功事件：ws.open

接收数据事件：ws.onmessage

关闭连接事件：ws.onclose

```js
ws.onopen = () => {
  console.log('连接服务端成功了...')
}
ws.onclose = () => {
  console.log('连接服务器失败')
}
ws.onmessage = msg => {
  console.log('接收到从服务端发送过来的数据了')
  console.log(msg)
}
```



### 发送数据

发送的数据需要与后端约定格式内容

```js
ws.send(JSON.stringify({
  action: 'getData',
  socketType: 'rankData',
  chartName: 'rank',
  value: ''
}))
```



### 完整的写法

```js
let ws = null
connect.onclick = function(){
  const ws = new WebSocket('ws://localhost:9998')
  ws.onopen = () => {
    console.log('连接服务端成功了...')
  }
  ws.onclose = () => {
    console.log('连接服务器失败')
  }
  ws.onmessage = msg => {
    console.log('接收到从服务端发送过来的数据了')
    console.log(msg)
  }
}
send.onclick = function(){
  ws.send(JSON.stringify({
    action: 'getData',
    socketType: 'rankData',
    chartName: 'rank',
    value: ''
  }))
}
```



## [Web项目案例](https://gitee.com/yx102/echarts)

使用websocket实时联动echarts的数据

### 后端工程

- 创建web_socket_service.js

在后端项目node中创建文件，然后将监听事件的代码放到一个函数中，并将这个函数导出

websocket开启连接然后对事件进行监听；向客户端发送数据

```js
// 读取文件的工具方法
const fs = require('fs')
const path = require('path')
const WebSocket = require('ws')
// 创建WebSocket服务端的对象, 绑定的端口号是9998
const wss = new WebSocket.Server({
  port: 9998
})

const fileUtils = (filePath) => {
  // 根据文件的路径, 读取文件的内容
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if(error) {
        // 读取文件失败
        reject(error)
      } else {
        // 读取文件成功
        resolve(data)
      }
    })
  })
}
// 服务端开启了监听
module.exports.listen = () => {
  // 对客户端的连接事件进行监听
  // client:代表的是客户端的连接socket对象
  wss.on('connection', client => {
    console.log('有客户端连接成功了...')
    // 对客户端的连接对象进行message事件的监听
    // msg: 由客户端发给服务端的数据
    client.on('message',async msg => {
      console.log('客户端发送数据给服务端了: ' + msg)
      let payload = JSON.parse(msg)
      const action = payload.action
      if (action === 'getData') {
        let filePath = '../data/' + payload.chartName + '.json'
        // payload.chartName // trend seller map rank hot stock
        filePath = path.join(__dirname, filePath)
        const ret = await fileUtils.getFileJsonData(filePath)
        // 需要在服务端获取到数据的基础之上, 增加一个data的字段
        // data所对应的值,就是某个json文件的内容
        payload.data = ret
        client.send(JSON.stringify(payload))
      } else {
        // 原封不动的将所接收到的数据转发给每一个处于连接状态的客户端
        // wss.clients // 所有客户端的连接
        wss.clients.forEach(client => {
          client.send(msg)
        })
      }
      // 由服务端往客户端发送数据
      // client.send('hello socket from backend')
    })
  })
}
```

在app.js文件中引入使用

```js
const webSocketService = require('./service/web_socket_service')
// 开启服务端的监听, 监听客户端的连接
// 当某一个客户端连接成功之后, 就会对这个客户端进行message事件的监听
webSocketService.listen()
```



### 前端工程

#### 创建socket_service.js文件

##### 定义类SocketService，并设置为单例模式

```js
export default class SocketService {
  /**
   * 单例
   */
  static instance = null
  static get Instance() {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }
}
```



##### 定义连接服务器的方法connect

- 创建WebSocket对象，对服务器进行连接

```js
// 和服务端连接的socket对象
ws = null

//  定义连接服务器的方法（创建后需要在main.js文件中调用才会创建对应的实例）
connect() {
  // 连接服务器
  if (!window.WebSocket) {
    return console.log('您的浏览器不支持WebSocket')
  }
  this.ws = new WebSocket('ws://localhost:9998')
}
```



- 在main.js中调用这个方法

```js
import SocketService from '@/utils/socket_service'
// 对服务端进行websocket的连接
SocketService.Instance.connect() // Instance方法是通过get得到的，不需要写括号就能调用
```



##### 监听事件

- onopen
- onmessage
- onclose

```js
//  定义连接服务器的方法
  connect() {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持WebSocket')
    }
    this.ws = new WebSocket('ws://localhost:9998')

    // 连接成功的事件
    this.ws.onopen = () => {
      console.log('连接服务端成功了')
    }
    // 1.连接服务端失败
    // 2.当连接成功之后, 服务器关闭的情况
    this.ws.onclose = () => {
      console.log('连接服务端失败')
    }
    // 得到服务端发送过来的数据
    this.ws.onmessage = msg => {
      console.log('从服务端获取到了数据', msg.data)
    }
  }
```



##### 存储回调函数

- 注册回调函数
- 销毁回调函数

##### 接收数据的处理

onmessage：调用之前存储的回调函数，传递数据



##### 定义发送数据的方法

```js
send(data){
  this.ws.send(JSON.stringfy(data))
}
```



##### 挂载SocketServece对象到Vue的原型对象上



#### 组件改造

- created：注册回调函数
- destroyed：取消回调函数
- mounted或created：在原来回去数据的地方改为发送数据(有坑，服务端创建websocket需要时间，但此时客户端已经在mounted函数中执行send方法，这个方法需要在服务端创建websocket后才能执行，因此要执行send方法的时候需要加定时器来处理)

```vue
<script>
export default {
  data () {
    return {
      chartInstance: null,
    }
  },
  created () {
    // 在组件创建完成之后 进行回调函数的注册
    this.$socket.registerCallBack('hotData', this.getData)
  },
  mounted () {
    this.$socket.send({
      action: 'getData',
      socketType: 'hotData',
      chartName: 'hot',
      value: ''
    })
  },
  destroyed () {
    this.$socket.unRegisterCallBack('hotData')
  },
  methods: {
    getData (ret) {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      // const { data: ret } = await this.$http.get('hotproduct')
      this.allData = ret
      console.log(this.allData)
      this.updateChart()
    },
  },
  watch: {
    theme () {
      console.log('主题切换了')
      this.chartInstance.dispose() // 销毁当前的图表
      this.initChart() // 重新以最新的主题名称初始化图表对象
      this.screenAdapter() // 完成屏幕的适配
      this.updateChart() // 更新图表的展示
    }
  }
}
</script>
```

socket_service.js文件调整

增加connected做判断看到底是执行哪一个方法

```js
// 标识是否连接成功
connected = false
// 记录重试的次数
sendRetryCount = 0
// 重新连接尝试的次数
connectRetryCount = 0

//  定义连接服务器的方法
connect() {
  // 连接服务器
  if (!window.WebSocket) {
    return console.log('您的浏览器不支持WebSocket')
  }
  this.ws = new WebSocket('ws://localhost:9998')

  // 连接成功的事件
  this.ws.onopen = () => {
    console.log('连接服务端成功了')
    this.connected = true
    // 重置重新连接的次数
     this.connectRetryCount = 0
  }
  // 1.连接服务端失败
  // 2.当连接成功之后, 服务器关闭的情况
  this.ws.onclose = () => {
    console.log('连接服务端失败')
    this.connected = false
    this.connectRetryCount++
    setTimeout(() => {
      this.connect()
    }, 500 * this.connectRetryCount)
  }
}

// 发送数据的方法
send (data) {
  // 判断此时此刻有没有连接成功
  if (this.connected) {
    this.sendRetryCount = 0
    this.ws.send(JSON.stringify(data))
  } else {
    this.sendRetryCount++
    setTimeout(() => {
      this.send(data)
    }, this.sendRetryCount * 500)
  }
}
```



#### 全屏切换

点击组件中任何一个要全屏的按钮，添加当前的类

##### 全屏样式的添加

```css
// 全屏样式的定义
.fullscreen {
  position: fixed!important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}
```

点击全屏后，组件全屏展示，扩展的图标要改为缩放的图标



##### 点击事件联动效果

- 改变fullScreenStatus的数据
- 需要调用每一个图表组件的screenAdapter的方法

```js
changeSize (chartName) {
    // 1.改变fullScreenStatus的数据
    this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
    // 2.需要调用每一个图表组件的screenAdapter的方法
    this.$nextTick(() => {
      this.$refs[chartName].screenAdapter()
    })
}
```



##### 联动效果

- 发送全屏数据给服务器

服务器在接收到这个数据的时候会转发给每一个处于连续状态的客户端

- vue中注册对应的函数
  - created：注册回调
  - destoryed：取消回调
  - recvData：接收到的数据

```javascript
created () {
    // 注册接收到数据的回调函数
  this.$socket.registerCallBack('fullScreen', this.recvData)
  this.$socket.registerCallBack('themeChange', this.recvThemeChange)
},
destroyed () {
  this.$socket.unRegisterCallBack('fullScreen')
  this.$socket.unRegisterCallBack('themeChange')
},
methods:{
  // 接收到全屏数据之后的处理
  recvData (data) {
    // 取出是哪一个图表需要进行切换
    const chartName = data.chartName
    // 取出, 切换成什么状态
    const targetValue = data.value
    this.fullScreenStatus[chartName] = targetValue
    this.$nextTick(() => {
      this.$refs[chartName].screenAdapter()
    })
  },
}
```



#### 样式切换

##### 本地浏览区

###### 数据存储在vuex中

(只有本地浏览器会改变，其他浏览器不会改变)

```js
export default new Vuex.Store({
  state: {
    theme: 'chalk'
  },
  mutations: {
    changeTheme (state) {
      if (state.theme === 'chalk') {
        state.theme = 'vintage'
      } else {
        state.theme = 'chalk'
      }
    }
  },
})
```



###### 点解按钮修改vuex中的值

(只有本地项目会改变，要其他浏览器改变需要向服务端发送数据来改变)

```js
handleChangeTheme () {
  // 修改VueX中数据(本地变化)
  this.$store.commit('changeTheme')
},
```



###### 各个组件监听theme的变化

映射属性

- 得到当前图表的主题是什么，通过computed或store中的getter来计算

监听属性

- 监听值的变化

完成主题的切换

- 当前图表销毁
- 重新初始化图表对象
- 完成屏幕适配
- 更新图表显示

```js
watch: {
  theme () {
    console.log('主题切换了')
    this.chartInstance.dispose() // 销毁当前的图表
    this.initChart() // 重新以最新的主题名称初始化图表对象
    this.screenAdapter() // 完成屏幕的适配
    this.updateChart() // 更新图表的展示
  }
}
```



###### 调整初始化图标函数

初始化的时候要加入主题

```js
initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, this.theme)
}
```



###### 引入主题文件

需要下载主题文件并注册主题

```js
import echarts from 'echarts';
require('echarts/theme/macarons');

use instance:
let cpuChart = echarts.init(document.getElementById('pie_cpu'), 'macarons');
```





##### 所有浏览器

###### 点解按钮发送数据给服务器

```js
handleChangeTheme () {
  // 服务器的数据会改变，所有连接上服务器的浏览器样式都会改变
  this.$socket.send({
    action: 'themeChange',
    socketType: 'themeChange',
    chartName: '',
    value: ''
  })
}
```



###### 绑定事件

```js
created () {
  // 注册接收到数据的回调函数
  this.$socket.registerCallBack('themeChange', this.recvThemeChange)
},
destroyed () {
  this.$socket.unRegisterCallBack('themeChange')
},
methods:{
  recvThemeChange () {
    this.$store.commit('changeTheme')
  }
}
```



#### 主题切换

将不同主题要修改的颜色定义在一个文件中，通过computed来实现不同主题间的切换

`theme_utils.js`文件

```js
const theme = {
  chalk: {
    // 背景颜色
    backgroundColor: '#161522',
    // 标题的文字颜色
    titleColor: '#ffffff'

  },
  vintage: {
    // 背景颜色
    backgroundColor: '#eeeeee',
    // 标题的文字颜色
    titleColor: '#000000'
  }
}

export function getThemeValue (themeName) {
  return theme[themeName]
}
```

使用

在不同的文件中引入该方法

```js
import { getThemeValue } from '@/utils/theme_utils'
export default{
  computed:{
    comStyle () { // 将样式绑定到对应的标签上
      return {
        color: getThemeValue(this.theme).titleColor
      }
    },
    ...mapState(['theme'])
  }
}
```



### 完整代码

socket_service.js

```js
export default class SocketService {
  /**
   * 单例
   */
  static instance = null
  static get Instance() {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }

  // 和服务端连接的socket对象
  ws = null

  // 存储回调函数
  callBackMapping = {}

  // 标识是否连接成功
  connected = false

  // 记录重试的次数
  sendRetryCount = 0

  // 重新连接尝试的次数
  connectRetryCount = 0

  //  定义连接服务器的方法
  connect() {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持WebSocket')
    }
    this.ws = new WebSocket('ws://localhost:9998')

    // 连接成功的事件
    this.ws.onopen = () => {
      console.log('连接服务端成功了')
      this.connected = true
      // 重置重新连接的次数
      this.connectRetryCount = 0
    }
    // 1.连接服务端失败
    // 2.当连接成功之后, 服务器关闭的情况
    this.ws.onclose = () => {
      console.log('连接服务端失败')
      this.connected = false
      this.connectRetryCount++
      setTimeout(() => {
        this.connect()
      }, 500 * this.connectRetryCount)
    }
    // 得到服务端发送过来的数据
    this.ws.onmessage = msg => {
      console.log('从服务端获取到了数据')
      // 真正服务端发送过来的原始数据时在msg中的data字段
      // console.log(msg.data)
      const recvData = JSON.parse(msg.data)
      const socketType = recvData.socketType
      // 判断回调函数是否存在(处理业务逻辑)
      if (this.callBackMapping[socketType]) {
        const action = recvData.action
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data)
          this.callBackMapping[socketType].call(this, realData)
        } else if (action === 'fullScreen') {
          this.callBackMapping[socketType].call(this, recvData)
        } else if (action === 'themeChange') {
          this.callBackMapping[socketType].call(this, recvData)
        }
      }
    }
  }

  // 回调函数的注册
  registerCallBack (socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 取消某一个回调函数
  unRegisterCallBack (socketType) {
    this.callBackMapping[socketType] = null
  }

  // 发送数据的方法
  send (data) {
    // 判断此时此刻有没有连接成功
    if (this.connected) {
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendRetryCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
```

main.js

```js
import SocketService from '@/utils/socket_service'
// 对服务端进行websocket的连接
SocketService.Instance.connect()
// 其他的组件  this.$socket
Vue.prototype.$socket = SocketService.Instance
```

使用

```vue
<!-- 地区销售排行 -->
<template>
  <div class='com-container'>
    <div class='com-chart' ref='rank_ref'></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      startValue: 0, // 区域缩放的起点值
      endValue: 9, // 区域缩放的终点值
      timerId: null // 定时器的标识
    }
  },
  created () {
    // 在组件创建完成之后 进行回调函数的注册
    this.$socket.registerCallBack('rankData', this.getData)
  },
  mounted () {
    this.initChart()
    // this.getData()
    this.$socket.send({
      action: 'getData',
      socketType: 'rankData',
      chartName: 'rank',
      value: ''
    })
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timerId)
    this.$socket.unRegisterCallBack('rankData')
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref, this.theme)
      const initOption = {
        title: {
          text: '▎ 地区销售排行',
          left: 20,
          top: 20
        },
        grid: {
          top: '40%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        tooltip: {
          show: true
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar'
          }
        ]
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    getData (ret) {
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      // const { data: ret } = await this.$http.get('rank')
      this.allData = ret
      // 对allData里面的每一个元素进行排序, 从大到小进行
      this.allData.sort((a, b) => {
        return b.value - a.value
      })
      console.log(this.allData)
      this.updateChart()
      this.startInterval()
    },
    updateChart () {
      const colorArr = [
        ['#0BA82C', '#4FF778'],
        ['#2E72BF', '#23E5E5'],
        ['#5052EE', '#AB6EE5']
      ]
      // 处理图表需要的数据
      // 所有省份所形成的数组
      const provinceArr = this.allData.map(item => {
        return item.name
      })
      // 所有省份对应的销售金额
      const valueArr = this.allData.map(item => {
        return item.value
      })
      const dataOption = {
        xAxis: {
          data: provinceArr
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: arg => {
                let targetColorArr = null
                if (arg.value > 300) {
                  targetColorArr = colorArr[0]
                } else if (arg.value > 200) {
                  targetColorArr = colorArr[1]
                } else {
                  targetColorArr = colorArr[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0]
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1]
                  }
                ])
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.rank_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    startInterval () {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0
          this.endValue = 9
        }
        this.updateChart()
      }, 2000)
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  watch: {
    theme () {
      console.log('主题切换了')
      this.chartInstance.dispose() // 销毁当前的图表
      this.initChart() // 重新以最新的主题名称初始化图表对象
      this.screenAdapter() // 完成屏幕的适配
      this.updateChart() // 更新图表的展示
    }
  }
}
</script>
```



## [Uniapp项目案例](https://gitee.com/kiyama/mushan-im)

store.js--封装的socket

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        socketTask: null,
        websocketData: {}, // 存放从后端接收到的websocket数据
		user:"",
    },
    mutations: {
        setWebsocketData (state, data) {
			 let message = JSON.parse(data.data);
			 state.websocketData = message
        },
		setUser(state,user){
			 state.user = user
		},
	
    }, 
    actions: {
        websocketInit ({ state, dispatch }, url) {
            state.socketTast = uni.connectSocket({
                url, // url是websocket连接ip
                success: () => {
                    console.log('websocket连接成功！')
                },
                fail: e => {
                    console.log('连接失败' + e)
                }
            })
            state.socketTast.onOpen(() => dispatch('websocketOnOpen'))
            state.socketTast.onMessage(res => dispatch('websocketOnMessage', res))
            state.socketTast.onClose(e => dispatch('websocketOnClose'))
            state.socketTast.onError(e => dispatch('websocketOnError'))
        },
        websocketOnOpen ({ commit }) {
            console.log('WebSocket连接正常打开中...！')
        },
        // 收到数据
        websocketOnMessage ({ commit }, res) {
            if (res.data !== '连接成功') {
				if(res){
				    let data = JSON.parse(res.data);
				    //处理业务逻辑
                    commit('setWebsocketData',res)
				} 
            }
        },
        websocketOnClose ({ commit, dispatch }) {
            console.log('WebSocket连接关闭')
        },
        websocketOnError ({ commit, dispatch }) {
            console.log('WebSocket连接错误')
        },
        websocketClose ({ state }) {
            if (!state.socketTast) return
            state.socketTast.close({
                success (res) {
                    console.log('关闭成功', res)
                },
                fail (err) {
                    console.log('关闭失败', err)
                }
            })
        },
        // 发送数据
        websocketSend ({ state }, data) {
            uni.sendSocketMessage({
                data,
                success: res => {
                    console.log('发送成功', res)
                },
                fail: e => {
                    console.log('发送失败', e)
                }
            })
        }
    }

})

export default store
```

main.js引入store使用

index初始化socket

```vue
<script>
	export default {
		onLoad(option) {
			this.initWebsocket(option);
		},
		methods: {
			initWebsocket(option){
				this.$store.commit('setUser',option.id);
				this.$store.dispatch('websocketInit', 'ws://192.168.0.102:8080/mushan/'+e.id)
			},
		}
	}
</script>
```

打电话页面跳转

```vue
<script>
	export default {
		data() {
			return {
				source:'',
			}
		},
		onLoad(e){
			this.source = e.source
		},
		methods: {
			meetTo(){
				//推送消息接听
				let user = this.$store.state.user;
				let msg = {to:this.source,source:user,msg:null,type:3};
				this.$store.dispatch('websocketSend',JSON.stringify(msg))
				//跳转页面进行通话
				
				uni.navigateTo({
					url: '/pages/videoStart/videoStart?user='+user+"&to="+this.source
				});
				
			}
		}
	}
</script>
```

接电话

```vue
<template>
    <view>
		<video id="myVideo" :src="src"
		 @error="videoErrorCallback" 
		 autoplay="true"
		 object-fit="cover"
		 :style="{width:wid,height:hei}" :danmu-list="danmuList" enable-danmu danmu-btn controls></video>
        
		<live-pusher id='livePusher' ref="livePusher" class="livePusher" :url="url"
        mode="FHD" 
		:muted="false" :enable-camera="true" :auto-focus="true" :beauty="1" whiteness="2"
        aspect="9:16" @statechange="statechange" @netstatus="netstatus" @error = "error"></live-pusher>
    </view>
</template>

<script>
    export default {
        data() {
			return {
				src:"",
				url:"",
				wid:0,
				hei:0,
                context: null
			}
        },
		onLoad(e) {
			//url推自己的流
			//src 那对方的流
			let user = e.user;
			let to   = e.to;
			this.url = "rtmp://101.42.135.49:1935/live/"+user;
			this.src = "rtmp://101.42.135.49:1935/live/"+to;
			let getWindowInfo = uni.getWindowInfo();
			this.hei = getWindowInfo.screenHeight;
			this.wid = getWindowInfo.screenWidth;
		
		},
        onReady() {
            // 注意：需要在onReady中 或 onLoad 延时
            this.context = uni.createLivePusherContext("livePusher", this);
			this.start();
		},
        methods: {
            statechange(e) {
                console.log("statechange:" + JSON.stringify(e));
            },
            netstatus(e) {
                console.log("netstatus:" + JSON.stringify(e));
            },
            error(e) {
                console.log("error:" + JSON.stringify(e));
            },
            start: function() {
                this.context.start({
                    success: (a) => {
                        console.log("livePusher.start:" + JSON.stringify(a));
                    }
                });
            },
            close: function() {
                this.context.close({
                    success: (a) => {
                        console.log("livePusher.close:" + JSON.stringify(a));
                    }
                });
            },
            snapshot: function() {
                this.context.snapshot({
                    success: (e) => {
                        console.log(JSON.stringify(e));
                    }
                });
            },
            resume: function() {
                this.context.resume({
                    success: (a) => {
                        console.log("livePusher.resume:" + JSON.stringify(a));
                    }
                });
            },
            pause: function() {
                this.context.pause({
                    success: (a) => {
                        console.log("livePusher.pause:" + JSON.stringify(a));
                    }
                });
            },
            stop: function() {
                this.context.stop({
                    success: (a) => {
                        console.log(JSON.stringify(a));
                    }
                });
            },
            switchCamera: function() {
                this.context.switchCamera({
                    success: (a) => {
                        console.log("livePusher.switchCamera:" + JSON.stringify(a));
                    }
                });
            },
            startPreview: function() {
                this.context.startPreview({
                    success: (a) => {
                        console.log("livePusher.startPreview:" + JSON.stringify(a));
                    }
                });
            },
            stopPreview: function() {
                this.context.stopPreview({
                    success: (a) => {
                        console.log("livePusher.stopPreview:" + JSON.stringify(a));
                    }
                });
            }
        }
    }
</script>


<style>
	.vid{
		width: 1000rpx;
		height: 1000rpx;
	}
	.livePusher{
		position: fixed;
		top: 5px;
		right: 10px;
		width: 200rpx;
		height: 360rpx;
	}
</style>
```

