# nodejs

- Node.js 是什么
  + JavaScript 运行时
  + 既不是语言，也不是框架，它是一个平台
- Node.js 中的 JavaScript
  + 没有 BOM、DOM
  + EcmaScript 基本的 JavaScript 语言部分
  + 在 Node 中为 JavaScript 提供了一些服务器级别的 API
    * 文件操作的能力
    * http 服务的能力

- Node 中的 JavaScript

  + EcmaScript
    * 变量
    * 方法
    * 数据类型
    * 内置对象
    * Array
    * Object
    * Date
    * Math
  + 模块系统
    * 在 Node 中没有全局作用域的概念
    * 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件
    * require 加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
      - 模块完全是封闭的
      - 外部无法访问内部
      - 内部也无法访问外部
    * 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
    * 但是某些情况下，模块与模块是需要进行通信的
    * 在每个模块中，都提供了一个对象：`exports`
    * 该对象默认是一个空对象
    * 你要做的就是把需要被外部访问使用的成员手动的挂载到 `exports` 接口对象中
    * 然后谁来 `require` 这个模块，谁就可以得到模块内部的 `exports` 接口对象
    * 还有其它的一些规则，具体后面讲，以及如何在项目中去使用这种编程方式，会通过后面的案例来处理
  + 核心模块
    * 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如
      - fs 文件操作模块
      - http 网络服务构建模块
      - os 操作系统信息模块
      - path 路径处理模块
    * 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
      - `const fs = require('fs')`

- http

  + require
  + 端口号
    * ip 地址定位计算机
    * 端口号定位具体的应用程序
  + Content-Type
    * 服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确的告诉
    * 不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
    * 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
  + 通过网络发送文件
    * 发送的并不是文件，本质上来讲发送是文件的内容
    * 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理

  

## fs文件系统模块

```js
const fs = require('fs')
```

### 读文件

```js
const fs = require('fs')
/*
	读文件
	第一个参数:要读取的文件路径
	第二个参数:编码形式
	第三个参数:回调函数
	成功： err 为 null；data为数据
	失败： err 为 错误对象；data为null
*/
fs.readFile('./a.txt','utf8', function(err, data){
    if (err) {
        console.log('读取文件失败了')
      } else {
        console.log(data)
      }
})
```



### 写文件

① fs.writeFile() 方法只能用来创建文件，不能用来创建路径

② 重复调用 fs.writeFile() 写入同一个文件，新写入的内容会覆盖之前的旧内容

```js
const fs = require('fs')
/*
	写文件
	第一个参数：文件路径
	第二个参数：文件内容
 	第三个参数：回调函数
 	
 	成功： err 为 null
	失败： err 为 错误对象
*/
fs.writeFile('./a.txt', '大家好，给大家介绍一下，我是Node.js', function(err){
    if (err) {
        console.log('文件写入失败', err)
      } else {
        console.log('文件写入成功')
      }
})
```



### 动态获取路径

__dirname 动态获取：  可以用来获取当前文件模块所属目录的绝对路径

__filename动态获取：  可以用来获取当前文件的绝对路径

```js
fs.readFile(path.join(__dirname,'a.txt'),'utf8',function (err,res) {
    if(err){
        throw err
    }
    console.log(res);
})
```





## 路径模块path

```js
const path = require('path')
```



### 路径拼接

path.join()：用来将多个路径片段拼接成一个完成的路径字符串

```js
const pathStr = path.join('/a', '/b/c', '../../', './d', 'e')  // 注意：  ../ 会抵消前面的路径
console.log(pathStr)  // \a\b\d\e
```



### 获取路径中的文件名

path.basename()：用来从路径字符串中将文件名解析出来

```js
const path = require('path')

// 定义文件的存放路径
const fpath = '/a/b/c/index.html'

const fullName = path.basename(fpath)
console.log(fullName) // index.html

const nameWithoutExt = path.basename(fpath, '.html')
console.log(nameWithoutExt) // index
```



### 获取文件扩展名

path.extname()：用来从路径字符串中将文件后缀名解析出来

```js
const path = require('path')

// 这是文件的存放路径
const fpath = '/a/b/c/index.html'

const fext = path.extname(fpath)
console.log(fext) // .html
```



## 网络服务http

### 创建基本的web服务

#### ① 导入 http 模块

```js
// 1. 加载 http 核心模块
const http = require('http')
```

#### ② 创建 web 服务器实例

```js
// 2. 使用 http.createServer() 方法创建一个 Web 服务器
const server = http.createServer()
```

#### ③ 为服务器实例绑定 request 事件，监听客户端的请求

```js
// 3.服务器处理请求 当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数
server.on('request', function (req, res) {
    console.log('收到客户端的请求了,请求路径是:'+ req.url)

    // 根据路径返回不同的内容，end：结束的同时返回对应的数据
    if(req.url == '/'){
        res.end('index')
    }else{
        res.end('404')
    }
})
```

#### ④ 启动服务器

```js
// 4. 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})
```



### req请求对象

只要服务器接收到了客户端的请求，就会调用通过 server.on() 为服务器绑定的 request 事件处理函数。

如果想在事件处理函数中，访问与**客户端**相关的**数据或属性**`req.url;req.method`



### res 响应对象

在服务器的 request 事件处理函数中，如果想访问与**服务器相关的数据或属性**`res.url;res.method;res.end`



### 解决中文乱码

调用 res.end() 方法，向客户端发送中文内容的时候，会出现乱码问题，此时，需要手动设置内容的编码格式：

```js
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  // 定义一个字符串，包含中文的内容
  const str = `您请求的 URL 地址是 ${req.url}，请求的 method 类型为 ${req.method}`
  // 调用 res.setHeader() 方法，设置 Content-Type 响应头，解决中文乱码的问题
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // res.end() 将内容响应给客户端
  res.end(str)
})

server.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

```





## 模块化

### 加载模块

```js
// 加载内置模块
const fs = require('fs')
// 加载用户的自定义模块
const costom = require('./custom.js')
// 加载第三方模块
const moment = require('moment')
```



### 模块作用域

和函数作用域类似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块
作用域。

![image-20220117102935847](https://gitee.com/yx102/pic/raw/master/img/202201171029911.png)



### 向外共享模块作用域中的成员

在自定义模块中，可以使用 `module.exports` 对象，将模块内的成员共享出去，供外界使用。
**外界用 require() 方法导入自定义模块时，得到的就是 module.exports 所指向的对象。**

![image-20220117103149007](https://gitee.com/yx102/pic/raw/master/img/202201171031061.png)

### exports

由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了 exports 对象。默认情况下，exports 和 module.exports 指向同一个对象。**最终共享的结果，还是以 module.exports 指向的对象为准**

![image-20220117103313357](https://gitee.com/yx102/pic/raw/master/img/202201171033422.png)



## npm

### 切换 npm 的下包镜像源

```shell
npm config set registry http://registry.npm.taobao.org/
```



### 解决下包速度慢的问题nrm

```shell
# 通过npm包管理器， 将nrm安装为全局可用的工具
npm i nrm -g
# 查看所有可用的镜像源
nrm ls
# 将下包的镜像源切换为taobao镜像
nrm use taobao
```



### 发布包

 **注册 npm 账号**

① 访问 https://www.npmjs.com/ 网站，点击 sign up 按钮，进入注册用户界面

② 填写账号相关的信息：Full Name、Public Email、Username、Password

③ 点击 Create an Account 按钮，注册账号

④ 登录邮箱，点击验证链接，进行账号的验证

**登录 npm 账号**

npm 账号注册完成后，可以在终端中执行 npm login 命令，依次输入用户名、密码、邮箱后，即可登录成功。

注意：在运行 `npm login `命令之前，必须先把下包的服务器地址切换为 npm 的官方服务器。否则会导致发布包失败！

```shell
nrm use npm // 切换为npm的官方服务器
```



**把包发布到 npm 上**

将终端切换到包的根目录之后，运行 `npm publish` 命令，即可将包发布到 npm 上（注意：包名不能雷同）

**删除已发布的包**

运行 npm unpublish 包名 --force 命令，即可从 npm 删除已发布的包。

注意：

① npm unpublish 命令只能删除 72 小时以内发布的包

② npm unpublish 删除的包，在 24 小时内不允许重复发布

③ 发布包的时候要慎重，尽量不要往 npm 上发布没有意义的包



## Express

### 安装

```shell
npm i express@4.17.1
```



### 最基本的服务器

```js
// 1. 导入 express
const express = require('express')
// 2. 创建 web 服务器
const app = express()
// 3. 启动 web 服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```



### 监听请求

req.query 可以获取到客户端发送过来的 查询参数

req.params 是动态匹配到的 URL 参数

```js
// 1. 导入 express
const express = require('express')
// 2. 创建 web 服务器
const app = express()

// 4. 监听客户端的 GET 和 POST 请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 JSON 对象
  res.send({ name: 'zs', age: 20, gender: '男' })
})
app.post('/user', (req, res) => {
  // 调用 express 提供的 res.send() 方法，向客户端响应一个 文本字符串
  res.send('请求成功')
})
app.get('/', (req, res) => {
  // 通过 req.query 可以获取到客户端发送过来的 查询参数
  // 注意：默认情况下，req.query 是一个空对象
  console.log(req.query)
  res.send(req.query)
})
// 注意：这里的 :id 是一个动态的参数
app.get('/user/:ids/:username', (req, res) => {
  // req.params 是动态匹配到的 URL 参数，默认也是一个空对象
  console.log(req.params)
  res.send(req.params)
})

// 3. 启动 web 服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```



### 托管静态资源

如果希望在托管的静态资源访问路径之前，挂载路径前缀，则可以使用如下的方式：

```js
const express = require('express')
const app = express()

// 在这里，调用 express.static() 方法，快速的对外提供静态资源
app.use(express.static('./clock')) // 在浏览器中直接访问http://localhost/clock/index.html

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```

现在，你就可以访问 clock 目录中的所有文件了：

http://localhost:3000/images/bg.jpg

http://localhost:3000/css/style.css

http://localhost:3000/js/login.js



### 托管多个静态资源目录

如果要托管多个静态资源目录，请多次调用 express.static() 函数

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

访问静态资源文件时，express.static() 函数会根据目录的添加顺序查找所需的文件。



### 挂载路径前缀

如果希望**在托管的静态资源访问路径之前，挂载路径前缀**，则可以使用如下的方式

现在，你就可以通过带有 /public 前缀地址来访问 public 目录中的文件了：

```js
const express = require('express')
const app = express()

// 在这里，调用 express.static() 方法，快速的对外提供静态资源
app.use('/public', express.static('public'))

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})

```



http://localhost:3000/public/images/kitten.jpg

http://localhost:3000/public/css/style.css

http://localhost:3000/public/js/app.js



### nodemon

```shell
npm i -g nodemon
```

执行命令

```shell
nodemon 执行的文件名
```



### express路由

在 Express 中，**路由指的是客户端的请求与服务器处理函数之间的映射关系**。

Express 中的路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数，格式如下

```javascript
app.METHOD(PATH, HANDLER)
```

#### 路由的匹配过程

每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。

在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转

交给对应的 function 函数进行处理

![image-20220117114537916](https://gitee.com/yx102/pic/raw/master/img/202201171145989.png)

路由匹配的注意点：

① 按照定义的先后顺序进行匹配

② 请求类型和请求的URL同时匹配成功，才会调用对应的处理函数



####  路由的使用

```js
const express = require('express')
const app = express()

// 挂载路由
app.get('/', (req, res) => {
  res.send('hello world.')
})
app.post('/', (req, res) => {
  res.send('Post Request.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```



#### 模块化路由

将路由挂载到Router上而不是挂载到app上

**创建路由模块**router.js

```js
// 这是路由模块
// 1. 导入 express
const express = require('express')
// 2. 创建路由对象
const router = express.Router()

// 3. 挂载具体的路由
router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})
router.post('/user/add', (req, res) => {
  res.send('Add new user.')
})

// 4. 向外导出路由对象
module.exports = router
```

 **注册路由模块**app.js

```js
const express = require('express')
const app = express()

// 1. 导入路由模块
const router = require('./03.router')
// 2. 注册路由模块
app.use(router)

// 注意： app.use() 函数的作用，就是来注册全局中间件

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```



#### 为路由模块添加前缀

```js
// 1. 导入路由模块
const router = require('./03.router')
// 2. 注册路由模块
app.use('/api', router) // 请求的时候需要添加/api进行访问
```



### express中间件

#### 概念

Express 的中间件，本质上就是一个 **function 处理函数**，Express 中间件的格式如下：

![image-20220117142513886](https://gitee.com/yx102/pic/raw/master/img/202201171425992.png)

注意：中间件函数的形参列表中，必须包含 next 参数。而路由处理函数中只包含 req 和 res。



#### 简单的中间件

```js
const express = require('express')
const app = express()

 // 定义一个最简单的中间件函数
const mw = function (req, res, next) {
   console.log('这是最简单的中间件函数')
   // 把流转关系，转交给下一个中间件或路由
   next()
}

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```



#### 全局生效的中间件

**客户端发起的任何请求到达服务器之后，都会触发的中间件**，叫做全局生效的中间件。

通过调用 **app.use(中间件函数)**，即可定义一个全局生效的中间件:

```js
const express = require('express')
const app = express()

 // 定义一个最简单的中间件函数
const mw = function (req, res, next) {
   console.log('这是最简单的中间件函数')
   // 把流转关系，转交给下一个中间件或路由
   next()
}

// 这是定义全局中间件的简化形式
app.use((req, res, next) => {
  console.log('这是最简单的中间件函数')
  next()
})

app.get('/', (req, res) => {
  console.log('调用了 / 这个路由')
  res.send('Home page.')
})
app.get('/user', (req, res) => {
  console.log('调用了 /user 这个路由')
  res.send('User page.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```



#### 定义全局中间件的简化形式

直接在use中使用函数

```js
const express = require('express')
const app = express()

// 这是定义全局中间件的简化形式
app.use((req, res, next) => {
  console.log('这是最简单的中间件函数')
  next()
})

app.get('/', (req, res) => {
  console.log('调用了 / 这个路由')
  res.send('Home page.')
})
app.get('/user', (req, res) => {
  console.log('调用了 /user 这个路由')
  res.send('User page.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```



#### 作用

多个中间件之间，**共享同一份** **req** **和** **res**。基于这样的特性，我们可以在上游的中间件中，**统一**为 req 或 res 对象添加自定义的属性或方法，供下游的中间件或路由进行使用。

例如：给每个路由添加一个请求到达服务器的时间(如果不使用中间件，那么就只能在每个路由中添加一个请求时间的代码)

```js
const express = require('express')
const app = express()

// 这是定义全局中间件的简化形式
app.use((req, res, next) => {
  // 获取到请求到达服务器的时间
  const time = Date.now()
  // 为 req 对象，挂载自定义属性，从而把时间共享给后面的所有路由
  req.startTime = time
  next()
})

app.get('/', (req, res) => {
  res.send('Home page.' + req.startTime)
})
app.get('/user', (req, res) => {
  res.send('User page.' + req.startTime)
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```



#### 定义多个全局中间件

```js
const express = require('express')
const app = express()

// 定义第一个全局中间件
app.use((req, res, next) => {
  console.log('调用了第1个全局中间件')
  next()
})
// 定义第二个全局中间件
app.use((req, res, next) => {
  console.log('调用了第2个全局中间件')
  next()
})

// 定义一个路由
app.get('/user', (req, res) => {
  res.send('User page.')
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```



#### 局部生效的中间件

**不使用 app.use() 定义的中间件**叫做局部生效的中间件

例：当前的中间件只有在请求/的时候才会生效，在请求/user的时候不会生效

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了局部生效的中间件')
  next()
}

// 2. 创建路由
app.get('/', mw1, (req, res) => {
  res.send('Home page.')
})
app.get('/user', (req, res) => {
  res.send('User page.')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```



#### 定义多个局部中间件

方式一：直接在路由中逐个添加 =》 app.get('/', mw1, mw2, (req, res) => { res.send('Home page.')})

方式二：添加一个数组 =》app.get('/', [mw1, mw2], (req, res) => { res.send('Home page.')})

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了第一个局部生效的中间件')
  next()
}

const mw2 = (req, res, next) => {
  console.log('调用了第二个局部生效的中间件')
  next()
}

// 2. 创建路由
app.get('/', [mw1, mw2], (req, res) => { // 同时使用了两个中间件
  res.send('Home page.')
})
app.get('/user', (req, res) => {
  res.send('User page.')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```



#### 注意事项

① 一定要**在路由之前注册中间件**

② 客户端发送过来的请求，**可以连续调用多个**中间件进行处理

③ 执行完中间件的业务代码之后，**不要忘记调用 next() 函数**

④ 为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码

⑤ 连续调用多个中间件时，多个中间件之间，**共享** req 和 res 对象



### 中间件的分类

#### ① 应用级别的中间件

通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件

```js
// 应用级别中间件(全局中间件)
app.use((req, res, next) => {
  console.log('调用了第2个全局中间件')
  next()
})

// 应用级别中间件(局部中间件)
app.get('/user', (req, res) => {
  res.send('User page.')
})
```

#### ② 路由级别的中间件

**绑定到 express.Router() 实例上的中间件**，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不

过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上

```js
const express = require('express')
const router = express.Router()

// 路由级别的中间件
router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})
router.post('/user/add', (req, res) => {
  res.send('Add new user.')
})
```

#### ③ 错误级别的中间件

错误级别中间件的**作用**：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

> 注意：错误级别的中间件，必须注册在所有路由之后！

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 定义路由
app.get('/', (req, res) => {
  // 1.1 人为的制造错误
  throw new Error('服务器内部发生了错误！') // 抛出错误后不会执行错误下面的代码，直接进入错误的中间件中捕获错误
  res.send('Home page.')
})

// 2. 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```





#### ④ Express 内置的中间件

自 Express 4.16.0 版本开始，Express 内置了 3 个常用的中间件，极大的提高了 Express 项目的开发效率和体验：

① express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）

② **express.json** 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

③ **express.urlencoded** 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 注意：除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json())
// 通过 express.urlencoded() 这个中间件，来解析 表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
  // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求体数据
  // 默认情况下，如果不配置解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('ok')
})

app.post('/book', (req, res) => {
  // 在服务器端，可以通过 req,body 来获取 JSON 格式的表单数据和 url-encoded 格式的数据
  console.log(req.body)
  res.send('ok')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```



#### ⑤ 第三方的中间件

body-parser

使用步骤如下：

① 运行 `npm install body-parser` 安装中间件

② 使用 require 导入中间件

③ 调用 app.use() 注册并使用中间件

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 1. 导入解析表单数据的中间件 body-parser
const parser = require('body-parser')
// 2. 使用 app.use() 注册中间件
app.use(parser.urlencoded({ extended: false }))

app.post('/user', (req, res) => {
  // 如果没有配置任何解析表单数据的中间件，则 req.body 默认等于 undefined
  console.log(req.body)
  res.send('ok')
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```



###  自定义中间件

需求：手动模拟一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据

实现步骤：

① 定义中间件

② 监听 req 的 data 事件

③ 监听 req 的 end 事件

④ 使用 querystring 模块解析请求体数据

⑤ 将解析出来的数据对象挂载为 req.body

⑥ 将自定义中间件封装为模块

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring')

// 这是解析表单数据的中间件
app.use((req, res, next) => {
  // 定义中间件具体的业务逻辑
  // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
  let str = ''
  // 2. 监听 req 的 data 事件
  req.on('data', (chunk) => {
    str += chunk
  })
  // 3. 监听 req 的 end 事件
  req.on('end', () => {
    // 把字符串格式的请求体数据，解析成对象格式
    const body = qs.parse(str)
    req.body = body
    next()
  })
})

app.post('/user', (req, res) => {
  res.send(req.body)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1')
})
```



### 编写get请求

```js
const express = require('express')
const router = express.Router()

// 在这里挂载对应的路由
router.get('/get', (req, res) => {
  // 通过 req.query 获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  // 调用 res.send() 方法，向客户端响应处理的结果
  res.send({
    status: 0, // 0 表示处理成功，1 表示处理失败
    msg: 'GET 请求成功！', // 状态的描述
    data: query, // 需要响应给客户端的数据
  })
})

module.exports = router
```



### 编写post请求

在其他地方需要配置解析表单的中间件，否则req.body的值是undefined

```js
const express = require('express')
const router = express.Router()

// 定义 POST 接口
router.post('/post', (req, res) => {
  // 通过 req.body 获取请求体中包含的 url-encoded 格式的数据
  const body = req.body
  // 调用 res.send() 方法，向客户端响应结果
  res.send({
    status: 0,
    msg: 'POST 请求成功！',
    data: body,
  })
})

module.exports = router
```



### 跨域问题

使用cors 中间件解决跨域问题

cors 是 Express 的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题。

使用步骤分为如下 3 步：

① 运行 `npm i cors@2.8.5` 安装中间件

② 使用 const cors = require('cors') 导入中间件

③ 在路由之前调用 app.use(cors()) 配置中间件

> ① CORS 主要在服务器端进行配置。客户端浏览器**无须做任何额外的配置**，即可请求开启了 CORS 的接口。
>
> ② CORS 在浏览器中有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服
>
> 务端接口（例如：IE10+、Chrome4+、FireFox3.5+）

```js
// 导入 express
const express = require('express')
// 创建服务器实例
const app = express()

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前，配置 cors 这个中间件，从而解决接口跨域的问题
const cors = require('cors')
app.use(cors())

// 导入路由模块
const router = require('./16.apiRouter')
// 把路由模块，注册到 app 上
app.use('/api', router)

// 启动服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```





## nodejs中使用模板引擎

下载

```shell
npm i art-template
```

使用

```js
const template = require('art-template')
const http = require('http')
const fs = require('fs')

const server = http.createServer()

var wwwDir = 'D:/Movie/www'

server.on('request', function (req, res) {
  fs.readFile('./template-apache.html', function (err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
    // 1. 如何得到 wwwDir 目录列表中的文件名和目录名
    //    fs.readdir
    // 2. 如何将得到的文件名和目录名替换到 template.html 中
    //    2.1 在 template.html 中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
    //    2.2 根据 files 生成需要的 HTML 内容
    fs.readdir(wwwDir, function (err, files) {
      if (err) {
        return res.end('Can not find www dir.')
      }

      // 这里只需要使用模板引擎解析替换 data 中的模板字符串就可以了
      var htmlStr = template.render(data.toString(), {
        title: '哈哈',
        files: files
      })

      // 3. 发送解析替换过后的响应数据
      res.end(htmlStr)
    })
  })
})
server.listen(3000, function () {
  console.log('running...')
})

```

template-apach.html

```html
<tbody id="tbody">
  {{each files}}
    <tr>
      <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">{{$value}}/</a></td>
      <td class="detailsColumn" data-value="0"></td>
      <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
    </tr>
  {{/each}}
</tbody>
```



## 增查案例

### 静态资源

将服务端所有的静态资源都统一存放到public文件夹中，在请求的时候可以统一处理

app.js

重点

- 处理静态资源(/public)
- 首页列表通过模板引擎渲染
- 添加评论的表单

```js
const http = require('http')
const fs = require('fs')
const url = require('url')
const template = require('art-template')

var comments = [
  {
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

http
  .createServer(function (req, res) { 
    var parseObj = url.parse(req.url, true)  // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）

    // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
    var pathname = parseObj.pathname

    if (pathname === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        var htmlStr = template.render(data.toString(), {
          comments: comments
        })
        res.end(htmlStr)
      })
    } else if (pathname === '/post') 
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (pathname.indexOf('/public/') === 0) {
      // 统一处理：
      //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
      fs.readFile('.' + pathname, function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    } else if (pathname === '/pinglun') {
      var comment = parseObj.query
      comment.dateTime = '2017-11-2 17:11:22'
      comments.unshift(comment)
      // 如何通过服务器让客户端重定向？
      //    1. 状态码设置为 302 临时重定向
      //        statusCode
      //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
      //        setHeader
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    } else {
      // 其它的都处理成 404 找不到
      fs.readFile('./views/404.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () {
    console.log('running...')
  })
```

post.html

重点

- 请求静态资源
- 表单提交

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
</head>

<body>
  <div class="header container">
    <div class="page-header">
      <h1><a href="/">首页</a> <small>发表评论</small></h1>
    </div>
  </div>
  <div class="comments container">
    <!-- 
      以前表单是如何提交的？
      表单中需要提交的表单控件元素必须具有 name 属性
      表单提交分为：
        1. 默认的提交行为
        2. 表单异步提交

        action 就是表单提交的地址，说白了就是请求的 url 地址
        method 请求方法
            get
            post
     -->
    <form action="/pinglun" method="get">
      <div class="form-group">
        <label for="input_name">你的大名</label>
        <input type="text" class="form-control" required minlength="2" maxlength="10" id="input_name" name="name" placeholder="请写入你的姓名">
      </div>
      <div class="form-group">
        <label for="textarea_message">留言内容</label>
        <textarea class="form-control" name="message" id="textarea_message" cols="30" rows="10" required minlength="5" maxlength="20"></textarea>
      </div>
      <button type="submit" class="btn btn-default">发表</button>
    </form>
  </div>
</body>
</html>
```

index.html

重点

- 请求静态资源
- 渲染列表

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>留言本</title>
  <!-- 
    浏览器收到 HTML 响应内容之后，就要开始从上到下依次解析，
    当在解析的过程中，如果发现：
      link
      script
      img
      iframe
      video
      audio
    等带有 src 或者 href（link） 属性标签（具有外链的资源）的时候，浏览器会自动对这些资源发起新的请求。
   -->
  <link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
</head>

<body>
  <div class="header container">
    <div class="page-header">
      <h1>Example page header <small>Subtext for header</small></h1>
      <a class="btn btn-success" href="/post">发表留言</a>
    </div>
  </div>
  <div class="comments container">
    <ul class="list-group">
      {{each comments}}
      <li class="list-group-item">{{ $value.name }}说：{{ $value.message }} <span class="pull-right">{{ $value.dateTime }}</span></li>
      {{/each}}
    </ul>
  </div>
</body>
</html>
```

























## 实现简单的爬虫

需要初始化项目`npm init -y`

然后npm install `request`和`cheerio`包

```js
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

function getMovies(url) {
    var movieArr = []

    return new Promise((resolve, reject) => {
        request(url, function (err, response, body) {
            //获取HTML document对象  即body参数
            const $ = cheerio.load(body)

            var item = $('.movie-list dd') // 找到的是Node节点的数组
            item.map(function (i, val) {
                var movieObj = {}

                //电影链接
                movieObj.movieLink = $(val).find('.movie-item').children('a').attr('href')
                //电影图片
                movieObj.moviePoster = $(val).find('.movie-poster').children('img').last().attr('data-src')
                //电影 名字
                movieObj.movieTitle = $(val).find('.movie-item-title').children('a').text()
                //电影评分
                movieObj.movieDetail = $(val).find('.channel-detail-orange  i.integer').text()

                //把抓取到的内容 放到数组里面去
                movieArr.push(movieObj)
            })

            //说明 数据获取完毕
            if (movieArr.length >0){
                resolve(movieArr)
            }
        })
    })
}

//获取正在热映电影数据
getMovies('https://maoyan.com/films?showType=1')
    .then((data) => {
        console.log(data)
        // 将数据写入txt中
        fs.writeFile("1.txt", JSON.stringify(data), function(err) { // 将数据写入文件中
            if(err) {
                return console.log(err);
            }
            console.log("File saved successfully!");
        });
    })
```

可以听过F5配置launch.json这个文件对js文件实行debugger

```json
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "auto-testing",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\job.js",
        }
    ]
}
```



或则另外一种方法

```shell
npm init -y

npm i express requests
```

使用

```js
const requests = require('requests')
// 到node_modules下找requests这个包的readme.md文档查看对应的用法
```

