#  创建 vue3 项目

## 1) 使用 vue-cli 创建

```
vue create my-project
```

选择自定义创建项目，根据自己的需要来创建项目的内容

- Please pick a preset - 选择 Manually select features
- Check the features needed for your project - 选择上 TypeScript ，特别注意点空格是选择，点回车是下一步
- Choose a version of Vue.js that you want to start the project with - 选择 3.x (Preview)
- Use class-style component syntax - 直接回车
- Use Babel alongside TypeScript - 直接回车
- Pick a linter / formatter config - 直接回车
- Use history mode for router? - 直接回车
- Pick a linter / formatter config - 直接回车
- Pick additional lint features - 直接回车
- Where do you prefer placing config for Babel, ESLint, etc.? - 直接回车
- Save this as a preset for future projects? - 直接回车



## 2)使用 vite 创建

- 文档: https://v3.cn.vuejs.org/guide/installation.html
- vite 是一个由原生 ESM 驱动的 Web 开发构建工具。在开发环境下基于浏览器原生 ES imports 开发，
- 它做到了***本地快速开发启动***, 在生产环境下基于 Rollup 打包。
  - 快速的冷启动，不需要等待打包操作；
  - 即时的热模块更新，替换性能和模块数量的解耦让更新飞起；
  - 真正的按需编译，不再等待整个应用编译完成，这是一个巨大的改变。

```bash
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
```



# vue2.x 项目转换成 3.x 的方式

## 安装 vue-cli3

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

## 创建项目

```bash
vue create my-project
# OR
vue ui
```

## 在项目中安装 `composition-api` 体验 vue3 新特性

```bash
npm install @vue/composition-api --save
# OR
yarn add @vue/composition-api
```

## 通过 `Vue.use()` 进行安装

在使用任何 `@vue/composition-api` 提供的能力前，必须先通过 `Vue.use()` 进行安装

在 main.js 文件中添加以下代码

```js
import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
```



# Vue3基本语法

直接在 setup 中用方法修改 state 的值是页面不会发生改变，因为 reactive 不是响应式数据，需要通过`toRefs`包裹

使用 ref 则需要通过`.value`来修改值

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

**setup** 函数会在 **beforeCreate** 之前、**created** 之前执行，**只执行一次**

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
  },
}
```

> 注意：在 `setup()` 函数中无法访问到 `this`

## reactive

`reactive()` 函数接收一个普通对象，返回一个响应式的数据对象(定义多个数据的响应式)。

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
   export default {
     setup() {
       // 创建响应式数据对象
       const state = reactive({ count: 0 })

       // setup 函数中将响应式数据对象 return 出去，供 template 使用
       return state
     },
   }
   ```

3. 在 `template` 中访问响应式数据：

   ```html
   <p>当前的 count 值为：{{count}}</p>
   ```

## ref

### 基本语法

`ref()` 函数用来根据给定的值创建一个**响应式**的**数据对象**(基本类型的数据)，`ref()` 函数调用的返回值是一个对象，这个对象上只包含一个 `.value` 属性：

```js
import { ref } from '@vue/composition-api' // vue2升级写法
import { ref } from 'vue' // vue3写法

setup(){
    // 创建响应式数据对象 count，初始值为 0
    const count = ref(0)

    // 如果要访问 ref() 创建出来的响应式数据对象的值，必须通过 .value 属性才可以
    console.log(count.value) // 输出 0
    // 让 count 的值 +1
    count.value++
    // 再次打印 count 的值
    console.log(count.value) // 输出 1
}
```

### 在 template 中访问 ref 创建的响应式数据

1. 在 `setup()` 中创建响应式数据：

   ```js
   import { ref } from '@vue/composition-api' // vue2升级写法
   import { ref } from 'vue' // vue3写法
   
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
  count,
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
  c1,
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

### 不允许修改的计算属性(传入回调函数)

```vue
<template>
  <div>
    <p>computed的使用</p>
    <input v-model="age" />
    <p>{{ nextAge }}</p>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
export default {
  setup() {
    const age = ref(18)

    // 传入一个函数 computed 返回一个不允许修改的计算属性(即get属性)
    const nextAge = computed(() => {
      return parseInt(age.value) + 1
    })

    return {
      age,
      nextAge,
    }
  },
}
</script>
```

### 可修改的计算属性(传入对象)

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
  setup() {
    const age = ref(18)

    // 传入一个对象，包括get和set，可以创建一个可以修改的计算属性
    const nextAge2 = computed({
      get() {
        return parseInt(age.value) + 2
      },

      set() {
        age.value = age.value - 2
      },
    })

    return {
      age,
      nextAge2,
    }
  },
}
</script>
```

## watch

- 默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
- 通过配置deep为true, 来指定深度监视

接收三个参数：

参数一：监视的数据源 可以是 ref 或则是 一个函数

参数二：回调函数 (oldValue, value) => {}

参数三：额外的配置(立即执行和深度监视)

### 监听 ref

```vue
<template>
  <div>
    <p>watch的使用</p>
    {{ money }}
    <button @click="money++">修改money</button>
    {{ car.brand }}
    <button @click="car.brand = '奔驰'">修改brand</button>
    {{ msg }}
    <button @click="msg = 'vue'">修改msg</button>
  </div>
</template>

<script>
import { reactive, watch, toRefs, ref } from 'vue'
export default {
  setup() {
    const state = reactive({
      money: 100,
      car: {
        brand: '宝马',
      },
    })

    const msg = ref('hello')

    // 监听ref的复杂类型
    watch(msg, (value) => {
      console.log('数据发生了改变' + value)
    })

    return {
      ...toRefs(state),
      msg,
    }
  },
}
</script>
```

### 监听 reactive

```vue
<template>
  <div>
    <p>watch的使用</p>
    {{ money }}
    <button @click="money++">修改money</button>
    {{ car.brand }}
    <button @click="car.brand = '奔驰'">修改brand</button>
    {{ msg }}
    <button @click="msg = 'vue'">修改msg</button>
  </div>
</template>

<script>
import { reactive, watch, toRefs, ref } from 'vue'
export default {
  setup() {
    const state = reactive({
      money: 100,
      car: {
        brand: '宝马',
      },
    })

    const msg = ref('hello')

    // 监听reactive的简单类型
    watch(
      () => state.money,
      (value, oldValue) => {
        console.log('数据发生了改变' + value)
      }
    )

    // 监听reactive的复杂类型
    watch(
      () => state.car,
      (value, oldValue) => {
        console.log('数据发生了改变' + value)
      },
      {
        deep: true,
      }
    )

    // 监听reactive的多个值
    watch(
      [() => state.money, () => state.car],
      ([money, car], [oldMoney, oldCar]) => {
        console.log('数据发生了改变' + money, car)
      },
      {
        deep: true,
      }
    )

    return {
      ...toRefs(state),
      msg,
    }
  },
}
</script>
```

### 监听整个 state

```vue
<template>
  <div>
    <p>watch的使用</p>
    {{ money }}
    <button @click="money++">修改money</button>
    {{ car.brand }}
    <button @click="car.brand = '奔驰'">修改brand</button>
    {{ msg }}
    <button @click="msg = 'vue'">修改msg</button>
  </div>
</template>

<script>
import { reactive, watch, toRefs, ref } from 'vue'
export default {
  setup() {
    const state = reactive({
      money: 100,
      car: {
        brand: '宝马',
      },
    })
    const msg = ref('hello')

    // 监听整个reactive对象
    watch(
      state,
      (value) => {
        console.log('数据发生了改变' + value)
      },
      {
        deep: true,
      }
    )

    return {
      ...toRefs(state),
      msg,
    }
  },
}
</script>
```



## watchEffect

- 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
- **默认初始时就会执行第一次**
- 监视数据发生变化时回调



## 生命周期

使用vue3的生命周期需要在组件中引入

```js
import {onBeforeMount, onMounted,...} from 'vue'
```



### 与 2.x 版本生命周期相对应的组合式 API

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> **`onUnmounted`**
- `errorCaptured` -> `onErrorCaptured`



### 新增的钩子函数

组合式 API 还提供了以下调试钩子函数：

- onRenderTracked
- onRenderTriggered



## 自定义hook

相当于vue2的mixin

本质是一个函数，把setup函数中使用的Componsition API进行封装



## toRefs

**把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref**

应用: 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用

问题: reactive 对象取出的所有属性值都是非响应式的

解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性

```vue
<template>
  <h2>App</h2>
  <h3>foo: {{foo}}</h3>
  <h3>bar: {{bar}}</h3>
  <h3>foo2: {{foo2}}</h3>
  <h3>bar2: {{bar2}}</h3>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
export default {
  setup () {

    const state = reactive({
      foo: 'a',
      bar: 'b',
    })

    const stateAsRefs = toRefs(state)

    setTimeout(() => {
      state.foo += '++'
      state.bar += '++'
    }, 2000);

    const {foo2, bar2} = useReatureX()

    return {
      // ...state,
      ...stateAsRefs,
      foo2, 
      bar2
    }
  },
}

function useReatureX() {
  const state = reactive({
    foo2: 'a',
    bar2: 'b',
  })

  setTimeout(() => {
    state.foo2 += '++'
    state.bar2 += '++'
  }, 2000);

  return toRefs(state)
}

</script>
```



## ref获取元素

利用ref函数获取组件中的标签元素

功能需求: 让输入框自动获取焦点

```vue
<template>
  <input type="text" ref="inputRef">
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
export default {
  setup() {
    const inputRef = ref<HTMLElement|null>(null)

    onMounted(() => {
      inputRef.value && inputRef.value.focus()
    })

    return {
      inputRef
    }
  },
}
</script>
```



## shallowReactive 与 shallowRef

下面这几个都需要在使用的时候引入到不同的页面

- shallowReactive : 只能处理了对象内第一层的基本类型数据，第一层数据的复杂类型数据无法处理
- shallowRef: 只处理了value的响应式, 不进行对象的reactive处理
- reactive: 深度劫持(深度响应式)
- ref: 深度劫持(深度响应式)



## readonly 与 shallowReadonly

- readonly:
  - 深度只读数据
  - 获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
  - 只读代理是深层的：访问的任何嵌套 property 也是只读的。
- shallowReadonly
  - 浅只读数据
  - 创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换

```js
<template>
  <h2>App</h2>
  <h3>{{state}}</h3>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, readonly, shallowReadonly } from 'vue'
export default {
  setup () {

    const state = reactive({
      a: 1,
      b: {
        c: 2
      }
    })

    // const rState1 = readonly(state)
    const rState2 = shallowReadonly(state)

    const update = () => {
      // rState1.a++ // error
      // rState1.b.c++ // error

      // rState2.a++ // error
      rState2.b.c++
    }
    
    return {
      state,
      update
    }
  }
}
</script>
```



## toRaw 与 markRaw

- toRaw
  - 把代理对象变成了普通对象，数据变化，界面不发生变化
  - 返回由 `reactive` 或 `readonly` 方法转换成响应式代理的普通对象。
  - 这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
- markRaw
  - 标记一个对象，使其永远不会转换为代理。返回对象本身
  - 应用场景:
    - 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
    - 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。



## 配置文件解析

### `main.js`文件

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).mount('#app')
```

### `router.js`文件

```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'DayPage',
    component: () => import('../views/DayPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
```

### `store.js`文件

```js
import Vuex from 'vuex'

export default Vuex.createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
})
```

### `.vue`文件

```vue
<template>
  <!-- Vue2中的html模板必须要有一对根标签，Vue3组件的html模板中够可以没有根标签 -->
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
// defineComponent函数，目的是定义一个组件，内部可以传入一个配置对象
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
// 暴露出去一个定义好的组件
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
});
</script>
```



# 总结

- ref('zx')包装基本数据类型是RefImpl引用对象，该对象是通过Object.definedProperty的set和get实现数据劫持，修改时要通过.value的方式；
- ref({type: '01'})包装对象是Proxy代理对象，是经过reactive加工后的对象；
- **ref缺点要一直写.value才能修改数据**
- reactive({type: '01'})包装对象是Proxy代理对象，这个响应式是深层次的；
- 内容基于ES6的Proxy实现，通过代理对象对源数据对象进行操作；
-  [vue2和vue3响应式总结](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=146&spm_id_from=pageDriver) 
- **reactive缺点要一直写对象是谁person.xxx才能修改数据**



vue3实现响应式

- 通过Proxy代理：拦截对象中任意属性的变化，包括：属性值的读写，属性的添加，属性的删除等；
- 通过Reflect反射：对被代理对象的属性进行操作；

```js
let person = {
    name: 'zs',
    age: 18
}
const p = new Proxy(person, {
    // 读取
    get(target, propName){
        console.log('有人读取了p身上的属性')
        // return target[propName]
        return Reflect.get(target, propName)
    },
    // 修改或新增
    set(target, propName, newValue){
        console.log('有人修改了p身上的属性')
        // target[propName] = newValue
        Reflect.set(target, propName, newValue)
    },
    // 删除
    deleteProperty(target, propName){
        console.log('有人删除了p身上的属性')
        // return delete target[propName]
        return Reflect.deleteProperty(target, propName)
    },
    
})
```



- setup的执行时期比beforeCreate早
- setup参数props：值为对象，包含组件外部传过来且有声明接收的属性
- setup参数context：上下文对象
  - props：值为对象，包含组件外部传过来但没有在props配置中声明的$attrs属性，相当于`this.$attrs`
  - slots：收到插槽的内容，相当于`this.$slots`
  - setup参数emits：触发自定义事件的函数，相当于`this.$emit()`



watch

- 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视(deep配置失效)。
- 监视reactive定义的响应式数据中某个属性时：deep配置有效。
- watch套路：既要指明监视的属性，又要指明监视的回调。
- watchEffect套路：不用指明监视的属性，监视的回调中用到哪个属性，就监视哪个属性。(有点像computed)