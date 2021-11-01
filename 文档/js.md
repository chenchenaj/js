# 案例

## 登录拦截跳转

用户直接在浏览器中输入网址访问，但用户此时还没有登录，要进行拦截跳转

```js
// 发送请求判断用户有没有登录，如果没有就跳转
const res = await axios.get('/user/login')
// 如果接口返回有登录就跳转到首页，没有就跳转到登录页面
if(res.code == 0){
  window.location.href = 'index.html'
}else{
  window.location.href = 'login.html'
}
```



## 菜单权限校验

在登录的时候将权限存到localStorage中，使用的时候再读取出来，根据js动态加载

```js
$(function(){
  const power = localStorage.getItem('power');
  let str = `
	<a href="#organizate">组织管理</a>
  ${power.includes('customerHandle') ? '<a href="#customer">客户管理</a>' : ''}
	`;
  $('.main').html(str);
})
```



## 按钮权限校验

当前登录的账号没有批量删除的功能，但在html中统一都写了这个按钮，可以在js中用remove移除这个按钮

```js
$(function(){
  const power = localStorage.getItem('power');
  if(!power.organizate){
    $('.delAll').remove()
  }
})
```



## 一个方法执行成功后再执行另外的方法(异步变同步)

可以在第一个方法中return Promise，然后再promise中执行第二个方法

```js
let user = (function(){
  let first = function(){
      return axios.get('/userlist').then(res => console.log('first'))
    }

    let secord = function(){
      axios.get('/userinfo').then(res => console.log('second'))
    }

    return{
      init(){
        first().then(() => secord())
      }
    }
})();
user.init();
```



## 事件委托处理按钮事件

由于`tr`中含有checkbox，添加，删除，可以将标识`data-id`绑定在tr上，这样通过冒泡就能知道点击的是哪一行

```html
<table border="1">
  <tbody>
  	<tr data-id="1">
      <td><input type="checkbox" /></td>
      <td>$100</td>
      <td>
        <a href="javascript:;">添加</a>
        <a href="javascript:;">删除</a>
      </td>
    </tr>
    <tr data-id="2">
      <td><input type="checkbox" /></td>
      <td>$100</td>
      <td>
        <a href="javascript:;">添加</a>
        <a href="javascript:;">删除</a>
      </td>
    </tr>
  </tbody>
</table>

<script>
	$tbody.click(e => {
    let target = e.target,
        tarTag = target.tarName,
        tarVal = target.innerText,
        $target = $(target)
    
    if(tarTag === 'A' && tarVal === '删除'){
      // 获取选中的是哪一行
      console.log($target.parent().parent().attr('data-id'))
    }
  })
</script>
```



## 切换iframe

```html
<div class="box">
    <a href="https://www.baidu.com/" target="iframe">百度</a>
    <a href="https://www.jd.com" target="iframe">京东</a>
    <a href="https://www.taobao.com" target="iframe">淘宝</a>
</div>
<iframe src="https://www.baidu.com/" name="iframe" />
```



## hash判断刷新后展示内容

刷新的时候获取地址栏有没有hash，如果有hash就显示那个模块的内容，如果没有就显示首页

```html
<div class="box">
    <a href="#organizate">组织管理</a>
    <a href="#customer">客户管理</a>
  	<iframe src="" class="iframeBox" />
</div>

<script>
	// 获取hash值
  const HASH = window.location.hash.replace('#','')
  if(HASH == 'organizate'){
    $('.iframeBox').attr('src', 'page/organizate.html')
  }else{
    $('.iframeBox').attr('src', 'page/customer.html')
  }
</script>
```

