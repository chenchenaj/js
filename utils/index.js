// 函数节流
export function throttle(func, delay) {
  var timer = null;      
  return function() {        
    var context = this;        
    var args = arguments;        
    if (!timer) {          
      timer = setTimeout(function() {            
        func.apply(context, args);            
        timer = null;          
      }, delay);        
    }      
  }    
}

// 函数防抖
export function debounce (func, wait) {
  var timeout;
  return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          func.apply(context,args)
      }, wait);
  }
}

// 使用
getNewCaptcha: debounce(function(){
    console.log('debounce')
},1000)