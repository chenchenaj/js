
# Canvas 画布
[参考地址](https://www.aicoder.com/news/5c129496f8afa06e6df8892e/news.html)

[参考地址](https://www.aicoder.com/news/5c1295abf8afa06e6df8892f/news.html)

课件地址： http://learn.fuming.site/front-end/Canvas/

```
应用场景：
1. 把canvas当做动态背景图
2. 小游戏 （代替flash）
3. 统计图表，数据分析结果
```

## 1 canvas 元素
HTML5新增了的一个画布标签
```
canvas.width
canvas.height
canvas.getContext();  //获取绘图上下文
<canvas width="400" height="300" id="myCanvas">  </canvas>
```

## 2. 使用步骤

```js
// ① 获取canvas 元素
// ② 设置 canvas 大小
// ③ 获取绘图上下文
// ④ 画
```

## 3.Canvas 路径

### 3.1 绘制路径
#### 线段

`moveTo`：直线的起点

`lineTo`：直线的连接点

```
ctx.moveTo(x, y)
ctx.lineTo(x, y)
```

例子：

```
var canvas = document.querySelector('canvas') // 获取元素
var ctx = canvas.getContext('2d') // 获取画布上下文
ctx.beginPath() // 开启路径
ctx.moveTo(100, 100) // 描边起点
ctx.lineTo(300, 200) // 描边连接点
ctx.lineTo(500, 300) // 描边连接点
ctx.closePath() // 闭合路径
ctx.stroke()  // 对路径描边
```

#### 矩形

```
ctx.rect(x, y, width, height);
```

#### 绘制圆(难点)
```js
圆心(X,Y)；半径r；开始角度startAngle；结束角度endAngle
startAngle = 0
endAngle = Math.PI + Math.PI / 2
ctx.arc(x, y, r, startAngle, endAngle, 是否逆时针)  // true 逆时针， false顺时针(默认)
```

#### 圆弧路径
```js
ctx.arcTo(x1, y1, x2, y2, radius);  
```

### 3.2 路径描边

`stroke`：描前面没有结束路径【closePath/beginPath】的所有边

[参考](https://www.bilibili.com/video/BV1z4411N7aU?p=33)

```js
ctx.lineWidth = 10;  // 设置描边的宽度
ctx.strokeStyle = 'red';  // 设置描边颜色
ctx.stroke()  // 对路径描边
```

### 3.3 路径填充 
```js
ctx.fillStyle = 'red'; // 设置填充颜色
ctx.fill(); //填充（无论路径是否闭合都会填充）
```
```
(了解) 复杂路径的填充
如何判断一块区域是否填充
从该区域任意画一条无限长的直线，判断经过了几条线
如果经过了奇数条线，肯定会填充
如果经过了偶数条线，判断线的方向 （两个方向的线的数量相等，不填充，正向+1，逆向-1，相加不为0则填充）
```

例子：

如果遇到又要描边又要填充，将填充放前面描边放后面，因为有层级关系，描边会压着填充内容

### 3.4 路径开启

`beginPath`与路径有关，与填充无关

```js
ctx.beginPath(); //开启新的路径，并且结束上一次路径

// 每绘制一个图形，都开启一个路径
```

### 3.5 路径闭合

```js
ctx.closePath();  // 把最后一个点 和 起点连接
```

### 3.6 设置路径两端的样式

```js
ctx.lineCap = '';  
// butt  默认值
// round 
// square

```

### 3.7 设置路径连接点的样式

```js
ctx.lineJoin = '';
// miter  默认值
// round
// bevel
```

## 4.快速矩形工具

#### 4.1快速填充矩形

```js
ctx.fillRect(x, y, width, height); //快速填充矩形
```

#### 4.2快速描边矩形

```js
ctx.strokeRect(x, y, width, height); //快速描边矩形
```

#### 4.3清空矩形矩形

```js
ctx.clearRect(x, y, width, height); //快速清空矩形矩形
```

## 5.变换

### 5.1 三种变换效果
```js
ctx.translate(width, height)
ctx.scale(x, y)
ctx.rotate(弧度)
```
```
变换变换整个坐标体系，引起坐标体系变化
只有在变换之后绘制的图形会受到响应
一般各种变换配合，translate和其他配合
```

### 5.2 绘图环境的保存和恢复

```js
ctx.save()  // 保存当前环境
ctx.restore()  // 绘图上一次保存的环境
```
``` 
在变换之前，先 save()
变换之后，（一系列绘制） restore()
```

## 6.画图片

在画布上定位图像，并规定图像的宽度和高度：

```js
context.drawImage(img,x,y,width,height);
```

剪切图像，并在画布上定位被剪切的部分：

```js
context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
```

[案例](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Using_images)

```js
var img = new Image();   // 创建img元素
img.onload = function(){
  // 执行drawImage语句(可以画另外的图片或则做一些其他的画线操作)
}
img.src = 'myImage.png'; // 设置图片源地址
```



## 7.案例

![](https://i.bmp.ovh/imgs/2021/04/48622fc8f90c7142.png)



#### 6.1计算长度再显示文字[超出第二行显示省略号]

```js
    /**
     * 
     * @param {文字} t 
     * @param {横坐标} x 
     * @param {文字高度} y 
     * @param {显示的文字宽度} w 
     */
    drawText(t,x,y,w=80){
        let chr = t.split("");
        let temp = "";				
        let row = [];
        for(let a = 0; a < chr.length; a++){
            if(this.ctx.measureText(temp).width < w ){
                ;
            }
            else{
                row.push(temp);
                temp = "";
            }
            temp += chr[a];
        }
        
        row.push(temp);
        
        // 判断小于2行全部画出来，大于两行显示省略号
        if(row.length < 3){
            for(let b = 0; b < row.length; b++){
                this.ctx.fillText(row[b],x + 10,y+b*16); // 16： 字体大小
            }
        }else{
            row[1] = row[1] + '...'
            this.ctx.fillText(row[0],x + 10,y);
            this.ctx.fillText(row[1],x + 10,y+16);
        }
    }
```

#### 6.2画一个椭圆边框

```js

/**
 * p:默认边距(矩形转弯的直线长度)
*/
drawOvalBorder(x, y, width, height,p=10,color="#000"){
    let ctx=this.ctx;
    ctx.beginPath();
    ctx.moveTo(x+p,y);
    ctx.lineTo(x+width-2*p, y);
    ctx.quadraticCurveTo(x+width,y,x+width,y+p);
    ctx.lineTo(x+width,y+height-2*p);
    ctx.quadraticCurveTo(x+width,y+height,x+width-p,y+height);
    ctx.lineTo(x+p,y+height);
    ctx.quadraticCurveTo(x,y+height,x,y+height-p);
    ctx.lineTo(x,y+p);
    ctx.quadraticCurveTo(x,y,x+p,y);
    this.setColor(color);
    ctx.stroke();
    this.setColor("#fff");
    ctx.fill();
}
```

#### 6.3画菱形

```js
drawDiamondBorder(x,y, width = 150, height = 70){
    let ctx=this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + width/2, y);
    ctx.lineTo(x + width, y + height/2);
    ctx.lineTo(x + width/2, y + height);
    ctx.lineTo(x, y + height/2)
    ctx.closePath();
    this.setColor("#ebcafe");
    ctx.fill();
}
```

#### 6.4全景移动

注:如果是水平移动，canvas宽度要与图片宽度一样；垂直移动，canvas高度要与图片高度一样