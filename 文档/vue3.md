## 直接创建vue3项目

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

### **ref**

- 作用: 定义一个数据的响应式(**一般用来定义一个基本类型的响应式数据**)
- 语法: const xxx = ref(initValue):
  - 创建一个包含响应式数据的引用(reference)对象
  - **js中操作数据: xxx.value**
  - 模板中操作数据: 不需要.value
  - ref对象的类型是Ref，reactive对象的类型是Proxy

```vue
<template>
  <h2>{{count}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script>
import {
  ref
} from 'vue'
export default {
  /* 使用vue3的composition API */
  setup () {
    // 定义响应式数据 ref对象
    const count = ref(1)
    console.log(count)
    // 更新响应式数据的函数
    function update () {
      // alert('update')
      count.value = count.value + 1
    }

    // 需要将数据和方法都暴露出去
    return {
      count,
      update
    }
  }
}
</script>
```

### **reactive**

- 作用: 定义**多个数据的响应式**
- const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
- 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
- 注意：如果当前对象没有被reactive包裹直接在update中写obj.name='xx'是不会发生改变的，要响应式数据才会发生改变；
- 被reactive包裹的属于代理对象，没有被包裹的属于目标对象，**增删改操作都需要使用代理对象**

```vue
<template>
  <h2>name: {{state.name}}</h2>
  <h2>age: {{state.age}}</h2>
  <h2>wife: {{state.wife}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script>
/* 
reactive: 
    作用: 定义多个数据的响应式
    const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
    响应式转换是“深层的”：会影响对象内部所有嵌套的属性
    内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
*/
import {
  reactive,
} from 'vue'
export default {
  setup () {
    /* 
    定义响应式数据对象
    */
    const state = reactive({
      name: 'tom',
      age: 25,
      wife: {
        name: 'marry',
        age: 22
      },
    })
    console.log(state, state.wife)

    const update = () => {
      state.name += '--'
      state.age += 1
      state.wife.name += '++'
      state.wife.age += 2
    }
    
    // =======================================================
    const obj = { // 此时的obj属于目标对象
      name: 'tom',
      age: 25,
      wife: {
        name: 'marry',
        age: 22
      },
    }
    const user = reactive(obj) // 此时user属于代理对象
    // ========================================================

    return {
      state,
      update,
    }
  }
}
</script>
```





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

**setup** 函数会在 **beforeCreate** 之后、**created** 之前执行，**只执行一次**



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

`ref()` 函数用来根据给定的值创建一个**响应式**的**数据对象**(基本类型的数据)，`ref()` 函数调用的返回值是一个对象，这个对象上只包含一个 `.value` 属性：

```js
import { ref } from '@vue/composition-api'

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

