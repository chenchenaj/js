# react

## 开发react依赖的三个库

react：包含react所必须的核心代码

react-dom：react渲染在不同平台所需要的核心代码

babel：将jsx转换成React代码的工具



## 在html中使用react

```js
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```



使用jsx，并且希望script中jsx的代码被解析，必须在script标签中添加属性

```js
<script type="text/babel">
     ReactDOM.render(渲染的内容, 渲染的对象)
     ReactDOM.render(myh1, document.getElementById('app'))
</script>
```

