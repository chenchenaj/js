# [nuxt](https://www.nuxtjs.cn/guide/installation)

assets：需要经过webpack打包的资源文件

static：不需要经过webpack打包的资源文件

layouts：所有页面都会加载的内容

pages：需要经过路由跳转的页面

plugins：需要在vue运行之前要加载的插件



## 路由

### 基本路由

假设 `pages` 的目录结构如下：

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

那么，**Nuxt.js 自动生成的路由配置**如下：

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

### 动态路由

### 扩展路由

page下没有当前请求路径的路由，请求这个路径的时候页面会报错，可以通过`nuxt.config.js`中的router配置扩展路由来将这个路径匹配到对应的组件

![image-20220218110614175](https://gitee.com/yx102/pic/raw/master/img/202202181106247.png)



## 路由守卫

### 前置路由守卫

- 依赖中间件middleware，插件
- 全局守卫：

  - nuxt.config.js指向middleware(参照全局中间件)

  - layouts定义中间件(参照布局/页面中间件)
- 组件独享守卫：

  - middleware(参照布局/页面中间件)
- 插件全局前置守卫(参照插件-路由守卫)

### 后置路由守卫

- 使用vue的beforeRouteLeave的钩子

```vue
<script>
	export default{
    beforeRouteLeave(to, from, next){
      let b1 = window.confirm('是否要离开')
      next(b1)
    }
  }
</script>
```

- 插件全局后置守卫(参照插件-路由守卫)



## 中间件

### 全局中间件

在执行路由跳转之前先执行中间件的内容

![image-20220217152643362](https://gitee.com/yx102/pic/raw/master/img/202202171526470.png)

在`nuxt.config.js`文件中添加router，然后在router中添加对应中间件的文件名称

```js
export default {
  router:{
    middleware:'auth' // redirect是中间件的文件名称
  },
}
```



middleware文件夹下的auth.js

```js
export default ({store, route, query, params, redirect}) => {
  // store 状态树信息
  // route 一条目标路由信息
  // redirect 强制跳转
  // params query 校验参数合法性
  console.log('全局middleware')
  redirect('/login')
}
```



### 布局/页面中间件

在vue文件中

```js
<script>
export default{
	// middleware: 'auth', // 页面层级的中间件
	middleware({store, route, query, params, redirect}){
    console.log('当前页面的middleware')
  }
}
</script>
```



> 中间件的执行顺序：全局中间件=》布局layout中间件=》页面中间件

## 过渡动效

> 参考链接：https://www.nuxtjs.cn/guide/routing

### 全局添加动效

> **提示 :**Nuxt.js 默认使用的过渡效果名称为 `page`，每个路由都有这个名称，如果要设置单独的过渡效果则要另外开一个类名

1. ##### 在全局样式文件 `assets/main.css` 里添加一下样式：

   ```css
   /* 定义所有路由统一的动效 */
   .page-enter-active,
   .page-leave-active {
     transition: opacity 0.2s;
   }
   
   .page-enter,
   .page-leave-active {
     opacity: 0;
   }
   ```

2. ##### 然后添加到 `nuxt.config.js` 文件中：

   ```js
   css: ["assets/css/transition.min.css"],
   ```

   

### 单独添加动效

1. #### 即可以在全局文件中添加样式，也可以单独在该文件中添加样式

   ```css
   /* 单文件引入 */
   <style scoped>
   .choose-enter-active,
   .choose-leave-active {
     transition: transform 0.5s ease-in-out;
   }
   
   .choose-enter,
   .choose-leave-active {
     /* 开始默认生效=>变为unset；结束添加上类 */
     transform: translateX(1000px);
   }
   </style>
   /* 全局文件引入：一样的代码 */
   ```
   
2. #### 引入使用属性：transition

   ```vue
   <script>
   export default {
     transition: 'choose'
   }
   </script>
   ```

3. #### [transition属性详解](https://www.nuxtjs.cn/api/pages-transition)

   1. ##### **类型：** `String` 或 `Object` 或 `Function`

   2. ##### 如果 `transition` 属性的值类型是字符类型， 相当于设置了动效配置对象的 name 属性：`transition.name`

      ```js
      export default {
        transition: 'test'
      }
      ```

      Nuxt.js 将使用上面的配置来设置 Vue.js transition 组件，如下：

      ```vuE
      <transition name="test"></transition>
      ```

   3. ##### 如果 `transition` 属性的值类型是对象类型

      ```js
        transition: {
          name: 'test',
          mode: 'out-in'
        }
      ```

      Nuxt.js 将使用上面的配置来设置 Vue.js transition 组件，如下：

      ```vue
      <transition name="test" mode="out-in"></transition>
      ```

   4. ##### `transition` 允许配置的字段介绍：

      | 属性字段           | 类型    | 默认值     | 描述                                                         |
      | ------------------ | ------- | ---------- | ------------------------------------------------------------ |
      | name               | String  | `"page"`   | 所有路由过渡都会用到的过渡名称。                             |
      | `mode`             | String  | `"out-in"` | 所有路由都用到的**过渡模式**，见 [Vue.js transition 使用文档](http://vuejs.org/v2/guide/transitions.html#Transition-Modes)。 |
      | `css`              | Boolean | `true`     | **是否给页面组件根元素添加 CSS 过渡类名。**如果值为 `false`，路由过渡时将只会触发页面组件注册的 Javascript 钩子事件方法（不会设置 css 类名）。 |
      | `duration`         | Integer | `n/a`      | 在**页面切换的持续时间**（以毫秒为单位）详情请参考 [Vue.js documentation](https://vuejs.org/v2/guide/transitions.html#Explicit-Transition-Durations) |
      | `type`             | String  | `n/a`      | **指定过滤动效事件的类型**，用于判断过渡结束的时间点。值可以是 "transition" 或 "animation"。 **默认情况下, Nuxt.js 会自动侦测动效事件的类型。** |
      | `enterClass`       | String  | `n/a`      | 目标路由动效开始时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。 |
      | `enterToClass`     | String  | `n/a`      | 目标路由动效结束时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。 |
      | `enterActiveClass` | String  | `n/a`      | 目标路由过渡过程中的类名。详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。 |
      | `leaveClass`       | String  | `n/a`      | 当前路由动效开始时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。 |
      | `leaveToClass`     | String  | `n/a`      | 当前路由动效结束时的类名。 详情请参考 [Vue.js transition 使用文档](https://vuejs.org/v2/guide/transitions.html#Custom-Transition-Classes) 。 |

      **可以在页面组件事件里面使用 Javascript 来控制过渡动效，可以称之为 [JavaScript 钩子方法](https://vuejs.org/v2/guide/transitions.html#JavaScript-Hooks)：**

      - beforeEnter(el)
      - enter(el, done)
      - afterEnter(el)
      - enterCancelled(el)
      - beforeLeave(el)
      - leave(el, done)
      - afterLeave(el)
      - leaveCancelled(el)

      > **注意：如果使用纯 Javascript 控制路由过渡动效，建议将 `transition` 组件的 `css` 属性的值设置为 `false`。这样可以避免 Vue 做 CSS 动效相关的侦测逻辑，同时防止 CSS 影响到过渡的动效。**

   5. ##### 如果 `transition` 属性的值类型是函数类型，携带两个参数判断来去路由给定特效

      ```js
      export default {
        transition(to, from) {
          if (!from) {
            return 'slide-left'
          }
          return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
        }
      }
      ```

      这时页面导航的动效如下：

      - `/` to `/posts` => `slide-left`
      - `/posts` to `/posts?page=3` => `slide-left`
      - `/posts?page=3` to `/posts?page=2` => `slide-right`



## 配置全局错误页面

> 你可以通过编辑 `layouts/error.vue` 文件来定制化错误页面.

**警告:** 虽然此文件放在 `layouts` 文件夹中, 但应该将它看作是一个 **页面(page)**.

这个布局文件不需要包含 `<nuxt/>` 标签。你可以把这个布局文件当成是显示应用错误（404，500 等）的组件。

```vue
<template>
  <div class="container">
    <h3>{{ '状态码:' + error.statusCode }}</h3>
    <h3>{{ '错误信息' + error.message }}</h3>
    <h3 @click="$router.replace('/')" class="turn">点击返回至首页</h3>
  </div>
</template>

<script>
export default {
  props: ['error'],    // 两个属性：statusCode（状态码）,message（错误信息）
  created () {},
  mounted () {}
}
```

使用错误页面

```vue
<template>
  <div class="unknow">
    <h3>unknow未知页面</h3>
  </div>
</template>

<script>
export default {
  validate ({ error }) {
    return error({ stausCode: 404, message: '找不到该页面!' })
  }
}
</script>
```



## 全局loading

在`nuxt.config.js`文件中添加loading

```js
export default {
  loading: "~/components/loading.vue", // 任何页面在请求的时候都会加载当前的组件
}
```

loading.vue文件

```vue
<template>
  <div class="loadEffect" v-if="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<!-- js脚本 -->
<script>
export default {
  props: {},
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
    increase(num) {
      // 只触发一次
    },
    fail(err) {
      console.log(err);
    },
  },
  computed: {},
  watch: {},
  created() {},
  destroyed() {},
};
</script>

<!-- scss样式表 -->
<style scoped>
.loadEffect {
  width: 100px;
  height: 100px;
  position: relative;
  margin: 0 auto;
  margin-top: 100px;
}
.loadEffect span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: lightgreen;
  position: absolute;
  -webkit-animation: load 1.04s ease infinite;
}
@-webkit-keyframes load {
  0% {
    -webkit-transform: scale(1.2);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0.3);
    opacity: 0.5;
  }
}
.loadEffect span:nth-child(1) {
  left: 0;
  top: 50%;
  margin-top: -10px;
  -webkit-animation-delay: 0.13s;
}
.loadEffect span:nth-child(2) {
  left: 14px;
  top: 14px;
  -webkit-animation-delay: 0.26s;
}
.loadEffect span:nth-child(3) {
  left: 50%;
  top: 0;
  margin-left: -10px;
  -webkit-animation-delay: 0.39s;
}
.loadEffect span:nth-child(4) {
  top: 14px;
  right: 14px;
  -webkit-animation-delay: 0.52s;
}
.loadEffect span:nth-child(5) {
  right: 0;
  top: 50%;
  margin-top: -10px;
  -webkit-animation-delay: 0.65s;
}
.loadEffect span:nth-child(6) {
  right: 14px;
  bottom: 14px;
  -webkit-animation-delay: 0.78s;
}
.loadEffect span:nth-child(7) {
  bottom: 0;
  left: 50%;
  margin-left: -10px;
  -webkit-animation-delay: 0.91s;
}
.loadEffect span:nth-child(8) {
  bottom: 14px;
  left: 14px;
  -webkit-animation-delay: 1.04s;
}
</style>
```



## vuex

### 普通方式

```js
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state, counter) {
    state.counter = counter
  }
}

export const actions = {
  increamentCount({commit}, counter){
    commit('increment', counter)
  }
}
```

### 模块方式

新建一个user.js文件

```js
export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false
    })
  }
}
```

使用

```js
import { mapMutations } from 'vuex'

export default {
  computed: {
    userList() {
      return this.$store.state.user.list
    }
  },
  methods: {
    addTodo(e) {
    	// 方式一
      this.$store.commit('user/add', e.target.value)
      e.target.value = ''
      
      // 方式二
      this.add(e.target.value)
    },
    // 方式二
    ...mapMutations('user', ['add'])
  }
}
```



## 数据持久化和token校验

安装`cookie-universal-nuxt`插件

登录时，同步vuex && cookie，强制刷新后，nuxtServerInit钩子取出cookies，同步vuex，axios拦截器读取vuex的值

```js

```





## 插件

> Nuxt.js 允许您在**运行 Vue.js 应用程序之前执行 js 插件**。这在您需要使用自己的库或第三方模块时特别有用。<span style="color: red">**tip：会在服务端和客户端在运行应用程序前各执行一次，既可以在插件内做到插件全局使用**</span>
>
> <span style="color: red">**tip：会在整个项目启动之前执行，即比 nuxtServerInit 先一步运行**</span>

### 路由守卫

plugins文件夹下的router.js

```js
export default ({app, redirect, params, query, store}) => {
  // app： vue的实例
  app.router.beforeEach((to, from, next)){
    if(to.name == '/login' || to.name='/register'){
      next()
    }else{
      redirect({name: 'login'})
    }
  }
}
```

nuxt.config.js中配置

```js
export default {
  plugins: [ "~/plugins/router.js",],
}
```



### 使用第三方模块

#### 数据交互axios

安装`@nuxtjs/axios`和`@nuxtjs/proxy`

```js
"dependencies": {
    "@nuxtjs/axios": "^5.13.6",
    "@nuxtjs/proxy": "^2.1.0",
  },
```

在nuxt.config.js中配置

```js
export default{
  modules: [
    "@nuxtjs/axios"
  ],
}
```

使用

```js
async asyncData ({ $axios }) {
    let res = await $axios({
      url: '/data.json' // 请求的是本地的数据
    })
    return{
      list: res.data
    }
  },
```

#### 拦截处理

在nuxt.config.js中配置

```js
export default{
  plugins: [
    {
      src: "~/plugins/axios.js",
      ssr: true, // 开启服务端渲染
  ],
}
```

在plugins中添加axios.js文件实现拦截

```js
export default ({ $axios, redirect, route, store, app: { $cookies } }) => {
  // 1 基本配置
  $axios.defaults.timeout = 10000;

  // 2 请求拦截
  $axios.onRequest((config) => {
    console.log("请求拦截");
    // 携带token
    config.headers.token = store.state.user.token
    return config;
  });

  // 3 响应拦截
  $axios.onResponse(config => {
    console.log("响应拦截");
    if (config.data.error === 2 && route.fullPath !== "/login") {
      // 响应拦截错误码为2 同时路径不为登录页面
      redirect("/login?path=" + route.fullPath);
    }
    return config;
  });

  // 4 错误处理
  $axios.onError((err) => {
    return err;
  });
};
```



#### proxy

在nuxt.config.js中配置

```js
export default{
  axios: {
    proxy: true,
    // prefix: 'api', // baseUrl
  },
  proxy:{
    '/api': {
      target: "http://127.0.0.1:8081", // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^api': ''
      }
    }
  }
}
```

使用

```js
async asyncData ({ $axios }) {
    // 请求该页面可以渲染，原因是服务器请求不遵循同源策略
    let goods = await $axios({
      url: '/api/goods', // 请求的是跨域的地址
      method: 'post',
    }).catch(err => {
      console.log(err);
    })
    console.log(goods);

    return {
      title: goods.data ? goods.data.Result : 'null'
    }
  },
```





### 使用 vant 插件

> 假如我们想使用 [vue-notifications](https://github.com/se-panfilov/vue-notifications) 显示应用的通知信息，我们需要在程序运行前配置好这个插件。

- 首先增加文件 `plugins/vant.js`：(如果不是局部注册组件就可以直接跳过当前的步骤)

  ```js
  import Vue from "vue";
  
  // 1：这里引入css；2：在nuxtconfig.js中引入
  import "vant/lib/index.css";
  
  // 1 全局引入
  import Vant from "vant";
  Vue.use(Vant);
  
  // 2 按需引入
  import { Button } from "vant";
  Vue.use(Button);
  ```
  
- 在 `nuxt.config.js` 内配置 `plugins`

  ```js
  module.exports = {
    plugins: [{
      src: "~/plugins/vant.js",
      ssr: true, // 不支持ssr的插件只会在客户端运行不要给true
      // mode: 'server', // 可选值client 或 server
    }],
  }
  ```
  
- 在 `nuxt.config.js` 内配置 `css`

  ```js
   css: ["vant/lib/index.css"],
  ```

- **按需打包的时候不想要整体打包进来**

  ```js
  // 不想要vant整体打包进来
    build: {
      // 不想要 vant 整体打包进来
      transpile: [/^vant-ui/],
    },
  ```






## 校验

在页面的js函数中进行校验，如果返回false页面就会提示`This page could not be found`，返回true页面才会正常显示

```js
<template>
  <p>fjsdkfjdkj</p>
</template>

<script>
export default {
  name: 'IndexPage', 
  middleware(){
    console.log('当前页面的中间件')
  },
  validate(){
    console.log('进行校验')
    return true
  }
}
</script>
```



## 异步处理函数

`asyncData`和`fetch`

```js

<script>
export default {
  name: "IndexPage",
  // middleware: 'auth',
  data() {
    return{
      a: 1
    }
  },
  middleware() {
    console.log("当前页面的中间件");
  },
  validate() {
    console.log("进行校验");
    return true;
  },
  asyncData({ store }) {
    console.log("异步业务逻辑，读取服务端数据");
    return { // 数据会合并到data中
      b: 2
    };
  },
  fetch({ store }) {
    console.log("异步业务数据，读服务器数据提交到vuex中");
  },
};
</script>
```



## 生命周期函数

可以运行在SSR && CSR的钩子：beforeCreated，created

只能运行在CSR(客户端)的钩子：除beforeCreated，created外的其他

部分钩子无法触发：activated、deactivated，SSR不会被缓存





## 注册全局过滤器

在assets文件夹中添加script文件夹里面放对应的过滤器方法，然后在plugins文件夹的mixin文件中注册全局的过滤器，最后在nuxt.config.js插件中配置mixin文件，注册后的用法跟vue一样

![image-20220225112717217](https://gitee.com/yx102/pic/raw/master/img/202202251127322.png)



## 注册全局指令

跟注册过滤器差不多，注册后的用法跟vue一样

![image-20220225114105541](https://gitee.com/yx102/pic/raw/master/img/202202251141626.png)



## 注册全局组件

跟注册指令差不多

![image-20220225114527648](https://gitee.com/yx102/pic/raw/master/img/202202251145740.png)