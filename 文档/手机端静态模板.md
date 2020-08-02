## vue-商品分类模板

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

