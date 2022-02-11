# Vite+Vue3+TypeScript基础知识

## 1、学习背景

vue3.0不仅全面支持TypeScript语法，还对生命周期钩子进行了优化和剔除，加上工具setup的语法糖，vue单页面多个根元素的扩展，代码精简不说，还很有条理，vue3.0的出现再次提升了开发者的编码体验和幸福感。



## 2、vite简介

vite诞生是为了提升web项目运行性能，以更快的速度将应用页面展示给用户。Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

提供的驱动力：

2.1、优化缓慢的服务器启动（冷启动开发服务器和正式环境响应速度）；

2.2、优化缓慢的项目更新（vite服务器）；



## 3、vite创建项目

兼容性注意:

**Vite 需要 [Node.js](https://nodejs.org/en/) 版本 >= 12.0.0。**

**必须安装Volar插件，用vscode编辑器**

```js
// 安装vite
1、npm init vite@latest

// 安装vite同时创建vite项目
2、npm init vite@latest my-vue-app --template vue
```

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器
    "build": "vite build", // 为生产环境构建产物
    "serve": "vite preview" // 本地预览生产构建产物
  }
}
```



## 4、版本依赖兼容和项目目录介绍

package.json版本依赖说明, 这里是整个项目依赖版本配置，相关安装指令后面视频中会逐个教大家如何安装。

注意：**vuex和router都是4.0及以上版本的，否则用vue3时，找不到暴露的api**

```json
{
    "name": "vite-ts-vue3-plus-demo",
    "version": "0.0.0",
    "scripts": {
        "dev": "vite",
        "build": "vue-tsc --noEmit && vite build",
        "serve": "vite preview"
    },
    "dependencies": {
        "@element-plus/icons": "0.0.11",
        "dotenv": "^10.0.0",
        "element-plus": "^1.1.0-beta.7",
        "vue": "^3.0.5",
        "vue-router": "^4.0.11",
        "vuex": "^4.0.2"
    },
    "devDependencies": {
        "@types/node": "^16.7.1",
        "@vitejs/plugin-vue": "^1.3.0",
        "@vue/compiler-sfc": "^3.0.5",
        "node-sass": "^6.0.1",
        "sass": "^1.38.1",
        "sass-loader": "^12.1.0",
        "typescript": "^4.3.2",
        "vite": "^2.4.4",
        "vue-tsc": "^0.2.2"
    }
}
```

## 5、setup语法糖使用

**5.1 setup前身组合式API（基础用法）**

注意：在setup()中不能用this

```javascript
在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取，这也是为了避免setup()和其他选项式API混淆。
```

```vue
/* 参数说明
 * props 是响应式的，当传入新的 prop 时，它将被更新
 * context 是一个普通的上下文JavaScript对象，它暴露组件的三个 property（包括属性，插槽，方法）,
 * 如下示例1所示 
 */
// 示例1
<script>
    export default {
      setup(props, context) {
        // Attribute (非响应式对象)
        console.log(context.attrs)
        // 插槽 (非响应式对象)
        console.log(context.slots)
        // 触发事件 (方法)
        console.log(context.emit)
      }
    }
</script>
```

**5.2 setup后世（高级用法），推荐用法**

注意：defineProps不需要引入，vue单文件内部自动暴露的API

```js
<script setup lang="ts"><script>是在单文件组件（SFC）中使用组合式API的编译时的语法糖。相比普通的语法，它具有更多优势：
- 更少的样板内容，更简洁的代码，比如：省略了组件的注册声明，对象暴露return，methods,。
- 能够使用纯 Typescript 声明 props 和发出事件。
- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。
```

**注意点：**

**1、在setup语法糖中导入组件不需要注册声明，直接在视图中使用即可；**

**2、vue文件结构发生改变，js默认放到页面顶部，而视图template放到js下面，style放到页面底部；**

**3、导入vue文件必须写上文件后缀名.vue, 否则ts无法识别vue文件。**

示例对比：

```vue
// 基础用法
<script lang="ts">
    export default {
        props: {
            title: {
                type: String,
                default:()=>{return '测试信息'}
            }
        },
        setup(props:any) {
            console.log(props.title)
        }
    }
</script>
// 高级用法
<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            default:()=>{return '测试信息'}
        }
    })
    console.log(props.title);
</script>
```



## 6、defineProps 和 defineEmits

**`注意：defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的编译器宏**

为了声明 `props` 和 `emits` 选项且具备完整的类型推断，可以使用 `defineProps` 和 `defineEmits` API，它们在 `<script setup>` 中都是自动可用的：

- **`defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的****编译器宏**。他们不需要导入，且会在处理 `<script setup>` 的时候被编译处理掉。
- `defineProps` 接收与 `props` 选项相同的值，`defineEmits` 也接收 `emits` 选项相同的值。
- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断。
- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块范围内。



**6.1、子组件vue**

```vue
<template>
    <p>{{props.msg}}</p>
    <button @click="handleClick">点击我调用父组件方法</button>
</template>
<script setup lang="ts">
    const props = defineProps({
         msg:{
            type: String,
            default: () => '默认值'
         }
    })
    const  emit = defineEmits(['on-change', 'update'])
    const handleClick = () =>{
        emit('on-change', '父组件方法被调用了')
    }
</script>
```

**6.2 、父组件vue**

```vue
<script setup lang="ts">
    import TestPropsPmit from './components/test-props-emit/index.vue';
    import { ref } from 'vue';

    // 定义字符串变量
    const msg = ref('欢迎使用vite！')
	// 调用事件
    const handleChange = (params:string) =>{
        console.log(params);
    }
</script>
<template>
	<TestPropsPmit :msg="msg" @on-change="handleChange"></TestPropsPmit>
</template>
```



**温馨提示：这里介绍一哈volar插件小图标在vue文件里的作用：**

点击这个三角形图标，会将文件归类显示，方便编写代码；

![image-20220211104147877](https://gitee.com/yx102/pic/raw/master/img/202202111041954.png)



## 7、正确使用defineExpose

使用 `<script setup>` 的组件是**默认关闭**的，也即通过模板 ref 或者 `$parent` 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。

为了在 `<script setup>` 组件中明确要暴露出去的属性，使用 `defineExpose` 编译器宏：

**7.1、子组件暴露属性和方法，给父组件引用**

```vue
<script setup lang="ts">
function testChild():void{
    console.log('子组件方法testChild被调用了');
}
const b = ref(2)
// 统一暴露属性
defineExpose({
    obj:{name: '张三', age: 2300},
    b,
    testChild
})
</script>
```

**7.2、父组件调用子组件方法和属性**

```vue
<template>
    <TestPropsEmit ref="propsEmitRef" :msg='msg' @on-change="handleChange">         	</TestPropsEmit>
</template>
<script setup lang="ts">
    import TestPropsEmit from './components/test-props-emit/index.vue';
    import {ref, onMounted} from 'vue';

    const msg = ref('欢迎学习vite')

    const handleChange = (params:string)=>{
        console.log(params);
    }

    const propsEmitRef = ref()
    onMounted(()=>{
        console.log(propsEmitRef.value.child);
    })
</script>
```

**7.3 在setup如何定义变量(字符串,对象,数组)**

```vue
<template>
    <h2>{{count}} {{user.name}}</h2>
    <span v-for="(item, index) in arr" :key="index">{{item}}</span>
    <button @click="setName">点击我增加</button>
</template>
<script setup lang="ts">
    import { ref, reactive } from 'vue';
    // 字符串变量
    const count = ref(0)
    // 对象
    let user = reactive({
        name: '张三'
    })
    // 数组
    let arr = reactive(['1', '2', '3'])
    
    // 综合定义方案
    const originData = reactive({
        count: 0,
        user:{
            name: '张三'
        },
        arr: ['1', '2', '3']
    })
    
    // 方法
    const setName = ()=>{
        count.value++
        user.name = '李四'
    }
</script>
```



## 8、Watch和WatchEffect

**1、基本使用方法：**

```vue
<template>
    <p>{{originData.count}}  {{originData.user.name}}</p>
    <p v-for="(item, index) in originData.arr" :key="index">{{item}}</p>
    <button @click="incriment">点击我count增加</button>
</template>
<script setup lang="ts">
    import { ref, reactive, watchEffect, watch } from 'vue';

    const count = ref(0)
    const user = reactive({name: '张三'})
    const arr = reactive([1,2,3,4])

    // 综合定义方案
    const originData = reactive({
        count: 0,
        user:{
            name: '张三'
        },
        arr:[1,2,3,4]
    })
    const incriment = ()=>{
        originData.count++
        count.value++
        originData.user.name = '李四'
    }
	// 默认页面更新之前立即执行监听，懒执行开始
    watchEffect(() => console.log(count.value))
    // 默认监听数据变化后的值，页面更新后不会立即执行
    watch(count, (n, o) => {
        console.log('watch', n, o);
    })
    
    // 监听多个值
    watch([count, originData.user], (newValues, prevValues) => {
        console.log(newValues[0], newValues[1].name)
    })

    // 立即监听
    watch([count, originData.user], (newValues, prevValues) => {
        console.log(newValues[0], newValues[1].name)
    }, {deep: true, immediate: true})
   
</script>
  
```

**2、watch与 watchEffect 比较，推荐watch监听**

watch: 页面更新后不会立即执行，而watchEffect 它会执行；

如果要实现：watch在页面更新之后就执行，需要增加立即执行的属性；

```vue
watch([count,originData.user], (n, o)=> {console.log(n[0],n[1].name)}, {deep: true, immediate: true})
```



```
1、watch和watchEffect都懒执行副作用，不过watchEffect比较频繁，在vue组件更新之前执行；
2、watch更具体地说明什么状态应该触发侦听器重新运行，watchEffect就没有这么友好；
3、watch访问侦听状态变化前后的值。
```



## 9、在setup中的生命周期钩子

因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。

下表包含如何在 [setup ()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 内部调用生命周期钩子：

| 选项式 API        | Hook inside `setup`               |
| ----------------- | :-------------------------------- |
| `beforeCreate`    | Not needed*    不需要             |
| `created`         | Not needed*    不需要             |
| `beforeMount`     | `onBeforeMount` 挂载之前          |
| `mounted`         | `onMounted`    页面加载完成时执行 |
| `beforeUpdate`    | `onBeforeUpdate`                  |
| `updated`         | `onUpdated`                       |
| `beforeUnmount`   | `onBeforeUnmount`                 |
| `unmounted`       | `onUnmounted`  页面销毁时执行     |
| `errorCaptured`   | `onErrorCaptured`                 |
| `renderTracked`   | `onRenderTracked`                 |
| `renderTriggered` | `onRenderTriggered`               |
| `activated`       | `onActivated`                     |
| `deactivated`     | `onDeactivated`                   |

```typescript
<script setup lang="ts">
import { onMounted, onActivated, onUnmounted, onUpdated, onDeactivated } from 'vue';
// 读取环境变量
const mode = import.meta.env;
//   import HeadMenu from '@/components/head-menu/index.vue';
 onMounted(() => {
 console.log("组件挂载")
 })

 onUnmounted(() => {
 console.log("组件卸载")
 })

 onUpdated(() => {
 console.log("组件更新")
 })
 onActivated(() => {
 console.log("keepAlive 组件 激活")
 })

 onDeactivated(() => {
 console.log("keepAlive 组件 非激活")
 })
</script>
```



## 10、用Ts限制define(Emits|Props)参数类型

**注意：**

**1、在setup语法糖中引入组件不需要注册声明就可以直接用了**

**2、ts 限制组件传参类型，默认是必须传值的，否则控制台出现警告， 引入组件的地方会出现红色提醒，不想必传在绑定参数后加?即可** 

**3、ts传参支持多种类型校验，一个参数可以传字符串，数组，Boolean等**

**4、用ts方式限制defineEmits和defineProps参数类型**

1、子组件

```vue
<template >
    <h1>{{msg}}</h1>
    <h3>{{title}}</h3>
    <input v-model="inputValue" type="text" @blur="handleUpdate($event)">
</template>
<script setup lang="ts">
    import { ref } from "vue";
    defineProps<{
            msg?:(string | number),
            title?: string
        }>()
    
         // 提供默认值方式 1
        interface Props{
            msg?: (string | number | boolean), 
            title?: string[]
        }

        withDefaults(defineProps<Props>(), {
            msg: 'hello',
            title: () => ['one', 'two']
        })

        // 提供默认方式 2
        withDefaults(defineProps<{
            msg?: (string | number | boolean)
            title?: string
        }>(), {
            msg: 3,
            title: '默认标题'
        })

    // const  emit = defineEmits(['updateValue'])
    const emit = defineEmits<{
                        (event: 'change'): void,
                        (event: 'update', data: string): void
                }>()

    const inputValue = ref<any>()

    const handleUpdate = (event: any) =>{
        const { target } = event
        // console.log(target.value, 1111);
        emit('update', event.target.value)
    }
</script>
```

2、父组件

```vue
<script setup lang="ts">
    import CellSample from "./components/cell-samples/index.vue";
    
    const update = (data: any) =>{
        console.log(data);
    }
</script>

<template>
    <CellSample @update="update"></CellSample>
</template>


```



## 11、递归组件

一个单文件组件可以通过它的文件名被其自己所引用。例如：名为 `FooBar.vue` 的组件可以在其模板中用 `<FooBar/>` 引用它自己。

请注意这种方式相比于 import 导入的组件优先级更低。如果有命名的 import 导入和组件的推断名冲突了，可以使用 import 别名导入：

```vue
import { FooBar as FooBarChild } from './components'
```

注意：这里有小问题，当单文件引入单文件时会出现内存溢出现象

## 12、component动态组件

由于组件被引用为变量而不是作为字符串键来注册的，在 `<script setup>` 中要使用动态组件的时候，就应该使用动态的 `:is` 来绑定：

```vue
<script setup lang='ts'>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```



## 13、ts限制普通函数/箭头函数参数类型

**13.1  普通函数**

```vue
<script setup lang="ts">
   	function test(params:(string|boolean)):void {
        console.log(params);
    }
    test('5555')
</script>
```

**13.2  箭头函数，推荐用法**

```vue
<script setup lang="ts">
    const test = (params:(string|boolean))=>{
        console.log(params)
    }
    test('5555')
</script>
```



## 14、引入vuex配置和使用

**14.1 创建项目时我们已经引入了vuex4.0版本，接下来我们就开始配置vuex4.0并测试。**

```typescript
// 注意必须安装vuex4.0版本及以上
npm install vuex@next --save
#or
yarn add vuex@next --save
```

**14.2 在src目录下创建store文件夹，新建文件index.ts, index.ts内容如下所示：**

```typescript
import { InjectionKey } from 'vue'
/**
 * 引入 InjectionKey 并将其传入 useStore 使用过的任何地方，
 * 很快就会成为一项重复性的工作。为了简化问题，可以定义自己
 * 的组合式函数来检索类型化的 store 
 */
// 未简化useStore版
// import { createStore, Store } from 'vuex'
// 简化useStore版
import { useStore as baseUseStore, createStore, Store} from 'vuex'

// 为 store state 声明类型
export interface State {
    username: string,
    count: number
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

// 导出store模块
export const store = createStore<State>({
    state: {
        username: "测试store",
        count: 0
    },
    getters:{
        getName: state =>{
            return state.username
        }
    },
    mutations: {
        // 重置名称
        SET_NAME(state, params:string) {
            state.username = params
        }
    },
    actions:{}
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
    return baseUseStore(key)
}
```



**14.3 在根目录下新建vuex-d.ts文件，内容如下所示：**

```typescript
// 一个声明文件来声明 Vue 的自定义类型 ComponentCustomProperties
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
    // 声明自己的 store state
    interface State {
        count: number,
        username: string
    }
    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
```

**14.4  在main.ts中注入store模块**

```typescript
import { createApp } from 'vue';
import App from './App.vue';
// 导入store模块, 传入 injection key
import { store, key } from '@/store';
const app = createApp(App)
app.use(store, key)
app.mount('#app')
```

**14.5  引用测试vuex配置是否正确**

```vue
<el-button @click="changeName" size="small">点击修改名称</el-button>
<script setup lang="ts">
// vue 组件
import { useStore } from '@/store';
const store = useStore()
// 测试store重置名称
// store.commit('increment', 10)
function changeName():void{
    store.commit('SET_NAME', 10)
    console.log('修改后的名称：'+store.getters.getName);
}
console.log(store.state.count,store.getters.getName)
</script>
```



## 15、router配置以及使用详解

**15.1 安装**

**创建项目时我们已经引入了router4.0版本，接下来我们就开始配置router4.0并测试。**

```typescript
// 注意：安装router必须是4.0及以上
npm install vue-router@4
```



**15.2 在src目录下创建router文件夹，然后创建index.ts文件，内容如下所示：**

```typescript
import { createRouter, createWebHashHistory } from "vue-router";
import LayOut from "../components/layout/index.vue";

const routes = [
    {
        path: '/',
        component: LayOut,
        redirect: '/home',
        children:[
            {
                path: '/home',
                name: 'home',
                component: ()=> import("../pages/home/index.vue"),
                meta:{
                    title: '首页',
                    icon: ''
                }
            },
            {
                path: '/about',
                name: 'about',
                component: ()=> import("../pages/about/index.vue"),
                meta:{
                    title: '关于',
                    icon: ''
                }
            }
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
```



**15.3 在main.ts中注入router模块, 重新启动项目，访问路由，看是否正确**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store';
import router from './router';

const app = createApp(App);
app.use(store, key);
app.use(router);
app.mount('#app');
```

**15.4  使用路由**

```vue
<template>
    <div class="action">
        <h2 @click="handleClick(1)">首页</h2>
        <h2 @click="handleClick(0)">关于</h2>
    </div>
</template>
<script setup lang="ts">
    import { useRouter } from 'vue-router';
    const router = useRouter()

    const handleClick = (num: number)=>{
        if (num) {
            router.push({name: 'home'})
        }else router.push({name: 'about'})
    }
</script>
<style >
    .action{
        display: flex;
    }
    h2{
        padding: 0px 10px;
        cursor: pointer;
    }
    h2:hover{
        color: red;
    }
</style>

```



## 16、引入element-plus以及注意事项

**16.1 安装**

```js
npm install element-plus --save
# or
yarn add element-plus

# 安装icon图标依赖库
npm install @element-plus/icons
# or
yarn add @element-plus/icons
```



**16.2 在main.ts 文件中引入配置**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store';
// 注入路由
import router from './router';

// 引入ui组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(store, key);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
```



**16.3 在vue文件中引用ui组件**

1、单个图标引用

```vue
<template>
    <el-icon :size="20" :color="'blue'">
        <edit />
    </el-icon>
</template>
<script setup lang="ts">
    import { Edit } from '@element-plus/icons'
</script>
```

2、全局注册图标使用

```typescript
import { createApp } from 'vue'
import App from './App.vue'

import { Edit,Search } from '@element-plus/icons'

const app = createApp(App);
app.component("edit", Edit)
app.component("search", Search)
app.mount('#app');
```

2、1 使用图标

```vue
<template>
    <h2>home页面</h2>
    <el-button type="primary" >主要按钮</el-button>
    <el-button type="success" >成功按钮</el-button>
    <el-icon :size="20" :color="'blue'">
        <edit />
    </el-icon>
    <el-icon :size="20">
        <search></search>
    </el-icon>
</template>
<script setup lang="ts"> 
</script>
```



## 17、配置vite.config.ts

这里主要配置vite服务器的打包保存地址，打包分解，端口号，是否自动打开浏览器，远程请求地址代理目标，目录别名，全局样式配置等。

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
// nodejs写法，获取项目目录
import path from 'path';

// https://vitejs.dev/config/
export default({ command, mode }) => {
    return defineConfig({
        plugins: [vue()],
        server:{
            host: '127.0.0.1',
            port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
            strictPort: true, // 端口被占用直接退出
            https: false,
            open: true,// 在开发服务器启动时自动在浏览器中打开应用程序
            proxy: {
                // 字符串简写写法
                // '/foo': '',
                // 选项写法
                '/api': {
                    target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
                // 正则表达式写法
                // '^/fallback/.*': {
                //   target: 'http://jsonplaceholder.typicode.com',
                //   changeOrigin: true,
                //   rewrite: (path) => path.replace(/^\/fallback/, '')
                // },
            },
            hmr:{
                overlay: true // 屏蔽服务器报错
            }
        },
        resolve:{
            alias:{
                '@': path.resolve(__dirname,'./src')
            }
        },
        css:{
            // css预处理器
            preprocessorOptions: {
                // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
                // 给导入的路径最后加上 ;
                scss: {
                    additionalData: '@import "@/assets/styles/global.scss";'
                }
            }
        },
        build:{
            chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
            rollupOptions: {
                output:{
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
    })   
}
```



## 18、tsconfig.json 配置

这是typescript的识别配置文件，也是ts向js转化的中间站，这里配置了许多关于ts的文件类型和策略方法。

```typescript
{
    "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "paths": {
        "@/*":["src/*"]
    }
  },
  	"include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```



## 19、env.d.ts配置, 声明vue文件全局模块

这里是配置声明，比如css，vue等文件，ts不能识别，需要配置声明模块类型。

```typescript
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
```



## 20、安装scss并配置全局样式文件

```typescript
// 注意要使用scss，必须安装依赖，否则报错
npm install node-sass sass-loader sass -D
```

**20.1  需要在src目录的assets静态目录新增一个全局global.scss文件，其他样式文件导入到该文件即可全局使用和修改。**

![](E:\vue_project\demos\vite-vue3-ts-volar\vite+vue3最新技术栈文档\csss.png)

或者在global.scss写一个单独属性测试

```scss
$color-primary: #007aff;
```

vue使用全局样式变量

```vue
<template>
    <h2 class="test-color">home页面</h2>
</template>
```

```scss
<style lang="scss" scoped>
    .test-color{
        color: $color-primary;
    }
</style>
```

**20.2  在vite.config.ts 文件中配置global.scss**

```typescript
 css:{
     // css预处理器
     preprocessorOptions: {
         // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
         // 给导入的路径最后加上 ;
         scss: {
             additionalData: '@import "@/assets/styles/global.scss";'
         }
     }
 }
```



## 21、响应式API

21.1 、ref

响应式状态需要明确使用[响应式 APIs](https://v3.cn.vuejs.org/api/basic-reactivity.html) 来创建。和从 `setup()` 函数中返回值一样，ref 值在模板中使用的时候会自动解包：

```vue
<script setup lang='ts'>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

21.2、toRefs 

将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。

当从组合式函数返回响应式对象时，`toRefs` 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开：

```typescript
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // 操作 state 的逻辑

  // 返回时转换为ref
  return toRefs(state)
}

export default {
  setup() {
    // 可以在不失去响应性的情况下解构
    const { foo, bar } = useFeatureX()

    return {
      foo,
      bar
    }
  }
}
```

`toRefs` 只会为源对象中包含的 property 生成 ref。如果要为特定的 property 创建 ref，则应当使用 [`toRef`](https://v3.cn.vuejs.org/api/refs-api.html#toref)

21.3、roRef

可以用来为源响应式对象上的某个 property 新创建一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

```typescript
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

即使源 property 不存在，`toRef` 也会返回一个可用的 ref。这使得它在使用可选 prop 时特别有用，可选 prop 并不会被 [`toRefs`](https://v3.cn.vuejs.org/api/refs-api.html#torefs) 处理。

## 22、.env.环境变量配置和读取

环境变量建议放到项目根目录下, 方便vite.config.ts文件读取和使用

```elixir
.env.production // 生产环境配置文件
.env.development // 开发环境配置文件
```

**22.1 生产和开发环境配置文件内容如下：**

**写变量时一定要以VITE_开头，才能暴露给外部读取**

```js
# 开发环境 / #生产环境
VITE_APP_TITLE = "前端技术栈"
VITE_APP_PORT = 3001

# 请求接口
VITE_APP_BASE_URL = "http://39.12.29.12:8080"

//env.d.ts文件内进行 环境变量智能提示配置
interface ImportMetaEnv {
     VITE_APP_TITLE: string,
     VITE_APP_PORT: string,
     VITE_APP_BASE_URL: string
}
```

**22.2 vite.config.ts 读取配置文件**

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
// nodejs写法，获取项目目录
import path from 'path';

// https://vitejs.dev/config/
export default({ command, mode }) => {
    // console.log(command, mode, 5555);
    return defineConfig({
        plugins: [vue()],
        server:{
            host: '127.0.0.1',
            port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
            strictPort: true, // 端口被占用直接退出
            https: false,
            open: true,// 在开发服务器启动时自动在浏览器中打开应用程序
            proxy: {
                // 字符串简写写法
                // '/foo': '',
                // 选项写法
                '/api': {
                    target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                },
                // 正则表达式写法
                // '^/fallback/.*': {
                //   target: 'http://jsonplaceholder.typicode.com',
                //   changeOrigin: true,
                //   rewrite: (path) => path.replace(/^\/fallback/, '')
                // },
                // 使用 proxy 实例
                // '/api': {
                //   target: 'http://jsonplaceholder.typicode.com',
                //   changeOrigin: true,
                //   configure: (proxy, options) => {
                //     // proxy 是 'http-proxy' 的实例
                //   },
                // }
            },
            hmr:{
                overlay: true // 屏蔽服务器报错
            }
        },
        resolve:{
            alias:{
                '@': path.resolve(__dirname,'./src')
            }
        },
        css:{
            // css预处理器
            preprocessorOptions: {
                // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
                // 给导入的路径最后加上 ;
                scss: {
                    additionalData: '@import "@/assets/styles/global.scss";'
                },
                sass: {
                    additionalData: '@import "@/assets/styles/global.scss";'
                }
            }
        },
        build:{
            chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
            rollupOptions: {
                output:{
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                }
            }
        }
    })   
}
```

**22.3 其他文件读取环境变量**

```vue
<template>
    首页内容展示
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
// 读取环境变量
const mode = import.meta.env;
onMounted(()=>{
    console.log(mode,555);
})
</script>
```

## 23、【补充】mixin混入模式

vue2.0中的Mixin 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个 mixin 对象可以包含任意组件选项。当组件使用 mixin 对象时，所有 mixin 对象的选项将被“混合”进入该组件本身的选项。

**Mixin缺点温馨提示：**

在 Vue 2 中，mixin 是将部分组件逻辑抽象成可重用块的主要工具。但是，他们有几个问题：

- Mixin 很容易发生冲突：因为每个 mixin 的 property 都被合并到同一个组件中，所以为了避免 property 名冲突，你仍然需要了解其他每个特性。
- 可重用性是有限的：我们不能向 mixin 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。

为了解决这些问题，我们添加了一种通过逻辑关注点组织代码的新方法：[组合式 API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)。

**换言之: 在vue3.0里是不推荐使用mixin混入开发的，更加推荐使用组合式API，将页面操作数据的功能进行代码拆分，更好的发挥大型项目下共享和复用代码，在代码的可维护性和扩展性得以长存。**





## 24、【补充】顶层的绑定会被暴露给模板

当使用 `<script setup>` 的时候，任何在 `<script setup>` 声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 都能在模板中直接使用

```vue
<script setup lang="ts">
import { capitalize } from './helpers'
// 变量
const msg = 'Hello!'

// 函数
function log() {
  console.log(msg)
}
</script>

<template>
  <div @click="log">{{ msg }}</div>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## 25、【补充】teleport传送门

teleport必须是有效的查询选择器或 HTMLElement (如果在浏览器环境中使用)。指定将在其中移动 `<teleport>` 内容的目标元素，disabled` - `boolean此可选属性可用于禁用 `<teleport>` 的功能，这意味着其插槽内容将不会移动到任何位置，而是在你在周围父组件中指定了 `<teleport>` 的位置渲染。

**25.1 创建带传送门的组件**

```vue
<template>
    <teleport to=".teleport-one">
        <div>
            我是Teleport内容
        </div>
    </teleport>
</template>
```

**25.2 teleport混合component使用**

```vue
<template>
    <div class="teleport-one">
        传送门1
    </div>
    <div class="teleport-two">
        传送门2
    </div>
    <TestTeleport></TestTeleport>
</template>
<script setup lang="ts">
    import TestTeleport from "@/components/test-teleport/index.vue";
</script>
```



## 26、【补充】computed使用

与 `ref` 和 `watch` 类似，也可以使用从 Vue 导入的 `computed` 函数在 Vue 组件外部创建计算属性。让我们回到 counter 的例子：

```typescript
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2
```

**注意：**

接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 对象。

```javascript
// 不能这样使用
twiceTheCounter.value++ //错误用法
```
