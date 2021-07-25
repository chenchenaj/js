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



# webpack4基础

## CommonJS与ES6导入导出

CommonJS

```js
// 导出
module.exports = {
    name: 'xx'
}
// 导入
let a = require('文件名称')
```

ES6

```js
export default aa
import aa from '文件名称'

export const aa = 'xxx'
import {aa} from '文件名称'
```



## 配置

webpack的配置遵循CommonJS的规范

webpack四大核心：

入口(entry)：程序的入口js

输出(output)：打包后存放的位置

loader：用于对模块的源代码进行转换

plugins：插件目的在于解决loader无法实现的其他事情

- 配置webpack.config.js
- 运行`npx webpack`

### 安装前先npm初始化

```shell
npm init -y
npm i webpack@4.30.0 webpack-cli@3.3.1 -D // 局部安装(推荐使用)
npm i webpack webpack-cli -g // 全局安装(不推荐使用)
```

配置webpack.config.js

```js
const path = require('path')   // 相对路径变绝对路径

module.exports = {
  mode: 'production', // 模式 默认 production development
  entry: './src/index',    // 入口文件
  output: {
    filename: 'bundle.[hash:8].js',   // hash: 8只显示8位
    path: path.resolve(__dirname, './dist'), // 解析当前相对路径的绝对路径
    publicPath: ''  // // 给所有打包文件引入时加前缀，包括css，js，img，如果只想处理图片可以单独在url-loader配置中加publicPath
  }
}
```

index.html引入打包后的文件

```html
<script src="./dist/main.js"></script>
```



### webpack命令打包

生产环境和开发环境要执行的webpack不一致，那么可以在package.json中配置不一样的命令即找到对应的文件进行打包

package.json

```json
"scripts": {
    "serve": "webpack --config webpack.dev.config.js", // webpack.dev.config.js文件的内容主要是处理开发环境的
    "build": "webpack --config webpack.pro.config.js", // webpack.pro.config.js文件的内容主要是处理生产环境的
    "start": "webpack" // 默认会找webpack.config.js文件进行打包
  },
```

打包执行的命令

```shell
npm run serve
npm run build
```



### 配置自动编译

监视本地项目文件的变化，如果文件发生变化就会重新打包

#### watch

index.html引入的是打包后的压缩文件

```html
<script src="./dist/main.js"></script>
```



##### 方式一:package.json中配置

```js
"scripts": {
    "watch": "webpack --watch" // 文件发生改变就会重新打包
  },
```

##### 方式二：webpack.config.js中配置

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index', 
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  watch: true, // 开启自动监视
}
```



#### webpack-dev-server(推荐)

安装

```shell
npm i webpack-dev-server -D
```

index.html中引入的是根目录下的压缩文件(即不需要写dist)

```html
<script src="/main.js"></script>
```

##### 方式一

package.json配置

```json
"scripts": {
    "dev": "webpack-dev-server --port 5000 --open --hot --compress --contentBase src"
    // --port 5000：将端口改为5000
    // --open：启动后自动打开浏览器
    // --hot：热更新
    // --compress：开启代码压缩
    // --contentBase src：修改项目的根路径为src，一般不需要写，除非index.html在src目录中
  },
```

##### 方式二

webpack.config.js配置

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index', 
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  devServer: {
    open: true, // 自动开启浏览器
    port: 5000, // 默认端口
    hot: true, // 热更新
    compress: true, // 开启压缩
    // contentBase: './src' // 更换启动的根路径(一般不需要写这一行)
  }
}
```

package.json配置

```json
"scripts": {
    "dev": "webpack-dev-server"
  },
```



#### [html插件](https://www.bilibili.com/video/BV1Pf4y157Ni?p=10&spm_id_from=pageDriver)

- 根据模板在express项目根目录下生成html文件(类似于DevServe生成内容中的bundle.js)
- 自动引入bundle.js
- 打包时会自动生成index.html

安装

```shell
npm i html-webpack-plugin -D
```

在webpack.config.js文件中配置plugins

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index', 
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: ''
  },
  devServer: {
    open: true, // 自动开启浏览器
    port: 5000, // 默认端口
    hot: true, // 热更新
    compress: true, // 开启压缩
    // contentBase: './src' // 更换启动的根路径(一般不需要写这一行)
  },
   plugins:[{// 放着所有webpack插件
       new HtmlWebpackPlugin({ // 用于使用模板打包时生成index.html文件，并且在run dev时会将模板文件也打包到内存中
            template: './index.html', // 模板文件
            filename: 'index.html', // 打包后生成文件
            hash: true, // 添加hash值解决缓存问题
            minify: { // 对打包的html模板进行压缩
              removeAttributeQuotes: true, // 删除属性双引号
              collapseWhitespace: true // 折叠空行变成一行
            }
          }) 
   }]
}
```

#### webpack-dev-middleware



#### 小结

只有在开发时才需要使用自动编译工具，例如：webpack-dev-serve

项目上线时会直接使用webpack进行打包构建，不需要这些自动编译工具

自动编译工具只为提高开发体验



## 处理css

webpack默认是不会打包css，需要添加配置

安装

```shell
npm i css-loader style-loader -D
```

配置`webpack.config.js`

css-loader: 解析css文件，用来解析@import这种语法

style-loader：将解析出来的结果放到html中，使其生效

loader的执行顺序： 默认是从右向左（从下向上）

```js
module: {    // 模块
  rules: [
   // 配置的是用来解析.css文件的loader(style-loader和css-loader)
    {
      test: /\.css$/,   // 用正则匹配当前访问的文件的后缀名是 .css
      // webpack读取loader时是从右到左的读取，会将css文件先交给最右侧的loader，loader的执行顺序从右往左，
      use: ['style-loader', 'css-loader'],
    }
  ]
}
```

## 处理less和sass

```shell
npm i less less-loader sass-loader node-sass -D
```

在`webpack.config.js`配置

```js
{test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}

{test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'scss-loader']}
```



## 处理图片和字体文件

```shell
npm i file-loader url-loader -D
```

url-loader封装了file-loader，所以使用url-loader时要安装file-loader

在`webpack.config.js`配置

```js
// 处理图片(基本配置)
{ test: /\.(png|jpeg|jpg|gif|bmp)$/, use: 'file-loader'}

// 处理图片(高级配置)
{ test: /\.(png|jpeg|jpg|gif|bmp)$/, 
  use: {
      loader: 'url-loader',
      options: {
      	limit: 5 * 1024, // 小于5kb转为base64编码
        outputPath: 'images', // 图片文件打包后统一放到images文件夹中
        name: [name]-[hash:4].[ext], // name是原图片名字，hash给图片增加一个标识，ext原图片后缀
      }
  }
}

// 处理字体图标(基本配置)
{ test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'file-loader'}
```



## 处理es6转es5

```shell
npm i babel-loader @babel/core @babel/preset-env @babel/runtime @babel/polyfill -S
```

如果需要更高级的语法(支持类中的static关键字)

```shell
npm i @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
```

@babel/polyfill：转换对象原型的新语法(import使用或在entry中添加)

@babel/plugin-proposal-class-properties：转义class中的静态static关键字和默认值

@babel/plugin-transform-runtime：转义generator



### 方式一：在`webpack.config.js`配置

```js
entry: ['@babel/polyfill', './src/index']

{
    test: /\.js$/, // 匹配js后缀文件
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'], // 语法预设
        plugins: [ 
            '@babel/plugin-proposal-class-properties’,
            '@babel/plugin-transform-runtime'
        ]
      }
    },
    exclude: /node_modules/
  },
```

### 方式二：`.babelrc`+`webpack.config.js`(推荐)

.babelrc

```json
{
   " presets": ["@babel/preset-env"], // 语法预设
    "plugins": [ 
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
    ]
  }
```

webpack.config.js

```js
entry: ['@babel/polyfill', './src/index']

{
    test: /\.js$/, // 匹配js后缀文件
    use: {loader: 'babel-loader'},
    exclude: /node_modules/
  },
```



