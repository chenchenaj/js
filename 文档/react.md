# react

## 开发react依赖的三个库

react：包含react所必须的核心代码

react-dom：react渲染在不同平台所需要的核心代码

babel：将jsx转换成React代码的工具



# 基本使用

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



## 虚拟DOM

- 本质是Object类型的对象（一般对象）
- 虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。
- 虚拟DOM最终会被React转化为真实DOM，呈现在页面上。



## 组件

### 函数式组件

组件名称需要大写；组件标签需要闭合

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