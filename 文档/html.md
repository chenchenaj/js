# html

### IE兼容

![](https://i.bmp.ovh/imgs/2020/06/5c7a8bff191ec0aa.png)

### meta

 meta主要用于设置网页中的一些元数据，元数据不是给用户看

- charset 指定网页的字符集
- name 指定的数据的名称
- content 指定的数据的内容

```html
1. keywords 表示网站的关键字，可以同时指定多个关键字，关键字间使用,隔开
<meta name="Keywords" content="网上购物,网上商城,手机,笔记本,电脑,MP3,CD,VCD,DV,相机,数码,配件,手表,存储卡,京东"/>
<meta name="keywords" content="网购,网上购物,在线购物,网购网站,网购商城,购物网站,网购中心,购物中心,卓越,亚马逊,卓越亚马逊,亚马逊中国,joyo,amazon">
      
2. description 用于指定网站的描述【网站的描述会显示在搜索引擎的搜索的结果中】
<meta name="description" content="京东JD.COM-专业的综合网上购物商城,销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品.便捷、诚信的服务，为您提供愉悦的网上购物体验!"/>
      
3. title标签的内容会作为搜索结果的超链接上的文字显示  
```

### rgba和opacity区别

rgba只是设置颜色透明

opacity可以将整个元素设置透明

### img

```html
属性：
  src 属性指定的是外部图片的路径（路径规则和超链接是一样的）

  alt 图片的描述，这个描述默认情况下不会显示，有些浏览器会图片无法加载时显示
      搜索引擎会根据alt中的内容来识别图片，如果不写alt属性则图片不会被搜索引擎所收录

  width 图片的宽度 (单位是像素)
  height 图片的高度    
      - 宽度和高度中如果只修改了一个，则另一个会等比例缩放

  注意：
    一般情况在pc端，不建议修改图片的大小，需要多大的图片就裁多大
    但是在移动端，经常需要对图片进行缩放（大图缩小）

图片的格式：
    jpeg(jpg)
      - 支持的颜色比较丰富，不支持透明效果，不支持动图
      - 一般用来显示照片
    gif
      - 支持的颜色比较少，支持简单透明，支持动图
      - 颜色单一的图片，动图
    png
      - 支持的颜色丰富，支持复杂透明，不支持动图
      - 颜色丰富，复杂透明图片（专为网页而生）
    webp
      - 这种格式是谷歌新推出的专门用来表示网页中的图片的一种格式
      - 它具备其他图片格式的所有优点，而且文件还特别的小
      - 缺点：兼容性不好

    base64 
      - 将图片使用base64编码，这样可以将图片转换为字符，通过字符的形式来引入图片    
      - 一般都是一些需要和网页一起加载的图片才会使用base64
```

### display

设置行内块级元素inline-block，会把元素之间的空格或换行当成文本占据一定的位置，有缝隙出现 ，解决bug可以在**父元素**设置font-size=0

### audio/video

```html
// controls 向用户显示控件，比如播放按钮
<audio src="someaudio.wav" controls autoplay loop>
您的浏览器不支持 audio 标签。
</audio>
```

兼容IE浏览器的audio/video

```html
<audio controls autoplay loop>
	<source src="someaudio.wav">
    <embed src="someaudio.wav" type="audio/mp3" width="400" height="200>"
</audio>
```

#### H5音视频

##### 1 音视频的标签
###### 1.1 video
视频标签
**属性：**
* src   视频的地址 
* width  视频宽
* heihgt 视频高
* controls   控制条 （不需给值）
* loop   循环播放(不需要给值)
* autoplay  自动播放（不需给值）  chrome浏览器静音之后才能自动播放
* muted  静音 （不需给值）
* preload   预加载(不需给值) (没有autoplay才有意义)  （默认情况下，在点击播放的时候才自动加载，设置了preload,打开页面就加载）
* poster 图片地址(没有autoplay才有意义)


###### 1.2 audio
音频标签
**属性：**

* src   音频频的地址 
* controls   控制条 （不需给值）
* loop   循环播放(不需要给值)
* autoplay  自动播放（不需给值）  chrome浏览器静音之后才能自动播放
* muted  静音 （不需给值）
* preload   预加载(不需给值) (没有autoplay才有意义)  （默认情况下，在点击播放的时候才自动加载，设置了preload,打开页面就加载）


###### 1.3 source
资源标签，加载音视频，嵌套在 `<video>` `<audio>` 中使用
**属性：**
* src   资源地址
* type  指定资源的类型
```
type属性值：

视频：	

type='video/webm; codecs="vp8, vorbis"'

type='video/ogg; codecs="theora, vorbis"'

type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'

音频：

type='audio/ogg; codecs="vorbis"'

type='audio/aac; codecs="aac"'

type='audio/mpeg'	
```



##### 2 音视频DOM
###### 2.1 方法
* play()   播放
* pause()  暂停
* load()   加载


###### 2.2 属性
* volume 获取或设置音量

* playbackRate  获取或设置速度

* duration  总时间

* currentTime 当前时间(可以设置的)

* paused  是否暂停

* muted 是否静音

* loop   是否循环播放

* controls  是否有控制条

* preload  是否预加载

* autoplay 是否自动播放

* src  资源地址

  **video独有的：**

* width

* height

* poster

* videoWidth  视频资源本身的大小

* videoHeight 视频资源本身的大小




###### 2.3 事件
* loadstart   开始加载
* loadedmetadata  资源加载完毕
* loadeddata  在 loadedmetadata 之后触发
* canplay  播放之前
* play   播放的时候
* pause  暂停的时候
* ended  播放结束的时候
* timeupdate  播放过程实时触发
* seeked  调整进度条之后
* volumechange 音量调整之后
* ratechange 播放速度调整 



### css选择器

#### 交集选择器

div.red{}

#### 并集选择器

div, p{}

#### 选择下一个兄弟

`注:是兄弟，父子的不起作用`

前一个 + 下一个 	p + span{}  `注：仅代表p的下一个元素是span才有效，如果中间有个div，则不会生效`

#### 选择下边所有的兄弟

`注:是兄弟，父子的不起作用`

兄 ~ 弟 	p ~ span{}

#### 属性名

[属性名] 选择含有指定属性的元素 	p[title]{}

[属性名=属性值] 选择含有指定属性和属性值的元素		p[title=abc]{}

[属性名^=属性值] 选择属性值以指定值开头的元素			p[title^=abc]

[属性名$=属性值] 选择属性值以指定值结尾的元素			p[title$=abc]

[属性名*=属性值] 选择属性值中含有某值的元素的元素

#### 伪类选择器

- 伪类用来描述一个元素的特殊状态
  比如：第一个子元素、被点击的元素、鼠标移入的元素...

- 伪类一般情况下都是使用:开头

  ##### `:first-child` 第一个子元素

  ##### `:last-child` 最后一个子元素

  ##### `:nth-child()` 选中第n个子元素

  特殊值：

  n 第n个 n的范围0到正无穷

  2n 或 even 表示选中偶数位的元素

  2n+1 或 odd 表示选中奇数位的元素

  ##### `:first-of-type`第一个同类型子元素

  ##### `:last-of-type`最后一个同类型子元素

  ##### `:nth-of-type()`选中第n个同类型子元素

- ##### `:not()` 否定伪类

  - 将符合条件的元素从选择器中去除

```css
ul > li:not(:nth-of-type(3)){
  color: yellowgreen;
}
```



### 伪元素

伪元素，表示页面中一些特殊的并不真实的存在的元素（特殊的位置），是**行内元素**
伪元素使用  `::`  开头

##### `::first-letter` 表示第一个字母

##### `::first-line` 表示第一行

##### `::selection` 表示选中的内容 【鼠标选中内容】

##### `::before` 元素的开始 【鼠标无法选中通过该内容】

##### `::after` 元素的最后  【鼠标无法选中通过该内容】

before 和 after 必须结合content属性来使用

```css
p::first-letter{
   font-size: 50px;
}
p::first-line{
    background-color: yellow; 
}
p::selection{
    background-color: greenyellow;
}
div::before{
    content: '『';
}
div::after{
    content: '』';
}
```

### 选择器权重

- important	   			1000
- 内联样式                   1000
- id选择器        		    100
- 类和伪类选择器         10
- 元素选择器                 1
- 通配选择器*               0
- 继承的样式                 没有优先级



### 长度单位

#### 像素

- 屏幕（显示器）实际上是由一个一个的小点点构成的

- 不同屏幕的像素大小是不同的，像素越小的屏幕显示的效果越清晰

#### 百分比

- 将属性值设置为**相对于其父元素属性的百分比**

#### em

- em是相对于**元素自身的字体大小**来计算的
- 1em = 1font-size
- em会根据字体大小的改变而改变

#### rem

- rem是相对于**根元素html的字体大小**来计算



### 盒子模型

#### 水平布局

元素在其父元素中水平方向的位置由以下几个属性共同决定

如果宽度没有设置则：`width:auto`

margin-left + border-left + padding-left + width + padding-right + border-right + margin-right = 其父元素内容区的宽度 （**必须满足**）

`不满足父元素宽度浏览器会自动补子元素的margin-right，如果子元素超出父元素宽度，那么margin-right会自动设为负值`

!> **超出父元素不会溢出**,因为宽度各值相加始终等于父元素内容区宽度

#### 垂直布局

!> 不设置高度的情况下，父元素内容默认被子元素撑开

子元素是在父元素的内容区中排列的

!> 如果子元素的大小**超过了父元素，则子元素会从父元素中溢出**

使用 overflow 属性来设置父元素如何处理溢出的子元素

​	可选值：

  	visible：默认值 子元素会从父元素中溢出，在父元素外部的位置显示

  	hidden： 溢出内容将会被裁剪不会显示

  	scroll： 生成两个滚动条，通过滚动条来查看完整的内容

  	auto： 根据需要生成滚动条

overflow-x

overflow-y

##### 垂直外边距的重叠

- 相邻的垂直方向外边距会发生重叠现象

  - 兄弟元素【不需处理】
    - 兄弟元素间的相邻垂直外边距会取两者之间的较大值（两者都是正值）
      - 特殊情况：
        如果相邻的外边距一正一负，则取两者的和
        如果相邻的外边距都是负值，则取两者中绝对值较大的
  - 父子元素【需要处理】
    - 父子元素间相邻外边距，**子元素的会传递给父元素（上外边距）**【子元素设置margin-top，但是父元素也会跟着往下移动】

  overflow方式

  ```html
  <style>
     .box1{
        width: 200px;height: 200px;background-color: #bfa;overflow: hidden;
      }
  
     .box2{
        width: 100px;height: 100px;background-color: orange;
      }
  </style>
  <body>
      <div class="box1">
      	<div class="box2"></div> 
      </div> 
  </body>
  ```

  clear方式

  ```html
  <style>
     .box1{width: 200px;height: 200px;background-color: #bfa;}
     .box2{width: 100px;height: 100px;background-color: orange;}
     .clearfix::before, .clearfix::after{content:'';display:table;clear:both;}
  </style>
  <body>
      <div class="box1 clearfix">
      	<div class="box2"></div> 
      </div> 
  </body>
  ```

![](https://i.bmp.ovh/imgs/2020/05/9373e7f79a18ee4b.png)

!> ::before,::after 用于解决外边距重叠问题；clear:both 用于解决高度塌陷问题



#### 行内元素盒模型

- 行内元素**不支持设置宽度和高度**
- 两个行内元素相邻会有间隙
- 行内元素可以设置padding/border/margin，但是垂直方向padding/border/margin不会影响页面的布局【即该元素虽有padding-top/padding-bottom/border-top/border-bottom/margin-top/margin-bottom属性，但是这些属性不生效】

#### 行内块级盒模型

- 行内块级继承了行内元素的缺点，两个行内块级元素相邻会有间隙

![1590476926316](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1590476926316.png)

#### 盒子大小

盒子可见框的大小由内容区、内边距和边框共同决定

- box-sizing 用来设置盒子尺寸的计算方式（设置width和height的作用）
  - content-box 默认值，宽度和高度用来设置内容区的大小
  - **border-box** 宽度和高度用来设置整个盒子可见框的大小
  - width 和 height 指的是内容区 和 内边距 和 边框的总大小

#### 阴影轮廓圆角

##### box-shadow

box-shadow 用来设置元素的阴影效果，阴影不会影响页面布局, **在元素正下方**

- 第一个值 水平偏移量 设置阴影的水平位置 正值向右移动 负值向左移动
- 第二个值 垂直偏移量 设置阴影的水平位置 正值向下移动 负值向上移动
- 第三个值 **阴影的模糊半径**
- 第四个值 阴影的颜色

```css
box-shadow: 0px 0px 50px rgba(0, 0, 0, .3); 
```

##### border-radius

border-radius: 用来设置圆角 圆角设置的圆的半径大小

可以分别指定四个角的圆角

​        四个值 左上 右上 右下 左下

​        三个值 左上 右上/左下 右下 

​        两个值 左上/右下 右上/左下

```css
border-radius: 20px 40px 0 0;
border-radius: 20px / 40px; 代表横向20px，纵向40px

```



### 浮动

#### 特点

  1、浮动元素会完全脱离文档流，不再占据文档流中的位置

  2、设置浮动以后元素会向父元素的左侧或右侧移动

  3、浮动元素默认不会从父元素中移出

  4、浮动元素向左或向右移动时，不会超过它前边的其他浮动元素

  5、如果浮动元素的上边是一个没有浮动的块元素，则浮动元素无法上移

  6、浮动元素不会超过它上边的浮动的兄弟元素，最多最多就是和它一样高

  7、**浮动元素不会盖住文字**，文字会自动环绕在浮动元素的周围



#### 脱离文档流的特点

- 块元素
  - 块元素**不在独占页面的一行**
  - **脱离文档流以后，**块元素的宽度和高度默认都被内容撑开

- 行内元素
  - **行内元素脱离文档流以后会变成块元素**，特点和块元素一样

`注：脱文档流以后，不需要再区分块和行内了`

#### clear

- 作用：清除浮动元素对当前元素所产生的影响

- 可选值：
  - left 清除左侧浮动元素对当前元素的影响
  - right 清除右侧浮动元素对当前元素的影响
  - both 清除两侧中**最大影响的那侧**

- 原理

`设置清除浮动以后，浏览器会自动为该元素添加一个上外边距,以使其位置不受其他元素的影响`

#### 高度塌陷

!> ::before,::after 用于解决外边距重叠问题；clear:both 用于解决高度塌陷问题

- 在浮动布局中，父元素的高度默认是被子元素撑开的
  - 当子元素浮动后，其会完全脱离文档流，子元素从文档流中脱离
  - 将会无法撑起父元素的高度，导致父元素的高度丢失

- 父元素高度丢失以后，其下的元素会自动上移，导致页面的布局混乱

![](https://i.bmp.ovh/imgs/2020/05/6bba3a6e108c570f.png)

##### 开启BFC

!> ::before,::after 用于解决外边距重叠问题；clear:both 用于解决高度塌陷问题

特点

- 开启BFC的元素不会被浮动元素所覆盖

- 开启BFC的元素子元素和父元素外边距不会重叠

- 开启BFC的元素可以包含浮动的子元素

###### 方式一float

父元素也设置浮动

缺点：父元素的兄弟元素会上移

![1590488184959](https://i.bmp.ovh/imgs/2020/05/dcc2fdaba980c576.png)

```html
<style>
.outer{
    border: 10px red solid;
    float: flex;
}
.inner{
    width: 100px;height: 100px;background-color: #bfa;float: left;
}
</style>
<div class="outer">
	<div class="inner"></div>
</div>

```



###### 方式二inline-block

父元素设置为行内块级 `display:inline-block`

缺点：原本占据一行的宽度只剩下子元素的宽度大小

```html
<style>
.outer{
    border: 10px red solid;
    display: inline-block;
}
.inner{
    width: 100px;height: 100px;background-color: #bfa;float: left;
}
</style>
<div class="outer">
	<div class="inner"></div>
</div>

```



###### 方式三overflow

兄弟元素设置`overflow:hidden`

```html
<style>
   .box1{
      width: 200px;height: 200px;background-color: #bfa;overflow: hidden;
    }

   .box2{
      width: 200px;height: 200px;background-color: orange;overflow: hidden;
    }
</style>
<body>
    <div class="box1"></div>
    <div class="box2"></div>  
</body>

```

###### 方式四添加一个空的div

```html
<style>
	.outer{border: 10px red solid;}
	.inner{width: 100px;height: 100px;background-color: #bfa;float: left;}
    .clear{clear: both;}
</style>
<div class="outer">
	<div class="inner"></div>
    <div class="clear"></div>
</div>

```

###### 方式五:after

```html
<style>
	.outer{border: 10px red solid;}
	.inner{width: 100px; height: 100px; background-color: #bfa; float: left;}
    .outer::before, .outer::after{content:''; display:block; clear:both;}
</style>
<div class="outer">
	<div class="inner"></div>
</div>

```

 

### 定位

#### 相对定位relative

`relative是相对于自身定位`

\- 相对定位的特点：

1.元素开启相对定位以后，如果不设置偏移量**元素**不会发生任何的变化

2.相对定位会提升元素的层级

3.相对定位不会使元素脱离文档流

4.相对定位不会改变元素的性质块还是块，行内还是行内

\- 当元素的position属性值设置为absolute时，则开启了元素的绝对定位



#### 绝对定位position

  1.开启绝对定位后，如果不设置偏移量**元素的位置**不会发生变化

  2.开启绝对定位后，元素会从文档流中脱离

  3.**绝对定位会改变元素的性质**，行内变成块，**块的宽高被内容撑开**

  4.绝对定位会使元素提升一个层级

  5.绝对定位元素是相对于其包含块进行定位的【**包含块就是离它最近的开启了定位的祖先元素**， 如果所有的祖先元素都没有开启定位则根元素就是它的包含块为html（根元素、初始包含块）】

```html
 <div> <div></div> </div> 					包含块：div
 <div><span><em>hello</em></span></div> 	包含块：div

```



#### 固定定位fixed

- 固定定位永远参照于浏览器的视口进行定位

- 固定定位的元素不会随网页的滚动条滚动



#### 粘性定位sticky

是相对于body进行定位,需要设置定位的高度top

```css
.nav{position:sticky;top:0;}
```

#### 层级z-index

如果元素的层级一样，则优先显示靠下的元素



#### 案例

##### 二级菜单

通过伪元素去除下边框线

![](https://i.bmp.ovh/imgs/2020/06/fe5f1b5a346bdb7d.png)



### 字体图标

#### Font Awesome

1.下载 https://fontawesome.com/

2.解压

3.将css和webfonts移动到项目中

4.将all.css引入到网页中

5.使用图标字体

##### 直接通过类名来使用图标字体

```css
<link rel="stylesheet" href="./fa/css/all.css">
<i class="fas fa-bell" style="font-size:80px; color:red;"></i>
```

##### 通过伪元素来实现

```css
<link rel="stylesheet" href="./fa/css/all.css">
li::before{
   content: '\f1b0'; 	/* f1b0 为 需要展示的图标编码 */
   /* font-family: 'Font Awesome 5 Brands'; 两者中的一种 */
   font-family: 'Font Awesome 5 Free';
   font-weight: 900; 
   color: blue;
   margin-right: 10px;
}

<ul>
<li>锄禾日当午</li>
</ul>
```

##### 通过实体

```css
通过实体来使用图标字体：
&#x图标的编码;
<span class="fas">&#xf0f3;</span> /* f0f3 为 需要展示的图标编码 */
```

#### iconfont

1.将内容添加到购物车下载 https://www.iconfont.cn/

2.将css和webfonts移动到项目中

3.引入使用

使用方式同上

```html
<link rel="stylesheet" href="./iconfont/iconfont.css">
<i class="iconfont icon-qitalaji"></i>

<i class="iconfont">&#xe61c;</i>

p::before{
    content: '\e625';
    font-family: 'iconfont';
    font-size: 100px;
}
```

### 文本

#### text-align

文本的水平对齐

- justify 两端对齐

#### vertical-align

元素垂直对齐的方式

- baseline 默认值 基线对齐
- top 顶部对齐
- bottom 底部对齐
- middle 居中对齐

图片下间隙

```html
<style>
img{
   vertical-align: bottom;
}
</style>

<p>
   <img src="./img/an.jpg" alt=""> 
</p>
```

#### text-decoration

设置文本修饰【不兼容ie】

- none 什么都没有
- underline 下划线
- line-through 删除线
- overline 上划线

#### white-space

设置网页如何处理空白

- normal 正常
- nowrap 不换行
- pre 保留空白

**单行溢出显示省略号**

```css
p{
    white-space: nowrap;	/*强制不换行*/
    overflow: hidden;	/*溢出的文字隐藏*/
    text-overflow: ellipsis; /*文字溢出用省略号显示*/
}
```

**多行溢出显示省略号**	存在兼容性

```css
p{
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```



### 背景

#### background-color

设置背景颜色

#### background-image

设置背景图片

```css
background-image: url("./img/1.png");
```

#### background-repeat

设置背景的重复方式

- repeat 默认值 ， 背景会沿着x轴 y轴双方向重复
- repeat-x 沿着x轴方向重复
- repeat-y 沿着y轴方向重复
- no-repeat 背景图片不重复

```css
background-repeat: no-repeat;
```



#### background-position

设置背景图片的位置(精灵图片定位)

通过 top left right bottom center 几个表示方位的词来设置背景图片的位置

**使用方位词时必须要同时指定两个值**，如果只写一个则第二个默认就是center

```css
background-position: -50px 300px;
background-position: right top;
```
##### 精灵图

为什么引入精灵图？

浏览器加载外部资源时是按需加载的，用则加载，不用则不加载，练习link图片会首先加载，而hover和active会在指定状态触发时才会加载，所以出现短暂的白屏，闪烁等问题

```html
<style>
a:link{
    display: block;
    width: 93px;
    height: 29px;
    background-image: url('./img/08/link.png')
}

a:hover{
    background-image: url('./img/08/hover.png')
}
</style>
<a href="javascript:;"></a>
```



精灵图片的使用

```html
<style>
a:link{
    display: block;
    width: 93px;
    height: 29px;
    background-image: url('./img/10/link.png')
}

a:hover{
    background-image: url('../img/10/link.png')
	background-position: -93px 0; /*精灵图片往左移动，是图片图片图片移动*/
}
</style>
<a href="javascript:;"></a>
```



#### background-clip

设置背景的范围

- border-box 默认值，背景会出现在边框的下边
- padding-box 背景不会出现在边框，只出现在内容区和内边距
- content-box 背景只会出现在内容区

```css
background-clip: content-box;
```

![](https://i.bmp.ovh/imgs/2020/05/6f77a7bf42afeca8.png)



#### background-origin

背景图片的偏移量计算的原点

- padding-box 默认值，从内边距处开始计算
- content-box 背景图片的偏移量从内容区处计算
- border-box 背景图片的变量从边框处开始计算

```css
background-origin: border-box;
```



#### background-size

设置背景图片的大小

第一个值表示宽度,第二个值表示高度

                    - 如果只写一个，则第二个值默认是 auto
   - **cover** 图片的比例不变，将元素铺满【图片超大可能只显示图片的某一部分】相当于`background-size:auto 100% ;`
   - **contain** 图片比例不变，将图片在元素中完整显示【图片超大会完整显示，但是不能铺满所在元素】相当于`background-size: 100% auto;`
   - 可以直接写像素比，background-size: 100px 200px;

```html
  <style>
    .box {
      width: 300px;
      height: 300px;
      border: 10px solid red;
      background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590555223809&di=39e65c43641959ad19487ad2d00f38c7&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de4370180292eef01f3b297992.jpg');
      background-size: contain;
      background-repeat: no-repeat;
    }
  </style>
<body>
  <div class="box">
  </div>
</body>
```


#### background-attachment

背景图片是否跟随元素移动

- scroll 默认值 背景图片会跟随元素移动`background-attachment: scroll;`
- fixed 背景会固定在页面中，不会随元素移动`background-attachment: fixed;`

```html
  <style>
    .box {
      width: 300px;
      height: 1300px;
      border: 10px solid red;
      background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590555223809&di=39e65c43641959ad19487ad2d00f38c7&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de4370180292eef01f3b297992.jpg');
      background-size: 300px;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
  </style>
<body>
  <div class="box">
  </div>
</body>
```



!> 注意：background-size必须写在background-position的后边，并且使用/隔开,background-position/background-size；background-origin background-clip 两个样式 ，orgin要在clip的前边



### 渐变

渐变是图片，需要通过background-image来设置

#### 线性渐变linear-gradient

线性渐变，颜色沿着一条直线发生变化

linear-gradient(red,yellow) 红色在开头，黄色在结尾，中间是过渡区域

线性渐变的开头，我们可以指定一个渐变的方向

- to left
- to right
- to bottom
- to top
- deg deg表示度数
- turn 表示圈

```css
background-image: linear-gradient(to right, red,yellow);
background-image: linear-gradient(red 50px,yellow 100px, green 120px, orange 200px);
```

#### 平铺的线性渐变repeating-linear-gradient

用法与线性渐变一样，如果有设置分段显示颜色，那个这个段会平铺完整个盒子大小

```html
<style>
.box1{
    background-image: repeating-linear-gradient(to right ,red, yellow 50px);
}
</style>

</head>
<body>
    <div class="box1"></div>
</body>
```



#### 径向渐变radial-gradient

径向渐变(放射性的效果)

我们也可以手动指定径向渐变的大小

- circle

- ellipse

也可以指定渐变的位置

radial-gradient(大小 at 位置, 颜色 位置 ,颜色 位置 ,颜色 位置)

   大小：

​        circle 圆形

​        ellipse 椭圆

​        closest-side 近边 

​        closest-corner 近角

​        farthest-side 远边

​        farthest-corner 远角

​    位置：

​        top right left center bottom

```css
background-image: radial-gradient(farthest-corner at 100px 100px, red , #bfa)
```



### 表单

#### input

- autocomplete="off" 关闭自动补全
- readonly 将表单项设置为只读，数据会提交
- disabled 将表单项设置为禁用，数据不会提交
- autofocus 设置表单项自动获取焦点

```html
<input type="text" name="username" autocomplete="off">
<input type="text" name="username" value="hello" readonly>
<input type="text" name="username" autofocus>
```



### 过渡transition

过渡需要在某个属性发生变化时才会触发

#### transition-property

指定要执行过渡的属性【width,height,all】

#### transition-duration

指定过渡效果的持续时间【100ms,1s】

#### transition-timing-function

过渡的时序函数

- ease 默认值，慢速开始，先加速，再减速

- linear 匀速运动

- ease-in 加速运动

- ease-out 减速运动

- ease-in-out 先加速 后减速

- cubic-bezier() 来指定时序函数https://cubic-bezier.com

- steps() 分步执行过渡效果

  - end ， 在时间结束时执行过渡(默认值)

  - start ， 在时间开始时执行过渡linear

  - ```css
    transition-timing-function: steps(2, start);
    ```

#### transition-delay

过渡效果的延迟，等待一段时间后在执行过渡 【100ms】



**简写**

```css
transition:all 2s cubic-bezier(.24,.95,.82,-0.88) 1s;
```



### 动画animation

!> form 不是 from

动画可以自动触发动态效果

设置动画效果，必须先要设置一个关键帧@keyframes，关键帧设置了动画执行每一个步骤

```css
@keyframes test {
  /* from表示动画的开始位置 也可以使用 0% */
  form{
      margin-left: 0;
      background-color: orange;
  } 

  /* to动画的结束位置 也可以使用100%*/
  to{
      background-color: red;
      margin-left: 700px;
  }
}

旋转动画
@keyframes rotate {
from {
  transform: translate(-50%, -50%) rotate(0deg);
}
to {
  transform: translate(-50%, -50%) rotate(360deg);
}
}
```



#### animation-name

动画的名称



#### animation-duration

动画的执行时间



#### animation-delay

动画延迟执行的时间



#### animation-timing-function

动画的时序函数【匀速，变速等】



#### animation-iteration-count

动画执行的次数：次数 或 infinite

```css
animation-iteration-count: 20;
animation-iteration-count: infinite; /*无限循环*/
```



#### animation-direction

指定动画运行的方向

normal：默认值  从 from 向 to运行 每次都是这样 

默认值  从 from 向 to运行 每次都是这样 

reverse：从 to 向 from 运行 每次都是这样 

从 to 向 from 运行 每次都是这样 

alternate：从 from 向 to运行 重复执行动画时反向执行

从 from 向 to运行 重复执行动画时反向执行

alternate-reverse：从 to 向 from运行 重复执行动画时反向执行



#### animation-play-state

设置动画的执行状态

running：默认值 动画执行

paused：动画暂停



#### animation-fill-mode

none： 默认值 动画执行完毕元素**回到原来位置**

forwards： 动画执行完毕元素会**停止在动画结束的位置**

backwards： **动画延时等待时，元素就会处于开始位置**

both： 结合了forwards 和 backwards



demo: 打开页面动画自动播放【变色和移动】，hover状态下动画停止

```html
<style>
  .box1 {
    width: 500px;
    height: 300px;
    background-color: silver;
    overflow: hidden;
  }

  .box2 {
    width: 100px;height: 100px;
    background-color: #bfa;
    animation: test 2s 2 1s alternate;
  }

  .box1:hover div {
    animation-play-state: paused;
  }

  @keyframes test {
    form {
      margin-left: 0;
      background-color: orange;
    }

    to {
      background-color: red;
      margin-left: 400px;
    }
  }
</style>

<body>
  <div class="box1">
    <div class="box2"></div>
  </div>
</body>
```



transition和animation的区别：transition需要条件才能出发，animation可以自动触发

### 变形transform

!> transform 不是 transfrom

#### 平移translate

左手定则，大拇指向右，食指向下，中指朝向自身

- translateX() 沿着x轴方向平移【右侧为正】
- translateY() 沿着y轴方向平移【下侧为正】
- translateZ() 沿着z轴方向平移【朝向自己一侧为正】,需要配置`perspective`使用
                              - 平移元素，百分比是相对于自身计算的

```css
.box{
    transform: translateX(-50%) translateY(-50%);
}


/* 设置Z轴方向 */
html{
   /* 设置当前网页的视距为800px，人眼距离网页的距离 */
   perspective: 800px;
}
body:hover .box1{
   transform: translateZ(800px);
}
```



#### 旋转rotate

需要设置视距`perspective`

rotateX() 前后翻转

rotateY() 左右翻转

rotateZ() 变大变小

`backface-visibility: hidden;`元素的背面是否显示，默认是旋转后的图片是透视可以显示的



#### 缩放scaleX

scaleX() 水平方向缩放

scaleY() 垂直方向缩放

scale() 双方向的缩放



##### 字体10px

```html
<style>
.lili{
  transform: scale(0.8);
}
</style>

<body>
    <div>111111111</div>
    <div class="lili">222</div>
</body>
```



#### 改变原点transform-origin

默认值 center

```css
.box1{
	width: 100px;
	height: 100px;
	background-color: #bfa;
	transition:2s;
	margin: 100px auto;
	transform-origin:20px 20px; 
}
.box1:hover{
	transform:scale(2)
}
```



### css变量

!> 不兼容IE浏览器

#### 变量

```css
html{
   /* css原生也支持变量的设置 */
    --color:#ff0;
}
.box{
    var(--color)
}
```

#### 计算calc()

```css
.box{
    width:calc(400px/2)
}
```



### less

#### 变量

- 如果是直接使用则以 @变量名 的形式使用即可

- 作为类名，或者一部分值使用时必须以 @{变量名} 的形式使用
- 变量发生重名时，**就近原则**
- 引用变量`height: $width;`

```less
@a:200px;
@c:box6;
// 作为类名使用
.@{c}{
    width: @a;
    background-image: url("@{c}/1.png");
    // 引用width的变量
    height: $width;
}
```



#### 直接后代子元素

```less
.nav{
  width: @width;

  > .box3{
    background-color: #ccc;
  }
}

// 解析
.nav > .box3 {
  background-color: #ccc;
}
```



#### 伪元素

```less
.nav{
  &:hover{
    background-color: #dfd;
  }
}

// 解析
.nav:hover {
  background-color: #dfd;
}
```



#### 子元素中套父元素

```less
.nav{
  div &{
    width: 100px;
  }
}

// 解析
div .nav{width: 100px;}
```



#### 继承extend

对当前选择器扩展指定选择器的样式（选择器分组）

```less
.p1{color: red;}

.p2:extend(.p1){font-size: 20px;}

// 解析
.p1,.p2 {color: red;}
.p2 {font-size: 20px;}
```



#### 混合函数

在混合函数中可以直接设置变量

```less
.test(@w:100px,@h:200px,@bg-color:red){
    width: @w;
    height: @h;
    border: 1px solid @bg-color;
}
div{
    .test(200px,300px,#bfa);
}
// 解析
div {
  width: 200px;
  height: 300px;
  border: 1px solid #bfa;
}
```



#### 引入import

```less
@import "syntax.less";
```



#### css与less的映射设置

添加下面的代码即可产生映射，修改样式可以直接找到less文件的对应行

```json
"less.compile": {
  "compress":  false,  // true => remove surplus whitespace
  "sourceMap": true,  // true => generate source maps (.css.map files)
  "out":       false, // false => DON'T output .css files (overridable per-file, see below)
}
```



### [flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

#### 容器属性

开启flex布局的元素叫flex container

flex container里面的直接子元素叫做flex items

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

flex：块级元素

inline-flex：行内元素

##### flex-direction

决定主轴的方向（即项目的排列方向）

- `row`（默认值）：主轴为水平方向，起点在左端,从左往右
- `row-reverse`：主轴为水平方向，起点在右端，从右往左
- `column`：主轴为垂直方向，起点在上沿，从上到下
- `column-reverse`：主轴为垂直方向，起点在下沿，从下到上



##### justify-content

定义了项目在主轴上的对齐方式

- `flex-start`（默认值）：与main start对齐
- `flex-end`：与main end对齐
- `center`： 居中
- `space-between`：flex items 之间距离相等；与main start，main end两端对齐
- `space-around`：flex items 之间距离相等；flex items 与 main start，main end 之间的距离是flex items之间距离的一半
- `space-evenly`：flex items 之间距离相等；flex items 与 main start，main end 之间的距离等于 flex items 之间距离

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071010.png)

##### align-items

定义项目在交叉轴上如何对齐

- `flex-start`：与cross start对齐
- `flex-end`：与cross end对齐
- `center`：交叉轴的中点对齐
- `baseline`: 项目的第一行文字的基线对齐
- `stretch`（默认值）：当flex items 在cross axis方向的size为auto或未设置高度，将占满整个容器的高度。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071011.png)

##### flex-wrap

默认情况下，项目都排在一条线（又称"轴线"）上

（1）`nowrap`（默认）：不换行。

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071007.png)

（2）`wrap`：换行，第一行在上方。

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071008.jpg)

（3）`wrap-reverse`：换行，第一行在下方，cross start和cross end相反

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071009.jpg)

##### flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`

```
.box {
  flex-flow: row-reverse  wrap;
}
```

##### align-content

- `flex-start`：与交叉轴的起点对齐。
- `flex-end`：与交叉轴的终点对齐。
- `center`：与交叉轴的中点对齐。
- `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
- `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- `stretch`（默认值）：轴线占满整个交叉轴。

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071012.png)



#### items上的属性

##### order

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0

```
.item {
  order: 5;
}
```

![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071013.png)

##### flex-grow

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

> ```css
> .item {
>   flex-grow: <number>; /* default 0 */
> }
> ```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png)

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。



##### flex-shrink

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

> ```css
> .item {
>   flex-shrink: <number>; /* default 1 */
> }
> ```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

如果所有项目的`flex-shrink`属性都为1，当空间不足时，都将等比例缩小。如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。



##### flex-basis

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

> ```css
> .item {
>   flex-basis: <length> | auto; /* default auto */
> }
> ```

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。



##### flex

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

> ```css
> .item {
>   flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
> }
> ```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。



##### align-self

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

> ```css
> .item {
>   align-self: auto | flex-start | flex-end | center | baseline | stretch;
> }
> ```

![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071016.png)

该属性可能取6个值，除了auto，其他都与align-items属性完全一致



### 移动端rem

rem官方定义『The font size of the root element』，即根元素的字体大小。rem是一个相对的CSS单位，1rem等于html元素上font-size的大小。所以，我们只要设置html上font-size的大小，就可以改变1rem所代表的大小。

getBoundingClientRect用于获取某个元素相对于视窗的位置集合

```
(function () {
    var html = document.documentElement;
    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 20 + 'px';
    }
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
})();
```



### ps裁剪图片

先用选中框选中，点击导航条的图像，选中裁剪，完成后点击导航条的文件，选中下方的导出wepb进行图片导出

如果图层只有一张图片，可以直接点击导航栏的图像，选中下方的裁切，点击确定，完成后点击导航条的文件，选中下方的导出wepb进行图片导出