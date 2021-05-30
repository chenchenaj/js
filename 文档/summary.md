# summary

* 取多层结构的对象报错

**取一个对象三层及三层以上的内容**会报错，可以通过 v-if 来解决

![](https://uploader.shimo.im/f/qvfXyCYx2fVCgYeX.png!thumbnail)![图片](https://uploader.shimo.im/f/cmduTzldOf4aUlu3.png!thumbnail)

* **如果在 undefined 中读取不到 length，尝试通过 children 的方式来获取，证明mounted中加载 better-scroll 的时间早了，可以增加判断条件来确定什么时候初始化better-scroll；**
* **轮播图横向滑动要先给ul加width，同时要开启scrollX： true**

![图片](https://uploader.shimo.im/f/s2QvAPtPyTsMwMd7.png!thumbnail)

![图片](https://uploader.shimo.im/f/x3kMqiKzh6IxNPe3.png!thumbnail)![图片](https://uploader.shimo.im/f/LgQADHz4Ov9OchLX.png!thumbnail)

* **过滤评论内容**

子组件想要改变父组件的状态内容，用子组件向父组件传值

过滤判断条件：先确定【全部 / 推荐 / 吐槽】，再确定【是否只看有评论的内容】

![图片](https://uploader.shimo.im/f/dTEePb6P3qexPoBZ.png!thumbnail)![图片](https://uploader.shimo.im/f/N78JGdd197UFJLRF.png!thumbnail)

```plain
filterRatingsComment(){
      /**
       * 情况1： 
       * data的activeType： 0 / 1 / 2
       * ratings的rateType： 0 / 1
       * => activeType === 2 || activeType ===  rateType
       * 
       * 
       * 情况2
       * data的onlyText： true / false
       * ratings的text: 有 / 无
       * => !onlyText || onlyText && text.length > 0
       * 
       */
      const {onlyText, activeType, ratings} = this
      return ratings.filter((item) => {
        return (activeType === 2 || activeType ===  item.rateType) && (!onlyText || onlyText && item.text.length > 0)
      })
    }
```
* **伪数组转真数组遍历**

伪数组如果想要实现forEach方法，可以通过改变this指向

![图片](https://uploader.shimo.im/f/HTZYzMaLmeshdUZj.png!thumbnail)

```plain
模板：
Array.prototype.forEach.call(需要遍历的伪数组,(item) => {
  console.log(item)
})
例子
Array.prototype.forEach.call(lis,(item) => {
  const li = item.clientHeight
  top += li
  this.tops.push(top)
})
```
* 添加响应式属性

给响应式对象添加一个属性，该属性默认不是响应式的，因此操作界面的时候界面不会有变化

例：foods.count = 1

给响应性对象添加一个属性，并且该属性是响应式，能够数据驱动视图

```plain
Vue.set(foods,"count",1)
```
* 节流防抖

防抖debounce/节流throttle

```plain
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
防抖
getNewCaptcha: debounce(function(){
    console.log('debounce')
},1000)
节流
getNewCaptcha: throttle(function(){
    console.log('debounce')
},1000)
```
* 路由缓存

页面设计登录退出最好不要加路由缓存，否则登录的记录不会被清除，下次进入同一页面的时候还有上次登录的信息

![图片](https://uploader.shimo.im/f/TgOPnO7lWLYLPss1.png!thumbnail)

## 
* vue Uncaught (in promise) undefined报错

![图片](https://uploader.shimo.im/f/c36XFGdDVyRA6LEf.png!thumbnail)

降低路由的版本

```plain
npm i vue-router@3.0 -S
```
如果有修改父组件的内容，需要$emit来修改；如果父组件只是想调用子组件的方法，那么通过$ref来调用即可

* 显示图片

后台可能没有返回的图片，如果要展示图片需要先判断一下有否有图片的内容，如果没有那就显示默认的图片

* flex

flex可以和width同时使用

```
.cate_list{
  display: flex;
  flex-wrap: wrap;
  .list_item{
     width: 33.33%;
   }
}
```
* 上拉加载下拉刷新
```plain
1 用户上滑页面 滚动条触底 开始加载下一页数据
  1 找到滚动条触底事件  微信小程序官方开发文档寻找
  2 判断还有没有下一页数据
    1 获取到总页数  只有总条数
      总页数 = Math.ceil(总条数 /  页容量  pagesize)
      总页数     = Math.ceil( 23 / 10 ) = 3
    2 获取到当前的页码  pagenum
    3 判断一下 当前的页码是否大于等于 总页数 【if(totalPage>=this.pagenum)】
      表示 没有下一页数据
  3 假如没有下一页数据 弹出一个提示
  4 假如还有下一页数据 来加载下一页数据
    1 当前的页码 ++
    2 重新发送请求  this.getGoodsList()
    3 数据请求回来  要对data中的数组 进行 拼接 而不是全部替换！！！
                 【goodsList:[...this.data.goodsList,...res.goods]】

2 下拉刷新页面
  1 触发下拉刷新事件 需要在页面的json文件中开启一个配置项
    找到 触发下拉刷新的事件
  2 重置 数据 数组    【goodsList: []】
  3 重置页码 设置为1
  4 重新发送请求
  5 数据请求回来 需要手动的关闭 等待效果【在请求成功的函数写关闭代码】
```
![图片](https://uploader.shimo.im/f/ZSphJmTntmwO44cl.png!thumbnail)

![图片](https://uploader.shimo.im/f/EtIk3QZN0GKtCfBf.png!thumbnail)

| ** // 获取商品列表数据**  **  async getGoodsList(){**  **    const res=await request({url:"/goods/search",data:this.QueryParams});**  **    // 获取 总条数**  **    const total=res.total;**  **    // 计算总页数**  **    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);**  **    this.setData({**  **      // 拼接了数组**  **      goodsList:[...this.data.goodsList,...res.goods]**  **    })**    **    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  **  **    wx.stopPullDownRefresh();**  **  },**    **  // 页面上滑 滚动条触底事件**  **  onReachBottom(){**  **  //  1 判断还有没有下一页数据**  **    if(this.QueryParams.pagenum>=this.totalPages){**  **      // 没有下一页数据**  **      wx.showToast({ title: '没有下一页数据' });**  **        **  **    }else{**  **      // 还有下一页数据**  **      this.QueryParams.pagenum++;**  **      this.getGoodsList();**  **    }**  **  },**   | 
|----|
* 节约性能

data中只存放要使用的数据，多余的数据需要过滤掉

webp格式的图片iPhone可能无法显示


## 确定值的Boolean

控制台输入确定

```plain
Boolean({}) --true
Boolean(null) --false
```
## 取值属性名

![图片](https://uploader.shimo.im/f/eXkbh5Dt7eUVR8Oy.png!thumbnail)

发现属性名很怪异的时候，需要通过 [] 包裹并结合""来取值

```plain
const scopeAddress = result.authSetting["scope.address"]
```
出现这种错误可以尝试try..catch..

```plain
Uncaught (in promise) thirdScriptError
{"errMsg":"chooseAddress:fail auth deny"}
Object
```
## 全选every

```javascript
cart 数组     checked 数组中的属性
const allCheck = cart.every(item => item.checked) // 返回true或false
```
![图片](https://uploader.shimo.im/f/lYMRY637Pq5jgwAA.png!thumbnail)

## 从缓存中获取数据

如果是数组，没有的时候需要加[]

如果是对象或则字符串则可以不用加

```plain
const address = wx.getStorageSync("address")
const cartList = wx.getStorageSync(("cart")) || []
```
## 时间

```plain
var date = new Date(); //Wed May 06 2020 21:17:10 GMT+0800 (中国标准时间)
console.log(date.valueOf()); // 1588770609353
console.log(date.toString()); // Wed May 06 2020 21:18:00 GMT+0800 (中国标准时间)
console.log(date.toLocaleString()); //2020/5/6 下午4:48:41
标准时间转字符串【不会补0】
Sun Jun 14 2020 00:00:00 GMT+0800 (中国标准时间) => '2020-5-14'
new Date().toLocaleDateString().replace(/\//g,'-') 
标准时间转字符串【会补0】
Sun Jun 14 2020 00:00:00 GMT+0800 (中国标准时间) => '2020-05-14'
const y = new Date().getFullYear()
const m = (new Date().getMonth() + 1 + '').padStart(2, '0')
const d = (new Date().getDate() + '').padStart(2, '0')
const timer = y + '-' + m + '-' + d
标准时间转字符串【不会补0】
Sun Jun 14 2020 00:00:00 GMT+0800 (中国标准时间) => '2020-5
字符串转标准时间 
'2020-5-14' => Sun Jun 14 2020 00:00:00 GMT+0800 (中国标准时间)
new Date('2020-5-14')
```
```js
this.setData({
  // 先将里面的数组结构出来，然后新增一个可以转换时间格式的属性
  orderList: result.orders.map(item => ({...item, create_time_cn:(new Date(item.create_time*1000).toLocaleString())}))
})
```

## 计算机票时间

如果第二天的时间为01:00，前一天的时间为23:00，相减会变负数；

解决办法：判断第二天的时间是否小于前一天的时间，如果小于那么就 +24

```js
computed: {
    rankTime(){
        // 如果接口还没有请求回来时候，先返回空
        if(!this.data.arr_time) return "";
        // 到达时间
        const arr = this.data.arr_time.split(":"); // [18, 30]
        const dep = this.data.dep_time.split(":"); // [16, 00]

        // 如果到达的小时小于出发时间的小时，说明到了第二天凌晨
        if(arr[0] < dep[0]){
            arr[0] = +arr[0] + 24;
        }
        // 到达和出发时间转换成分钟
        const end = arr[0] * 60 + +arr[1];
        const start = dep[0] * 60 + +dep[1];
        // 间隔分钟
        const dis = end - start; // 150
        // 小时
        const hours = Math.floor(dis / 60)
        // 分钟
        const min = dis % 60;
        return `${hours}时${min}分钟`;
    }
},
```



## 前台分页分段显示

前台分页：即一次请求就请求回来所有的数据

后台分页：每次只会请求会当前页的数据回来

前台分页的分段显示 ======》 需要将请求回来的数组切割成显示的段，例：第一页【0-9】，第二页【10-19】

如果需要过滤数据，不需要重新发送请求给后台，直接在前台处理数据https://www.bilibili.com/video/BV1ZC4y1s7US?p=70

```vue
https://www.bilibili.com/video/BV1ZC4y1s7US?p=63
<template>
  <div>
    <!-- flightsData.flights是航班的列表 -->
    <FlightsItem 
    v-for="(item, index) in dataList"
    :key="index"
    :item="item"/>

    <!-- 分页组件 -->
    <!-- size-change: 切换条数时候触发的事件 -->
    <!-- current-change：页数切换时候触发的事件 -->
    <!-- current-page: 当前页数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      fightData: {}, // 总数据
      // 分页的变量
      pageIndex: 1,
      pageSize: 5,
      total: 0,
      dataList: [] // 存放当前页数据
    };
  },
  methods: {
    // 发送请求获取数据
    getData(){
      // 总数据
      this.filgthsData = res.data
      // 显示第一页的五条数据
      this.dataList = this.filgthsData.flight.slice(0,5)
    },
    // 分页切换条数时候触发
    handleSizeChange(val) {
      // 修改显示的条数
      this.pageSize = val;
      // 重新加载数据
      this.setDataList()
    },

    // 切换页数时候触发
    handleCurrentChange(val) {
      // 修改当前的页面
      this.pageIndex = val
      // 重新加载数据
      this.setDataList()
    },

    // 设置机票列表的数据
    setDataList(arr){
      // 在总列表中截取出当前页的数据
      this.dataList = this.filgthsData.filghts.slice((this.pageIndex - 1) * this.pageSize,this.pageIndex * this.pageSize)
    }
  }
};
</script>
<style lang="less" scoped></style>
```



## 图片下间隙

```plain
img{
   vertical-align: middle;
}
```
## 移动端touch

```plain
1. touch是移动端的触摸事件 而且是一组事件
2. touchstart   当手指触摸屏幕的时候触发
3. touchmove    当手指在屏幕来回的滑动时候触发
4. touchend     当手指离开屏幕的时候触发
5. touchcancel  当被迫终止滑动的时候触发（来电，弹消息）
6. 利用touch相关事件实现移动端常见滑动效果和移动端常见的手势事件
使用touch:
1.绑定事件：box.addEventListener('touchstart',function (e) { });
2.事件对象：
名字：TouchList------触摸点（一个手指触摸就是一个触发点，和屏幕的接触点的个数）的集合
changedTouches    改变后的触摸点集合
targetTouches     当前元素的触发点集合
touches           页面上所有触发点集合
3.触摸点集合在每个事件触发的时候会不会去记录触摸
changedTouches 每个事件都会记录
targetTouches，touches 在离开屏幕的时候无法记录触摸点
4.分析滑动实现的原理：
4.1 就是让触摸的元素随着手指的滑动做位置的改变
4.2 位置的改变：需要当前手指的坐标
4.3 在每一个触摸点中会记录当前触摸点的坐标 e.touches[0] 可以拿到第一个手指触摸点
4.4 clientX clientY      基于浏览器窗口（视口）
4.4 pageX   pageY        基于页面（视口）
4.4 screenX screenY      基于屏幕
```
![图片](https://uploader.shimo.im/f/VHAanCGwdK1S38eq.png!thumbnail)

## 定时器interval

如果是遇到可能有负数的情况，先--，然后在判断是否需要移除

```plain
 const timer = setInterval(() => {
        this.countdowmTime --   // 先减后判断是否移除
        if(this.countdowmTime <= 0){
          clearInterval(timer)
        }
}, 1000);
```
## 三目运算符

	条件是否成立，条件成立为结果1，否则为结果2

```plain
int a = 1, b = 2, z;
z = a > b ? a : b;  //去了括号
console.log(z) // 2
```
## 数组拼接

```plain
使用concat拼接(括号里是新的内容)
this.comments = this.comments.concat(res.data.message)
使用扩展运算符拼接(前面的是原数组，后面的是新的内容)
this.goodsList:[...this.goodsList,...res.goods]
使用push和扩展运算符
this.goodList.push(...res.goods)
```
使用第一种的
```plain
if (res.data.status == 0) {
    //拼接评论数据，而不是覆盖评论数组
    res.data.message.length ? res.data.message : Toast("没有更多数据")
    this.comments = this.comments.concat(res.data.message)
    console.log(res.data.message)
}
```
## 图片上传

![](https://uploader.shimo.im/f/hgnfkojQRrhuM0hL.png!thumbnail)

![](https://uploader.shimo.im/f/OGffHZdSkKgWSwqe.png!thumbnail)

![图片](https://uploader.shimo.im/f/GFzHqCqG9NBAVt2K.png!thumbnail)

![图片](https://uploader.shimo.im/f/xzqgynoQWiHNhF5a.png!thumbnail)

![图片](https://uploader.shimo.im/f/8wiNYom8Gqc0mjRt.png!thumbnail)![图片](https://uploader.shimo.im/f/tC0Em7DeFBA6DAfU.png!thumbnail)

![图片](https://uploader.shimo.im/f/h6L9mK1COVaF8Zct.png!thumbnail)![图片](https://uploader.shimo.im/f/SpJsk1WlChM5AXhR.png!thumbnail)![图片](https://uploader.shimo.im/f/gAPXWiLSzfYRIzMj.png!thumbnail)

PC端

![图片](https://uploader.shimo.im/f/IMDLcI4xj63W8hqS.png!thumbnail)

## 自动聚焦

```plain
@opened="$refs.name.focus()"
触发事件="$refs.xxx.focus()"
```
## 单向绑定vs双向绑定

```javascript
单向数据绑定
<input :value="user.name" @input="inputName = $event"/> 
:value="data中的数据"
$event 标识事件参数，是Vue提供的，可以直接获取到input的值
@input="inputName = $event"
事件中更新
this.user.name = this.inputName
双向数据绑定
v-model="data中的数据"
```
![图片](https://uploader.shimo.im/f/qaFk6UlSvhs0IPbO.png!thumbnail)

## 含变量的请求方法

[变量]:value

```plain
async saveProfile (field, value) {
  this.$toast.loading({
    duration: 0, // 持续时间，0表示持续展示不停止
    forbidClick: true, // 是否禁止背景点击
    message: '保存中...' // 提示消息
  })
  try {
    await updateUserProfile({
      [field]: value
    })
    this.$toast.success('保存成功')
    this.user[field] = value
    globalBus.$emit('user-update')
    this.isEditGenerShow = false
  } catch (err) {
    this.$toast.success('保存失败')
    return Promise.reject(err)
  }
},
```
## 不调整css直接触发隐藏元素点击事件

```plain
<input type="file" hidden accept="image/*" ref="file" />
<button @click="uploadFile">上传</button>
uploadFile(){
  this.$refs.file.click()
}
```
## better-scroll不能与sticky共存

## 获取组件的元素

```plain
console.log(this.$refs.tabcontrol.$el)
```
## 监听组件的点击

```
<BackTop @click.native="backClick" v-show="scrollY > 1000" />
```
## 复杂的数据中取数据

```plain
在index.js中
export class Goods {
	  constructor(itemInfo, columns, services) {
	    this.title = itemInfo.title;
	    this.columns = columns;
	    this.services = services;
	  }
}
请求数据
import {Goods} from './api'
this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
```
## 判断数组对象是否为空

```plain
数组
arr.length > 0
对象
Object.keys(goods).length !== 0
```
## 直接使用数组的最后一个

```plain
{{goods.services[goods.services.length-1].name}}
```
![图片](https://uploader.shimo.im/f/KFEIWNNIrKX9zOu6.png!thumbnail)

## 使用数组的其中几个值

![图片](https://uploader.shimo.im/f/ooFgBtOSv4pGKXcU.png!thumbnail)

```plain
遍历除数组最后一个值
v-for"item in 10" item => 1,2...10
<div class="info-service">
<span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
<img :src="goods.services[index-1].icon">
<span>{{goods.services[index-1].name}}</span>
</span>
</div>
```


![图片](https://uploader.shimo.im/f/6Y1xECeZEWwnutC9.png!thumbnail)


## 城市列表的数据

![图片](https://uploader.shimo.im/f/A9vh8aZUk1VoUcv5.png!thumbnail)

## 接口可传可不传的params

如果用户传了就使用params对象，如果用户没有传就使用{}

```plain
export default reqdata(params = {}){
  url: '...',
  params
}
```
## 并发进行的请求

```plain
import {getArtical} from '@/api/article'
import {getTags} from '@/api/tag'
并发进行
const [res1,res2] = await Promise.all([getArtical(),getNews()])

分开请求
const {data} = await getArtical()
const {data: tagData} = await getNews()
```
![1591763981330](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1591763981330.png)

![图片](https://uploader.shimo.im/f/tlLF2dXc44R2NOD8.png!thumbnail)

## 判断添加到数组中的内容是否重复

![图片](https://uploader.shimo.im/f/eVJxvFkBqIq3S848.png!thumbnail)



## 共用同一个方法

![1592311104454](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1592311104454.png)

```js
handleClick(type){
    // 默认选中城市列表第一个
    // if(this.cities.length > 0){
    //     if(type === "depart"){
    //         this.form.departCity = this.cities[0].value;
    //         this.form.departCode = this.cities[0].sort;
    //     }
    //     if(type === "dest"){
    //         this.form.destCity = this.cities[0].value;
    //         this.form.destCode = this.cities[0].sort;
    //     }
    // }  
    // 另一种写法
    if(this.cities.length === 0) return;
    this.form[type + "City"] = this.cities[0].value;
    this.form[type + "Code"] = this.cities[0].sort;
        },
```



## 历史记录

![1592294054457](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1592294054457.png)

### tia保存到localstorage

点击查询按钮的时候，发送请求查询结果，同时将本次查询需要显示的参数存放到一个数组中

```js
<el-button style="width:100%;"  type="primary"  icon="el-icon-search" @click="handleSubmit">
    搜索
</el-button>

handleSubmit(){
    const historyList = JSON.parse(localStorage.getItem('history') || '[]')
    historyList.unshift('需要存储的参数')
    localStorage.setItem('history',JSON.stringify(historyList))
}
```



### 保存到vuex

组件中

```js
<el-button style="width:100%;"  type="primary"  icon="el-icon-search" @click="handleSubmit">
    搜索
</el-button>
// 保存到store
this.$store.commit("air/setHistory", this.form);
```

vuex文件夹下的文件

```js
export const state = () => {
    return {
        // 搜索的历史记录
        history: []
    }
}

export const mutations = {
    // 设置history的值,data是搜索表单的对象
    setHistory(state, data){
        // 把最新的记录追加到第一个
        state.history.unshift(data);
    }
}
```

## 前端生成二维码

https://github.com/soldair/node-qrcode

https://github.com/soldair/node-qrcode/tree/master/examples

下载

```js
npm install --save qrcode
```

引入

```js
import QRCode from 'qrcode'
```

使用

```vue
<template>
<div class="qrcode">
    <!-- 二维码 -->
    <canvas id="qrcode-stage"></canvas>

    <p>请使用微信扫一扫</p>
    <p>扫描二维码支付</p>
</div>
</template>
<script>
export default{
    methods:{
        getInfo(){
            // 请求完成数据获取到订单号后
            // 获取canvas元素
            const canvas = document.querySelector("#qrcode-stage");
            QRCode.toCanvas(canvas, 需要转化的URL, {
                width: 200
            });
        }
    }
}
</script>
```



## 下载excel二进制数据流返回原页面

```js
exportUser: function (callback) {
     let url=`下载的地址路径`
     window.open(url)
     callback();
 },
     
==========使用=============
this.$api.exportUser(() => {this.$message.success('导出成功')});
```





