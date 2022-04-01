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

>  在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的**以下划线作为前缀**的 Vue 文件 或 目录.

1. ####  目录结构：

   ```
   pages/
   --| _slug/
   -----| comments.vue
   -----| index.vue
   --| users/
   -----| _id.vue
   --| index.vue
   ```

2. #### Nuxt.js 生成对应的路由配置表为：

   - 你会发现名称为 `users-id` 的路由路径带有 `:id?` 参数，表示该路由是可选的。**如果你想将它设置为必选的路由，需要在 `users/_id` 目录内创建一个 `index.vue` 文件**
   - **警告：**`generate` 命令会忽略动态路由: [API Configuration generate](https://gitee.com/link?target=https%3A%2F%2Fwww.nuxtjs.cn%2Fapi%2Fconfiguration-generate%23routes)

   ```
   router: {
     routes: [
       {
         name: 'index',
         path: '/',
         component: 'pages/index.vue'
       },
       {
         name: 'users-id',
         path: '/users/:id?',	// users-id 的路由路径带有 :id? 参数，表示该路由是可选的
         component: 'pages/users/_id.vue'
       },
       {
         name: 'slug',
         path: '/:slug',
         component: 'pages/_slug/index.vue'
       },
       {
         name: 'slug-comments',
         path: '/:slug/comments',
         component: 'pages/_slug/comments.vue'
       }
     ]
   }
   ```

### 扩展路由

>  在 nuxt.config.js 中对 router 属性进行配置
>
> 使用 extendRoutes(routes, resolve) => {}

- ##### 第一个参数：routes

  > 携带了所有路由信息，通过往数组 push 对象 对 路由进行扩展

- ##### 第二个参数：resolve

  > 使用该参数找到对应的文件位置

```js
  router: {
    middleware: "auth",
    extendRoutes(routes, resolve) {
      // 扩展路由
      routes.push(
        {
          name: "home",
          path: "/index2",
          // 使用 resolve 找到磁盘的位置
          component: resolve(__dirname, "pages/index2.vue"),
        },
        {
          name: "first",
          path: "/index",
          // 使用 resolve 找到磁盘的位置
          component: resolve(__dirname, "pages/index.vue"),
        }
      );
    },
  }
```

page下没有当前请求路径的路由，请求这个路径的时候页面会报错，可以通过`nuxt.config.js`中的router配置扩展路由来将这个路径匹配到对应的组件

![image-20220218110614175](https://gitee.com/yx102/pic/raw/master/img/202202181106247.png)

### 嵌套路由

1. 先创建一个一级页面，同时创建一个与之同名的文件夹

   ```bash
   pages/
   --| users/
   -----| _id.vue
   -----| index.vue
   --| users.vue
   ```

2. 文件夹所存储的 vue 文件就是这个一级页面的嵌套子路由，自动生成路由如下：

   ```js
   router: {
     routes: [
       {
         path: '/users',
         component: 'pages/users.vue',
         children: [
           {
             path: '',
             component: 'pages/users/index.vue',	// 子路由默认显示
             name: 'users'
           },
           {
             path: ':id',
             component: 'pages/users/_id.vue',		// 子路由下面的动态路由
             name: 'users-id'
           }
         ]
       }
     ]
   }
   ```

3. 需要在页面中显示子视图内容：`<nuxt-child/>`

3. 内部支持动态多层嵌套路由，即可多层传参



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



## nuxtServerInit

> 参考链接：https://www.nuxtjs.cn/guide/vuex-store

> ###### 当我们<span style="color: red">想将服务端的一些数据传到客户端时</span>，这个方法是灰常好用的，该方法只执行一次
>
> 只在服务端执行

- ##### 放置在action对象中，亦可以单独拿出做函数

- ##### 函数表达式：nuxtServerInit(store, context) => { }

  - 第一个参数：关于store管理树的数据对象

    ```js
    {                                                                                 
      dispatch: [Function: boundDispatch],
      commit: [Function: boundCommit],
      getters: {},
      state: {},
      rootGetters: {},
      rootState: {}
    }
    ```

  - 第二个参数：nuxt全局上下文对象

    > `nuxtServerInit` 方法接收的上下文对象和 `fetch` 的一样，**但不包括 `context.redirect()` 和 `context.error()`**

- ##### tip：*异步*`nuxtServerInit`*操作必须返回 Promise 来通知*`nuxt`*服务器等待它们*

  ```js
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('core/load')
    }
  }
  ```



## middleware

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



## validate

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



## asyncData

> ###### 在渲染组件之前异步获取数据，并且会跟页面本地data属性中的值进行合并
>
> 服务端和客户端都执行

1. `asyncData`方法会在组件==（限于页面组件）==每次加载之前被调用

2. 注意：由于`asyncData`方法是在组件 ==初始化== 前被调用的，所以在方法内是没有办法通过 `this` 来引用组件的实例对象。

3. 报错提示可以使用上下文对象中的 error 方法

   ```js
     asyncData({ params, error }) {
       return axios
         .get(`https://my-api/posts/${params.id}`)
         .then(res => {
           return { title: res.data.title }
         })
         .catch(e => {
           error({ statusCode: 404, message: 'Post not found' })
         })
     }
   ```

4. 第一个参数被设定为当前页面的==上下文对象==

   - ##### 访问用户请求的`req`和`res`对象

     ```js
     async asyncData({ req, res }) {
         // 请检查您是否在服务器端
         // 使用 req 和 res
         if (process.server) {
           return { host: req.headers.host }
         }
       }
     ```

   - ##### 访问动态路由数据：params

     ```js
       async asyncData({ params }) {
         const slug = params.slug // When calling /abc the slug will be "abc"
         return { slug }
       }
     ```

   - ##### 监听 query 参数改变

     > 默认情况下，query 的改变不会调用`asyncData`方法。如果要监听这个行为，例如，在构建分页组件时，您可以设置应通过页面组件的`watchQuery`属性监听参数。了解更多有关[API watchQuery](https://www.nuxtjs.cn/api/pages-watchquery)的信息。

5. #### 返回数据方式，一般配合 axios模块 做数据请求

  - ##### 返回 Promise

    ```js
      asyncData({ params }) {
        return axios.get(`https://my-api/posts/${params.id}`).then(res => {
          return { title: res.data.title }
        })
      }
    ```

  - ##### 使用 async 或 await

    ```js
      async asyncData({ params }) {
        const { data } = await axios.get(`https://my-api/posts/${params.id}`)
        return { title: data.title }
      }
    ```

  - ##### ==使用 回调函数（第二个参数）==

    ```js
      asyncData({ params }, callback) {
        axios.get(`https://my-api/posts/${params.id}`).then(res => {
          callback(null, { title: res.data.title })
        })
      }
    ```

  

 ## fetch

> 参考链接：https://www.nuxtjs.cn/api/pages-fetch

> ###### fetch 方法用于在渲染页面前填充应用的状态树（store）数据，<span style="color: red"> 与 asyncData 方法类似，不同的是它不会设置组件的数据。</span>

> 服务端和客户端都执行

1. ##### fetch 方法的第一个参数是页面组件的[上下文对象](https://www.nuxtjs.cn/api/#上下文对象) context

2. ##### 为了让获取过程可以异步（比如调用 store 中的actions函数），你需要**返回一个 Promise**，Nuxt.js 会等这个 promise 完成后再渲染组件

  ```js
  <script>
    export default {
      fetch({ store, params }) {
        return axios.get('http://my-api/stars').then(res => {
          store.commit('setStars', res.data)
        })
      }
    }
  </script>
  ```

3. ##### **警告**: 您无法在内部使用`this`获取**组件实例**，`fetch`是在**组件初始化之前**被调用

4. ##### 监听 query 字符串的改变

   > 默认情况下，不会在查询字符串更改时调用`fetch`方法。如果想更改此行为，例如，在编写分页组件时，您可以设置通过页面组件的`watchQuery`属性来监听参数的变化。了解更多有关 [API `watchQuery` page](https://www.nuxtjs.cn/api/pages-watchquery)的信息。
   
   

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



## 状态持久化与token校验

1.安装一个cookies包：cookie-universal-nuxt

```bash
 npm i cookie-universal-nuxt -S
```



2.状态持久化

- #### 在nuxt.config.js中引入

  ```js
    modules: [
      '@nuxtjs/axios',
      'cookie-universal-nuxt'
    ],
  ```

- #### 登录时，同步 Vuex && cookies

  ```js
  async login () {
        // 1 发送请求
        let { data: { token } } = await this.$axios({...})
        // 2 同步 vuex 和 cookies
        this.$cookies.set('user', token)
        this.$store.commit('user/SET_COOKIE', token)
        // 3 设置 nuxtServerInit 读取 token
        // 4 设置 拦截器 在请求数据的时候 带上token
        // 5 登录成功后执行跳转
        let path = this.$route.query.path
        if (path && /login/.test(path)) {
          this.$router.replace('/')
        } else {
          this.$router.replace(path)
        }
      }
  ```

- #### 强制刷新后，nuxtServerInit钩子，取出cookies，同步Vuex

  ```js
    nuxtServerInit (store, { app: { $cookies } }) {
      // 1 获取cookies
      let token = $cookies.get('user')
      // 2 有则传入 Vuex 
      store.commit('user/SET_COOKIE', token || '')
    }
  }
  ```

- #### axios拦截器读取Vuex

  ```js
  export default ({ store: { state }, route, redirect, params, query, req, res }) => {
    if (route.fullPath != '/' && !(/login|reg/.test(route.fullPath))) {
      // 判断是否有token，无则跳转
      if (!state.user.token) {
        redirect("/login?path=" + route.fullPath);
      }
    }
  };
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



## meta信息注入

在nuxt.config.js文件中配置会在组件的head函数中配置，渲染的时候会将内容动态插入到项目的指定位置中

![image-20220228100128302](https://gitee.com/yx102/pic/raw/master/img/202202281001383.png)



### 1.全局meta注入

**<span style="color: red">为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 `hid` 键为 meta 标签配一个唯一的标识编号</span>**

```js
  head: {
    title: "sishen独家网站 ",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
```



### 2.页面meta[个性化注入](https://www.nuxtjs.cn/api/pages-head)

> ==页面中使用 head 函数，函数内部返回一个对象==
>
> **在 `head` 方法里可通过 `this` 关键字来获取组件的数据**，你可以利用页面组件的数据来设置个性化的 `meta` 标签。

```js
head() {
      return {
        title: this.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
```



### 3.使用Vue混合函数使注入更方便

```js
// 全局
Vue.mixin({
  methods: {
    $seo (title, content, payload = []) {
      return {
        title,
        meta: [
          {
            hid: 'description',
            name: 'keywords',
            content
          }
        ].concat(payload)
      }
    }
  }
})
 
```



### 4.使用[Vue.use](https://cn.vuejs.org/v2/api/#Vue-use)

- `assets\mixins\methods.js`

  ```js
  export default {
    install (Vue) {
      Vue.mixin({
        methods: {
          $mix () {
            console.log('通过Vue.use注入')
          }
        },
      })
    }
  }
  ```

- 引用

  ```js
  // 混入mixin
  import methods from '~/assets/mixins/methods';
  Vue.use(methods)
  ```

  



## 项目使用scss

#### 查看webpack版本是否对应该nuxt版本

```js
  "devDependencies": {
    "sass": "^1.26.5",
    "sass-loader": "^10.1.1",
    "webpack": "^4.46.0"
  }
```

#### 安装对应开发依赖

```bash
npm i sass@1.26.5 sass-loader@10.1.1 -D
```

#### config.nuxt.js中去引用

```js
  modules: [
    "cookie-universal-nuxt",
  ],

```

#### 全局引入1

（该方法可以创建全局函数或变量注入到每个页面组件中）

1. 安装模块

   ```bash
   npm i @nuxtjs/style-resources -D
   ```

2. 创建全局文件`assets\scss\global.scss`

   ```scss
   @mixin color {
     color: #0099ff;
     font-size: 24px;
   }
   $size: 36px;
   ```

3. `nuxt.config.js`中引入

   ```js
    styleResources: {
       scss: [
         "./assets/scss/global.scss",
       ]
     },
   ```

#### 全局引入2

（该方法==不可以==创建全局函数或变量，只应用于每个布局layouts中，相当于==定义共同的样式==）

> 该方法不需要安装任何模块

1. 创建全局文件`assets\css\main.scss`

   ```scss
   body {
   	background-color: #0099ff;
   }
   ```

2. `nuxt.config.js`中引入

   ```js
     css: [
       '@/assets/css/main.scss'
     ],
   ```



## 自定义html模板

在项目的根目录下创建app.html文件   在nuxt.config.js中配置的内容会根据当前的html内容展示（如果不配置会有一个默认的模板）

```html
<!DOCTYPE html>
<html {{HTML_ATTRS}}>
<head {{HEAD_ATTRS}}>
  {{HEAD}}
  <!-- 加入个性内容 -->
</head>
<body {{BODY_ATTRS}}>
  {{APP}}
</body>
</html>
```



## 资源指向与引入

nuxt项目中，一般存放资源有两个目录：

- asssets：压缩且优化
- static：无压缩，无优化，无损输出

在static文件夹中的资源可以用绝对路径请求得到

例如：static文件夹下有1.png文件

```html
<img src="/1.png">
```

在assets文件夹下的资源需要通过相对路径请求得到

例如：assets文件下有a.png文件

```html
<img src="../assets/a.png">
```



## nuxt部署

- nuxt(前端文件)
  - `npm run build`	打包
  - 需要将以下文件复制到服务器中
    - .nuxt
    - package.json
    - package-lock.json
    - nuxt.config.js
    - static
    - server 反向代理
    - node_modules

- api服务器(后端文件)
  - 全部拷贝到服务器中

- 阿里云服务器
  - 需要开启安全组： 3000	9001
  - 远程工具链接阿里云(finallShell)

```shell
pm2 start /usr/local/9001/bin/www --name=node9001
cd /usr/local/3000
pm2 --name=nuxt3000 start npm -- run start
```



## 缓存机制

> *虽然 Vue 的 SSR 非常快，但由于创建组件实例和 Virtual DOM 节点的成本，它无法与纯粹基于字符串的模板的性能相匹配。在 SSR 性能至关重要的情况下，合理地利用缓存策略可以大大缩短响应时间并减少服务器负载。*

- 使用 yarn 或 npm 将 `@nuxtjs/component-cache` 依赖项添加到项目中

- 将 `@nuxtjs/component-cache` 添加到 `nuxt.config.js` 的`modules`部分

  ```js
  {
    modules: [
      // 简单的用法
      '@nuxtjs/component-cache',
  
      // 配置选项
      [
        '@nuxtjs/component-cache',
        {
          max: 10000,
          maxAge: 1000 * 60 * 60		// 一小时后过期
        }
      ]
    ]
  }
  ```