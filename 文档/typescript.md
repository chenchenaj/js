## 安装配置

### 安装解析 TS 的 工具

```cmd
npm i -g typescript
```



```
npm i ts-node -g
```
html中直接引入ts文件，浏览器会报错(如果ts文件中只有单纯的js语法代码，是可以正常的引入及使用的)，ts文件都需要经过编译转换为js才能正常引入且被使用

练习
```ts
// person中只能传入string类型的值
function greeter (person:string) {
  return 'Hello, ' + person
}

let user = 'Yee'

console.log(greeter(user))
```

