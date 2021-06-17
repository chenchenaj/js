# css

## 垂直居中

![](https://i.bmp.ovh/imgs/2020/05/4a6283f40f452685.png)

详情：https://www.bilibili.com/video/BV1XJ411X7Ud?p=73

```html
<style>
  .box1 {width: 500px;height: 500px;background-color: #bfa;position: relative;}
  .box2 {width: 100px;height: 100px;background-color: orange;position: absolute;
    margin: auto;left: 0;right: 0;top: 0;bottom: 0;}
</style>

<div class="box1">
    <div class="box2"></div>
</div>
```



## 轮播图

![](https://i.bmp.ovh/imgs/2020/05/03ad47f76e226c35.png)

图片：ul>li>img		图片叠在一起需设置absolute

指示点：div>a			指示点在图片上面需设置z-index和absolute；指示点有样式会超出范围background-clip

```html

```



## 图片下间隙

```html
<style>
img{
   vertical-align: bottom/top/middle; /*有 vertical-align 就可以，无论设置的是什么值*/
}
</style>

<p>
   <img src="./img/an.jpg" alt=""> 
</p>
```



## 显示省略号

```css
p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 2;
}
```



## 魔方cube

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    html{
      perspective: 800px;
    }
    .cube{
      width: 200px;
      height: 200px;
      margin: 100px auto;
        /*设置 3d 效果*/
      transform-style: preserve-3d;
      animation: run 10s infinite;
    }
    .cube_item{
      opacity: 0.7;
      position: absolute;
    }
     /* 右侧面，把视角放到图片正面，z轴直戳自己，即可知道需要设置translateZ */
    .cube_item:nth-child(1){
      transform: rotateY(90deg) translateZ(100px);
    }
      /* 左侧面，把视角放到图片正面，z轴直戳自己，即可知道需要设置translateZ */
    .cube_item:nth-child(2){
      transform: rotateY(-90deg) translateZ(100px);
    }
      /* 上侧面，把视角放到图片正面，z轴直戳自己，即可知道需要设置translateZ */
    .cube_item:nth-child(3){
      transform: rotateX(90deg) translateZ(100px);
    }
      /* 下侧面，把视角放到图片正面，z轴直戳自己，即可知道需要设置translateZ */
    .cube_item:nth-child(4){
      transform: rotateX(-90deg) translateZ(100px);
    }
      /* 后面，先将图片旋转到后面，再设置translateZ */
    .cube_item:nth-child(5){
      transform: rotateY(180deg) translateZ(100px);
    }
      /* 前面，把视角放到图片正面，z轴直戳自己，即可知道需要设置translateZ */
    .cube_item:nth-child(6){
      transform: translateZ(100px);
    }
    img{
      width: 100%;
      vertical-align: top;
    }

    @keyframes run {
      form{
        transform:rotateX(0) rotateZ(0);
      }
      to{
        transform:rotateX(360deg) rotateZ(360deg);
      }
    }
  </style>
</head>
<body>
  <div class="cube">
    <div class="cube_item"><img src="./img/14/1.jpg" alt=""></div>
    <div class="cube_item"><img src="./img/14/2.jpg" alt=""></div>
    <div class="cube_item"><img src="./img/14/3.jpg" alt=""></div>
    <div class="cube_item"><img src="./img/14/4.jpg" alt=""></div>
    <div class="cube_item"><img src="./img/14/5.jpg" alt=""></div>
    <div class="cube_item"><img src="./img/14/6.jpg" alt=""></div>
  </div>
</body>
</html>
```



## 放大图片

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .img-wrapper{
            width: 200px;
            height: 200px;
            border: 1px red solid;
            overflow: hidden;
        }

        img{
            transition: .2s;
        }

        .img-wrapper:hover img{
            transform:scale(1.2);
        }

    </style>
</head>
<body>
    <div class="img-wrapper">
        <img src="an.jpg" width="100%">
    </div>
</body>
</html>
```



## 禁止用户选择文字

```css
user-select:none
```

