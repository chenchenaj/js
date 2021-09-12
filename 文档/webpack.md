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
<script src="./dist/bundle.js"></script>
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
<script src="./dist/bundle.js"></script>
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
<script src="/bundle.js"></script>
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



## webpack图片打包

1. js中创建
2. css中引入
3. `<img src="">`

```shell
yarn add file-loader -D
```

当前配置适合第一第二种情况

```js
module.export={
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      }
    ]
  }
}
```

默认会内部生成一张图片到build,生成图片的路径返回回来

第一种情况: 图片地址要`import`引入，直接写图片的地址，会默认为字符串

```js
import logo from './logo.png'

let image = new Image()
image.src = logo
document.body.appendChild(image)
```

第二种情况: `css-loader`会将`css`里面的图片转为`require`的格式

```html
<style>
    div {
      background: url("./logo.png");
    }
</style>
```

第三种情况: 解析`html`中的`image`，image的路径要用相对路径

```shell
npm i html-withimg-loader -D
```

```js
{
  test: /\.html$/,
  use: 'html-withimg-loader'
}
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

## [source map]([开发 | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/guides/development/#使用-source-map))

表格[devtool | webpack 中文网 (webpackjs.com)](https://www.webpackjs.com/configuration/devtool/)

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index', 
  output: {},
  devServer: {},
  plugins:[],
  devtool: 'cheap-module-eval-source-map'
}
```

总结：

开发环境推荐：

`cheap-module-eval-source-map`

生产环境推荐：

`none(不使用source map)`

原因如下：

- 使用cheap模式可以大幅提高source map生成的效率。
- 使用module可支持babel这种预编译工具，映射转换前的代码。
- 使用eval方式可大幅提高持续构建效率。
- 使用`cheap-module-eval-source-map`模式可以减少网络请求



## cleanWebpackPlugin

打包自动清除dist目录插件

```shell
npm i clean-webpack-plugin -D
```

配置

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  plugins: [
   	new HtmlWebpackPlugin({ // 用于使用模板打包时生成index.html文件
        template: './index.html', // 模板文件
        filename: 'index.html', // 打包后生成文件
      }),
    new CleanWebpackPlugin()
  ]
}
```

## copyWebpackPlugin

一些静态资源也希望拷贝的dist中

```shell
npm i copy-webpack-plugin -D
```

使用插件：在plugins中插件对象并配置源和目标

from：源，从哪里拷贝，可以是相对路径或绝对路径，推荐使用绝对路径

to：目标，拷贝到哪里去，相对于`output`的路径，同样可以相对路径或绝对路径，推荐相对路径

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyWebpackPlugin([{
        from: path.join(__dirname, 'assets'), // assets不在src中，跟src同级目录
        to: 'assets'
    }])
  ]
}
```

## bannerPlugin

用于js版权声明

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.BannerPlugin({ banner: 'hello world'})
  ]
}
```



## 打包多页面应用

同时有多个入口文件js和html，且在home.html中只引入home.js文件，在other.html文件中引入全部主入口js

```js
// 多入口
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  // 1. 修改为多入口
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // 2. 多入口无法对应一个固定的出口，所以修改filename为[name]变量
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist2')
  },
  plugins: [
    // 3. 如果用了html插件，需要手动配置多入口对应的html文件，将指定其对应的输出文件
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home'] // home.html里面只有home.js
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'other.html',
      chunks: ['other', 'home']   // other.html 里面有 other.js & home.js
    }),
  ]
}
```



## 第三方库的引入

### 全局引入

安装

```shell
npm i expose-loader -D 暴露全局的loader
```

在`webpack.config.js` 中配置 `rules`

`require.resolve`用来获取模块的绝对路径，所以这里的loader只会作用jquery模块，并且只在bundle中使用到它时，才进行处理。

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: {
            loader: 'expose-loader',
            options: '$'
        }
      }
    ]
  }
}
```

配置后在js文件中可以直接使用不需再通过import引入

```js
$('body').css('background', 'yellow')
```



### 每个模块自动加载webpack.ProvidePlugin

这个是系统自带的库，不需要额外下载

引入webpack并且创建插件对象

```js
const webpack = require('webpack')

new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
})
```



## 区分环境配置文件打包

项目开发可能需要用到两套配置文件，开发阶段(不压缩代码，不优化代码，增加效率)，生产环境(压缩代码，优化代码，打包后直接上线使用)

步骤：

- 将开发和生产公用的配置放到base中，不同的配置放到各自的文件中；
- dev和prod中使用`webpack-merge`把自己的配置与base的配置进行合并后导出；
- 修改`package.json`的脚本参数

安装

```shell
npm i webpack-merge -D
```

配置不同环境

### webpack.base.js

主要用到的是entry，output，module，plugins

```js
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    home: './src/main.js'
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require("postcss-custom-properties")
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}
```

### webpack.dev.js

```js
const merge = require('webpack-merge')
const base = require('./webpack.base4.js')

module.exports = merge(base, { // 合并base组成一个新的对象
  mode: 'development',
  devServer: {},
  devtool: 'cheap-module-eval-source-map'
})
```

### webpack.prod.js

```js
const merge = require('webpack-merge')
const base = require('./webpack.base4.js')

module.exports = merge(base, { // 合并base组成一个新的对象
  mode: 'production'
})
```

### package.json

```json
"scripts": {
  "build": "webpack  --config webpack.prod.js",
  "dev": "webpack-dev-server --config webpack.dev.js"
},
```



## 配置文件归类打包

如果将webpack.base.js，webpack.dev.js，webpack.prod.js文件放到根目录，文件目录比较乱，所以将这些文件统一放置到build文件夹下，此时打包可能会出错，要进行相关的修改。

webpack.base.js文件中使用绝对路径的都需要调整，即使用到path的都需要修改路径

```js
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    home: './src/index.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, '..', './dist') // 需要往外翻一层dist打包后才会在根目录下
  },
  plugins: [
    new CopyWebpackPlugin([{
        from: path.join(__dirname,'..', 'assets'), // 需要往外翻一层才能找到根目录下的assets文件夹
        to: 'assets'
    }])
  ]
}
```

package.json的文件也需要调整

```json
"scripts": {
  "build": "webpack  --config ./build/webpack.prod.js",
  "dev": "webpack-dev-server --config ./build/webpack.dev.js"
},
```



## 定义环境变量

webpack.dev.js

```js
new webpack.DefinePlugin({
  DEV: 'true',
  EXPRESSION: '1 + 1'   // 字符串 如果希望是字符串 JSON.stringify('1 + 1')
})
```

webpack.prod.js

```js
new webpack.DefinePlugin({
  DEV: 'false',
  EXPRESSION: '1 + 1'   // 字符串 如果希望是字符串 JSON.stringify('1 + 1')
})
```

js使用

```js
let url = ''
if (DEV) {
  // 开发环境
  url = 'http://localhost:3000'
} else {
  // 生成环境
  url = 'http://www.mayufo.cn'
}
```

## 跨域

### 接口有api

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
}
```

### 接口没有api

```js
devServer: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {'^/api': ''}
    }
  }
}
```

## [HMR热更新](https://www.webpackjs.com/guides/hot-module-replacement/#启用-hmr)



# webpack优化

## 自带优化

### tree-shaking

自动将没有使用的代码移除，但依赖于ES6的`import`和`export`的静态结构特性，不支持ES5的`require`语法。

因为import和export只能在顶级作用于中使用，而require在if这种作用域中也可以使用，无法判断到。

test.js

```js
let sum = (a, b) => {
  return a + b + 'sum'
}

let minus = (a, b) => {
  return a - b + 'minus';
}

export default {
  sum, minus
}
```

使用import

```js
index.js
import calc from './test'

console.log(calc.sum(1, 2));
```

import在生产环境下会自动去除没有用的代码`minus`，这叫`tree-shaking`，将没有用的代码自动删除掉

```js
index.js
let calc = require('./test')
console.log(calc);   // es 6导出，是一个default的对象
console.log(calc.default.sum(1, 2));
```

require引入es6 模块会把结果放在default上,打包build后并不会把多余`minus`代码删除掉，不支持`tree-shaking`

### scope hoisting

index.js

```js
let a = 1
let b = 2
let c = 3
let d = a + b + c

console.log(d, '---------');
```

打包出来的文件(类似于预执行，将结果打包后放到压缩文件中)

```js
console.log(r.default.sum(1,2));console.log(6,"---------")
```

### UglifyJsPlugin 

## 将css提取到独立的文件

`mini-css-extract-plugin`用于css提取为独立文件的插件，对每个包含css的js文件都会创建一个css文件，支持按需加载css和sourceMap。

这个插件只能在webpack4中使用，且有以下优势：

- 异步加载
- 不重复编译，性能更好
- 更容易使用
- 只针对css

安装

```shell
npm i mini-css-extract-plugin -D
```

使用

webpack.base.js

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 压缩css

plugins: [
  new MiniCssExtractPlugin({
      filename: '[name].css' // 入口文件叫什么名字，这里的css就叫什么名字
  })
],

module: {    // 模块
  rules: [
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'], // 'style-loader'不需要用到，这种是将css用style的标签插入到html中，MiniCssExtractPlugin.loader是将css抽离出来
    },
    {test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']},
      
	{test: /\.s(a|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'scss-loader']}
  ]
}
```



## css添加前缀

安装

```shell
npm i postcss-loader autoprefixer -D
```

webpack.base.js使用

```js
module: {    // 模块
  rules: [
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'], // 'style-loader'不需要用到，这种是将css用style的标签插入到html中，MiniCssExtractPlugin.loader是将css抽离出来
    },
    {test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']},
      
	{test: /\.s(a|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'scss-loader']}
  ]
}
```

项目根目录添加`postcss.config.js`文件并使用插件[postcss-loader](https://github.com/postcss/postcss-loader)

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```



## 开启css压缩

由于配置css压缩时会覆盖掉webpack默认的优化配置，导致js代码无法压缩，所以也要手动把js代码压缩。

用了`mini-css-extract-plugin`抽离css为link需使用`optimize-css-assets-webpack-plugin`进行压缩css,使用此方法压缩了css需要`uglifyjs-webpack-plugin`压缩js

安装

```shell
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
```

使用

webpack.prod.js

```js
const merge = require('webpack-merge')
const base = require('./webpack.base4.js')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = merge(base, { // 合并base组成一个新的对象
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
})
```



## 开启js压缩

### 配置多入口(不够灵活)

```js
// 多入口
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  // 1. 修改为多入口
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // 2. 多入口无法对应一个固定的出口，所以修改filename为[name]变量
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, '..', './dist'),
    publicPath: '/'
  },
}
```

分别有a.js和b.js, index.js和other.js分别引入a和b两个js

index.js

```js
import './a'
import './b'

console.log('index.js');
```

other.js

```js
import './a'
import './b'

console.log('other.js');
```



### 抽取公用代码

[SplitChunksPlugin](https://webpack.js.org/guides/code-splitting/)：拆分代码到不同的bundle中

webpack.base.js

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },
}
```

打包生成的vendors~main~other.bundle.js文件就是公用的库或js



### 动态导入(懒加载)

1.安装

```shell
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

2.根目录下修改.babelrc文件，添加插件

```js
{
   " presets": ["@babel/preset-env"], // 语法预设
    "plugins": [ 
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import"
    ]
  }
```

3.将jquery动态导入

import('jquery')其实返回一个promise对象

```js
function getComponent(){
    return import('jquery').then(({default: $}) => {
        return $('<div><div>').html('main')
    })
}
```

4.给某个按钮添加点击事件，点击后调用getComponent函数才将jquery加载

```js
window.onload = function(){
    document.getElementById('btn').onclick = function(){
        getComponent().then((item) => {
            item.appendTo('body')
        })
    }
}
```

### SplitChunksPlugin配置项

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
}
```

## noParse独立的个体没有依赖

以jquery和bootstrap为例,它是一个独立的包没有依赖，可以在webpack配置中，配置它不再查找依赖

```js
module.export = {
    noParse: /jquery|bootstrap/, // 不用解析某些包的依赖
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
  ]
}
```

## 规则匹配设置范围

webpack.base.js

```js
rules: [
  {
    test: /\.js$/,
    exclude: '/node_modules/',   // 排除
    include: path.resolve('src'),  // 在这个范围内
  }
```

## 忽略依赖中不必要的语言包

安装

```
npm i moment -D
```

忽略掉`moment`的其他语言包

webpack.base.js

```js
const webpack = require('webpack')

module.export = {
    plugins: [
        new webpack.IgnorePlugin(/\.\/locale$/, /moment$/) // 忽略moment所有的多语言包,/\.\/locale/是到对应的文件下查找语言包的名字叫什么
    ]
}
```

index.js

```js
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale(zh-CN)
let r = moment().endOf('day').fromNow()  // 距离现在多少天
console.log(r);
```



## DllPlugin动态链接库

例如使用vue，react，augular框架，借助DllPlugin插件实现将框架作为一个个的动态链接库，只构建一次，以后每次构建都只生成自己的业务代码，可以大大提高构建效率!

### 将Vue项目中的库抽成Dll

1.在build文件夹下新建`webpack.vue.js`文件(只需要在第一次用的时候打包)

配置入口：将多个要做成dll的库全部放进来

配置出口：一定要设置library属性，将打包好的结果暴露在全局

配置plugin：设置打包后dll文件名和manifest文件所在地

```js
var path = require("path");
var webpack = require("webpack");

module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vue: ['vue/dist/vue.js', 'vuex', 'axios', 'vue-router', 'element-ui']
  },
  output: {
    path: path.join(__dirname, '../dist'), // 打包后文件输出的位置
    filename: '[name]_dll.js',
    library: '[name]_dll' // vue_dll.js中暴露出的全局变量名，主要是给DllPlugin中的name使用，故这里需要和webpack.DllPlugin中的`name: '[name]_dll',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist/manifest.json'),
      name: '[name]_dll',
    }),
    // 压缩打包的文件，与该文章主线无关
    new webpack.optimize.UglifyJsPlugin({ 
      compress: {
        warnings: false
      }
    })
  ]
};
```

2.在package.json的脚本中，添加如下脚本

```
"build:vue": "webpack --config build/webpack.vue.js"
```

3.运行npm run build:vue会生成两个文件：build文件夹下的manifest.json和vue_dll.js

4.在webpack.base.js中进行插件的配置

使用DllReferencePlugin指定manifest文件的位置

```js
const webpack = require('webpack')
 
module.exports = {
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dist/manifest.json')
        })
    ],
 
}
```

5、之后我们在打包项目的时候，发现报错：vue_dll.js is undefined

这是因为vue_dll.js没有被打包到目标文件内，并且没有添加到HtmlWebpackPlugin生成的html文件（的script脚本链接）

 

解决方式：

6、安装插件： 

```shell
npm install add-asset-html-webpack-plugin@x.xx --save-dev
```

7.配置插件自动添加script标签到html标签中(**一定要在HtmlWebpackPlugin插件之后使用**)

```js
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    plugins: {
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dist/manifest.json')
        }),
        new AddAssetHtmlPlugin({
          filepath: path.resolve(__dirname, '../dist/vue_dll.js'),
        }),
    }
}
```

8.执行打包命令

```shell
npm run build
```



### 将React项目的库抽成Dll



## [浏览器缓存](https://www.bilibili.com/video/BV1Pf4y157Ni?p=61&spm_id_from=pageDriver)

webpack.base.js

```js
module.exports = {
  output: {
    filename: "[name].[contenthash:8].bundle.js",
    path: path.resolve(__dirname, '../dist')
  },
}
```



# 总结

## 多页面打包案例

```js
const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // 模式：开发  生产
  mode: 'development', // production
  // source-map
  devtool: 'source-map',
  // 优化，禁止压缩 最小化
  optimization: {
    minimize: false
  },
  // 入口文件  多文件入口
  entry: {
    index: resolve(__dirname, './src/js/index.js'),
    detail: resolve(__dirname, './src/js/detail.js'),
    collections: resolve(__dirname, './src/js/collections.js'),
  },
  // 输出/打包设置
  output: {
    // 路径
    path: resolve(__dirname, './dist'),
    // 打包后的文件名
    filename: 'js/[name].js'
  },
  // 模块设置
  module: {
    // 模块匹配规则
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: resolve(__dirname, 'node_modules'),
        query: {
          'presets': ['latest']
        }
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')];
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')];
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|woff|eot|svg|ttf)$/i,
        loaders: 'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]'
      }
    ]
  },
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, 'src/index.html'),
      title: '新闻头条',
      chunks: ['index'],//可以设置chunks按需引入JS文件，不设置就会引入所有产出的js
      chunksSortMode: 'manual',//将chunks按引入的顺序排序,不用这个的话,引入到html的JS可能是错乱排序的
      excludeChunks: ['node_modules'],//是指定生成的页面中不引入某个chunk
      hash: true,
      minify: { // 把CSS和JS压缩和削减
        removeComments: true, // 移除注释
        collapseWhitespace: true // 去掉空格回车符等
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: resolve(__dirname, 'src/detail.html'),
      title: '新闻详情',
      chunks: ['detail'],
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'collections.html',
      template: resolve(__dirname, 'src/collections.html'),
      title: '我的新闻',
      chunks: ['collections'],
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new cleanWebpackPlugin(['dist']),
    new uglifyjsWebpackPlugin(),
  ],
  // 开发服务器的配置
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    open: true,
    host: 'localhost',
    port: 3000
  }
}
```

需下载的依赖

ejs/ejs-loader：处理模板文件

```js
{
  "name": "news",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "webpack": "webpack",
    "dev": "webpack-dev-server"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^9.5.1",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-latest": "^6.24.1",
    "css-loader": "^2.1.1",
    "ejs": "^3.1.5",
    "ejs-loader": "^0.3.3",
    "file-loader": "^3.0.1",
    "html-loader": "^0.5.5"
    "html-webpack-plugin": "^3.2.0",
    "image-webpack-loader": "^4.6.0",
    "mini-css-extract-plugin": "^0.7.0",
    "node-sass": "^4.11.0",
    "postcss-loader": "^3.0.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "uglifyjs-webpack-plugin": "^2.1.2",
    "url-loader": "^1.1.2",
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.7.2"
  }
}
```



