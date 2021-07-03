# npm

把资源或者第三方模块下载到当前目录下

```js
npm install xxx
```

把资源或者第三方模块安装到全局环境下（目的：以后可以基于命令来操作一些事情）

```js
npm install xxx -g (--global)
```

安装指定版本

```js
npm install xxx@1.1.3
npm install xxx@1.x
```



从本地或者全局卸载

```js
npm uninstall xxx / npm uninstall xxx -g
```



# yarn

首先还是需要先安装yarn，安装到全局，然后基于yarn安装我们需要的模块

```js
npm install yarn -g
```

> 基于yarn安装（只能安装在本地，不能安装到全局）

```js
yarn add xxx
yarn remove xxx
```



# webpack安装的两种方式

## 全局安装

```shell
npm i webpack webpack-cli -g
```



## 项目安装(局部安装)

```shell
npm i webpack webpack-cli --save-dev
```



!>注：安装完成检查系统是否有安装成功

```shell
webpack -v
```

