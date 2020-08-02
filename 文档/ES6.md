# JSON 对象

1. 本质： JSON 字符串，字符串
2. 原生 js 对象/数组 VS JSON 对象/数组
3. JSON.parse 将 JSON 对象/数组转换成原生 js 对象/数组，


    - 当给JSON.parse传入的数据是非JSON对象/数组会报错

4. JSON.stringify

# Object 方法

## Object.create

- 可以创建新的对象，该对象默认是空对象
- 可以为该对象添加新的属性
- 可以为该对象指定原型对象

```angular2html
  var obj = Object.create(obj2, {
    sex: { // 针对扩展属性呢说明对象
      value: '男',
      writable: true,
      configurable: true,
      enumerable: true
    }

  }); // 可以指定原型对象，指定的同时会生成一个新的空对象
```

## Object.defineProperty || Object.defineProperties

- 为指定的对象添加新的属性
- getter setter 存取器属性
- get 获取属性值
- set 监听扩展属性值，千万不要在 set 中直接修改扩展属性，容易造成死循环

```angular2html
  var obj4 = {

    };
    var test = {
      name: 'kobe',
      age: 42
    }
    for(let a in test){
      if(test.hasOwnProperty(a)){
        Object.defineProperties(obj4, {
          [a]: {
            get: function () { // 获取扩展属性值
              return test[a]
            },
            set: function (msg) { // 监视扩展属性
              console.log(msg, 'msg');
              test[a] = msg;
              console.log(test);
            }
          }
        })
      }
    }
    console.log(obj4);
    obj4.name = 'wade'
    console.log(obj4.name);
    console.log(test.name);


```

## 箭头函数

1. 语法: let fun = () => 函数体
2. 形参： 形参的个数 ---> ()能否省略
3. 函数体: 语句或者表达式的条数 ---> {} 能否省略
4. {} 当{}省略的时候，会自动 return 当前语句或者是表达式的结果

## 箭头函数特点:

1. 简洁
2. 箭头函数的 this:


    -  箭头函数没有自己的this，箭头函数的this不是看调用的时候，而是看定义的时候
    -  箭头函数的this是其定义的时候所处的执行上下文对象
    -  箭头函数的this是看其外层是否有函数
      - 如果有当前箭头函数的this指向同外层函数this指向一样，注意: 外层函数有可能也是箭头函数
      - 如果外层没有函数，this ---> window

## promise 对象

1. 作用： 解决异步回调嵌套问题(回调地狱)，将异步的流程用同步的形式表达出来
2. 思想：

   - 给 promise 设置的三种状态： pending, resolved, rejected
   - 通过异步任务的执行结果动态的去修改 promise 的状态
   - promise 状态的改变可以去 then 方法中的成功或者失败的回调
   - 可以通过 resolve，reject 调用的时候将数据传递给成功或者失败的回调

## async 函数

1. 作用: 解决异步回调
2. 语法：


    ```
      async function foo(){
        await 异步操作;
        await 异步操作；
      }

    ```

3. 通常和 promise 配合使用，
4. async 代表异步， await 等待异步执行


    -  异步任务执行成功以后才会执行后续的代码返回的
    -  根据promise实例对象的状态决定的

## class 类对象

1. 语法： class 类对象 {}
2. 用法: new 类对象 ----> 类的实例对象
3. 特点：


    -  在类里定义的方法都会放在实例对象的原型上
    -  通过static 可以给类对象自身添加属性

4. extends: 实现继承


    -  语法： class 子类 extends 父类{}
    -  extends干了什么事情： 子类的原型 = 父类的实例

5. super


    -  当使用extends进行继承的时候在子类的构造方法中必须调用super
    -  调用父类的构造方法，同时修改父类构造方法中的this指向 ---> 子类的实例

6. 父类的方法重写


    -  当父类原型上的方法不能满足子类实例的需求的时候
    -  在子类中定义自己的方法供当前子类的实例用

## 深度克隆：

1. 理解：
   - 克隆： 将源数据中的数据拷贝给目标数据中
   - 分类：
     - 基本数据类型拷贝 ---> 值拷贝
     - 引用数据类型拷贝 ---> 拷贝的是引用地址
   - 克隆的时候需要关注的是： 拷贝的源数据中是否包含引用数据类型
   - 可能出现的问题： 修改克隆后的数据会影响原数据 ---> 浅拷贝
2. 浅拷贝：
   - concat
   - slice
   - 三点运算符
   - Object.assign
3. 深拷贝：
   - JSON.parse(JSON.stringify(source)) ---> 不能处理函数数据
   - 自己封装实现深度克隆
   ```
     function checkoutType(target) {
         return Object.prototype.toString.call(target).slice(8, -1)
       }
       function clone(target) {
         let result, targetType = checkoutType(target);
         // 检测克隆目标的数据类型
         if(targetType === 'Array'){
           result = [];
         }else if(targetType === 'Object'){
           result = {};
         }else {
           return target;
         }
         // 思考： 选用哪种方式遍历？？？  需求； 对象的key，数组的index ，结论： for in
         for(let i in target){
           // 获取个体元素
           // result[i] = target[i] 如果原数据中有引用数据类型，就是浅拷贝
           if(checkoutType(target[i]) === 'Array' || 'Object'){
             result[i] = clone(target[i])
           }else {
             result[i] = target[i]
           }
         }
         return result;
       }
   ```

​

## Set 容器

1. 定义： 保存多个无序的不重复的 value 集合体
2. 语法: let set = new Set(Array)
3. 特点： 身上有 iterator 接口 ---> 可以使用 for of || 三点运算符遍历
4. 用途: 给数组去重


    let arr2 = [];
    console.log('------ 原生js实现数组去重 -------');
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if(arr2.indexOf(item) === -1){
        arr2.push(item)
      }
    }

    console.log(arr2);
    console.log('------ 利用ES6的set去重-------');
    function uniqArr(target) {
      let set = new Set(target);
      let result = [];
      for(let i of set){
        result.push(i);
      }
      return result;
    }
    console.log('------ 精简ES6set去重-------');
    let uniqArr2 = target => [...new Set(target)];

​
