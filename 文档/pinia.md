# Vue3+Vite+Pinia

概述：pinia是vuejs的一员，[Pinia](https://pinia.vuejs.org/introduction.html)和vuex都属于vue状态管理仓库，同时支持vue2和vue3，模块化设计，便于拆分状态。不过vuex的语法比pinia复杂一点，而pinia更加像vuex的缩减版，使用方便，极易上手，效率更高。



#### Pinia的特点

@ Pinia 不支持嵌套存储。相反，它允许你根据需要创建store。但是，store仍然可以通过在另一个store中导入和使用store来隐式嵌套
@ 存储器在被定义的时候会自动被命名。因此，不需要对模块进行明确的命名。
@ Pinia允许你建立多个store，让你的捆绑器代码自动分割它们
@ Pinia允许在其他getter中使用getter
@ Pinia允许使用 $patch 在devtools的时间轴上对修改进行分组。

@ Pinia允许状态名唯一，不重复。



#### Vuex 和 Pinia 的优缺点

Vuex的优点

支持调试功能，如时间旅行和编辑
适用于大型、高复杂度的Vue.js项目
Vuex的缺点

从 Vue 3 开始，getter 的结果不会像计算属性那样缓存
Vuex 4有一些与类型安全相关的问题
Pinia的优点

完整的 TypeScript 支持：与在 Vuex 中添加 TypeScript 相比，添加 TypeScript 更容易
极其轻巧（体积约 1KB）
store 的 action 被调度为常规的函数调用，而不是使用 dispatch 方法或 MapAction 辅助函数，这在 Vuex 中很常见
支持多个Store
支持 Vue devtools、SSR 和 webpack 代码拆分
Pinia的缺点

不支持时间旅行和编辑等调试功能

#### 1、用vite创建vite+vue3+js项目；

```bash
npm init vite@latest
```

注意：这里根据自己实际需求自定义项目架构。目前这里我用的是js+vite+vue3结构作为案例基础框架。

#### 2、vue3添加Pinia

注意：pinia默认对应vue3版本的，请不要搞错。

```bash
npm install pinia@next
```

注意：如果你使用vue2则必须安装组合式API否则无法使用pinia

```bash
npm install pinia @vue/composition-api
```

#### 3、在main.js中引入pinia

```js
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(createPinia())
app.mount('#app')
```

#### 4、创建pinia的store文件夹

pinia文件放在项目src下的store文件夹下。

注意：在pinia中id必须唯一，可以在devtool工具内部查询到所有store状态值。同时可以以此命名其他store，比如：mian，user，good等等。pinia和vuex有个通用特性就是当刷新页面的时候，修改的状态会丢失，建议持久化状态值。

创建main.js

```javascript
import { defineStore } from 'pinia'

export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        counter: localStorage.getItem('counter') || 0,
        name: 'Eduardo',
    }),
    getters: {
        doubleCount: (state) => state.counter * 2
    },
    actions: {
        resetCounter(param) {
            this.counter = param
            localStorage.setItem('counter', this.counter)
        },
    },
})
```

注意：这里的this.counter中的this指向state

创建user.js

```javascript
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        username: localStorage.getItem('username') || 'ZhangSan',
        age: 0
    }),
    getters: {
        // username: (state) => state.username
    },
    actions: {
        resetName(param) {
            this.username = param
            localStorage.setItem('username', this.username)
        },
    },
})
```

```ts
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    name: "超级管理员",
  }),
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async insertPost(data: string) {
      // 可以做异步
      // await doAjaxRequest(data);
      this.name = data;
    },
  },
});
```

#### 5、vue.config.js配置别名

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: { // 设置项目文件导入路径
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
})
```

#### 6、vue组件中使用pinia

```vue
<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { useUserStore } from "@/stores/user"
import { storeToRefs, mapActions } from 'pinia'

const main = useMainStore()
const { counter, doubleCount } = storeToRefs(main)

const userStore = useUserStore()
const { username } = storeToRefs(userStore)

defineProps({
    msg: String
})

const count = ref(0)

function increase(params) {
    main.resetCounter(22)
}

function changeName(params) {
    // console.log(params.target.value)
    userStore.resetName(params.target.value)
}
</script>

<template>
    <h1>{{ msg }}</h1>
    <p>{{ counter }} {{ doubleCount }}</p>
    <p>用户名：{{username}}</p>
    <input type="text" @input="changeName">
    <button type="button" @click="count++">count is: {{ count }}</button>
    <button type="button" @click="increase">重置counter</button>
</template>
```

#### 7、通过actions修改状态

7.1  传参修改状态username

```js
function changeName(params) {
    userStore.resetName(params.target.value)
}
```

7.2  直接修改

```js
function changeName(params) {
    userStore.username = params.target.value
}
```

7.3  批量修改状态

```js
userStore.$patch( state =>{
    state.age = 30
    state.username = 'Lisi'
})
```

