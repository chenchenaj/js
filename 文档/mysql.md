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