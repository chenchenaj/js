# 函数集合

## 转换时间

```js
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
```

## 转换日期

```js
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
```

## 获取url地址参数

```js
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
```

## 列表数据转树形数据

```js
export const convertTreeData = function(list, pid) {
  const res = []
  list.forEach(item => {
    if (item.pid === pid) {
      // 这里找到了这一层的儿子, 需要把这个儿子的 id 继续递归作为下一层的爸爸
      const children = convertTreeData(list, item.id)
      if (children.length > 0) {
        item.children = children
      }
      res.push(item)
    }
  })
  return res
}
```

## 函数节流

```js
export function throttle (func, delay) {

     var timer = null;

     return function () {

      var context = this;

      var args = arguments;

      if (!timer) {

       timer = setTimeout(function () {

    ​    func.apply(context, args);

    ​    timer = null;

       }, delay);

      }

     }
}
```

## 函数防抖

```js
export function debounce (func, wait) {

     var timeout;

     return function () {

      var context = this;

      var args = arguments;

      clearTimeout(timeout);

      timeout = setTimeout(() => {

       func.apply(context, args)

      }, wait);

     }

}
```

将值转为万

```js
export function formatNumber (number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}
```

