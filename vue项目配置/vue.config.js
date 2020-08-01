const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// =======================================version 1 ================================
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
      .set('_c', resolve('src/components'))

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

// =======================================version 2 ================================
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'request': '@/request',
        'views': '@/views'
      }
    }
  },
  productionSourceMap: false, // 隐藏打包后的源码
  outputDir: 'dist', //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: true, //是否开启eslint
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '80',
    https: false, //是否使用https协议
    hotOnly: true, //是否开启热更新
    proxy: {
      '/api': {
        target: 'https://music.163.com/api/', //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        // 突破host和origin的限制
        headers: {
          referer: 'http://music.163.com',
          origin: 'http://music.163.com',
          host: 'music.163.com'
        }
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        // 这里data换成 prependData  并且重启vue项目即可
        prependData: `@import "@/assets/css/base.less";`
      }
    },
  },

  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')

      config.set('externals', {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        nprogress: 'NProgress',
        'better-scroll': 'BetterScroll',
        "vue-lazyload": 'VueLazyload',
        "vue-meta": 'VueMeta'
      })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
}

// =====================================version 3 ===================================
const path = require('path');

// 代理方式：
module.exports = {
  publicPath: '/Music_H5',
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'request': '@/request',
        'views': '@/views',
        'assets': '@/assets',
        'common': '@/common',
      }
    }
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '80',
    https: false, //是否使用https协议
    hotOnly: true, //是否开启热更新
    proxy: {
      '/api': {
        target: 'http://localhost:3000/', //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        // 突破host和origin的限制
        headers: {
          referer: 'http://localhost:3000/',
          origin: 'http://localhost:3000/',
          host: 'http://localhost:3000/'
        }
      },
    },
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    // 删除预加载的路由
    config.plugins.delete('prefetch')
  },
  // eslint:
  lintOnSave: false,

}
// 添加全局样式
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // 在此处添加less的mixin和变量
        path.resolve(__dirname, './src/assets/less/less_mixin.less'),
        path.resolve(__dirname, './src/assets/less/config.less')
      ],
    })
}

// ===================================================================================
