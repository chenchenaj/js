# jquery

pink老师源码地址：https://gitee.com/xiaoqiang001/jquery

必须等到页面加载完成才执行操作

```
$(document).ready(function(){})
简写：
$(function () {})

类似js
window.onload = function(){}
```

## 自身$(this)



## 解决冲突noConflict

### jQuery内容的其他库$被覆盖

解决办法：

一：将jQuery的$全部改为jQuery可以实现功能

```javascript
$(function () {
  $('button').on('click', function () {
    $('p').html('快乐hahahhah')
  })
})

改为
jQuery(function () {
  jQuery('button').on('click', function () {
    jQuery('p').html('快乐hahahhah')
  })
})
```



二：形成封闭作用域

```javascript
window.onload = function(){
	(function($){
		$(function () {
          $('button').on('click', function () {
            $('p').html('快乐hahahhah')
          })
        })
	})(jQuery)
}
```



### 其他函数库的$被jQuery覆盖

方式一：形成封闭作用域

```javascript
window.onload = function(){
	(function($){
		$(function () {
          $('button').on('click', function () {
            $('p').html('快乐hahahhah')
          })
        })
	})(jQuery)
}
```

方式二：解除jQuery对$的引用

```javascript
 var _ = $.noConflict() //解除jQuery对$的引用
_(function () {
  _('#btn2').on('click', function () {
    _('p').html('解除jQuery对$的引用')
  })
})
```



## jQuery对象与js对象的转换

两者不可以调用对方的方法

```javascript
js对象: var div = document.getElementById('box')
jQuery对象：var $div = $('#box')
```



### js转jq

```javascript
var p1 = document.getElementsByTagName('p')[0]
var $p3 = $(p1)
console.log($p3.html())
```



### jq转js

```javascript
var $p2 = $('p')
var p4 = $p2.get(0)
console.log(p4.innerHTML)
```

图例：

![](https://i.bmp.ovh/imgs/2020/07/851829a38479439c.png)



## 增删改查类

### 添加类

```javascript
$("p").addClass("selected1 selected2")
```

### 删除类

```javascript
$("p").removeClass("selected")
```

### 切换类

```javascript
$("p").toggleClass("selected")
```

### 查找类

```html
<div class="protected"></div>
<div></div>

<script>
$("div").click(function(){
  if ( $(this).hasClass("protected") )
    $(this)
      .animate({ left: -10 })
      .animate({ left: 10 })
      .animate({ left: -10 })
      .animate({ left: 10 })
      .animate({ left: 0 });
});
</script>
```



## 操作css

### 获取样式

```html
.box {
  width: 200px;
  height: 200px;
  background-color: red;
}
 
<div class="box"></div>

$(function () {
  var $box = $('.box')
  var w = $box.css('width')
  var h = $box.css('height')
  var c = $box.css('background-color')
  console.log(w + ',' + h + ',' + c)
})
```



### 设置样式

#### 方式一：分别设置

```javascript
$('.btn2').on('click', function () {
    $box.css('width', '300px')
    $box.css('height', '300px')
    $box.css('background-color', 'yellow')
  })
```



#### 方式二：链式调用

```javascript
$box.css('width', '300px').css('height', '300px').css('background-color', 'blue')
```



#### 方式三：值为对象

```javascript
$box.css({
  'width': '300px',
  'height': '300px',
  'background-color': 'purple'
})
或
 $("div").css({
    width: 400,
    height: 400,
    backgroundColor: "red"
    // 如果是复合属性则必须采取驼峰命名法，如果值不是数字，则需要加引号
})
```



## 操作css尺寸

width()：设置或返回元素的宽度
height()：设置或返回元素的高度
innerWidth()：width+padding
innerHeight()：height+padding
outerWidth()：width+padding+border
outerHeight()：height+padding+border
outerWidth(true)：width+padding+border+margin
outerHeight(true)：height+padding+border+margin

```html
<style>
.box {
  width: 100px;
  height: 100px;
  background-color: pink;
  border: 10px solid #ccc;
  padding: 20px;
  margin: 30px;
}
</style>

<div class="box"></div>

<script>
$(function () {
  // 获取
  var $box = $('.box')
  console.log($box.width())
  console.log($box.height())
  console.log($box.innerWidth()) // 包括补白、不包括边框
  console.log($box.innerHeight())
  console.log($box.outerWidth()) // 默认包括补白和边框
  console.log($box.outerHeight())
  console.log($box.outerWidth(true)) // 设置为 true 时，计算边距在内
  console.log($box.outerHeight(true))
   
  // 设置
  $box.width(200)
})
</script>
```



## 操作html

### 获取内容

#### text带格式的文本

#### html带格式的html标签

#### val属于input中的值

#### attr获取属性值

```html
<div class="box">
    <p>hahhahah</p>
    <input type="text" placeholder="请输入" value="学习">
</div>
<a href="www.baidu.com">百度一下</a>

<script>
    $(function () {
      getContent()
    })

    function getContent() {
      var $box = $('.box')
      console.log($box.text()) // 带格式的文本
      console.log($box.html()) // 带格式的html标签

      var $input = $('input')
      console.log($input.val()) // 获取input的值

      var $href = $('a')
      console.log($href.attr('href')) // 获取a标签中的属性值
    }
</script>
```



### 修改内容

```js
function setContent() {
  var $box = $('.box')
  var $input = $('input')
  var $href = $('a')
  $box.text('hello')
  $box.html('<span>您好</span>')

  $input.val("hello world!")

  $href.attr('href', 'https://jquery.cuishifeng.cn/val.html')
}
```



### 修改属性

```js
function setContent() {
  var $href = $('a')

  $href.attr('href', 'https://jquery.cuishifeng.cn/val.html')
    
  $href.attr({
    'href': 'https://www.bilibili.com/video/BV1At411u7Tj?p=18',
    'target': '_blank'
  })
}
```



![1595693253399](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1595693253399.png)



## 选择器

### 筛选选择器

![](https://i.bmp.ovh/imgs/2020/07/a964caf515c0ac82.png)



### 方法

#### parent()

返回的是 最近一级的父级元素 亲爸爸



#### children()

亲儿子，类似子代选择器  ul>li



#### find() 

类似于后代选择器，可以选里面所有的孩子 包括儿子和孙子



#### 兄弟siblings()

除了自身元素之外的所有亲兄弟



#### 第n个元素eq

##### 利用选择器的方式选择

```js
$("ul li:eq(2)").css("color", "blue")
```

##### 利用选择方法的方式选择

```js
$("ul li").eq(2).css("color", "blue")
```



![](https://i.bmp.ovh/imgs/2020/07/acee065557f683bb.png)



## 排他思想

只给当前的添加其他兄弟元素不添加

```
$(this).css('background-color', 'blue').siblings().css('background-color', '')
```



## 获取自身索引号index

$(this).index()



## 事件切换

hover([over,]out)

over:鼠标移到元素上要触发的函数【相当于mousemove】

out:鼠标移出元素要触发的函数【相当于mouseout】



## 动画

### 显示show()

### 隐藏hide()

### 切换toggle()

单个显示或隐藏$(this).parent().xx

```html
<style>
    .ad {
      width: 120px;
      height: 420px;
      background: url('https://dwz.ovh/c') no-repeat;
    }

    .left {
      position: absolute;
      top: 200px;
      left: 0;
    }

    .right {
      position: absolute;
      right: 0;
      top: 200px;
    }

    img {
      width: 16px;
      height: 16px;
      position: absolute;
      right: 10px;
      top: 10px;
    }
</style>
<body>
  <button class="btn1">显示</button>
  <button class="btn2">隐藏</button>
  <button class="btn3">切换</button>
  <div class="ad left">
    <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=596545011,2305695392&fm=26&gp=0.jpg" alt="">
  </div>
  <div class="ad right">
    <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=596545011,2305695392&fm=26&gp=0.jpg" alt="">
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script>
    $(function () {
      $('.btn1').on('click', function () {
        $('.ad').show(1000)
      })
      $('.btn2').on('click', function () {
        $('.ad').hide(1000)
      })
      $('.btn3').on('click', function () {
        $('.ad').toggle(1000)
      })

      $('img').on('click', function () {
        $(this).parent().hide(1000)
      })
    })
  </script>
</body>
```



### 展开slideDown()

### 收起slideUp()

### 展开收起slideToggle()

由于给`document`绑定事件，点击`box`中的元素时会事件冒泡给父元素，在子元素点击的时候需要阻止事件冒泡

```html
<style>
    .box {
      position: relative;
      width: 500px;
      height: 300px;
      line-height: 300px;
      margin: 100px auto;
      border: 1px solid blue;
    }

    p {
      text-align: center;
    }

    .left {
      position: absolute;
      left: 0;
      top: 0;
    }

    .right {
      position: absolute;
      right: 0;
      top: 0;
    }

    img {
      width: 250px;
      height: 300px;
    }
</style>

<body>
  <div class="box">
    <p>关门</p>
    <div class="wm left">
      <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1228821886,111278143&fm=26&gp=0.jpg" alt="">
    </div>
    <div class="wm right">
      <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1228821886,111278143&fm=26&gp=0.jpg" alt="">
    </div>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script>
    $(function () {
      $(document).on('click', function () {
        $('.wm').slideToggle(1000)
      })

      // 左侧门帘【由于给document绑定事件，点击left的时候会事件冒泡的document，需要阻止事件冒泡】
      $('.left').on('click', function (e) {
        e.stopPropagation()
        $(this).slideUp(1000)
      })

      // 右侧门帘【由于给document绑定事件，点击left的时候会事件冒泡的document，需要阻止事件冒泡】
      $('.right').on('click', function (e) {
        e.stopPropagation()
        $(this).slideUp(1000)
      })
    })
  </script>
</body>
```



### 淡入fadeIn()

### 淡出fadeOut()

### 淡入淡出切换 fadeToggle()

### 修改透明度 fadeTo()

速度和透明度要必须写

```html
<style>
    div {
        width: 150px;
        height: 300px;
        background-color: pink;
        display: none;
    }
</style>


<body>
<button>淡入效果</button>
<button>淡出效果</button>
<button>淡入淡出切换</button>
<button>修改透明度</button>
<div></div>
<script>
    $(function() {
        $("button").eq(0).click(function() {
            // 淡入 fadeIn()
            $("div").fadeIn(1000);
        })
        $("button").eq(1).click(function() {
            // 淡出 fadeOut()
            $("div").fadeOut(1000);

        })
        $("button").eq(2).click(function() {
            // 淡入淡出切换 fadeToggle()
            $("div").fadeToggle(1000);

        });
        $("button").eq(3).click(function() {
            //  修改透明度 fadeTo() 这个速度和透明度要必须写
            $("div").fadeTo(1000, 0.5);

        });


    });
</script>
</body>
```



### 自定义动画

```
<style>
    div {
        position: absolute;
        width: 200px;
        height: 200px;
        background-color: pink;
    }
</style>
<body>
<button>动起来</button>
<div></div>
<script>
    $(function() {
        $("button").click(function() {
            $("div").animate({
                left: 500,
                top: 300,
                opacity: .4,
                width: 500
            }, 500);
        })
    })
</script>
</body>
```





## 动画队列及停止排队方法

### 动画或效果队列

动画或效果一旦触发就会执行，如果多次触发，就会造成多个动画或则效果排队执行



### 停止队列

stop()必须写在动画的前面，因为是结束上一次的动画