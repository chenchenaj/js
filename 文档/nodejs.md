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

  


## 文件读写fs

```js
const fs = require('fs')


/*
	读文件
	第一个参数:要读取的文件路径
	第二个参数:回调函数
	成功： err 为 null；data为数据
	失败： err 为 错误对象；data为null
*/
fs.readFile('./a.txt', function(err, data){
    if (err) {
        console.log('读取文件失败了')
      } else {
        console.log(data)
      }
})

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



## 网络服务http

- 加载 http 核心模块
- 使用 `http.createServer()` 方法创建一个 Web 服务器
- 服务器处理请求，request 请求事件处理函数，需要接收两个参数
  - Request 请求对象
    - 请求对象可以用来获取客户端的一些请求信息，例如请求路径
  - Response 响应对象
    - 响应对象可以用来给客户端发送响应消息
    - response 对象有一个方法：write 可以用来给客户端发送响应数据
    - write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
    - 简写：res.end('要返回给客户端的内容')
    - [设置响应头](https://tool.oschina.net/commons)：res.setHeader('Content-Type', 'text/html;charset=UTF-8')，只有字符编码才需要传`charset=UTF-8`，图片等不需要传，传了反而会有问题
- 绑定端口号，启动服务器

```js
// 1. 加载 http 核心模块
const http = require('http')

// 2. 使用 http.createServer() 方法创建一个 Web 服务器
const server = http.createServer()

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

// 4. 绑定端口号，启动服务器
server.listen(3000, function () {
  console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
})
```



## 路径path

```js
const path = require('path')
```



## 加载与导入

require是加载并使用文件，不能使用其他文件的变量成员

文件有模块作用域，要使用其他文件的变量，需要通过exports暴露

a文件

```js
const bExports = require('./b')
console.log(bExports.foo)
```

b文件

```js
exports.foo = 'aaa'
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

