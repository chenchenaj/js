

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