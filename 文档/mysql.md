# mysql

## [下载安装mysql serve](https://www.cnblogs.com/aishangJava/p/13335254.html)

安装完成可以在服务中看到Mysql对应的服务



## 下载安装Navicat

直接操作数据可的可视化面板



## 建库建表

### 建立链接

![image-20220118112517596](https://gitee.com/yx102/pic/raw/master/img/202201181125673.png)

### 建立对应的数据库

![image-20220118112638285](https://gitee.com/yx102/pic/raw/master/img/202201181126313.png)![image-20220118112746525](https://gitee.com/yx102/pic/raw/master/img/202201181127562.png)

### 建立对应的表

配置数据库需要的字段

![image-20220118112834411](https://gitee.com/yx102/pic/raw/master/img/202201181128441.png)![image-20220118112920548](https://gitee.com/yx102/pic/raw/master/img/202201181129583.png)



## sql语句

> 注意：SQL 语句中的关键字对**大小写不敏感**。SELECT 等效于 select，FROM 等效于 from。

### SELECT

```mysql
-- 从 FROM 指定的【表中】，查询出【所有的】数据。 *表示【所有列】
SELECT * FROM users

-- 从 FROM 指定的【表中】，查询出指定 列名称 的数据
SELECT username, password FROM users
```



### INSERT

INSERT INTO 语句用于向数据表中插入新的数据行

```mysql
-- 向 users 表中，插入一条 username 为 ww，password 为 789456 的用户数据
INSERT INTO users (username, password) VALUES ('ww', '789456')
```



### UPDATE

Update 语句用于修改表中的数据

#### 更新某一行中的一个列

```mysql
-- 把 users 表中 id 为 2 的用户密码，更新为 888888
UPDATE users SET PASSWORD='888888' where id=2
```

#### 更新某一行中的若干列

```mysql
-- 把 users 表中 id 为 1 的用户密码，更新为 888888 ，状态为1
UPDATE users SET PASSWORD='888888', STATUS=1 where id=1
```



### DELETE

DELETE 语句用于删除表中的行

```mysql
-- 从 users 表中，删除 id 为 3 的用户
DELETE FROM users WHERE id=3
```



### WHERE

WHERE 子句用于限定选择的标准。在 SELECT、UPDATE、DELETE 语句中，皆可使用 WHERE 子句来限定选择的标准。

下面的运算符可在 WHERE 子句中使用，用来限定选择的标准：

![image-20220118165810759](https://gitee.com/yx102/pic/raw/master/img/202201181658800.png)

> 注意：在某些版本的 SQL 中，操作符 <> 可以写为 !=



可以通过 WHERE 子句来限定 SELECT 的查询条件：

```mysql
SELECT * FROM users WHERE id>=1
SELECT * FROM users WHERE status=0
```



### AND/OR

AND 和 OR 可在 WHERE 子语句中把两个或多个条件结合起来。

AND 表示必须同时满足多个条件，相当于 JavaScript 中的 && 运算符，例如 if (a !== 10 && a !== 20)

OR 表示只要满足任意一个条件即可，相当于 JavaScript 中的 || 运算符，例如 if(a !== 10 || a !== 20)

#### AND

```mysql
-- 使用 AND 来显示所有 status 为 0，并且 id 小于 3 的用户
SELECT * FROM users WHERE id<=3 AND STATUS = 0
```



#### OR

```mysql
-- 使用 OR 来显示所有 status 为 1，或者 username 为 zs 的用户
SELECT * FROM users WHERE USERNAME='ZS' OR STATUS = 0
```



### ORDER BY

ORDER BY 语句用于根据指定的列对结果集进行排序。

ORDER BY 语句**默认**按照升序对记录进行排序。

如果您希望按照**降序**对记录进行排序，可以使用 DESC 关键字。

```mysql
-- 升序
SELECT * FROM users ORDER BY STATUS

-- 降序
SELECT * FROM users ORDER BY STATUS DESC

-- 多重排序(对 users 表中的数据，先按照 status 字段进行降序排序，再按照 username 的字母顺序，进行升序排序)
SELECT * FROM users ORDER BY STATUS DESC, username ASC
```



### COUNT(*) 函数

#### 总条数

COUNT(*) 函数用于返回查询结果的总数据条数

```mysql
-- 查询 users 表中 status 为 0 的总数据条数
SELECT COUNT(*) FROM users WHERE STATUS=0
```

#### 设置别名

```mysql
-- 给查询出来的列名称设置别名

-- 使用total给count(*)起别名
SELECT COUNT(*) as total FROM users WHERE STATUS=0

-- 重命名username，password
SELECT username as uname, PASSWORD as pwd FROM users
```



## 项目中操作数据库

### 初始化项目

```shell
npm init -y
```



### 安装mysql 模块

mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。

```shell
npm i mysql
```



### 配置mysql 模块

电脑的服务要先启动MySQL的服务

在使用 mysql 模块操作 MySQL 数据库之前，必须先对 mysql 模块进行必要的配置，主要的配置步骤如下

```js
// 1. 导入 mysql 模块
const mysql = require('mysql')
// 2. 建立与 mysql 数据库的链接
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的ip地址
  user: 'root', // 登录数据库的账号
  password: 'admin123', // 登录数据库的密码
  database: 'my_db_01', // 指定要操作的那个数据库名称
})
```



### 测试 mysql 模块能否正常工作

调用 db.query() 函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果

```js
// 测试 mysql 模块能否正常工作
db.query('select 1', (err, results) => {
  // mysql 模块工作期间报错了
  if(err) return console.log(err.message)
  // 能够成功的执行 SQL 语句
  console.log(results)
}) 
```



### 查询

使用select查询语句执行的结果是数组

如果sql语句中有两个问号，则db.query的第二个参数传入一个数组

```js
// 查询 users 表中所有的数据
const sqlStr = 'select * from users'
db.query(sqlStr, (err, results) => {
  // 查询数据失败
  if (err) return console.log(err.message)
  // 查询数据成功
  // 注意：如果执行的是 select 查询语句，则执行的结果是数组
  console.log(results)
}) 
```



### 新增

使用insert语句执行的结果是一个对象

如果sql语句中有两个问号，则db.query的第二个参数传入一个数组

```js
// 向 users 表中，新增一条数据，其中 username 的值为 Spider-Man，password 的值为 pcc123
const user = { username: 'Spider-Man', password: 'pcc123' }
// 定义待执行的 SQL 语句
const sqlStr = 'insert into users set ?'
// 执行 SQL 语句
db.query(sqlStr, user, (err, results) => {
  // 执行 SQL 语句失败了
  if (err) return console.log(err.message)
  // 成功了
  // 注意：如果执行的是 insert into 插入语句，则 results 是一个对象
  // 可以通过 affectedRows 属性，来判断是否插入数据成功
  if (results.affectedRows === 1) {
    console.log('插入数据成功!')
  }
})
```



### 更新

使用update语句执行的结果是一个对象

如果sql语句中有两个问号，则db.query的第二个参数传入一个数组

```js
const user = { id: 6, username: 'aaaa', password: '0000' }
// 定义 SQL 语句
const sqlStr = 'update users set ? where id=?'
// 执行 SQL 语句
db.query(sqlStr, [user, user.id],, (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行了 update 语句之后，执行的结果，也是一个对象，可以通过 affectedRows 判断是否更新成功
  if (results.affectedRows === 1) {
    console.log('更新成功')
  }
})
```



### 逻辑删(update)

在表中定义一个字段值记录当前的数据被删除，在查询的时候过滤调当前字段

```js
const sqlStr = 'update users set status=? where id=?'
db.query(sqlStr, [1, 6], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('标记删除成功')
  }
})
```



### 物理删(delete)

使用delete语句执行的结果是一个对象

```js
const sqlStr = 'delete from users where id=?'
db.query(sqlStr, 5, (err, results) => {
  if (err) return console.log(err.message)
  // 注意：执行 delete 语句之后，结果也是一个对象，也会包含 affectedRows 属性
  if (results.affectedRows === 1) {
    console.log('删除数据成功')
  }
}) 
```



## 身份认证

对于服务端渲染和前后端分离这两种开发模式来说，分别有着不同的身份认证方案：

① 服务端渲染推荐使用 **Session 认证机制**

② 前后端分离推荐使用 **JWT 认证机制**



### Session 认证机制

#### HTTP 协议的无状态性

HTTP 协议的无状态性，指的是客户端**的每次 HTTP 请求都是独立的**，连续多个请求之间没有直接的关系，**服务器不会**

**主动保留每次 HTTP 请求的状态**。



#### 突破HTTP 无状态的限制

在 Web 开发中的专业术语叫做 **Cookie**



#### Cookie

Cookie 是**存储在用户浏览器中的一段不超过 4 KB 的字符串**。它由一个名称（Name）、一个值（Value）和其它几个用

于控制 Cookie 有效期、安全性、使用范围的可选属性组成。

不同域名下的 Cookie 各自独立，每当客户端发起请求时，会**自动**把**当前域名下**所有**未过期的 Cookie** 一同发送到服务器。

**Cookie的几大特性：**

① 自动发送

② 域名独立

③ 过期时限

④ 4KB 限制



#### Cookie 在身份认证中的作用

客户端第一次请求服务器的时候，服务器**通过响应头的形式**，向客户端发送一个身份认证的 Cookie，客户端会自动

将 Cookie 保存在浏览器中。

随后，当客户端浏览器每次请求服务器的时候，浏览器会**自动**将身份认证相关的 Cookie，**通过请求头的形式**发送给

服务器，服务器即可验明客户端的身份。

 

#### Cookie不具有安全性

由于 Cookie 是存储在浏览器中的，而且**浏览器也提供了读写 Cookie 的 API**，因此 **Cookie 很容易被伪造**，不具有安全

性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。



#### Session的工作原理

![image-20220120102320090](https://gitee.com/yx102/pic/raw/master/img/202201201023161.png)



### 在 Express 中使用 Session 认证

#### 安装express-session 中间件

```shell
npm i express-session
```



#### 配置express-session 中间件

```js
// TODO_01：请配置 Session 中间件
const session = require('express-session')
app.use(
  session({
    secret: 'itheima', // secret属性的值可以是任意字符串
    resave: false, // 固定写法
    saveUninitialized: true, // 固定写法
  })
)
```



#### 向 session 中存数据

```js
// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  req.session.user = req.body // 用户的信息
  req.session.islogin = true // 用户的登录状态

  res.send({ status: 0, msg: '登录成功' })
})
```



####  从 session 中取数据

```js
// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  })
})
```



#### 清空 session

调用 **req.session.destroy()** 函数，即可清空服务器保存的 session 信息。

```js
// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})
```



#### 整合

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// TODO_01：请配置 Session 中间件
const session = require('express-session')
app.use(
  session({
    secret: 'itheima',
    resave: false,
    saveUninitialized: true,
  })
)

// 托管静态页面
app.use(express.static('./pages'))
// 解析 POST 提交过来的表单数据
app.use(express.urlencoded({ extended: false }))

// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
  req.session.user = req.body // 用户的信息
  req.session.islogin = true // 用户的登录状态

  res.send({ status: 0, msg: '登录成功' })
})

// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.islogin) {
    return res.send({ status: 1, msg: 'fail' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username,
  })
})

// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录成功',
  })
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1:80')
})
```



### JWT 认证机制

####  了解 Session 认证的局限性

Session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接

口的时候，**需要做很多额外的配置**，才能实现跨域 Session 认证。

注意：

⚫ 当前端请求后端接口**不存在跨域问题**的时候，**推荐使用 Session** 身份认证机制。

⚫ 当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制。



####  JWT 的工作原理

![image-20220120104510536](https://gitee.com/yx102/pic/raw/master/img/202201201045595.png)



#### JWT 的组成部分

JWT 通常由三部分组成，分别是 Header（头部）、Payload（有效荷载）、Signature（签名）。

三者之间使用英文的“.”分隔。

其中：

-  **Payload** 部分**才是真正的用户信息**，它是用户信息经过加密之后生成的字符串，**包含用户的角色和权限**。
-  Header 和 Signature 是**安全性相关**的部分，只是为了保证 Token 的安全性。

![image-20220120113021973](https://gitee.com/yx102/pic/raw/master/img/202201201130014.png)



### 在 Express 中使用 JWT

#### 安装 JWT 相关的包

-  **jsonwebtoken** 用于**生成 JWT 字符串**

- **express-jwt** 用于**将 JWT 字符串解析还原成 JSON 对象**

```shell
npm i jsonwebtoken express-jwt
```



#### 导入 JWT 相关的包

```js
// TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
```



#### 定义 secret 密钥

为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于**加密**和**解密**

的 secret 密钥：

① 当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串

② 当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密

```js
// TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'itheima No1 ^_^'
```



#### 在登录成功后生成 JWT 字符串

调用 **jsonwebtoken** 包提供的 **sign()** 方法，将用户的信息加密成 JWT 字符串，响应给客户端

```js
// 登录接口
app.post('/api/login', function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败！',
    })
  }
  // 登录成功
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期
  // 记住：千万不要把密码加密到 token 字符中
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr, // 要发送给客户端的 token 字符串
  })
})
```



####  将 JWT 字符串还原为JSON 对象

解析客户端发送的**Authorization 字段**

```js
// TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
```



####  使用 req.user 获取用户信息

```js
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user, // 要发送给客户端的用户信息
  })
})
```



####  捕获解析 JWT 失败后产生的错误

当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串**过期**或**不合法**，会产生一个**解析失败**

的错误，影响项目的正常运行。

```js
// TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})
```



#### 整合

```js
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())

// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'itheima No1 ^_^'

// TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 req.user 属性上
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))

// 登录接口
app.post('/api/login', function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败！',
    })
  }
  // 登录成功
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期
  // 记住：千万不要把密码加密到 token 字符中
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr, // 要发送给客户端的 token 字符串
  })
})

// 这是一个有权限的 API 接口
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user)
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user, // 要发送给客户端的用户信息
  })
})

// TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token',
    })
  }
  res.send({
    status: 500,
    message: '未知的错误',
  })
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
  console.log('Express server running at http://127.0.0.1:8888')
})
```

