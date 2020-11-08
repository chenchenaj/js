

## vue2.x项目转换成3.x的方式

### 安装 vue-cli3

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

### 创建项目

```bash
vue create my-project
# OR
vue ui
```

### 在项目中安装 `composition-api` 体验 vue3 新特性

```bash
npm install @vue/composition-api --save
# OR
yarn add @vue/composition-api
```

### 通过 `Vue.use()` 进行安装

在使用任何 `@vue/composition-api` 提供的能力前，必须先通过 `Vue.use()` 进行安装

在main.js文件中添加以下代码

```js
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
```



## 总结

直接在setup中用方法修改state的值是页面不会发生改变，因为reactive不是响应式数据，需要通过`toRefs`包裹

使用ref则需要通过`.value`来修改值

```
setup() {
    const state = reactive({
      msg2: '你是个坏蛋',
    })

    const msg3 = ref('加油加油~')

    const changeMsg = () => {
      state.msg2 = '你是个大花旦'

      msg3.value = '刚把得'
    }


    return {
      msg3,
      ...toRefs(state), // 将整个state的每个值都变为响应式
      changeMsg,
    }
  },
```





## setup

`setup()` 函数是 vue3 中，专门为组件提供的新属性。它为我们使用 vue3 的 `Composition API` 新特性提供了统一的入口。



### 执行时机

**setup** 函数会在 **beforeCreate** 之后、**created** 之前执行



### 接收 props 数据

1. 在 `props` 中定义当前组件允许外界传递过来的参数名称：

   ```js
   props: {
     p1: String
   }
   ```

2. 通过 `setup` 函数的**第一个形参**，接收 `props` 数据：

   ```js
   setup(props) {
       console.log(props.p1)
   }
   ```



### context

`setup` 函数的第二个形参是一个**上下文对象**，这个上下文对象中包含了一些有用的属性，这些属性在 `vue 2.x` 中需要通过 `this` 才能访问到，在 `vue 3.x` 中，它们的访问方式如下：

```js
const MyComponent = {
  setup(props, context) {
    context.attrs
    context.slots
    context.parent
    context.root
    context.emit
    context.refs
  }
}
```

> 注意：在 `setup()` 函数中无法访问到 `this`



## reactive

`reactive()` 函数接收一个普通对象，返回一个响应式的数据对象。

### 基本语法

等价于 `vue 2.x` 中的 `Vue.observable()` 函数，`vue 3.x` 中提供了 `reactive()` 函数，用来创建响应式的数据对象，基本代码示例如下：

```js
import { reactive } from '@vue/composition-api'

// 创建响应式数据对象，得到的 state 类似于 vue 2.x 中 data() 返回的响应式对象
const state = reactive({ count: 0 })
```



### 定义响应式数据供 template 使用

1. 按需导入 `reactive` 函数：

   ```js
   import { reactive } from '@vue/composition-api'
   ```

2. 在 `setup()` 函数中调用 `reactive()` 函数，创建响应式数据对象：

   ```js
   export default{
       setup() {
        	// 创建响应式数据对象
       	const state = reactive({count: 0})
   
        	// setup 函数中将响应式数据对象 return 出去，供 template 使用
       	return state
   	}
   }
   ```

3. 在 `template` 中访问响应式数据：

   ```html
   <p>当前的 count 值为：{{count}}</p>
   ```



## ref

###  基本语法

`ref()` 函数用来根据给定的值创建一个**响应式**的**数据对象**，`ref()` 函数调用的返回值是一个对象，这个对象上只包含一个 `.value` 属性：

```js
import { ref } from '@vue/composition-api'

// 创建响应式数据对象 count，初始值为 0
const count = ref(0)

// 如果要访问 ref() 创建出来的响应式数据对象的值，必须通过 .value 属性才可以
console.log(count.value) // 输出 0
// 让 count 的值 +1
count.value++
// 再次打印 count 的值
console.log(count.value) // 输出 1
```



### 在 template 中访问 ref 创建的响应式数据

1. 在 `setup()` 中创建响应式数据：

   ```js
   import { ref } from '@vue/composition-api'
   
   setup() {
       const count = ref(0)
   
        return {
            count,
            name: ref('zs')
        }
   }
   ```

2. 在 `template` 中访问响应式数据：

   ```html
   <template>
     <p>{{count}} --- {{name}}</p>
   </template>
   ```



### 在 reactive 对象中访问 ref 创建的响应式数据

当把 `ref()` 创建出来的响应式数据对象，挂载到 `reactive()` 上时，会自动把响应式数据对象**展开为原始的值**，不需通过 `.value` 就可以直接被访问，例如：

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 输出 0
state.count++ // 此处不需要通过 .value 就能直接访问原始值
console.log(count) // 输出 1
```

> **注意：新的 ref 会覆盖旧的 ref**，示例代码如下：

```js
// 创建 ref 并挂载到 reactive 中
const c1 = ref(0)
const state = reactive({
  c1
})

// 再次创建 ref，命名为 c2
const c2 = ref(9)
// 将 旧 ref c1 替换为 新 ref c2
state.c1 = c2
state.c1++

console.log(state.c1) // 输出 10
console.log(c2.value) // 输出 10
console.log(c1.value) // 输出 0
```



## computed

### 返回一个不允许修改的计算属性

```vue
<template>
  <div>
    <p>computed的使用</p>
    <input v-model="age" />
    <p>{{nextAge}}</p>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
export default {
  setup () {
    const age = ref(18)

    // 传入一个函数 computed 返回一个不允许修改的计算属性
    const nextAge = computed(() => {
      return parseInt(age.value) + 1
    })

    return {
      age, nextAge
    }
  }
}
</script>
```



### 创建一个可以修改的计算属性

```vue
<template>
  <div>
    <p>computed的使用</p>
    <input v-model="age" />
    <input v-model="nextAge2" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
export default {
  setup () {
    const age = ref(18)

    // 传入一个对象，包括get和set，可以创建一个可以修改的计算属性
    const nextAge2 = computed({
      get () {
        return parseInt(age.value) + 2
      },

      set () {
        age.value = age.value - 2
      }
    })

    return {
      age, nextAge2
    }
  }
}
</script>
```





## watch

接收三个参数：

参数一：监视的数据源 可以是ref 或则是 一个函数

参数二：回调函数 (oldValue, value) => {}

参数三：额外的配置

### 监听ref

```vue
<template>
  <div>
    <p>watch的使用</p>
    {{money}}
    <button @click="money ++">修改money</button>
    {{car.brand}}
    <button @click="car.brand = '奔驰'">修改brand</button>
    {{msg}}
    <button @click="msg = 'vue'">修改msg</button>
  </div>
</template>

<script>
import { reactive, watch, toRefs, ref } from 'vue'
export default {
  setup () {
    const state = reactive({
      money: 100,
      car: {
        brand: '宝马'
      }
    })

    const msg = ref('hello')


    // 监听ref的复杂类型
    watch(msg, (value) => {
      console.log('数据发生了改变' + value)
    })

    return {
      ...toRefs(state),
      msg
    }
  }
}
</script>
```



### 监听reactive

```vue
<template>
  <div>
    <p>watch的使用</p>
    {{money}}
    <button @click="money ++">修改money</button>
    {{car.brand}}
    <button @click="car.brand = '奔驰'">修改brand</button>
    {{msg}}
    <button @click="msg = 'vue'">修改msg</button>
  </div>
</template>

<script>
import { reactive, watch, toRefs, ref } from 'vue'
export default {
  setup () {
    const state = reactive({
      money: 100,
      car: {
        brand: '宝马'
      }
    })

    const msg = ref('hello')

    // 监听reactive的简单类型
    watch(() => state.money, (value, oldValue) => {
      console.log('数据发生了改变' + value)
    })

    // 监听reactive的复杂类型
    watch(() => state.car, (value, oldValue) => {
      console.log('数据发生了改变' + value)
    }, {
      deep: true
    })


    // 监听reactive的多个值
    watch([() => state.money, () => state.car], ([money, car],[oldMoney, oldCar]) => {
      console.log('数据发生了改变' + money, car)
    }, {
      deep: true
    })

    return {
      ...toRefs(state),
      msg
    }
  }
}
</script>
```



### 监听整个state

```vue
<template>
  <div>
    <p>watch的使用</p>
    {{money}}
    <button @click="money ++">修改money</button>
    {{car.brand}}
    <button @click="car.brand = '奔驰'">修改brand</button>
    {{msg}}
    <button @click="msg = 'vue'">修改msg</button>
  </div>
</template>

<script>
import { reactive, watch, toRefs, ref } from 'vue'
export default {
  setup () {
    const state = reactive({
      money: 100,
      car: {
        brand: '宝马'
      }
    })
    const msg = ref('hello')

    // 监听整个reactive对象
    watch(state, (value) => {
      console.log('数据发生了改变' + value)
    }, {
      deep: true
    })

    return {
      ...toRefs(state),
      msg
    }
  }
}
</script>
```







## 配置文件

### `main.js`文件

```js
import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).mount('#app')
```



### `router.js`文件

```js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'DayPage',
    component: () => import('../views/DayPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

```



### `store.js`文件

```js
import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});
```

