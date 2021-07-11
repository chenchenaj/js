# vue-mobile

## 项目配置

### 视口配置

在public的index.html中修改为下面的内容

```html
<!-- 移动端视口 -->
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```

### 解决点击响应延时0.3s

在public的index.html中修改为下面的内容

```html
<!-- 移动端延迟0.3s -->
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
      }, false);
    }
  </script>
```

### [移动端rem适配]([二、项目初始化 · 语雀 (yuque.com)](https://www.yuque.com/lipengzhou/toutiao-mobile-vue/wdnpoi#a56a12e6))

如果需要使用 `rem` 单位进行适配，推荐使用以下两个工具：

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值

####  [**lib-flexible**](https://github.com/amfe/lib-flexible) 

**使用** [**lib-flexible**](https://github.com/amfe/lib-flexible) **动态设置 REM 基准值（html 标签的字体大小）**

安装依赖：

```shell
npm i amfe-flexible
```

然后在 `main.js` 中加载执行该模块：

```js
import 'amfe-flexible'
```

####  [**postcss-pxtorem**](https://github.com/cuth/postcss-pxtorem)

**使用** [**postcss-pxtorem**](https://github.com/cuth/postcss-pxtorem) **将** `px` **转为** `rem`

安装依赖：

```shell
npm install postcss-pxtorem -D
```

然后在**项目根目录**中创建 `postcss.config.js` 文件：

```js
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
```

配置完毕，**重新启动服务**。

**需要注意的是：**

- 该插件**不能转换行内样式中的** `**px**`，例如 `<div style="width: 200px;"></div>`





## 组件

### nav

```vue
<template>
    <div class="navbar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.navbar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);

    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99; */

    .left, .right{
        width: 60px;
    }
    .center{
        flex: 1;
        text-align: center;
    }
}
</style>
```

### tabbar

```vue
<template>
  <div class="bottom-tab">
    <div class="tab-item" @click="switchTo('/home')">
      <img :src="$route.path.includes('/home') ? tabBarImgArr[0].selected: tabBarImgArr[0].normal" alt="">
      <span :class="{on: $route.path.includes('/home')}">首页</span>
    </div>
    <div class="tab-item" @click="switchTo('/recommend')">
      <img :src="$route.path.includes('/recommend') ? tabBarImgArr[1].selected: tabBarImgArr[1].normal" alt="">
      <span :class="{on: $route.path.includes('/recommend')}">推荐</span>
    </div>
    <div class="tab-item" @click="switchTo('/search')">
      <img :src="$route.path.includes('/search') ? tabBarImgArr[2].selected: tabBarImgArr[2].normal" alt="">
      <span :class="{on: $route.path.includes('/search')}">搜索</span>
    </div>
    <div class="tab-item" @click="switchTo('/cart')">
      <img :src="$route.path.includes('/cart') ? tabBarImgArr[3].selected: tabBarImgArr[3].normal" alt="">
      <span :class="{on: $route.path.includes('/cart')}">购物车</span>
    </div>
    <div class="tab-item" @click="switchTo('/me')">
      <img :src="$route.path.includes('/me') ? tabBarImgArr[4].selected: tabBarImgArr[4].normal" alt="">
      <span :class="{on: $route.path.includes('/me')}">个人中心</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
    data(){
      return {
        tabBarImgArr: [
          {normal: require('./../../common/img/icon_home.png'), selected: require('./../../common/img/icon_home_selected.png')},
          {normal: require('./../../common/img/icon_intro.png'), selected: require('./../../common/img/icon_intro_selected.png')},
          {normal: require('./../../common/img/icon_search.png'), selected: require('./../../common/img/icon_search_selected.png')},
          {normal: require('./../../common/img/icon_chat.png'), selected: require('./../../common/img/icon_chat_selected.png')},
          {normal: require('./../../common/img/icon_mine.png'), selected: require('./../../common/img/icon_mine_selected.png')}
        ]
      }
    },
    methods: {
      switchTo(path){
          // 切换路由
          this.$router.replace(path);
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
    .bottom-tab
      width 100%
      height 5rem
      background-color #fff
      position fixed
      left 0
      bottom 0
      z-index 999
      box-shadow 0 -0.2rem 1rem #ccc
      display flex
      .tab-item
        display flex
        flex 1
        flex-direction column
        justify-content center
        align-items center
        font-size 1.2rem
        img
          width 35%
          margin-bottom 0.3rem
        .on
          color red
</style>

```



## 商品分类模板

### 左侧

```vue
<template>
  <scroll ref="leftScroll" class="left_scroll" >
    <ul>
      <li class="menu-item current">
<img class="icon" src="https://fuss10.elemecdn.com/0/6a/05b267f338acfeb8bd682d16e836dpng.png">
          <span class="text bottom-border-1px">折扣</span>
        </li>
        <li class="menu-item">
          <span class="text bottom-border-1px">
            <img class="icon" src="https://fuss10.elemecdn.com/b/91/8cf4f67e0e8223931cd595dc932fepng.png">
            优惠
          </span>
        </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from "components/content/scroll/Scroll";
  components: {
    Scroll
  }
}
</script>

<style lang="less" scoped>
.left_scroll {
  height: calc(100vh - 44px - 49px);
  flex: 0 0 80px;
  width: 100px;
  background: #f3f5f7;
  overflow: hidden;
}
.menu-item {
  display: table;
  height: 54px;
  width: 100%;
  padding: 0 10px;
  line-height: 14px;

  &.current {
    border-left: 2px solid #02a774;
    position: relative;
    z-index: 10;
    margin-top: -1px;
    background: #fff;
    color: #02a774;
    font-weight: bolder;
  }

  .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 14px;
  }
}
</style>
```



### 右侧

#### 三个图片平均排

```vue
<template>
  <scroll  ref="rightScroll">
  <div class="goods_content">
      <div class="h_title">
      <span class="delimit">/</span>
      <span>流行单品</span>
      <span class="delimit">/</span>
    </div>
    <div class="cate_list">
      <a href="JavaScript:;" class="list_item">
        <img src="https://s10.mogucdn.com/mlcdn/c45406/180816_2h5k24ifj90k75ej5g0k8e4i3551e_180x180.gif" @load="loadImg"/>
        <div class="right_text">
           秋季新品 
        </div>
      </a>
    </div>
  </div>  
  </scroll>
</template>

<script>
import debounce from 'lodash/debounce'
import Scroll from "components/content/scroll/Scroll";
export default {
  methods: {
    loadImg: debounce(function(){
      this.$emit('loadImg')
    },500),
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="less">
.goods_content {
  flex: 6;
  color: #333333;
  text-align: center;
  font-size: 14px;
  box-sizing: border-box;
  .h_title {
    width: 100%;
    color: #999;
    padding: 10px 0;
    .delimit {
      padding: 0 10px;
    }
  }
  .cate_list {
    display: flex;
    flex-wrap: wrap;
    .list_item {
      width: 33.33%;
      padding: 10px 0 15px;
      img {
        width: 60%;
      }
    }
  }
}
</style>
```

#### 食品一栏

```vue
<template>
<scroll ref="rightScroll">
  <div class="foods-wrapper">
      <ul>
        <li class="food-list-hook">
          <h1 class="title">折扣</h1>
          <ul>
            <li class="food-item bottom-border-1px">
              <div class="icon">
                <img width="57" height="57"
                     src="http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114">
              </div>
              <div class="content">
                <h2 class="name">红豆薏米美肤粥</h2>
                <p class="desc">甜粥</p>
                <div class="extra">
                  <span class="count">月售86份</span>
                  <span>好评率100%</span>
                </div>
                <div class="price">
                  <span class="now">￥12</span>
                </div>
                <div class="cartcontrol-wrapper">
                  CartControl组件
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
</scroll>
</template>
<script>
import Scroll from "components/content/scroll/Scroll";
  components: {
    Scroll
  }
}
</script>
<style lang="less" scoped>
.foods-wrapper {
    flex: 1;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      &:last-child {
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        position: relative;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,
        .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: -4px;
        }
      }
    }
  }
</style>
```

