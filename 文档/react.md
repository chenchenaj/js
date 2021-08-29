# react

## 开发react依赖的三个库

react：包含react所必须的核心代码

react-dom：react渲染在不同平台所需要的核心代码

babel：将jsx转换成React代码的工具



# react基本使用

## 在html中使用react

```js
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```



使用jsx，并且希望script中jsx的代码被解析，必须在script标签中添加属性

注意：type类型一定要写babel

```js
<script type="text/babel">
    // 创建虚拟DOM
    const myh1 = <h1>Hello</h1> // 注意不需要加引号，因为不是字符串
    // 渲染虚拟DOM到页面
     ReactDOM.render(渲染的内容, 渲染的对象)
     ReactDOM.render(myh1, document.getElementById('app'))
</script>
```

## jsx本质

jsx本质是原始js创建虚拟DOM的语法糖

ReactDOM.render(myh1, document.getElementById('app')) = React.createElement(component, props, ...children) 

```html
<script>
    // ==========使用jsx创建================
//1.创建虚拟DOM
const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
    <h1 id="title">
        <span>Hello,React</span>
    </h1>
)
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))
    
    
    // =========使用原生js创建===============
//1.创建虚拟DOM
const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```



## jsx语法规则

- 定义虚拟DOM时，**不要写引号**。
- 标签中**混入JS表达式时要用{}**。
  - 注：表达式不等于语句(代码)，可以拿变量接受的是表达式，不能拿变量接受得到的算语句(代码)
- 样式的类名指定不要用class，要用**className**。
- 内联样式，要用style={{key:value}}的形式去写。**最外层括号表示要写js表达式，里层的括号代表写一个对象**
- 虚拟DOM只有一个根标签
- **标签必须闭合**
- 标签首字母
  - 若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
  - 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>jsx语法规则</title>
	<style>
		.title{
			background-color: orange;
			width: 200px;
		}
	</style>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>

	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

<script type="text/babel" >
    const myId = 'aTgUiGu'
    const myData = 'HeLlo,rEaCt'

    //1.创建虚拟DOM
    const VDOM = (
        <div>
            <h2 className="title" id={myId.toLowerCase()}>
                <span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
            </h2>
        </div>
    )
    //2.渲染虚拟DOM到页面
    ReactDOM.render(VDOM,document.getElementById('test'))
</script>
</body>
</html>
```

### jsx案例

将基础数据加工成为自己需要的数据

```js
//模拟一些数据
const data = ['Angular','React','Vue']
//1.创建虚拟DOM
const VDOM = (
    <div>
        <h1>前端js框架列表</h1>
        <ul>
            {
                data.map((item,index)=>{
                    return <li key={index}>{item}</li>
                })
            }
        </ul>
    </div>
)
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))
```

## jsx写注释

```jsx
{ /* 写注释内容 */ }
```

## jsx嵌入数据显示

在react中，数据是null，undefined，Boolean类型的都不会将内容输出到页面中，如果需要将这些类型输出到页面需要先转换为字符串才能在页面中显示



## jsx绑定属性

### 动态添加class属性

```jsx
<div className="aa bb">111</div>
<div className={"aa bb" + (isActive ? "active" : "")}>111</div> // 动态加class的写法
```

### 动态添加style属性

```jsx
// 一般添加style
<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>

// 动态添加style
<span style={{display: (isLogin ? 'block' : 'none')}}>{myData.toLowerCase()}</span>
```

### 一般属性

```jsx
<h2 id={myId.toLowerCase()}>111</h2>
```



## jsx绑定事件

### 方法一：绑定bind

```jsx
constructor(){
    this.changeWeather = this.changeWeather.bind(this)
}
changeWeather(){
    // 操作
}

<h1 onClick={this.changeWeather}>提示</h1>
```



### 方法二：箭头函数

```jsx
changeWeather = () => {
    // 操作
}

<h1 onClick={this.changeWeather}>提示</h1>
```



### 方法三：直接传入箭头函数，在箭头函数中执行对应的方法

```jsx
<h1 onClick={() => {this.changeWeather()}}>提示</h1> // 当前的内容是在render中执行，由于箭头函数，没有自己的this，便在render中找

changeWeather(){
    // 操作
}
```



## jsx事件传参

```jsx
<h1 onClick={(e) => {this.changeWeather('a', e)}}>提示</h1> // 当前的内容是在render中执行，由于箭头函数，没有自己的this，便在render中找

changeWeather(val, e){
    console.log(val, e) // e属于事件对象，需要在箭头函数中接收传递才能使用
}
```



## jsx条件渲染

```jsx
// 二选一
<h1>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h1>

// 只在条件成立时展示
<h1>今天天气很{this.state.isHot && '炎热'}</h1>
```



## jsx列表渲染

```jsx
const data = ['Angular','React','Vue']
//1.创建虚拟DOM
const VDOM = (
    <div>
        <h1>前端js框架列表</h1>
        <ul>
            {
                data.map((item,index)=>{
                    return <li key={index}>{item}</li>
                })
            }
        </ul>
    </div>
)
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))
```



## 虚拟DOM

- 本质是Object类型的对象（一般对象）
- 虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。
- 虚拟DOM最终会被React转化为真实DOM，呈现在页面上。

```jsx
//1.创建虚拟DOM
const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
    <h1 id="title">
        <span>Hello,React</span>
    </h1>
)
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))

const TDOM = document.getElementById('demo')
console.log('虚拟DOM',VDOM);
console.log('真实DOM',TDOM);
```



## 组件

### 函数式组件

组件名称需要大写；组件标签需要闭合；**缺失this，没有实例对象，不能使用state和refs和生命周期**

过程：执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？

​     1.React解析组件标签，找到了MyComponent组件。

​     2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。

```js
//1.创建函数式组件
function MyComponent(){
    console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
    return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'))
```

### 类组件

过程：执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？

- ​     React解析组件标签，找到了MyComponent组件。
- ​     发现**组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法**。
- ​     将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。

```js
//1.创建类式组件
class MyComponent extends React.Component {
    render(){
        //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
        //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
        console.log('render中的this:',this);
        return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
    }
}
//2.渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'))
```

#### 类基础知识

总结

- 类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才写。
- 如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的。
- 类中所定义的方法，都放在了类的原型对象上，供实例去使用。

```js
//创建一个Person类
class Person {
    //构造器方法
    constructor(name,age){
        //构造器中的this是谁？—— 类的实例对象
        this.name = name
        this.age = age
    }
    //一般方法
    speak(){
        //speak方法放在了哪里？——类的原型对象上，供实例使用
        //通过Person实例调用speak时，speak中的this就是Person实例
        console.log(`我叫${this.name}，我年龄是${this.age}`);
    }
}

//创建一个Student类，继承于Person类
class Student extends Person {
    constructor(name,age,grade){
        super(name,age)
        this.grade = grade
        this.school = '尚硅谷'
    }
    //重写从父类继承过来的方法
    speak(){
        console.log(`我叫${this.name}，我年龄是${this.age},我读的是${this.grade}年级`);
        this.study()
    }
    study(){
        //study方法放在了哪里？——类的原型对象上，供实例使用
        //通过Student实例调用study时，study中的this就是Student实例
        console.log('我很努力的学习');
    }
}

class Car {
    constructor(name,price){
        this.name = name
        this.price = price
        // this.wheel = 4
    }
    //类中可以直接写赋值语句,如下代码的含义是：给Car的实例对象添加一个属性，名为a，值为1
    a = 1
    wheel = 4
    static demo = 100
}
const c1 = new Car('奔驰c63',199)
console.log(c1);
console.log(Car.demo);
```

## 组件实例三大核心属性

注：只是用于类注册的组件，函数式组件不具备三大属性(除props)

### state

[constructor中的this是实例对象，render中的this也是实例对象(因为在ReactDOM.render中调用组件名称，此时react内部会new 组件名称)](https://www.bilibili.com/video/BV1wy4y1D7JT?p=18&spm_id_from=pageDriver)

#### 借助**构造器初始化state**

```js
//1.创建组件
class Weather extends React.Component{
    constructor(props){
        console.log('constructor');
        super(props)
        //初始化状态
        this.state = {isHot:false,wind:'微风'}
    }

    render(){
        // 读取状态
        const {isHot,wind} = this.state
        return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
    }
}
//2.渲染组件到页面
ReactDOM.render(<Weather/>,document.getElementById('test'))
```

#### [!!!类方法的使用](https://www.bilibili.com/video/BV1wy4y1D7JT?p=15&spm_id_from=pageDriver)

**类中的方法默认开启了局部的严格模式**，方法中的this是undefined，需要将方法中的this改变为实例对象中的this

=> this.changeWeather = this.changeWeather.bind(this)

如果不修改this的指向，那么就是将函数赋值给一个变量，变量的直接调用而不是实例的调用

普通js理解

```js
class Person {
    constructor(name,age){
        this.name = name
        this.age = age
    }
    study(){
        //study方法放在了哪里？——类的原型对象上，供实例使用
        //通过Person实例调用study时，study中的this就是Person实例
        console.log(this);
    }
}

const p1 = new Person('tom',18)
p1.study() //通过实例调用study方法
const x = p1.study
x() // 直接调用study方法，不是实例调用
```

react中类方法的理解

```js
//1.创建组件
class Weather extends React.Component{
    //构造器调用几次？ ———— 1次
    constructor(props){
        console.log('constructor');
        super(props)
        //初始化状态
        this.state = {isHot:false,wind:'微风'}
        //解决changeWeather中this指向问题
        this.changeWeather = this.changeWeather.bind(this)
    }

    //render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
    render(){
        console.log('render');
        //读取状态
        const {isHot,wind} = this.state
        return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
    }

    //changeWeather调用几次？ ———— 点几次调几次
    changeWeather(){
        //changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
        //由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
        //类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
        console.log(this);
    }
}
//2.渲染组件到页面
ReactDOM.render(<Weather/>,document.getElementById('test'))
```

#### 更改state状态

状态不可直接更改，需要借助内置的API才可实现响应式更改，且更新是一种合并而不是替换

```js
//changeWeather调用几次？ ———— 点几次调几次
changeWeather(){
    //changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
    //由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
    //类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
    console.log('changeWeather');
    //获取原来的isHot值
    const isHot = this.state.isHot
    //严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
    this.setState({isHot:!isHot})
    console.log(this);

    //严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
    //this.state.isHot = !isHot //这是错误的写法
}
```

#### 总结

为什么要写constructor？constructor中初始化state状态，改变this指向

render？从状态中读取值并且做展示

方法？获取原来的值，用setState做更新

#### [!!!简化state写法](https://www.bilibili.com/video/BV1wy4y1D7JT?p=18&spm_id_from=pageDriver)

state没有写在constructor中，自定义方法的this通过赋值语句+箭头函数的方式修改

```js
//1.创建组件
class Weather extends React.Component{
    //初始化状态
    state = {isHot:false,wind:'微风'}

    render(){
        const {isHot,wind} = this.state
        return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
    }

    //自定义方法————要用赋值语句的形式+箭头函数
    changeWeather = ()=>{
        const isHot = this.state.isHot
        this.setState({isHot:!isHot})
    }
}
//2.渲染组件到页面
ReactDOM.render(<Weather/>,document.getElementById('test'))
```

### props

组件外部带值到组件内部使用，**props属性是只读的**(类似vue子组件向父组件传递)

#### 基本使用

在标签组件中写属性带入

![](https://i.bmp.ovh/imgs/2021/07/1d6e3e3c5158dfe4.png)

```js
//创建组件
class Person extends React.Component{
    render(){
        const {name,age,sex} = this.props
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))
```

#### 批量传递props

##### 一般使用(扩展运算符)

babel+react的扩展运算符可以展开对象，仅适用于标签属性的传递(直接输出也不行)，正常情况下扩展运算符是不能展开对象

```js
//创建组件
class Person extends React.Component{
    render(){
        const {name,age,sex} = this.props
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}

const p = {name:'老刘',age:18,sex:'女'}
ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))
```

##### 限制使用

propTypes：对标签属性进行类型、必要性的限制(react自己本身的属性)

PropTypes：因为引入prop-types这个库才要这么写

defaultProps：指定默认标签属性值

```html
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>
<script>
class Person extends React.Component{
    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        //props是只读的
        //this.props.name = 'jack' //此行代码会报错，因为props是只读的
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}
//对标签属性进行类型、必要性的限制
Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
    speak:PropTypes.func,//限制speak为函数
}
//指定默认标签属性值
Person.defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(<Person name='tom' speak={speak}/>,document.getElementById('test1'))
function speak(){
    console.log('我说话了');
}
</script>
```

#### [!!!简写props](https://www.bilibili.com/video/BV1wy4y1D7JT?p=23&spm_id_from=pageDriver)

将限制的属性及默认值都写在class中

```js
//创建组件
class Person extends React.Component{
    //对标签属性进行类型、必要性的限制
    static propTypes = {
        name:PropTypes.string.isRequired, //限制name必传，且为字符串
        sex:PropTypes.string,//限制sex为字符串
        age:PropTypes.number,//限制age为数值
    }

    //指定默认标签属性值
    static defaultProps = {
        sex:'男',//sex默认值为男
        age:18 //age默认值为18
    }

    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        //props是只读的
        //this.props.name = 'jack' //此行代码会报错，因为props是只读的
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}

//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```

#### 构造器的影响

如果不需要在实例中访问props，完全可以不写构造器；如果要访问则需要写

```js
class Person extends React.Component{
    constructor(props){
        //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
        super(props)
        console.log('constructor',this.props); // 可以访问到对应的属性值
    }
    
    constructor(){
        //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
        super()
        console.log('constructor',this.props); // undefined
    }
}
```

#### 函数式组件使用props

通过参数接收标签上的属性值才能使用props，函数式组件不能使用state和refs

```js
//创建组件
function Person (props){
    const {name,age,sex} = props
    return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age}</li>
            </ul>
        )
}
Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
}

//指定默认标签属性值
Person.defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
}
//渲染组件到页面
		ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```

### refs

#### 字符串形式(过时：因为效率不高)

方法名与原生js有差别(onClick, onBlur), 并且调用时需要带this

```js
//创建组件
class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=>{
        const {input1} = this.refs
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        const {input2} = this.refs
        alert(input2.value)
    }
    render(){
        return(
            <div>
                <input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
            </div>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```

#### 回调refs

ref={c => this.input1 = c } ： 在render初始化的时候就会赋值进去，后面在方法中使用可以直接在this上找属性，c表示当前节点

```js
//创建组件
class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=>{
        const {input1} = this
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        const {input2} = this
        alert(input2.value)
    }
    render(){
        return(
            <div>
                <input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
            </div>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```

#### 回调refs执行次数

##### 内联ref

如果 `ref` 回调函数是以内联函数的方式定义的ref={(c)=>{this.input1 = c}}，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。

```js
//创建组件
class Demo extends React.Component{

    state = {isHot:false}

    showInfo = ()=>{
        const {input1} = this
        alert(input1.value)
    }

    changeWeather = ()=>{
        //获取原来的状态
        const {isHot} = this.state
        //更新状态
        this.setState({isHot:!isHot})
    }

    saveInput = (c)=>{
        this.input1 = c;
        console.log('@',c);
    }

    render(){
        const {isHot} = this.state
        return(
            <div>
                <h2>今天天气很{isHot ? '炎热':'凉爽'}</h2>
                <input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/>
                <button onClick={this.showInfo}>点我提示输入的数据</button>
                <button onClick={this.changeWeather}>点我切换天气</button>
            </div>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Demo/>,document.getElementById('test'))
```

##### 类ref

通过将 ref 的回调函数定义成 class 的绑定函数的方式ref={this.saveInput}可以避免。

```js
//创建组件
class Demo extends React.Component{
    state = {isHot:false}
    showInfo = ()=>{
        const {input1} = this
        alert(input1.value)
    }
    changeWeather = ()=>{
        //获取原来的状态
        const {isHot} = this.state
        //更新状态
        this.setState({isHot:!isHot})
    }
    saveInput = (c)=>{
        this.input1 = c;
        console.log('@',c);
    }
    render(){
        const {isHot} = this.state
        return(
            <div>
                <h2>今天天气很{isHot ? '炎热':'凉爽'}</h2>
                <input ref={this.saveInput} type="text"/><br/><br/>
                <button onClick={this.showInfo}>点我提示输入的数据</button>
                <button onClick={this.changeWeather}>点我切换天气</button>
            </div>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Demo/>,document.getElementById('test'))
```

#### createRef

React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的，如果都使用同一个，后面的会将前面的覆盖

```js
//创建组件
class Demo extends React.Component{
    myRef = React.createRef()
    myRef2 = React.createRef()
    //展示左侧输入框的数据
    showData = ()=>{
        alert(this.myRef.current.value);
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        alert(this.myRef2.current.value);
    }
    render(){
        return(
            <div>
                <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>
                <button onClick={this.showData}>点我提示左侧的数据</button>
                <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
            </div>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```

#### 事件处理

发生事件的元素刚好是操作的元素时可以避免ref

(1).通过onXxx属性指定事件处理函数(注意大小写)

​      a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 —————— 为了更好的兼容性

​      b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效

(2).通过event.target得到发生事件的DOM元素对象 ——————————不要过度使用ref

```js
//创建组件
class Demo extends React.Component{
    //展示右侧输入框的数据
    showData2 = (event)=>{
        alert(event.target.value);
    }

    render(){
        return(
            <div>
                <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
            </div>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```

## 收集表单数据

### 非受控组件

页面中的所有输入DOM(input, radio, checkbox等)现用现取，借助ref

```js
//创建组件
class Login extends React.Component{
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this
        alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input ref={c => this.username = c} type="text" name="username"/>
                密码：<input ref={c => this.password = c} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```



### 受控组件

页面中可输入DOM随着输入更新到state中，等需要用的时候从状态中取出

```js
//创建组件
class Login extends React.Component{

    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

    //保存用户名到状态中
    saveUsername = (event)=>{
        this.setState({username:event.target.value})
    }

    //保存密码到状态中
    savePassword = (event)=>{
        this.setState({password:event.target.value})
    }

    //表单提交的回调
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveUsername} type="text" name="username"/>
                密码：<input onChange={this.savePassword} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```

## 高阶函数

如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数:

1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。

2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。

常见的高阶函数有：Promise、setTimeout、arr.map()等等

### [!!!函数柯里化](https://www.bilibili.com/video/BV1wy4y1D7JT?p=35&spm_id_from=pageDriver)

函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 

```js
function sum(a){
    return(b)=>{
        return (c)=>{
            return a+b+c
        }
    }
}
```



saveFormData的返回值给onChange作为回调，不是将saveFormData作为回调，而saveFormData的返回值是undefined，即真正触发的时候就不会执行函数

```js
<input onChange={this.saveUsername('username')} type="text" name="username"/>
    
// 该函数没有返回值，即默认是undefined
saveFormData = (event)=>{
    console.log('event') // username
}
```

正确使用(如果在onChange中调用了函数，那么那个函数的返回值需要返回函数才能触发到对应的事件，否则返回值为undefined不会触发对应事件)

```js
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

    //保存表单数据到状态中
    saveFormData = (dataType)=>{
        return (event)=>{
            this.setState({[dataType]:event.target.value})
        }
    }

    //表单提交的回调
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
                密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```

### 不使用柯里化

在onChange中使用回调函数

```js
//创建组件
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

    //保存表单数据到状态中
    saveFormData = (dataType,event)=>{
        this.setState({[dataType]:event.target.value})
    }

    //表单提交的回调
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={event => this.saveFormData('username',event) } type="text" name="username"/>
                密码：<input onChange={event => this.saveFormData('password',event) } type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```



## 组件生命周期

React的生命周期从广义上分为三个阶段：挂载、渲染、卸载

### 生命周期(旧v16.8.4)

![](https://i.bmp.ovh/imgs/2021/07/ff188fae10cd379c.png)

第一条线(页面初始化时触发)：constructor=>componentWillMount=>render=>componentDidMount

第二条线(state发生变化时触发)：setState=>shouldComponentUpdate=>componentWillUpdate=>render=>componentDidUpdate

第三条线(state没变化但是想页面强制触发)：forceUpdate=>componentWillUpdate=>render=>componentDidUpdate

第四条线(父组件state属性变化时触发)：父组件render=>componentWillReceiveProps=>shouldComponentUpdate=>componentWillUpdate=>componentDidUpdate

#### 初始化阶段

 由ReactDOM.render()触发---初次渲染

- constructor()：constructor()中完成了React数据的初始化

- componentWillMount()：代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时

- render()

- componentDidMount() ：组件第一次渲染完成，此时dom节点已经生成

  常用：一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息



#### 更新阶段

由组件内部this.setSate()或父组件render触发

- componentWillReceiveProps()：父组件改变后的props需要重新渲染组件

- shouldComponentUpdate()：控制组件更新的“阀门”
- componentWillUpdate()：组件将要更新的钩子
- render() =====> 必须使用的一个
- componentDidUpdate()：组件更新完毕的钩子



#### 卸载组件

 由ReactDOM.unmountComponentAtNode()触发

- componentWillUnmount() =====> 常用

​             一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息



### 生命周期(新v17)

![](https://i.bmp.ovh/imgs/2021/07/5cb691a3e79f1beb.png)

getDerivedStateFromProps(nextProps, prevState)：若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps，该方法是类的静态方法，return 数据对象后触发setState页面是不会发生变化的(需要return null 或数据对象)

getSnapshotBeforeUpdate：在更新之前获取快照(需要return)



## 组件通信

### 父子组件传值props

缺点：只能一层一层传递/兄弟组件必须借助父组件

```js
父组件App定义更新的方法并将该方法传递给子组件
export default class App extends Component {
	state = { //初始化状态
		isLoading:false,//标识是否处于加载中
	} 

	//更新App的state
	updateAppState = (stateObj)=>{
		this.setState(stateObj)
	}

	render() {
		return (
			<div className="container">
				<Search updateAppState={this.updateAppState}/>
			</div>
		)
	}
}

子组件List定义的函数通过props调用父组件更新数据的方法
export default class Search extends Component {
	search = ()=>{
		//发送请求前通知App更新状态
		this.props.updateAppState({isLoading:true})
	}

	render() {
		return (
			<button onClick={this.search}>搜索</button>
		)
	}
}
```



### [兄弟组件传值(消息订阅与发布)](https://github.com/mroderick/PubSubJS)

优点：对组件关系没有限制

缺点：不是集中式的管理

下载

```shell
npm install pubsub-js --save
```

机制：

- 先订阅，再发布（理解：有一种隔空对话的感觉）
- 适用于任意组件间通信
- **要在组件的componentWillUnmount中取消订阅**



使用：

List组件存放state，Search组件需要发布消息，List组件需要订阅消息

```js
List组件
引入库
import PubSub from 'pubsub-js'

使用
componentDidMount(){
    this.token = PubSub.subscribe('atguigu',(_,stateObj)=>{
        this.setState(stateObj)
    })
}
componentWillUnmount(){
    PubSub.unsubscribe(this.token)
}

Search组件
import PubSub from 'pubsub-js'

使用
触发state的动作中
search = ()=>{
    //获取用户的输入(连续解构赋值+重命名)
    const {keyWordElement:{value:keyWord}} = this
    //发送请求前通知List更新状态
    PubSub.publish('atguigu',{isFirst:false,isLoading:true})
    //发送网络请求
    axios.get(`/api1/search/users?q=${keyWord}`).then(
        response => {
            //请求成功后通知List更新状态
            PubSub.publish('atguigu',{isLoading:false,users:response.data.items})
        },
        error => {
            //请求失败后通知App更新状态
            PubSub.publish('atguigu',{isLoading:false,err:error.message})
        }
    )
}
```



### redux

优点：集中式管理多个组件共享的状态



# react脚手架

## 安装

全局安装

```shell
npm install -g create-react-app
```

创建项目

```shell
create-react-app 项目名称
```

index.html的解析

```html
<html lang="en">
  <head>
		<meta charset="utf-8" />
		<!-- %PUBLIC_URL%代表public文件夹的路径 -->
		<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
		<!-- 开启理想视口，用于做移动端网页的适配 -->
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- 用于配置浏览器页签+地址栏的颜色(仅支持安卓手机浏览器) -->
    <meta name="theme-color" content="red" />
    <meta
      name="description"
      content="Web site created using create-react-app"
		/>
		<!-- 用于指定网页添加到手机主屏幕后的图标 -->
		<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
		<!-- 应用加壳时的配置文件 -->
		<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
		<!-- 若llq不支持js则展示标签中的内容 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```



# react-ajax

## 配置代理

### 方法一

在package.json中最后追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以不加任何前缀。

2. 缺点：不能配置多个代理。

3. 工作方式：上述方式配置代理，当请求了3000(前端)不存在的资源时，那么该请求会转发给5000(服务器) （优先匹配前端资源）



### 方法二

第一步：创建代理配置文件(在src下创建配置文件：src/setupProxy.js)

第二步：编写setupProxy.js配置具体代理规则

```js
const proxy = require('http-proxy-middleware')
module.exports = function(app) {
 app.use(
   proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
     target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
     changeOrigin: true, //控制服务器接收到的请求头中host字段的值
     /*
        changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
        changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
        changeOrigin默认值为false，但我们一般将changeOrigin值设为true
     */
     pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
   }),
   proxy('/api2', { 
     target: 'http://localhost:5001',
     changeOrigin: true,
     pathRewrite: {'^/api2': ''}
   })
 )
}
```

说明：

优点：可以配置多个代理，可以灵活的控制请求是否走代理。

缺点：配置繁琐，前端请求资源时**必须加前缀**。



## 发送请求的库或原生js

xhr，jQuery，axios，fetch

原生请求：xhr，fetch；库：jQuery，axios

fetch发送数据成功，但是没有收到返回的数据，需要使用response.json()接收返回的数据(**要使用两个await**)

```js
try {
    const response= await fetch(`/api1/search/users2?q=${keyWord}`)
    const data = await response.json() // 生成Promise对象
    console.log(data);
} catch (error) {
    console.log('请求出错',error);
}
```

fetch使用的频率不高原因：浏览器的兼容性比较差



# react-router

## SPA的理解

- 单页Web应用（single page web application，SPA）
- 整个应用只有一个完整的页面【public下的index.html】
- 点击页面中的链接不会刷新页面, 本身也不会向服务器发请求
- 当点击路由链接时, 只会做页面的局部更新
- 数据都需要通过ajax请求获取, 并在前端异步展现



## react-router-dom

原生html中靠a标签跳转到不同的内容

在react中靠路由链接实现组件切换以及路由注册

```jsx
在最外层index.js中包裹浏览器路由
import {BrowserRouter} from 'react-router-dom'
ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>,
	document.getElementById('root')
)

在Home组件中使用路由的内容
import {NavLink,Route} from 'react-router-dom'
路由组件
<NavLink activeClassName="atguigu" className="list-group-item" to="/about">About</NavLink>
<Route path="/about" component={About}/>
 
一般组件
<Header />
```



## 路由组件与一般组件

1.写法不同：

​      一般组件：<Demo/>

​      路由组件：<Route path="/demo" component={Demo}/>

   2.存放位置不同：

​      一般组件：components

​      路由组件：pages

   3.接收到的props不同：

​      一般组件：写组件标签时传递了什么，就能收到什么

​      路由组件：接收到三个固定的属性

```js
history:
    go: ƒ go(n)
    goBack: ƒ goBack()
    goForward: ƒ goForward()
    push: ƒ push(path, state)
    replace: ƒ replace(path, state)
location:
    pathname: "/about"
    search: ""
    state: undefined
match:
    params: {}
    path: "/about"
    url: "/about"
```



## Link与NavLink 

NavLink点击了谁就在当前的路由追加一个active类名，因此点击项会高亮 

如果想要添加自己定义的类型，那么需要每一个NavLink都添加`activeClassName`，里面定义类的内容

```js
<NavLink activeClassName="atguigu" className="list-group-item" to="/about">About</NavLink>
<NavLink activeClassName="atguigu" className="list-group-item" to="/home">Home</NavLink>
```

封装的组件批量获取NavLink中的所有属性，同时标签体内容是一个特殊的标签属性

```jsx
封装的NavLink
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
	render() {
		return (
			<NavLink activeClassName="atguigu" className="list-group-item" {...this.props}/>
		)
	}
}

使用
<MyNavLink to="/about">About</MyNavLink>
<MyNavLink to="/home">Home</MyNavLink>
```

总结：

- NavLink可以实现路由链接的高亮，通过activeClassName指定样式名；
- 标签体内容是一个特殊的标签属性；
- 通过this.props.children可以获取标签体内容；

## 路由匹配Switch

如果路径有重名，找到匹配的路由后不再往下执行

```js
// 只会展示一个路由
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Route path="/home" component={Test}/>
</Switch>

// 会展示两个路由组件的内容
<Route path="/home" component={Home}/>
<Route path="/home" component={Test}/>
```



## 解决多级路径刷新页面样式丢失的问题

public文件夹就是内置服务器localhost:3000的根路径，如果请求的资源不存在，默认会返回public文件夹下的index.html文件

- public/index.html 中 引入样式时不写./ 写 /(常用)
- public/index.html 中 引入样式时不写./ 写 %PUBLIC_URL%
- 使用HashRouter(不推荐使用)

## 路由模糊匹配和精准匹配

- 默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
- 开启严格匹配：<Route exact={true} path="/about" component={About}/>
- 严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

```js
<MyNavLink to="/home/a/b">Home</MyNavLink>

<Route exact path="/home" component={Home}/> // 开启了严格匹配，无法与上面的路由匹配上，路径不一样
<Route path="/home" component={Home}/> // 可以与上面的路由匹配
    
==================================================
// 路由组件无法匹配
<MyNavLink to="/home">Home</MyNavLink>
<Route path="/home/a" component={Home}/>
```

## 路由重定向

一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

```js
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/about"/>
</Switch>
```

## 嵌套路由(多级路由)

- 注册子路由时要写上父路由的path值
- 路由的匹配是按照注册路由的顺序进行的

```js
<div>
    <h3>我是Home的内容</h3>
    <div>
        <ul className="nav nav-tabs">
            <li>
                <MyNavLink to="/home/news">News</MyNavLink>
            </li>
            <li>
                <MyNavLink to="/home/message">Message</MyNavLink>
            </li>
        </ul>
        {/* 注册路由 */}
        <Switch>
            <Route path="/home/news" component={News}/>
            <Route path="/home/message" component={Message}/>
            <Redirect to="/home/news"/>
        </Switch>
    </div>
</div>
```

## 路由传参

### 通过params传递

- 路由链接(**携带参数**)：<Link to='/demo/test/tom/18'}>详情</Link>
- 注册路由(**声明接收**)：<Route path="/demo/test/:name/:age" component={Test}/>
- 接收参数：**this.props.match.params**

### search参数

- 路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'}>详情</Link>
- 注册路由(**无需声明**，正常注册即可)：<Route path="/demo/test" component={Test}/>
- 接收参数：t**his.props.location.search**
- 备注：获取到的search是urlencoded编码字符串，需要借助querystring解析(该库react脚手架自带)

### state参数

- 路由链接(**携带参数state**)：<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
- 注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
- 接收参数：**this.props.location.state**
- 备注：**刷新也可以保留住参数**



### 路由的push和replace

push会记录路由的记录，replace是会替换最上方的那条路由记录



### 编程式导航

借助this.prosp.history对象上的API对操作路由跳转、前进、后退

- this.prosp.history.push()
- this.prosp.history.replace()
- this.prosp.history.goBack()
- this.prosp.history.goForward()
- this.prosp.history.go()



### withRouter

只有路由组件才有history方法，一般组件没有这个方法

withRouter能接收一般组件，然后给一般组件的身上加上路由组件特有的方法，用于解决一般组件使用路由api的问题

```jsx
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

class Header extends Component {
	back = ()=>{
		this.props.history.goBack()
	}
	forward = ()=>{
		this.props.history.goForward()
	}
	go = ()=>{
		this.props.history.go(-2)
	}
	render() {
		console.log('Header组件收到的props是',this.props);
		return (
			<div className="page-header">
				<h2>React Router Demo</h2>
				<button onClick={this.back}>回退</button>&nbsp;
				<button onClick={this.forward}>前进</button>&nbsp;
				<button onClick={this.go}>go</button>
			</div>
		)
	}
}

export default withRouter(Header)
```



### BrowserRouter与HashRouter的区别

- 底层原理不一样：
  - BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
  - HashRouter使用的是URL的哈希值。
- path表现形式不一样
  - BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
  - HashRouter的路径包含#,例如：localhost:3000/#/demo/test
- 刷新后对路由state参数的影响
  - BrowserRouter没有任何影响，因为state保存在history对象中。
  - **HashRouter刷新后会导致路由state参数的丢失**！！！
- 备注：HashRouter可以用于解决一些路径错误相关的问题。



# react-redux



# 扩展

## setState

### 写法一：对象式的setState

(1). setState(stateChange, [callback])------对象式的setState

​      1.stateChange为状态改变对象(该对象可以体现出状态的更改)

​      2.**callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用**，如果不在回调中输出，有可能界面更新但是输出的数据还是旧的

**setState本身是同步的方法，但是setState引起react后续更新状态是异步的**

```js
const {count} = this.state
//2.更新状态
this.setState({count:count+1},()=>{ // 在回调函数中输出是得到最新的值
    console.log(this.state.count);
})
```

### 写法二：函数式的setState

(2). setState(updater, [callback])------函数式的setState

​      1.**updater为返回stateChange对象的函数**。

​      2.updater**可以接收到state和props**。

​      4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。

```js
this.setState((state, prop) => {return {count: state.count + 1}})
```

总结

1.对象式的setState是函数式的setState的简写方式(语法糖)

2.使用原则：

​    (1).如果新状态不依赖于原状态 ===> 使用对象方式

​    (2).如果新状态依赖于原状态 ===> 使用函数方式

​    (3).如果需要在setState()执行后获取最新的状态数据, 要在第二个callback函数中读取



## 路由懒加载lazyLoad

路由组件用lazy函数引入，loading组件正常方式引入

要引入lazy,Suspense，lazy是用于在懒加载，Suspense是路由在加载中默认展示的内容，Suspense的fallback用做默认展示什么内容

```jsx
//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
const Login = lazy(()=>import('@/pages/Login'))

//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
<Suspense fallback={<h1>loading.....</h1>}>
    <Switch>
        <Route path="/xxx" component={Xxxx}/>
        <Redirect to="/login"/>
    </Switch>
</Suspense>
```

## Hooks

### State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```



hooks使得函数式组件可以操作state

Demo方法调用的次数是1+n，初始化是第一次，其后所有做修改的内容都会调用Demo

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

// 函数式组件
function Demo(){
	const [count,setCount] = React.useState(0) // 0表示count初始化的值，setCount表示要操作count调用的函数

	//加的回调
	function add(){
		//setCount(count+1) //第一种写法
		setCount(count => count+1) // 第二种写法
	}

	return (
		<div>
			<input type="text"/>
			<h2>当前求和为：{count}</h2>
			<button onClick={add}>点我+1</button>
		</div>
	)
}

export default Demo
```

### Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount()
```

该钩子可以在函数式中使用生命周期的钩子

useEffect如果只传一个参数，不仅在页面挂载的时候执行，在页面更新的时候也会执行，相当于监测所有state

useEffect第一个参数是箭头函数，第二个参数为数组(选填)，如果不传第二个参数相当于componentDidMount+componentDidUpdate的结合，如果第一个参数返回一个参数且不传第二个参数相当于componentDidMount+componentDidUpdate+componentWillUnmount

如果第二个参数传入空数组，相当于componentDidMount钩子函数；

如果第二个参数传入要监测的值，监测的值相当于vue的watch，当前值发生改变就会执行componentDidMount+componentDidUpdate，其他值改变不会执行useEffect中的函数

```jsx
const [count,setCount] = React.useState(0)
const [name,setName] = React.useState('tom')

React.useEffect(()=>{
    console.log('@') // 执行add方法是会触发更新useEffect，但是执行change方法不会触发useEffect，监测对象没有name，只有
},[count])

function add(){
    setCount(count => count+1)
}
function change(){
    setName('jack')
}

<h2>当前求和为：{count}</h2>
<button onClick={add}>点我+1</button>
<button onClick={change}>改名</button>
```



useEffect第一个参数是箭头函数返回的参数相当于componentWillUnmount

```jsx
React.useEffect(()=>{
    let timer = setInterval(()=>{
        setCount(count => count+1 )
    },1000)
    return ()=>{
        clearInterval(timer)
    }
},[])
```



### Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```

```jsx
function Demo(){
	const myRef = React.useRef()

	//提示输入的回调
	function show(){
		alert(myRef.current.value)
	}

	return (
		<div>
			<input type="text" ref={myRef}/>
			<button onClick={show}>点我提示数据</button>
		</div>
	)
}
```

## Fragment

使用可以不用必须有一个真实的DOM根标签了

<Fragment><Fragment>

 <></>

```jsx
import React, { Component,Fragment } from 'react'

export default class Demo extends Component {
	render() {
		return (
			<Fragment key={1}>
				<input type="text"/>
				<input type="text"/>
			</Fragment>
		)
	}
}
```

## Context

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

```
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

使用

```js
import React, { Component } from 'react'
import './index.css'

//创建Context对象
const MyContext = React.createContext()
const {Provider,Consumer} = MyContext
export default class A extends Component {

	state = {username:'tom',age:18}

	render() {
		const {username,age} = this.state
		return (
			<div className="parent">
				<h3>我是A组件</h3>
				<h4>我的用户名是:{username}</h4>
				<Provider value={{username,age}}>
					<B/>
				</Provider>
			</div>
		)
	}
}

class B extends Component {
	render() {
		return (
			<div className="child">
				<h3>我是B组件</h3>
				<C/>
			</div>
		)
	}
}

/* class C extends Component {
	//声明接收context
	static contextType = MyContext
	render() {
		const {username,age} = this.context
		return (
			<div className="grand">
				<h3>我是C组件</h3>
				<h4>我从A组件接收到的用户名:{username},年龄是{age}</h4>
			</div>
		)
	}
} */

function C(){
	return (
		<div className="grand">
			<h3>我是C组件</h3>
			<h4>我从A组件接收到的用户名:
			<Consumer>
				{value => `${value.username},年龄是${value.age}`}
			</Consumer>
			</h4>
		</div>
	)
}
```

## PureComponent

Component的2个问题：

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render()
>
> 2. 只当前组件重新render(), 就会自动重新render子组件 ==> 效率低



**效率高的做法**

**只有当组件的state或props数据发生改变时才重新render()**，例如：可以在当前组件添加shouldComponentUpdate函数对比，如果state中的值没有发生改变就不重新render，子组件也添加shouldComponentUpdate，如果接受的props值没有发生改变就不重新render，有一种简写的方式是直接使用react中的PureComponent



**原因**

Component中的shouldComponentUpdate()钩子总是返回true



**解决办法**

```
办法1: 
    重写shouldComponentUpdate()方法
    比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
办法2:  
    使用PureComponent
    PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
    注意: 
        只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
        不要直接修改state数据, 而是要产生新数据
项目中一般使用PureComponent来优化
```



## renderProps插槽

**向组件内部动态传入带内容的结构(标签)**

Vue中: 

  使用slot技术, 也就是通过组件标签体传入结构 <AA><BB/></AA>

 React中:

  使用children props: 通过组件标签体传入结构

  使用render props: 通过组件标签属性传入结构, 一般用render函数属性

### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

### render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data}

## 错误边界

错误边界：用来捕获后代组件错误，渲染出备用页面

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```



# 易忘点

- 状态在哪里，修改状态的方法就在哪里




- 子传父：通过props传递，要求父提前给子传递一个函数，子组件直接调用父组件的方法

- 父传子：直接在子组件的标签中传过去即可，子组件通过this.props接收父亲传递过来的值


```js
// 父组件给子组件传值(todos)
<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
    
// 子组件调用父组件的方法更新数据
子组件的方法：
handleDelete = (id)=>{
    if(window.confirm('确定删除吗？')){
        this.props.deleteTodo(id) // 通过props属性调用父组件的方法
    }
}
父组件的方法：
deleteTodo = (id)=>{
    //获取原来的todos
    const {todos} = this.state
    //删除指定id的todo对象
    const newTodos = todos.filter((todoObj)=>{
        return todoObj.id !== id
    })
    //更新状态
    this.setState({todos:newTodos})
}
```



- style={{}}


```
<span style={{color:'white',fontSize:'29px'}}>hello</span>
```



- class的正确写法className


```
<button className="btn btn-danger">点击</button>
```



- onClick={this.get('d')} 方法中有括号是直接调用，需要返回的是一个函数而不是函数的返回值


```js
// 含参数的调用方法
<input onClick={this.get('a')} type="text" />

get = (val) => {
    return (event)=>{
        console.log(event, val)
    }
}

// 不含参数的调用方法
<input onClick={this.get} type="text"/>

get = ()=>{
    console.log('执行了方法')
}
```



- 标签中传递对应所有的值 {...obj}


```
 <Item key={todo.id} {...todo} updateTodo={updateTodo} />
```



- 给数组绑定key， key={index}


```
 <Item key={todo.id}/>
```



- react中初始化的checkbox值可以使用defaultChecked，如果使用checked那么必须要搭配onChange方法使用，但是使用defaultChecked只会在第一次时有效，由其他事件触发的checkbox一定要绑定checked这个属性




- jsx中如果要写动态值，需要用{}包裹然后再用map遍历数组，{}中可以直接使用if或三元表达式



# 项目经验

App.vue

```jsx
import React, {Component} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import Admin from './pages/admin/Admin'
import Login from './pages/login/Login'
/*
应用根组件
 */
class App extends Component {
  render(){
    return(
      <HashRouter>
        <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={Admin}/>
        <Redirect to="/login" />>
        </Switch>
      </HashRouter>
    )
  }
}

export default App
```

Login.vue

收集信息

用到高级函数和高阶组件

