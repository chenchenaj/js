Promise



## promise.all

应用场景

**一个页面需要请求来两个甚至更多的Ajax请求数据后才能正常显示，在此之前使用loading图标显示**

```js
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 3000)
})

const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')
// 1. 所有的Promise都成功了
const p11 = Promise.all([ p1, p2, p3 ])
	.then(console.log) // [ 1, 2, 3 ]
      .catch(console.log)
      
// 2. 有一个Promise失败了
const p12 = Promise.all([ p1, p2, p4 ])
	.then(console.log)
      .catch(console.log) // err4
      
// 3. 有两个Promise失败了，可以看到最终输出的是err4，第一个失败的返回值
const p13 = Promise.all([ p1, p4, p5 ])
	.then(console.log)
      .catch(console.log) // err4
```



## Promise.allSettled

希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作

```js
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 3000)
})

const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')
// 1. 所有的Promise都成功了
const p11 = Promise.allSettled([ p1, p2, p3 ])
	.then((res) => console.log(JSON.stringify(res, null,  2)))

// 输出 
/*
[
  {
    "status": "fulfilled",
    "value": 1
  },
  {
    "status": "fulfilled",
    "value": 2
  },
  {
    "status": "fulfilled",
    "value": 3
  }
]
*/
      
// 2. 有一个Promise失败了
const p12 = Promise.allSettled([ p1, p2, p4 ])
	.then((res) => console.log(JSON.stringify(res, null,  2)))
        
// 输出 
/*
[
  {
    "status": "fulfilled",
    "value": 1
  },
  {
    "status": "fulfilled",
    "value": 2
  },
  {
    "status": "rejected",
    "reason": "err4"
  }
]
*/
      
// 3. 有两个Promise失败了
const p13 = Promise.allSettled([ p1, p4, p5 ])
	.then((res) => console.log(JSON.stringify(res, null,  2)))
        
// 输出 
/*
[
  {
    "status": "fulfilled",
    "value": 1
  },
  {
    "status": "rejected",
    "reason": "err4"
  },
  {
    "status": "rejected",
    "reason": "err5"
  }
]
```





## promise.race

应用场景

**把异步操作和定时器放到一起，如果定时器先触发，认为超时，告知用户**

```js
const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 1)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 2)
})

Promise.race([p1, p2]).then((value) => {
  console.log(value) // 2
})

Promise.race([p1, p2, 3]).then((value) => {
  console.log(value) // 3
})
```

