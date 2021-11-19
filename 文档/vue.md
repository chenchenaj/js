## Vue简介

### 单页面应用程序
- Single Page Application

---

### 是什么
- 可以轻松构建 **SPA 应用程序**
- 通过 **指令** 扩展了 HTML，通过 **表达式** 绑定数据到 HTML
- **最大程度上解放了 DOM 操作**
- **它能让你更加的享受编程的乐趣**
---

### Vue 特点

- 简单易用
- 渐进式
- 高效
  - 压缩之后仅 20kb 大小
  - 虚拟 DOM
- MVVM
- 双向数据绑定
- 组件化
### 创建一个 Vue 的实例

每个 Vue 应用都是通过 `Vue` 函数创建一个新的 **Vue 实例**开始的：

```javascript
var vm = new Vue({
  // 选项
})
```

#### `el` 选项

提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

- 不能作用到 `<html>` 或者 `<body>` 上
- 也可以通过 `实例.$mount()` 手动挂载

#### `data` 选项

- 响应式数据
- 可以通过 `vm.$data` 访问原始数据对象
- Vue 实例也代理了 data 对象上所有的属性，因此访问 `vm.a` 等价于访问 `vm.$data.a`
- 视图中绑定的数据必须显式的初始化到 data 中

#### `methods` 选项

methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 Vue 实例。

!> 注意，**不应该使用箭头函数来定义 method 函数** (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.a` 将是 undefined。

示例：

```vue
<div id="app">
     <p>{{a}}</p>
</div>

var vm = new Vue({
  el:'#app'
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
```



### 数据代理

#### Object.defineProperty

通过Object.defineProperty定义出来的值不会一开始就显示出来，会出现(...)这样的字符，点击(...)的时候会触发当前属性的getter和setter属性

```js
<script type="text/javascript" >
    let number = 18
    let person = {
        name:'张三',
        sex:'男',
    }

    Object.defineProperty(person,'age',{
        // value:18,
        // enumerable:true, //控制属性是否可以枚举，默认值是false
        // writable:true, //控制属性是否可以被修改，默认值是false
        // configurable:true //控制属性是否可以被删除，默认值是false

        //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
        get(){
            console.log('有人读取age属性了')
            return number
        },

        //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
        set(value){
            console.log('有人修改了age属性，且值是',value)
            number = value
        }

    })

    console.log(person)
</script>
```



#### 数据代理

1.Vue中的数据代理：**通过vm对象来代理data对象中属性的操作（读/写）**

2.Vue中数据代理的好处：更加方便的操作data中的数据

3.基本原理：

- 通过Object.defineProperty()把data对象中所有属性添加到vm上。
- 为每一个添加到vm上的属性，都指定一个getter/setter。
- 在getter/setter内部去操作（读/写）data中对应的属性。



## Directives指令概念和语法

### 系统内置指令
#### [v-text](https://cn.vuejs.org/v2/api/#v-text)

- 和 `{{}}` 一样的，唯一的区别是
- `{{}}` 会造成闪烁问题
- `v-text` 不会有闪烁问题
- 如果还想用 `{{}}` 又不想有闪烁问题，则使用 `v-cloak` 来处理



#### [v-html](https://cn.vuejs.org/v2/api/#v-html)

输出真正的 HTML：

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

#### [v-show](https://cn.vuejs.org/v2/api/#v-show)

- 条件显示和隐藏
- 无论真假，都会渲染显示在 DOM 结构中
- 条件为真，则让 display 显示
- 条件为假，则 display 不显示
- 如果需要频繁的切换显示和隐藏，则使用 v-show

#### [v-if](https://cn.vuejs.org/v2/api/#v-if)

- 真正的条件渲染
- 条件为真，则渲染这个 DOM
- 条件为假，则移除不渲染这个 DOM
- 如果只是一次显示或隐藏，则建议 v-if
- v-if 和 v-show
  - 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

#### [v-else](https://cn.vuejs.org/v2/api/#v-else)

#### [v-else-if](https://cn.vuejs.org/v2/api/#v-else-if)

#### [v-for](https://cn.vuejs.org/v2/api/#v-for)

##### 获取数组

```html
<div v-for="item in (data中的数组属性)">
<div v-for="(item,index) in (data中的数组属性)">  // index是索引下标
```

##### 获取对象时候

```html
<div v-for="item in (data中的数组属性)">
<div v-for="(value,key,index) in (data中的对象)" :key="key">  // value是对象的值 key是键（用于唯一标识） index是索引下标
```

##### 拓展

for循环的高级写法

```js
// 1.第一种
for(变量 索引值 in 循环的那个数组){}
for(let i in this.books){}
// 2.第二种
for(变量 对象key对应的值 in 循环的那个数组){}
for(let item of this.books){}  // 这里item类似于 v-for="item in books"中的item
```



#### [v-on](https://cn.vuejs.org/v2/api/#v-on)

##### 修饰符

- **@click.stop：修饰符阻止冒泡**

- **@click.prevent：阻止默认行为**

- **@keyup.enter="keyUp":点击回车触发事件**

- **@click.once：只触发一次事件**

- **@click.native：组件原生点击事件**

- **@click.capture:使用事件的捕获模式**

- **@click.self:只有在event.target是当前操作的元素时才触发事件**

- **@click.passive:事件的默认行为立即执行，无需等待事件回调执行完毕**

- 键盘事件：回车 => enter；删除 => delete (捕获“删除”和“退格”键)；退出 => esc；空格 => space；

  换行 => tab (特殊，必须配合keydown去使用)；上 => up；下 => down；左 => left；右 => right；
  
  ```html
<body>
      <!-- 准备好一个容器-->
      <div id="root">
          <h2>欢迎来到{{name}}学习</h2>
          <!-- 阻止默认事件（常用） -->
          <a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>
  
          <!-- 阻止事件冒泡（常用） -->
          <div class="demo1" @click="showInfo">
              <button @click.stop="showInfo">点我提示信息</button>
              <!-- 修饰符可以连续写 -->
              <!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
          </div>
  
          <!-- 事件只触发一次（常用） -->
          <button @click.once="showInfo">点我提示信息</button>
  
          <!-- 使用事件的捕获模式 -->
          <div class="box1" @click.capture="showMsg(1)">
              div1
              <div class="box2" @click="showMsg(2)">
                  div2
              </div>
          </div>
  
          <!-- 只有event.target是当前操作的元素时才触发事件； -->
          <div class="demo1" @click.self="showInfo">
              <button @click="showInfo">点我提示信息</button>
          </div>
  
          <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
          <ul @wheel.passive="demo" class="list">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
          </ul>
  
      </div>
  </body>
  
  <script type="text/javascript">
      Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
  
      new Vue({
          el:'#root',
          data:{
              name:'尚硅谷'
          },
          methods:{
              showInfo(e){
                  alert('同学你好！')
                  // console.log(e.target)
              },
              showMsg(msg){
                  console.log(msg)
              },
              demo(){
                  for (let i = 0; i < 100000; i++) {
                      console.log('#')
                  }
                  console.log('累坏了')
              }
          }
      })
  </script>
  ```
  
  

#### [v-bind](https://cn.vuejs.org/v2/api/#v-bind)

#### [v-model](https://cn.vuejs.org/v2/api/#v-model)

##### 修饰符

- **v-model.lazy：懒加载**
- **v-model.number：数字类型**
- **v-model.trim：去除空白**

```html
<body>
    <div id="app">
        <!-- 修饰符：lazy 添加后敲下回车或则失去焦点才会获取数据 -->
        <input type="text" v-model.lazy="msg">
        <h3>您输入的内容是：{{msg}}</h3>

        <!-- 修饰符 number  如果不添加，输入其他数字data会变成字符串-->
        <input type="number" v-model.number="data">
        <h3>{{data}}--{{typeof data}}</h3>

        <!-- 修饰符 trim -->
        <input type="text" v-model.trim="info">
        <h3>{{info}}</h3>

        <!-- lazy和trim叠加使用 -->
        <input type="text" v-model.lazy.trim="name">
        <h3>{{name}}</h3>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                msg: '',
                data:0,
                info:'',
                name:''
            }
        })
    </script>
</body>
```



##### 双向绑定原理

```html
<input type="text" v-model="msg">
// 等同于
<input type="text" :value="msg" @input="msg=$event.target.value">
```

##### v-model结合Radio使用

```
<body>
    <div id="app">
        <label for="男"><input type="radio" value="男" name="gender" v-model="info">男</label>
        <label for="女"><input type="radio" value="女" name="gender" v-model="info">女</label>
        <h3>您选择的性别是:{{info}}</h3>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data:{
                info: ''
            }
        })
    </script>
</body>
```

 

##### v-model结合CheckBox使用

###### 单个CheckBox

```
<body>
    <div id="app">
        <!-- 1. 单个checkbox -->
        <label for="agree"><input type="checkbox" v-model="isChecked">同意协议</label>
        <h3>是否选择同意协议：{{isChecked}}</h3>
        <button :disabled="!isChecked">下一步</button>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                isChecked: false,
            }
        })
    </script>
</body>
```

 

###### 多个CheckBox

```
<body>
    <div id="app">
        <!-- 2. 多个checkbox -->
        <label for="hobbies">爱好：</label>
        <label for="a"><input type="checkbox" v-model="hobbies" value="篮球">篮球</label>
        <label for="a"><input type="checkbox" v-model="hobbies" value="足球">足球</label>
        <label for="a"><input type="checkbox" v-model="hobbies" value="乒乓球">乒乓球</label>
        <label for="a"><input type="checkbox" v-model="hobbies" value="羽毛球">羽毛球</label>
        <h3>您选择的爱好有:{{hobbies}}</h3>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                hobbies:[],
            }
        })
    </script>
</body>
```

 

###### 遍历渲染CheckBox

```
<body>
    <div id="app">
        <!-- 3. 遍历渲染选择 -->
        <label v-for="item in book"><input type="checkbox" v-model="list" :key="item" :value="item">{{item}}</label>
        <h3>您选择的书籍有：{{list}}</h3>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                book:['a', 'b', 'c', 'd', 'e'],
                list:[]
            }
        })
    </script>
</body>
```

 

##### v-model结合select

###### 单选select

```
<body>
    <div id="app">
        <!-- 1. select 单选 -->
        <select v-model="favorite">
            <option value="篮球">篮球</option>
            <option value="足球">足球</option>
            <option value="羽毛球">羽毛球</option>
            <option value="乒乓球">乒乓球</option>
        </select>
        <h3>您最喜欢的运动是：{{favorite}}</h3>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data:{
                favorite: '篮球' // 渲染的默认值
            }
        })
    </script>
</body>
```

 

###### 多选select

```
<body>
    <div id="app">
        <!-- 2. select 多选 -->
        <select v-model="book" multiple>
            <option value="语文">语文</option>
            <option value="数学">数学</option>
            <option value="音乐">音乐</option>
            <option value="体育">体育</option>
        </select>
        <h3>您最喜欢的书本是：{{book}}</h3>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data:{
                book: [],
            }
        })
    </script>
</body>
```



##### 组件中使用

```vue
// 正常情况下
<template>
  <ChildComponent v-model="pageTitle" />
  <!-- 是以下的简写: -->
  <ChildComponent :value="pageTitle" @input="pageTitle = $event" />
</template>

// 要修改 prop 或事件名称，则需要在 ChildComponent 组件中添加 model 选项
<!-- ParentComponent.vue -->
<ChildComponent v-model="pageTitle" />
<!-- ChildComponent.vue -->
<input :title="title" @change="change"/>
<script>
export default {
  model: {
    prop: 'title', // 有变化的是当前的title属性
    event: 'change'
  },
  props: {
    // 这将允许 `value` 属性用于其他用途
    value: String,
    // 使用 `title` 代替 `value` 作为 model 的 prop
    title: {
      type: String,
      default: 'Default title'
    }
  }
}
</script>

等同于
<ChildComponent :title="pageTitle" @change="pageTitle = $event" />
```





#### [v-pre](https://cn.vuejs.org/v2/api/#v-pre)

#### [v-cloak](https://cn.vuejs.org/v2/api/#v-cloak)

- 如果还想用 `{{}}` 又不想有闪烁问题，则使用 `v-cloak` 来处理
- 在头部加一个特殊的样式：`[v-cloak] {display: none;}`
- 然后在被 Vue 管理的模板入口节点上作用 `v-cloak` 指令
- 原理：默认一开始被 Vue 管理的模板是隐藏着的，当 Vue 解析处理完 DOM 模板之后，会自动把这个样式去除，然后就显示出来

#### [v-once](https://cn.vuejs.org/v2/api/#v-once)

只执行一次性地插值，当数据改变时，插值处的内容不会更新



### 自定义指令

Vue 提供了自定义指令的5个钩子函数：

- bind：指令第一次绑定到元素时调用，只执行一次。在这里可以进行一次性的初始化设置。
- inserted：被绑定的元素，插入到父节点的 DOM 中时调用（仅保证父节点存在）。
- update：组件更新时调用。
- componentUpdated：组件与子组件更新时调用。
- unbind：指令与元素解绑时调用，只执行一次。

**注意：**

1. 除 update 与 componentUpdated 钩子函数之外，每个钩子函数都含有 el、binding、vnode 这三个参数
2. 在每个函数中，第一个参数永远是 el， 表示被绑定了指令的那个 dom 元素，这个el 参数，是一个原生的 JS 对象，所以 **Vue 自定义指令可以用来直接和 DOM 打交道**
3. binding 是一个对象，它包含以下属性：name、value、oldValue、expression、arg、modifiers
4. oldVnode 只有在 update 与 componentUpdated 钩子中生效
5. 除了 el 之外，binding、vnode 属性都是只读的



举个让输入框自动聚焦的例子，如下。

全局注册：

```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

也可以局部注册：

```javascript
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

使用：

```html
<!-- 当页面加载时，该元素将获得焦点 -->
<input v-focus>
```

注意事项：

- 在模板中使用自定义指令必须加上 `v-` 前缀
- 对于驼峰命名法的自定义指令，在使用的时候使用 `-` 连接即可







### 混入mixin

创建一个`mixin.js`文件，将相同的代码内容放到这个文件夹中，需要用的时候就加载

`minxin.js`存放相同的内容

```js
export const backTopMixin = {
  data: () => {},
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 500)
    }
  }
}
```

组件内注册使用

`注：组件中点击事件的方法名backTop需要与mixin.js文件的方法名一致，否则不会生效`

```vue
<template>
	<BackTop @click.native="backTop" v-show="scrollY > 1000"></BackTop>
</template>
<script>
import { backTopMixin } from '../../utils/mixin'
export default {
    mixins: [backTopMixin],
}
</script>
```



- 具有相同名称的钩子函数，将合并到一个数组中，先执行`mixin.js`的钩子函数，后执行组件中的钩子函数

```js
var mixin = {
  created: function () {
    console.log('mixin 对象的钩子函数被调用')
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log('组件的钩子函数被调用')
  }
})

// => "mixin 对象的钩子函数被调用"
// => "组件的钩子函数被调用"
```





### 钩子函数

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

下面我们用一个例子来验证文档中的描述：

```html
<div id="app">
  <input type="checkbox" v-model="seen">
  <h1 v-if="seen" v-demo>{{ message }}</h1>
  <input type="text" v-model="message">
</div>
```

```javascript
Vue.directive('demo', {
  bind(el, binding) {
    console.log('binding', el.parentNode) // null
  },
  inserted: function (el) {
    console.log('inserted', el.parentNode) // <div id="app">...</div>
  },
  update(el, binding) {
    console.log('update', el.innerHTML) // 'Hello Vue.js!'
  },
  componentUpdated(el, binding) {
    console.log('componentUpdated', el.innerHTML) // 'Hello'
  },
  unbind(el, binding) {
    console.log('unbind')
  }
})

new Vue({
  el: '#app',
  data: {
    seen: true,
    message: 'Hello Vue.js!'
  }
})
```

总结：
- bind 时父节点为 null，inserted 时父节点存在
- update 和 componentUpdated 就是更新前和更新后的区别
- unbind 可以做一些收尾工作，例如清除定时器

### 钩子函数参数

指令钩子函数会被传入以下参数：
- `el`：指令所绑定的元素，可以用来直接操作 DOM 。
- `binding` 一个对象，包含以下属性：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-%E6%8E%A5%E5%8F%A3) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

!> 除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。

这是一个使用了这些属性的自定义钩子样例：

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

```javascript
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})

new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
```

```
name: "demo"
value: "hello!"
expression: "message"
argument: "foo"
modifiers: {"a":true,"b":true}
vnode keys: tag, data, children, text, elm, ns, context, fnContext, fnOptions, fnScopeId, key, componentOptions, componentInstance, parent, raw, isStatic, isRootInsert, isComment, isCloned, isOnce, asyncFactory, asyncMeta, isAsyncPlaceholder
```


### 函数简写

在 `bind` 和 `update` 时触发相同行为可以这样写:

```javascript
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

### class用法

#### 单个变量

```html
<div :class="className"></div>
```

#### 对象用法

```html
用法一：直接通过{}绑定一个类
<h2 :class="{active: isActive}">Hello World</h2>

用法二：也可以通过判断，传入多个值
<h2 :class="{active: isActive, line: isLine}">Hello World</h2>

用法三：和普通的类同时存在，并不冲突
注：如果isActive和isLine都为true，那么会有title/active/line三个类
<h2 class="title" :class="{active: isActive, line: isLine}">Hello World</h2>

用法四：如果过于复杂，可以放在一个methods或者computed中
注：classes是一个计算属性
<h2 class="title" :class="classes">Hello World</h2>
```

#### 数组用法

```js
用法一：直接通过{}绑定一个类
<h2 :class="[active]">Hello World</h2>

用法二：也可以传入多个值
<h2 :class="[active, line]">Hello World</h2>

用法三：和普通的类同时存在，并不冲突
注：会有title/active/line三个类
<h2 class="title" :class="[active, line]">Hello World</h2>

用法四：如果过于复杂，可以放在一个methods或者computed中
注：classes是一个计算属性
<h2 class="title" :class="classes">Hello World</h2>
```



### style用法

#### 对象语法

```
对象语法的含义是:style后面跟的是一个对象
<h2 :style="{key(属性名): value(属性值)}">{{message}}</h2>

style后面跟的是一个对象类型
　　对象的key是CSS属性名称
　　对象的value是具体赋的值，值可以来自于data中的属性
:style="{color: 'red', fontSize:'50px'}"
```

#### 数组语法

数组语法的含义是:class后面跟的是一个数组

```
style后面跟的是一个数组类型
　　多个值以，分割即可
<div v-bind:style="[bgc, fontsize]"></div>
```



## 计算属性
### 计算属性：基础示例

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

结果：

```
Original message: "Hello"
Computed reversed message: "olleH"
```
---

### 计算属性 VS 方法

在表达式中调用方法来达到同样的效果：

```html
<p>Reversed message: "{{ reversedMessage() }}"</p>
```

```javascript
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的依赖进行缓存的**。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：

```javascript
computed: {
  now: function () {
    return Date.now()
  }
}
```

---

## 组件化

文档：[https://naotu.baidu.com/file/b935b732b2dbf1b2ff12a3291d7f24e5?token=f1973a115e68f4e1](https://naotu.baidu.com/file/b935b732b2dbf1b2ff12a3291d7f24e5?token=f1973a115e68f4e1)

组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。

### **基本使用**

1.创建组件的构造器 Vue.extend()方法创建组件构造器【通常在创建组件构造器时，传入template代表我们自定义组件的模板】

2.注册组件（全局注册,局部注册）Vue.component('注册组件的标签名',组件构造器)

3.使用组件(在Vue实例的作用范围内使用组件)

```
1)创建组件构造器对象
const cpn=Vue.extend({
　　template:‘<div>我是template(面板)承载内容的</div>’
})
2)注册组件
Vue.component('使用组件的名称',创建组件的对象名）
Vue.component('my-cpn',cpn）
3）使用组件
<my-cpn></my-cpn>
```
### 使用组件

#### 全局注册component

模板

```
Vue.component('组件名称',组件模板对象)
Vue.component('my-component',组件模板对象）
```
注册：
```
 Vue.component('my-component', {
   template: '<div>A custom component!</div>'
 })
 ​
 // 创建根实例
 new Vue({
   el: '#example'
 })
```
在模板中使用组件：
```
 <div id="example">
   <my-component></my-component>
 </div>
```


#### 局部注册**components**

可以通过某个 Vue 实例/组件的实例选项 

**components** 注册仅在其作用域中可用的组件：

模板

```
// 组件实例选项 components 也是用来定义组件，但是这种方式定义的组件只能在当前组件中使用
components: {
  // 键名就是组件名称，值是一个对象，对象中配置组件的选项
     '键名': {
       template: '渲染的内容'
     }
   }
```
注册：
```
 new Vue({
   // ...
   components: {
     // <my-component> 将只在父组件模板中可用
     'my-component': {
       template: '<div>A custom component!</div>'
     }
   }
 })
```
使用：
```
 <div id="example">
   <div>A custom component!</div>
 </div>
```
**替换渲染组件入口节点**
![图片](https://uploader.shimo.im/f/p0VRIaqjqqsith5a.png!thumbnail)

#### 注册组件的语法糖

```
省去了Vue.extend()方法，因为在component内部默认有extend这个方法
不使用创建构造器对象,直接在组件写HTML的内容
全局组件语法糖
Vue.component('my-cpn',{
    template:`<div>我是template(面板)承载内容的</div>`
}）
局部组件语法糖
const app = new Vue({
　　el: '#app',
　　components:{
    cpn：{
            template:`<div>我是template(面板)承载内容的</div>`
        }
　　}
})
```
#### **组件模板抽离写法**

* **JavaScript写法**
```
<script type="text/x-template" id="cpn">
    <div>template(面板)渲染的HTML内容</div>
</script>
使用
Vue.component('my-cpn',{
    template:"#cpn"
}）
```
* **template**
```
<template id="cpn">
    <div>我是template(面板)承载内容的</div>
</template>
调用
Vue.component('my-cpn',{
    template:“#cpn”
}）
```
* .vue 单文件组件中的 template 模板
```
<!-- 
  但是这种方式浏览器不能直接识别，需要结合 webpack 构建工具才能玩儿。
 -->
<!-- 组件的模板，写到 template 中 -->
<template>
<div></div>
</template>
<!-- 组件的 JavaScript 脚本写到 script 标签中 -->
<script>
export default {
  data () {
    return {}
  }
}
</script>
<!-- 组件的 CSS 写到 style 标签中 -->
<style>
</style>
```
#### **组件的数据需存放在组件data中**

  - 组件是一个**单独功能模块**的封装，这个模块有属于自己的HTML模板，也应该有属性自己的数据data【结论：Vue组件有自己保存数据的地方】

  - **组件不能访问vue实例的data**，而且即使可以访问，如果将所有的数据都放在Vue实例中，Vue实例就会变的非常臃肿


#### **组件data必须是一个函数**

  - 组件是可以复用的，需要保证复用的时候各组件之间的数据都不互相影响，而js中只有函数才有作用域，每次调用的时候return一个新的对象，因此需要将组件的data设置为函数；

  - 如果data不是函数，那么没有自己的作用域，组件复用时，修改组件A，组件B的数据也会随着组件A的修改而受影响

![](https://uploader.shimo.im/f/ZGk57Tqlm9AkQ4Ze.png!thumbnail)

```html
<body>
  <div id="app">
      <!-- 三个组件实例对象，这三个都没有共享同一个data对象，因为data是一个函数，函数有自己的作用域，每次调用的时候return一个新的对象 -->
      <cpn></cpn>
      <cpn></cpn>
      <cpn></cpn>
  </div>
  <template id="cpnC">
      <div>
          <p>{{count}}</p>
          <button @click="increace">+</button>
          <button @click="decreace">-</button>
      </div>
  </template>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
      Vue.component('cpn', {
              template: '#cpnC',
              data() {
                  return {
                      count: 0
                  }
              },
              methods: {
                  increace(){
                      this.count ++
                  },
                  decreace(){
                      this.count --
                  },
              },
          }
      )
      const app = new Vue({
          el: '#app',
      })
  </script>
</body>
```
### 组件的作用域是独立的

* 组件无法访问外部作用域成员
* 外部作用域也无法访问组件内部成员
### 组件生命钩子

```
<script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        msg: 'ok'
      },
      methods: {
        show() {
          console.log('执行了show方法')
        }
      },
      beforeCreate() { // 这是我们遇到的第一个生命周期函数，表示实例完全被创建出来之前，会执行它
        // console.log(this.msg)
        // this.show()
        // 注意： 在 beforeCreate 生命周期函数执行的时候，data 和 methods 中的 数据都还没有没初始化
      },
      created() { // 这是遇到的第二个生命周期函数
        // console.log(this.msg)
        // this.show()
        //  在 created 中，data 和 methods 都已经被初始化好了！
        // 如果要调用 methods 中的方法，或者操作 data 中的数据，最早，只能在 created 中操作
      },
      beforeMount() { // 这是遇到的第3个生命周期函数，表示 模板已经在内存中编辑完成了，但是尚未把 模板渲染到 页面中
        // console.log(document.getElementById('h3').innerText)
        // 在 beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串
      },
      mounted() { // 这是遇到的第4个生命周期函数，表示，内存中的模板，已经真实的挂载到了页面中，用户已经可以看到渲染好的页面了
        // console.log(document.getElementById('h3').innerText)
        // 注意： mounted 是 实例创建期间的最后一个生命周期函数，当执行完 mounted 就表示，实例已经被完全创建好了，此时，如果没有其它操作的话，这个实例，就静静的 躺在我们的内存中，一动不动
      },
      // 接下来的是运行中的两个事件
      beforeUpdate() { // 这时候，表示 我们的界面还没有被更新【数据被更新了吗？  数据肯定被更新了】
        /* console.log('界面上元素的内容：' + document.getElementById('h3').innerText)
        console.log('data 中的 msg 数据是：' + this.msg) */
        // 得出结论： 当执行 beforeUpdate 的时候，页面中的显示的数据，还是旧的，此时 data 数据是最新的，页面尚未和 最新的数据保持同步
      },
      updated() {
        console.log('界面上元素的内容：' + document.getElementById('h3').innerText)
        console.log('data 中的 msg 数据是：' + this.msg)
        // updated 事件执行的时候，页面和 data 数据已经保持同步了，都是最新的
      }
    });
  </script>
```
![pics](https://uploader.shimo.im/f/Bb6ySexIb7M4LWxN.png!thumbnail)

### 组件组合

组件设计初衷就是要配合使用的，最常见的就是形成父子组件的关系：组件 A 在它的模板中使用了组件 B。它们之间必然需要相互通信：父组件可能要给子组件下发数据，子组件则可能要将它内部发生的事情告知父组件。然而，通过一个良好定义的接口来尽可能将父子组件解耦也是很重要的。这保证了每个组件的代码可以在相对隔离的环境中书写和理解，从而提高了其可维护性和复用性。

在 Vue 中，父子组件的关系可以总结为 prop 向下传递，事件向上传递。父组件通过 prop 给子组件下发数据，子组件通过事件给父组件发送消息。看看它们是怎么工作的。

**组件切换一**（只适用于两个组件切换）v-if & v-else

```
<div id="app">
    <a href="" @click.prevent="flag=true">登录</a>
    <a href="" @click.prevent="flag=false">注册</a>
    <login v-if="flag"></login>
    <register v-else="flag"></register>
</div>
  <script>
    Vue.component('login', {template: '<h3>登录组件</h3>'})
    Vue.component('register', {template: '<h3>注册组件</h3>'})
    
    var vm = new Vue({
      el: '#app',
      data: {flag: false}
    });
  </script>
```
**组件切换二**（适用于多个组件切换） 

`<compotent :is="动态加载名称"></compotent>`

component 是一个占位符, :is 属性,可以用来指定要展示的组件的名称

```
<div id="app">
    <a href="" @click.prevent="comName='login'">登录</a>
    <a href="" @click.prevent="comName='register'">注册</a>
    <!-- Vue提供了 component ,来展示对应名称的组件 -->
    <!-- component 是一个占位符, :is 属性,可以用来指定要展示的组件的名称 -->
    <component :is="comName"></component>
  </div>
  <script>
    // 组件名称是 字符串
    Vue.component('login', {template: '<h3>登录组件</h3>'})
    Vue.component('register', {template: '<h3>注册组件</h3>'})
    var vm = new Vue({
      el: '#app',
      data: {
        comName: 'login' // 当前 component 中的 :is 绑定的组件的名称
      }
    });
  </script>
```

#### 父子组件通信：Props Down

##### 步骤

 1)  父组件 data/methods 中有定义需要传给子组件的数据

 2)  子组件用 props 声明要接收父组件的数据（props一般用对象来声明要接收的数据）

 3)  父组件通过标签传递给子组件数据

 4)  在子组件内部使用props数据

**1. 在父组件中通过子组件标签属性传递数据（字符串）**

**(若需传递动态数据添加 v-bind)**

message="hello!" =>message 是需要传给子组件 props 的值， hello 是父组件中 data 的数据

```vue
 <child message="hello!"></child>
```
**2. 在子组件显式地用 props 选项声明它预期的数据并使用,props 是以数组的形式存在， props 的值是可读不可写**
```vue
 Vue.component('child', {
   // 声明 props
   props: ['message'],
   // 就像 data 一样，props 也可以在模板中使用
   // 同样也可以在 vm 实例中通过 this.message 来使用
   template: '<span>{{ message }}</span>'
 })
```
**注：不要在子组件中修改数据内容**

##### 动态 Prop

与绑定到任何普通的 HTML 特性相类似，我们可以用 v-bind 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件：

```vue
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
 
// 你也可以使用 v-bind 的缩写语法：
<child :my-message="parentMsg"></child>
```


##### Prop 验证

我们可以为组件的 prop 指定验证规则。如果传入的数据不符合要求，Vue 会发出警告。这对于开发给他人使用的组件非常有用。

要指定验证规则，需要用对象的形式来定义 prop，而不能用字符串数组：

```
 Vue.component('example', {
   props: {
     // 基础类型检测 (`null` 指允许任何类型)
     propA: Number,
     // 可能是多种类型
     propB: [String, Number],
     // 必传且是字符串
     propC: {
       type: String,
       required: true
     },
     // 数值且有默认值
     propD: {
       type: Number,
       default: 100
     },
     // 数组/对象的默认值应当由一个工厂函数返回
     propE: {
       type: Object,
       default: function () {
         return { message: 'hello' }
       }
     },
     // 自定义验证函数
     propF: {
       validator: function (value) {
         return value > 10
       }
     }
   }
 })
```
type 可以是下面原生构造器：
* String
* Number
* Boolean
* Function
* Object
* Array
* Symbol

type 也可以是一个自定义构造器函数，使用 instanceof 检测。

当 prop 验证失败，Vue 会抛出警告 (如果使用的是开发版本)。

注意 prop 会在组件实例创建之前进行校验，所以在 default 或 validator 函数里，诸如 data、computed 或 methods 等实例属性还无法使用。



#### 父子组件通信：Events Up

##### 步骤

1. 子组件定义需要传递给父组件的事件

2. 在子组件中事件使用 $emit() 方法发布一个事件

3. 在父组件中提供一个子组件内部发布的事件处理函数（纯业务）

4. 在父组件使用子组件的模板的标签上订阅子组件内部发布的事件

**2.在父组件中提供一个子组件内部发布的事件**处理函数（纯业务）

```
 new Vue({
   el: '#counter-event-example',
   data: {
     total: 0
   },
   methods: {
     incrementTotal: function () {
       this.total += 1
     }
   }
 })
```
**3. 在父组件使用子组件的模板的标签上订阅子组件内部发布的事件**
父组件 订阅事件 v-on:increment="incrementTotal" ——**increment：子组件发布的事件**

**incrementTotal：父组件处理的方法函数**

如果父组件为incrementTotal（data）,则子组件也需要传参才能调用this.$emit('increment','value')

```
 <div id="counter-event-example">
   <p>{{ total }}</p>
   <!-- 
     订阅子组件内部发布的 increment 事件
     当子组件内部 $commit('increment') 发布的时候，就会调用到父组件中的 incrementTotal 方法
   -->
   <button-counter v-on:increment="incrementTotal"></button-counter>
 </div>
```
**1. 在子组件中调用 `$emit()` 方法发布一个事件**

**例：此处发布的是 `increment`事件，并且有@click等事件**

```
 Vue.component('button-counter', {
   template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
   data: function () {
     return {
       counter: 0
    }
  },
   methods: {
     incrementCounter: function () {
       this.counter += 1
       // 发布一个名字叫 increment 的事件
       this.$emit('increment')
    }
  },
 })
```

demo：父组件点击子组件，子组件需要将点击的对象传递给父组件
```vue
<body>
  <div id="app">
　　　　　// 3. 父组件中提供一个子组件内部发布的事件处理函数
      <cpn @item-click="getchild"></cpn> // item-click 订阅子组件发布的事件的名称，getchild 是父组件的函数名称
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <template id="cpmC">
      <div>
　　　　　　　　// 1. 子组件定义需要传递给父组件的事件
          <h3 v-for="item in categories" @click="gain(item)">{{item.name}}</h3> // gain 是子组件的函数名称
      </div>
  </template>
  <script>
      // 子组件
      const cpm = {
          template: '#cpmC',
          data(){
              return {
                  categories: [
                      {id: 'aaa', name: '热门推荐'},
                      {id: 'bbb', name: '手机数码'},
                      {id: 'ccc', name: '家用家电'},
                      {id: 'ddd', name: '电脑办公'},
                  ]
              }
          },
          methods: {
              // 2. 发布自定义事件
              gain(item){
                  // 将子组件的方法通过 $emit 传递给父组件
                  this.$emit('item-click',item) // this.$emit("随便起的名称",传递给父组件的数据)，item-click是子组件发布的事件名称
              }
          },
      }

      // 父组件
      const app = new Vue({
          el: '#app',
          components:{
              cpn: cpm
          },
　　　　　　　// 4. 在父组件使用子组件的模板的标签上订阅子组件内部发布的事件
          methods: {
              getchild(item){
                  console.log('父组件',item)
              }
          },
      })
  </script>
</body>
```



#### .sync 修饰符

在一些情况下，我们可能会需要对一个 prop 进行“双向绑定”。

就是当一个子组件改变了一个带 .sync 的 prop 的值时，这个变化也会同步到父组件中所绑定的值。

在使用子组件的时候加上 .sync 修饰符：

```
<comp :foo.sync="bar"></comp>
```
在子组件内部更新 foo 的值时，显示的触发一个更新事件：
```
this.$emit('update:foo', newValue)
```


### 非父子组件通信：Event Bus

有时候，非父子关系的两个组件之间也需要通信。在简单的场景下，可以使用一个空的 Vue 实例作为事件总线：

Vue.prototype.$bus = new Vue()

this.$bus.emit('事件名称', 参数)

this.$bus.on('事件名称', 回调函数(参数))

```
main.js的原型绑定$bus到Vue中
Vue.prototype.$bus = new Vue()
组件一传递值
this.$bus.$emit('imageLoad')
组件二接收使用值
mounted() {
    this.$bus.$on('imageLoad',() => {
      console.log('imageLoad')
    })
  },
```




## vue-router

### 基本概念

**后端路由：**对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；

**前端路由：**对于单页面应用程序来说，主要通过URL中的hash(#号)来实现不同页面之间的切换，同时，hash有一个特点：HTTP请求中不会包含hash相关的内容；所以，单页面程序中的页面跳转主要用hash实现；

**后端渲染**：直接在后台渲染好后返回给前台的页面

**前端渲染**：请求后台的api接口，通过浏览器的js来渲染不同的内容

在单页面应用程序中，这种通过hash改变来切换页面的方式，称作前端路由（区别于后端路由）

### 去除路由地址的#

`router` 文件夹的 `index.js` 文件添加

```js
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  mode: 'history',
})
```

### 路由重定向

```js
var routerObj = new VueRouter({
  routes: [
    // 重定向
    {path:'/', redirect:'/login'},
    { path: '/login', component: login }
  ]
});
```

### 404页面的路由配置

```js
// 配置404组件, 放在最后
{ 
   path: '/*',
   component: NotFound【组件名称】
 },
```



### router-link

#### tag

参考文档：https://router.vuejs.org/zh/api/#tag

tag可以指定`<router-link>`之后渲染成什么组件, 比如上面的代码会被渲染成一个`<li>`元素, 而不是`<a>`

```js
<router-link to="/home" tag="button">首页</router-link>
```



#### replace

replace不会留下history记录, 所以指定replace的情况下, 后退键返回不能返回到上一个页面中

```js
<router-link to="/home" tag="button" replace>首页</router-link>
```



#### 路由高亮

默认路由高亮： https://router.vuejs.org/zh/api/#active-class

当`<router-link>`对应的路由匹配成功时, 会自动给当前元素设置一个`router-link-active`的class, 设置active-class可以修改默认的名称.
在进行高亮显示的导航菜单或者底部tabbar时, 会使用到该类.
但是通常不会修改类的属性, 会直接使用默认的`router-link-active`即可

```css
.router-link-active {
  color: #02a774;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 1px;
    width: 35px;
    height: 2px;
    transform: translateX(-50%);
    background: #02a774;
  }
}
```



#### 自定义路由高亮类名

 在 router 文件夹的 index.js 中添加 `linkActiveClass:'更换样式的类名'`

```js
const router = new VueRouter({
  // 配置路由和组件之间的应用关系
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})
```

组件中使用

```vue
<router-link to="/about" tag="button" replace active-class="active">关于</router-link>
<style>
    .active{
        color: aquamarine;
        font-size: 30px;
    }
</style>
```





### 编程式的导航

#### hash 模式

```js
location.hash= '改变的地址'
```

#### HTML5的history 模式

```js
history.pushState({}, '', 'home') // 可返回上一步
history.replaceState({}, '', 'home') // 不可返回上一步
history.back() 
history.go(-1) //history.back() 等价于 history.go(-1)
history.forward()  // history.forward() 则等价于 history.go(1)
```

#### $router方式

```js
// 不携带参数的跳转
this.$router.replace('/home')

// 携带参数的跳转
this.$router.push({ name: 'productInfo', params: { id: id }})
```



### 路由传参

**传递参数**

​	主要有两种类型: `params` 和 `query`

#### params的类型

```js
配置路由格式: /router/:id
传递的方式: 在path后面跟上对应的值
传递后形成的路径: /router/123, /router/abc
```

路由配置传参

```js
{
    path: '/user/:id',
    component: User,
    meta: {
      title: '用户'
    },
 },
```

组件使用传参

```vue
// 方式一 route-link方式传递
<router-link :to="'/user/'+userId">用户</router-link>

// 方式二 js方式传递
<button @click="userClick">用户</button>
methods: {
    userClick() {
      this.$router.push('/user/' + this.userId)
    },
}
```

#### query的类型

```js
配置路由格式: /router, 也就是普通配置
传递的方式: 对象中使用query的key作为传递方式
传递后形成的路径: /router?id=123, /router?id=abc
```

路由配置传参

```js
{
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    },
}
```

组件使用传参

```vue
// 方式一 rout-link方式跳转
<router-link :to="{path: '/profile', query: {name: 'why', age: 18}}">

// 方式二 js方式传递
<button @click="userClick">用户</button>
methods: {
    userClick() {
      this.$router.push({
        path: '/profile',
        query: {
          name: 'kobe',
          age: 19
        }
      })
    },
}
```



页面跳转后获取跳转时携带的参数  **this.$route.query.参数名**

```js
<h2>{{$route.query}}</h2>
<h2>{{$route.query.name}}</h2>
```



### $route和$router的区别

**$router 为 VueRouter实例，想要导航到不同URL，则使用 $router.push 方法，是整个项目的路由**

`是router文件夹的index.js导出的router,这个是挂载在Vue原型对象上的全局router`

**$route 为当前 router 跳转对象里面可以获取name、path、query、params等 ,为当前活跃的路由**



#### 当前路由路径

```js
$router.currentRoute.path
或
$route.query
```



####  匹配其他路由

```js
if(this.$route.path.indexOf('/home')!== -1){}
```



### 路由嵌套

**实现嵌套路由有两个步骤:**

- 创建对应的子组件, 并且在路由映射中配置对应的子路由.

- 在组件内部使用`<router-view>`标签.
- 子路由的path不要带'/'，否则都是从根路径开始请求

```js
const routes = [
  { // 底部标签栏
    path: '/',
    component: () => import('@/views/tab-bar'),
    children: [
      {
        name: 'home',
        path: '', // 默认子路由
        component: () => import('@/views/home')
      },
      {
        name: 'my',
        path: '/my',
        component: () => import('@/views/my')
      }
    ]
  },
```



### 路由懒加载

**方式1**：间接注册使用

```js
const Home = () => import('../components/Home.vue')
const routes = [
  {
    path: '/home',
    component: Home
  },
]
```

**方式2**：直接注册使用

```js
const routes = [
  { // 登录
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
  }
]
```



### 路由守卫

`导航守卫主要用来通过跳转或取消的方式守卫导航（在路由跳转时触发）`

路由跳转不一定要发送ajax请求，因此用于防止用户在页面输入一大堆后提醒需要登录才能访问



#### 全局路由守卫
监听跳转，在跳转的时候做一些其他的操作

```js
// 导航钩子的三个参数解析
router.beforeEach((to, from, next) => {
  to: 即将要进入的目标的路由对象.
  from: 当前导航即将要离开的路由对象.
  next: 调用该方法后, 才能进入下一个钩子
})
```

##### 标题的变化

```js
// 前置守卫(guard)
router.beforeEach((to, from, next) => {
  // 从from跳转到to
  document.title = to.matched[0].meta.title
  console.log(to);
  next()
})
```

##### 权限

https://blog.csdn.net/hsany330/article/details/103271215

```js
router.beforeEach((to, from, next)  => {
  if(from.name == "Login"){ // 如果不需要权限校验，直接进入路由界面
    next();
  }else if(to.meta.requireAuth){
    // 判断该路由是否需要登录权限
    if (store.state.Authorization) {  // 获取当前的token是否存在
      console.log("token存在");
      next();
    } else {
      console.log("token不存在");
      next({
        path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    }
  }else { // 如果不需要权限校验，直接进入路由界面
    next();
  }
});
```

`login.vue`组件中需要回去URL的参数重定向回原来的页面

```vue
<button @click="login"></button>

<script>
method:{
	login(){
        // 发送请求登录
        console.log('请求登录成功')
        // 获取URL中的回调地址
		const redirectUrl = this.$route.query.redirect;
		if(redirectUrl){
    		this.$router.push(redirectUrl)
		}else{
    		this.$router.replace('/')
		}
	}
}
</script>
```





#### 路由独享守卫

只有进入到某个路由中才执行

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        console.log('beforeEnter')
        next()
      }
    }
  ]
})
```



#### 组件内的守卫

在组件内设置

```js
export default{
  beforeRouteEnter (to, from, next) {
    if('有权限访问'){
       next()
    }else{
       next('/login')
    }
}
```





### 路由缓存

**直接用`keep-alive`包裹**

```js
<keep-alive>
   <router-view/>
</keep-alive>
```

**除某些页面不使用路由缓存**

```js
<keep-alive :exclude="Profile,User">
   <router-view/>
</keep-alive>
```

#### 钩子函数

```js
// 进入当前路由调用
activated() {
   console.log('activated');
},
// 离开当前路由调用
deactivated() {
 console.log('deactivated');
},
```



## vuex