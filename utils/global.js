/**
 * 函数相关的扩展
 */
// 节流
export function throttle (func, delay) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  }
}

// 防抖
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

/**
 * 时间
 */
