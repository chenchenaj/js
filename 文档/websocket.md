![image-20220215112054201](https://gitee.com/yx102/pic/raw/master/img/202202151120270.png)

# websocket的基本使用

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



## 前端

### 创建对象

```js
let ws = null
    connect.onclick = function(){
      const ws = new WebSocket('ws://localhost:9998')
      ws.onopen = () => {
        console.log('连接服务端成功了...')
        send.disabled = false
      }
      ws.onclose = () => {
        console.log('连接服务器失败')
        send.disabled = true
      }
      ws.onmessage = msg => {
        console.log('接收到从服务端发送过来的数据了')
        console.log(msg)
        recv.innerHTML = msg.data
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



### 监听事件

### 发送数据