const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // 安装eslint，有错误就提示
  lintOnSave: 'error',

  // 安装eslint，有错误不提示
  lintOnSave: 'false',

  // 项目打包的路径
  publicPath: process.env.NODE_ENV === 'production'
  ? '/项目的路径/'
  : '/',

  // 配置文件别名 和 外接扩展
  chainWebpack: config => {
    config.resolve
      .alias
        .set('@', resolve('src'))
        .set('_c',resolve('src/components'))

    // 外接扩展，配置后需要在public的index.html 文件直接引入cnd的加速文件，注：是系统安装了什么插件才引入什么插件
      .set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        vuex: 'vuex',
        'vee-validate': 'VeeValidate',
        'mockjs': 'Mock'
      })
  },

  // 打包时不生成.map文件
  productionSourceMap: false,

  // 配置代理
  devServer: {
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:4000', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      },
    }
  },
}
