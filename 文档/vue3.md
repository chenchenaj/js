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



# 一、vue2.x 项目转换成 3.x 的方式

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



# 二、Vue3基本语法

## 响应式原理

### vue2.x的响应式

- 实现原理：

  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, 'count', {
        get () {}, 
        set () {}
    })
    ```

- 存在问题：

  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

### vue3实现响应式

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

```js
//情况一：监视ref定义的响应式数据
watch(sum,(newValue,oldValue)=>{
	console.log('sum变化了',newValue,oldValue)
},{immediate:true})

//情况二：监视多个ref定义的响应式数据
watch([sum,msg],(newValue,oldValue)=>{
	console.log('sum或msg变化了',newValue,oldValue)
}) 

/* 情况三：监视reactive定义的响应式数据
			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
*/
watch(person,(newValue,oldValue)=>{
	console.log('person变化了',newValue,oldValue)
},{immediate:true,deep:false}) //此处的deep配置不再奏效

//情况四：监视reactive定义的响应式数据中的某个属性
watch(()=>person.job,(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true}) 

//情况五：监视reactive定义的响应式数据中的某些属性
watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true})

//特殊情况
watch(()=>person.job,(newValue,oldValue)=>{
    console.log('person的job变化了',newValue,oldValue)
},{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
```



## watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```



## 生命周期

使用vue3的生命周期需要在组件中引入

```js
import {onBeforeMount, onMounted,...} from 'vue'
```

vue2生命周期

<img src="https://cn.vuejs.org/images/lifecycle.png" alt="lifecycle_2"/>



vue3生命周期<img src="https://v3.cn.vuejs.org/images/lifecycle.svg" alt="lifecycle_3" />

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

# 三、其它 Composition API

## 1.shallowReactive 与 shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

## 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

## 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

## 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

- 实现防抖效果：

  ```vue
  <template>
  	<input type="text" v-model="keyword">
  	<h3>{{keyword}}</h3>
  </template>
  
  <script>
  	import {ref,customRef} from 'vue'
  	export default {
  		name:'Demo',
  		setup(){
  			// let keyword = ref('hello') //使用Vue准备好的内置ref
  			//自定义一个myRef
  			function myRef(value,delay){
  				let timer
  				//通过customRef去实现自定义
  				return customRef((track,trigger)=>{
  					return{
  						get(){
  							track() //告诉Vue这个value值是需要被“追踪”的
  							return value
  						},
  						set(newValue){
  							clearTimeout(timer)
  							timer = setTimeout(()=>{
  								value = newValue
  								trigger() //告诉Vue去更新界面
  							},delay)
  						}
  					}
  				})
  			}
  			let keyword = myRef('hello',500) //使用程序员自定义的ref
  			return {
  				keyword
  			}
  		}
  	}
  </script>
  ```

  

## 5.provide 与 inject

<img src="https://v3.cn.vuejs.org/images/components_provide.png" style="width:300px" />

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 套路：父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

     ```js
     setup(){
     	......
         let car = reactive({name:'奔驰',price:'40万'})
         provide('car',car)
         ......
     }
     ```

  2. 后代组件中：

     ```js
     setup(props,context){
     	......
         const car = inject('car')
         return {car}
     	......
     }
     ```

## 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

# 四、Composition API 的优势

## 1.Options API 存在的问题

使用传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改 。

<div style="width:600px;height:370px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:600px;float:left" />
</div>
<div style="width:300px;height:370px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:560px;left" /> 
</div>
















## 2.Composition API 的优势

我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起。

<div style="width:500px;height:340px;overflow:hidden;float:left">
    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>
<div style="width:430px;height:340px;overflow:hidden;float:left">
    <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image"style="height:360px"/>
</div>














# 五、新的组件

## 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

  ```vue
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

## 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
    			<template v-slot:default>
    				<Child/>
    			</template>
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

# 六、其他

## 1.全局API的转移

- Vue 2.x 有许多全局 API 和配置。

  - 例如：注册全局组件、注册全局指令等。

    ```js
    //注册全局组件
    Vue.component('MyButton', {
      data: () => ({
        count: 0
      }),
      template: '<button @click="count++">Clicked {{ count }} times.</button>'
    })
    
    //注册全局指令
    Vue.directive('focus', {
      inserted: el => el.focus()
    }
    ```

- Vue3.0中对这些API做出了调整：

  - 将全局的API，即：```Vue.xxx```调整到应用实例（```app```）上

    | 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)                        |
    | ------------------------- | ------------------------------------------- |
    | Vue.config.xxxx           | app.config.xxxx                             |
    | Vue.config.productionTip  | <strong style="color:#DD5145">移除</strong> |
    | Vue.component             | app.component                               |
    | Vue.directive             | app.directive                               |
    | Vue.mixin                 | app.mixin                                   |
    | Vue.use                   | app.use                                     |
    | Vue.prototype             | app.config.globalProperties                 |

## 2.其他改变

- data选项应始终被声明为一个函数。

- 过度类名的更改：

  - Vue2.x写法

    ```css
    .v-enter,
    .v-leave-to {
      opacity: 0;
    }
    .v-leave,
    .v-enter-to {
      opacity: 1;
    }
    ```

  - Vue3.x写法

    ```css
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
    
    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    ```

- <strong style="color:#DD5145">移除</strong>keyCode作为 v-on 的修饰符，同时也不再支持```config.keyCodes```

- <strong style="color:#DD5145">移除</strong>```v-on.native```修饰符

  - 父组件中绑定事件

    ```vue
    <my-component
      v-on:close="handleComponentEvent"
      v-on:click="handleNativeClickEvent"
    />
    ```

  - 子组件中声明自定义事件

    ```vue
    <script>
      export default {
        emits: ['close']
      }
    </script>
    ```

- <strong style="color:#DD5145">移除</strong>过滤器（filter）

  > 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是 “只是 JavaScript” 的假设，这不仅有学习成本，而且有实现成本！建议用方法调用或计算属性去替换过滤器。

- ......

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