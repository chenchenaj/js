

### Form

![](https://img2020.cnblogs.com/blog/1983442/202006/1983442-20200625120120378-44381404.png)

#### 表单的数据绑定

【用户名和密码绑定到表单上】

1. 先为el绑定:model="form"属性进行绑定form数据对象

  ```vue
  <el-form class="content" :model="LoginFormRef"></el-form>
  ```

  

2. 给每个表单项的文本输入框通过v-model属性绑定到form数据对象的具体属性中

   prefix-icon是前面的图标
```vue
<el-form-item prop="username">
   <el-input prefix-icon="el-icon-user-solid" v-model="LoginFormRef.username"></el-input>
</el-form-item>
```



#### 表单的验证规则

【单一校验】
1.为el-form 通过属性绑定指定 :rule="rule" 验证对象

```
<el-form class="content" :model="LoginFormRef" :rules="rules"></el-form>
```

2.在data数据中定义校验对象，其中每个属性都是一个校验规则

```vue
data(){
  return {
        rules: {
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
        }
  	}  
} 
```

3.为不同的表单item项通过**prop来指定不同的验证规则**，添加的内容与rules中的名称保持一致【prop是加到item中，不是加到 input中】

```vue
<el-form-item prop="username"></el-form-item>
```



#### 重置表单

##### 方式一

1.需要通过ref获取整个表单对象的实例对象

```
<el-form class="content" ref="LoginFormRef" :rules="rules" :model="LoginFormRef"></el-form>
```



2.直接使用resetFiled函数重置整个表单，对整个表单进行重置，将所有字段值重置为初始值并移除校验结果

```
resetForm() {
    this.$refs.LoginFormRef.resetFields()
} 
```

##### 方式二

传入el-form的那个ref值

```
<el-button @click="resetForm('LoginFormRef')" type="info">重置</el-button>

resetForm(formName) {
   this.$refs[formName].resetFields()
}
```



#### 校验参数

##### 方式一

传入el-form的那个ref值

```vue
<el-button type="primary" @click="submitForm('LoginFormRef')">立即创建</el-button>
submitForm(formName) {
  this.$refs[formName].validate((valid) => {
    if (valid) {
      alert('submit!');
    } else {
      console.log('error submit!!');
      return false;
    }
  });
},
```

##### 方式二

直接使用validate函数重置整个表单

```
<el-button type="primary" @click="submitForm">立即创建</el-button>

submitForm(formName) {
  this.$refs.LoginFormRef.validate((valid) => {
    if (valid) {
      alert('submit!');
    } else {
      console.log('error submit!!');
      return false;
    }
  });
},
```

#### 自定义校验

验证规则rule

验证的值value

回调函数callback，如果调用cb的时候传入error，那么就是调用失败

自定义规则

**prop的值必须是校验的值，否则不生效**

```
<el-form-item label="邮箱" prop="email">
  <el-input v-model="ruleForm.email"></el-input>
</el-form-item>

 rules: {
      email: [
        { required: true, validator: validateCheck, trigger: 'submit' }
      ],
 }
```



```
var checkEmail = (rule, value, callback) => {
  const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!regEmail.test(value)) {
    return callback(new Error("请输入合法的邮箱"))
  } else {
    callback()
  }
}
```

使用：email必须与表单的prop值一样

```
email: [
  { required: true, message: "请输入邮箱", trigger: "blur" },
  { validator: checkEmail, trigger: "blur" },
],
```



#### 验证码和CheckBox

```
<div class="qr-input-group">
  <el-form-item label="验证码" prop="yzm">
    <el-input v-model="ruleForm.yzm" class="qrinput"></el-input>
  </el-form-item>
  <ver-code ref="vercode"></ver-code>
</div>

<el-form-item prop="argument">
  <el-checkbox v-model="ruleForm.checked" class="checkbox-xm">
    已阅读并同意：
    <a href="javascript:;">用户协议</a> 和
    <a href="javascript:;">隐私政策</a>
  </el-checkbox>
</el-form-item>


data () {
    // 验证校验码
    var validateYzm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (value !== this.$refs['vercode'].show_num.join('')) {
        // 刷新验证码
        this.$refs.vercode.Refresh();
        callback(new Error('验证码输入错误'));
      } else {
        callback();
      }
    }
    //  勾选协议验证：
    var validateCheck = (rule, value, callback) => {
      if (!this.ruleForm.checked) {
        callback(new Error("请勾选该协议"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        yzm: '',
        checked: false,
      },
      rules: {
        yzm: [
          { required: true, validator: validateYzm, trigger: 'blur' }
        ],
        argument: [
          { required: true, validator: validateCheck, trigger: 'change' }
        ],
      }
    };
  },
```





### 菜单

1. 点击的时候其中一个菜单栏，所有菜单都展开，记得修改`el-menu-item`中的`index`值，就是控制显示那一层

2. 点击控制菜单面板的展开隐藏，使用`collapse`属性

3. 菜单栏改造为路由链接，开启该项的`router`，同时`el-menu-item`中的`index`值为对应的路径

![1593080412558](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593080412558.png)

4. tab菜单栏都会对应一个子路由

5. 刷新还是保持菜单栏高亮和不收缩状态`default-active`

- 将点击的值保存到sessionStorage中，用到的时候取出来 或 直接读取当前页的路径

```
:default-active="$route.path"
```



```
<!-- 一级菜单 -->
<el-submenu index="1">
  <template slot="title">
    <!-- 图标 -->
    <i class="el-icon-location"></i>
    <!-- 文本 -->
    <span>导航一</span>
  </template>
  <!-- 二级菜单 -->
  <el-menu-item-group>
    <el-menu-item index="1-1">
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 文本 -->
        <span>选项1</span>
      </template>
    </el-menu-item>
    <el-menu-item index="1-2">
      <template slot="title">
        <!-- 图标 -->
        <i class="el-icon-location"></i>
        <!-- 文本 -->
        <span>选项2</span>
      </template>
    </el-menu-item>
  </el-menu-item-group>
</el-submenu>
```



可以使用栅格布局

![1593089529100](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593089529100.png)



### 表格

#### 形成自动高度

```
<el-table ref="multipleTable" :height="operaHeight" style="width: 100%" ></el-table>

data(){
	return {
		operaHeight: 0,
	}
}

getScollerHeight() {
  setTimeout(() => {
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
//60 头部， 32 面包屑， 41 第一层页签， 40 第二层页签， 50 列表标题，
    this.operaHeight = clientHeight - 60 - 32 - 41 - 50 - 20 - 48;   //48操作列操作栏
  }, 100)
},
mounted(){
	this.getScollerHeight()
}
```



#### 绑定数据源:data

​	可嵌套很多模板，但是prop的值需要对应:data中的某一个值；label指定标题

使用带边框的属性`border`

#### 带斑马纹`stripe`

#### 添加索引列`type="index"`

#### 显示树状结构`row-key`

![](https://i.bmp.ovh/imgs/2020/07/63cd3143fcdd9465.png)

```
<el-table-column type="index" label="#"> </el-table-column>
```

#### 自定义列

获取列表当行的内容可以通过v-slot

```
<el-table-column label="状态" prop="mg_state">
  <template v-slot="scope">
    {{scope.row}}
  </template>
</el-table-column>
```

6. 渲染操作

```
<el-table-column fixed="right" label="操作" width="180px">
  <template slot-scope="scope">
    <el-button type="primary" size="mini" icon="el-icon-edit" @click="editUser(scope.row)"></el-button>
    <el-button type="danger" size="mini" icon="el-icon-delete" @click="delUser(scope.row)"></el-button>
    <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
      <el-button type="warning" size="mini" icon="el-icon-setting" @click="setUser(scope.row)"></el-button>
    </el-tooltip>
  </template>
</el-table-column>
```



#### 嵌入图片[自定义列]

具体看自定义列模板进行操作

```
<el-table-column prop="album.picUrl" width="100">
  <template scope="scope">
    <img v-lazy="scope.row.album.picUrl" width="50" height="50" class="img" />
  </template>
</el-table-column>
```



#### 格式化数据formatter

Function(row, column, cellValue, index)

row：当前行对象

column：当前行信息

cellValue：传入prop的值

index：索引

因为这个是函数，需要return返回数据

```
<el-table-column label="时长" width="100" prop="duration" :formatter="formatter"></el-table-column>

formatter (row, column, cellValue, index) {
  return this.$utils.formatTime(cellValue)
}
```



#### 借助template格式化

```
<el-table-column label="时长" width="100">
  <template slot-scope="scope">
    <span>{{ $utils.formatTime(scope.row.duration) }}</span>
  </template>
</el-table-column>
```





#### 加载中loading



#### 点击事件

| 事件名             | 说明                                                         | 参数                              |
| :----------------- | :----------------------------------------------------------- | :-------------------------------- |
| select             | 当用户手动勾选数据行的 Checkbox 时触发的事件                 | selection, row                    |
| select-all         | 当用户手动勾选全选 Checkbox 时触发的事件                     | selection                         |
| selection-change   | 当选择项发生变化时会触发该事件                               | selection                         |
| cell-mouse-enter   | 当单元格 hover 进入时会触发该事件                            | row, column, cell, event          |
| cell-mouse-leave   | 当单元格 hover 退出时会触发该事件                            | row, column, cell, event          |
| cell-click         | 当某个单元格被点击时会触发该事件                             | row, column, cell, event          |
| cell-dblclick      | 当某个单元格被双击击时会触发该事件                           | row, column, cell, event          |
| row-click          | 当某一行被点击时会触发该事件                                 | row, column, event                |
| row-contextmenu    | 当某一行被鼠标右键点击时会触发该事件                         | row, column, event                |
| row-dblclick       | 当某一行被双击时会触发该事件                                 | row, column, event                |
| header-click       | 当某一列的表头被点击时会触发该事件                           | column, event                     |
| header-contextmenu | 当某一列的表头被鼠标右键点击时触发该事件                     | column, event                     |
| sort-change        | 当表格的排序条件发生变化的时候会触发该事件                   | { column, prop, order }           |
| filter-change      | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | filters                           |
| current-change     | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow         |
| header-dragend     | 当拖动表头改变了列的宽度的时候会触发该事件                   | newWidth, oldWidth, column, event |
| expand-change      | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | row, (expandedRows \| expanded)   |



#### 修改每一行的样式`row-class-name`

没有生效，暂时没研究出来原因



#### 行内居中

```
 align="center"
```





### 卡片

使用卡片组件，在缩小的时候会一直都懂，可以通过改变width来防止抖动

```
.el-card__body{
  width: 98%;
}
```



### input

![1593100072275](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593100072275.png)

使用`clearable`来删除输入框的内容

通过`clear`事件监听点击了clearable

#### 事件

| 事件名称 | 说明                                          | 回调参数                  |
| :------- | :-------------------------------------------- | :------------------------ |
| blur     | 在 Input 失去焦点时触发                       | (event: Event)            |
| focus    | 在 Input 获得焦点时触发                       | (event: Event)            |
| change   | 仅在输入框**失去焦点或用户按下回车时触发**    | (value: string \| number) |
| input    | 在 Input **值改变时触发**                     | (value: string \| number) |
| clear    | 在点击由 `clearable` 属性生成的清空按钮时触发 | —                         |



### dialog弹框

关闭对话框：如果是输入内容的表单需要完整的重置

监听关闭事件`close`，在该事件里面设置重置内容

点击遮罩不关闭弹窗：`:close-on-click-modal="false"`

```
<el-dialog :visible.sync="dialogVisible" @close="cancelSubmit">
</el-dialog>
cancelSubmit(){
  this.$refs.user_form.resetFields()
},
```



### drawer抽屉

Drawer 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。

| 参数                  | 说明                                                         | 类型                                 | 可选值 | 默认值 |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------- | :----- | :----- |
| append-to-body        | Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true | boolean                              | —      | false  |
| before-close          | 关闭前的回调，会暂停 Drawer 的关闭                           | function(done)，done 用于关闭 Drawer | —      | —      |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Drawer                             | boolean                              | —      | true   |
| custom-class          | Drawer 的自定义类名                                          | string                               | —      | —      |
| destroy-on-close      | 控制是否在关闭 Drawer 之后将子元素全部销毁                   | boolean                              | -      | false  |
| modal                 | 是否需要遮罩层                                               | boolean                              | —      | true   |
| modal-append-to-body  | 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Drawer 的父元素上 | boolean                              | —      | true   |
| show-close            | 是否显示关闭按钮                                             | boolean                              | —      | true   |
| size                  | Drawer 窗体的大小, 当使用 `number` 类型时, 以像素为单位, 当使用 `string` 类型时, 请传入 'x%', 否则便会以 `number` 类型解释 | number / string                      | -      | '30%'  |
| title                 | Drawer 的标题，也可通过具名 slot （见下表）传入              | string                               | —      | —      |
| wrapperClosable       | 点击遮罩层是否可以关闭 Drawer                                | boolean                              | -      | true   |
| withHeader            | 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效 | boolean                              | -      | true   |



### tag

需要使用页面栅格系统的布局

![1593161427414](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593161427414.png)

一级权限使用一个col

二级和三级权限使用一个col，col里面还套row和col

每个一级和二级上下都有分割线

```
一级权限row添加这些类
:class="['center', index === 0 ? 'bt': '','bb']"
二级权限row添加这些类
:class="['center', i2 === 0 ? '': 'bt']"

.center{
  display: flex;
  align-items: center;
}
.bt{
  border-top: 1px solid #ccc;
}
.bb{
  border-bottom: 1px solid #ccc;
}
```

删除tag标签后发送请求，不重新发送角色权限的请求，直接更新data中的数据【只更新当前被修改的内容】

在使用函数的时候，有传递一个scope.row，直接将请求后的结果赋值给这个孩子即可

```
handelDel(scope.row, item.id)

handelDel(item, id){
	const res = await req()
	
	// 直接修改当前的数据
	item.children = res.data
}
```



### Tree

![1593168472531](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593168472531.png)

```
<el-tree :data="treeList" :props="treeProps" show-checkbox default-expand-all :default-checked-keys="defaultSelectKey" node-key="id"></el-tree>
```

1. **data**：数据源

2. **props**：tree中的对象，里面包含需要展示在界面的各种属性

例：返回的数据对象

```
{
    data: [
      {
        id: 101,
        authName: '商品管理',
        path: null,
        pid: 0,
        children: [
          {
            id: 104,
            authName: '商品列表',
            path: null,
            pid: 101,
            children: [
              {
                id: 105,
                authName: '添加商品',
                path: null,
                pid: '104,101'
              }
            ]
          }
        ]
      }
    ],
    meta: {
      msg: '获取权限列表成功',
      status: 200
    }
  }
```



配置的内容【值必须跟返回内容中的一致】

```
treeProps: {
    children: "children",
    label: "authName",
  },
```



3. 选中CheckBox时需要默认选中的是该项的id值，使用`node-key`值

4. 默认展开所有节点`default-expand-all`

5. 默认勾选的节点，即需要通过`default-checked-keys`添加已选中的第三级id值到数组中，递归三级权限的id，如果不生效就是`node-key`没有设置

```js
// 三级递归
getTreeNode(roleNode, arr){
  // 如果没有children属性，那么就是最后一级节点
  if(!roleNode.children){
    return arr.push(roleNode.id)
  }
  // 如果有children，需要继续遍历
  roleNode.children.forEach(item => this.getTreeNode(item, arr))
},
    
// 使用三级递归
assignRole(auth) {
    //defaultSelectKey：展开的时候默认选择的节点的数组
  this.getTreeNode(auth, this.defaultSelectKey)
},
```



![](https://ftp.bmp.ovh/imgs/2020/06/99ee1eca01df5e5e.gif)

6. diolog关闭的时候需要清空已选中三级权限的id或则在打开diolog的时候清空上次的默认选中的节点

ps：如果出现打开弹框闪烁的情况，要将请求*当前树形控件的权限*放在`assignRole`分配权限的弹框中，不能抽离出去写

```js
// 分配权限
async assignRole(auth) {
 //defaultSelectKey 默认选中的CheckBox数组
  this.defaultSelectKey = []
    // 获取当前选中项的tree权限
  const res = await reqPermissionTree()
  if (res.meta.status === 200) {
    this.treeList = res.data
  }

  this.getTreeNode(auth, this.defaultSelectKey)
  this.authDialog = true
},
```



7. 增加/更新权限

给确定按钮绑定事件，获取选中的一级二级三级的key节点，即使用element-ui提供的`getCheckedKeys`和`getHalfCheckedKeys`两个函数来获取

```
async handelSubmitAuth() {
  // 需要提交选中的key的数组[包括一级节点，二级节点]
  const keys = [...this.$refs.tree.getHalfCheckedKeys(), ...this.$refs.tree.getCheckedKeys()]
  // 后台需要返回字符串，这里数组转字符串
  const str = keys.join(",")
  const res = await reqUpdateRoleAuth(this.role.id, str)
  if (res.meta.status === 200) {
    this.$message({
      type: "success",
      message: res.meta.msg,
    })
  } else {
    this.$message({
      type: "error",
      message: res.meta.msg,
    })
  }
  // 关闭弹框
  this.authDialog = false
  // 重新加载
  this.getRoleList()
},
```



### select

```
<el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
 </el-select>
```

label：显示在页面的内容

:value：选中之后的值

v-model="value"：已选中的id值【点击内容的时候就会有值】



### 级联选择器Cascader

![1593412893336](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593412893336.png)



```
<el-cascader v-model="selectIds" :options="cateList" :props="cascaderProps" @change="handleChange"></el-cascader>
```

options：数据源

props： 配置对象，配置需要存放到界面的数据【里面的内容需要用引号包裹】

```
cascaderProps:{
 expandTrigger: 'hover',
 label: 'cat_name',
 value: 'cat_id'
}
```

如果要改变cascader的高度，需要在全局修改样式，在局部页面修改样式不生效

```
.el-cascader-panel{
  height: 300px !important;
}
```

 @change="handleChange"：级联选择框选中改变的事件【可用于判断选中的数组长度，如果小于3那就清空数组不显示】

v-model：需要显示的数组内容



### tabs

```
<el-tabs v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
</el-tabs>
```

activeName：被激活的页签,对应每一行name的值

handleTabClick：页签切换触发的函数

name：与选项卡绑定值 value 对应的标识符，表示选项卡别名



字符串分割出来[""]，所以要先判断再分割

```
item.attrs = item.attr_vals ? item.attr_vals.split(' ') : []
```



为每一行数据提供一个tags

![1593431533354](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593431533354.png)

原因：共用同一个值【inputVisible，inputValue】

解决办法

1. 可以添加到data中去控制

```
res.data.map(item => {
  item.attrs = item.attr_vals ? item.attr_vals.split(' ') : []
  item.inputVisible = false
  item.inputValue = ''
})
```

2. 显示

![1593432879860](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593432879860.png)



### step和tabs联动

关键在于`activeIndex`，步骤条的activeIndex 需要数值，tabs的activeIndex为字符串

```
<!-- 步骤条 -->
<el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
<el-step title="基本信息"></el-step>
<el-step title="商品参数"></el-step>
<el-step title="商品属性"></el-step>
<el-step title="商品图片"></el-step>
<el-step title="商品内容"></el-step>
<el-step title="完成"></el-step>
</el-steps>

<!-- tabs -->
<el-tabs tab-position="left" v-model="activeIndex">
<el-tab-pane label="基本信息" name="0">用户管理</el-tab-pane>
<el-tab-pane label="商品参数" name="1">配置管理</el-tab-pane>
<el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
<el-tab-pane label="商品图片" name="3">定时任务补偿</el-tab-pane>
<el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
</el-tabs>

data() {
    return {
      activeIndex: '0'
    }
},
```



最外层是form表单，里面才是tabs

![1593490935728](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593490935728.png)

![1593490899794](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593490899794.png)



```
<el-tabs tab-position="left" :value="activeIndex" @tab-click="handelTabsChange" :before-leave="handelTabsLeave">
```

| before-leave | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 | Function(activeName, oldActiveName) |
| ------------ | ------------------------------------------------------------ | ----------------------------------- |
|              |                                                              |                                     |



### upload

有图片列表显示不一定代表上传成功，

(1)action：图片上传到后台的API地址，不能写相对路径，应该填写完整的绝对路径【地址为后台地址】

```
<el-upload action="http://127.0.0.1:8888/api/private/v1/upload"></el-upload>
```



(2)**headers**：设置上传的请求头部【因为内部是没有使用axios，所以要另外配置请求头】

写完action后，点击上传图片，看控制台的上传事件

![1593493247801](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593493247801.png)

在全局已经有配置axios发送请求的时候携带token，但是这里还是提示无效的token，证明上传图片没有使用axios发送请求，是使用ajax上传的，需要配置请求头`headers`

```
 headerObj: {
    Authorization: window.sessionStorage.getItem('token')
  },
```

![1593495735690](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593495735690.png)



(3)图片上传【临时路径】

| on-success | 文件上传成功时的钩子 | function(response, file, fileList)           |
| ---------- | -------------------- | -------------------------------------------- |
|            |                      | file和fileList虽然内容相同，但不是同一个对象 |

response返回的数据

![1593496305134](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593496305134.png)

file返回的数据

![1593496362766](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593496362766.png)

fileList返回的数据

![1593496409565](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593496409565.png)

在上传成功之后将路径添加到对应的内容中

上传成功后需要看图片是完整路径还是64位编码

![1593498937029](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1593498937029.png)



完整路径则继续操作

```
<el-upload :on-success="handleSuccess"></el-upload>

data() {
   return {// 添加商品的表单数据对象
　　　pics:[]
   }
},

handleSuccess(response, file, fileList){
  if(response.meta.status === 200){
    this.pics.push(response.data.tmp_path)
  }
}
```



(4)on-remove：文件列表移除文件时的钩子；  file：当前的文件信息；【临时路径】

```
<el-upload :on-remove="handleRemove">

data() {
   return {// 添加商品的表单数据对象
　　　pics:[]
   }
},

// 处理移除图片的操作
handleRemove(file) {
  // 1. 获取将要删除的图片的临时路径
  const filePath = file.response.data.tmp_path
  // 2. 从 pics 数组中，找到这个图片对应的索引值
  const index = this.pics.findIndex(item => item.pic === filePath)
  // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
  this.pics.splice(index, 1)
},
```



(5)on-preview：图片预览事件； file：当前的文件信息；【需要传入完整的URL地址】

```
<el-upload :on-preview="handlePreview">
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="previewPath" alt="" />
</el-dialog>

data() {
    return {// 添加商品的表单数据对象
　　　　// 图片的预览路径
      previewPath: '',
　　　　// 图片预览的弹框
      previewVisible: false
    }
},

// 处理图片预览效果
handlePreview(file) {
  this.previewPath = file.response.data.url
  this.previewVisible = true
},
```



(6)list-type：文件列表的类型

(7)name:上传的文件字段名【后台提供，默认是file】



### [滚动条scrollbar](https://blog.csdn.net/zhouweihua138/article/details/80077311)

`scrollbar`组件暴露了 `native`, `wrapStyle`, `wrapClass`, `viewClass`, `viewStyle`, `noresize`, `tag` 这7个 props属性

```
props: {
    native: Boolean,  // 是否使用本地，设为true则不会启用element-ui自定义的滚动条
    wrapStyle: {},  // 包裹层自定义样式
    wrapClass: {},  // 包裹层自定义样式类
    viewClass: {},  // 可滚动部分自定义样式类
    viewStyle: {},  // 可滚动部分自定义样式
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {  // 生成的标签类型，默认使用 `div`标签包裹
      type: String,
      default: 'div'
    }
}
```



```vue
<el-scrollbar :style="{height: tableHeight + 'px'}" :native="false">
	需要嵌套形成滚动的内容
</el-scrollbar>

<script>
data(){
    return{
      tableHeight: 400,
	}
}
/**
* 动态计算页面table高度
*/
getScollerHeight() {
    setTimeout(() => {
       let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //60 头部， 32 面包屑， 41 第一层页签， 40 第二层页签， 50 列表标题， 20 父组件外边距, 16 外边距
       this.tableHeight = clientHeight - 60 - 32 - 41 - 50 - 20 -16;
     }, 100)
 },

mounted(){
	this.getScollerHeight()
}
</script>
```



### transfer实现上下左右穿梭

![image.png](https://pic.gksec.com/2020/10/09/bdebd075640f2/image.png)

```vue
<template>
  <div>
    <el-dialog title="编辑列信息" :visible.sync="transferVisible" width="50%" :before-close="handleClose">
      <div class="obpm-title">
        <div class="bar d-inline-block float-right">
          <el-button type="primary" size="small">保存</el-button>
          <el-button type="danger" plain size="small">取消</el-button>
        </div>
      </div>
      <div class="obpm-main mt-3">
        <div class="dialog-content">
          <div class="content-header">
            <span>表单：</span>
            <el-select v-model="selectValue" size="small">
              <el-option v-for="item in formOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <el-transfer
            :data="leftData"
            :titles="['字段', '列']"
            v-model="rightData"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}',
            }"
            target-order="push"
            @right-check-change="chooseRightBox"
          >
            <el-button @click="handleUp" slot="right-footer" size="mini">上移</el-button>
            <el-button @click="handleDown" slot="right-footer" size="mini">下移</el-button>
          </el-transfer>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectValue: "", // 被选中的值
      formOptions: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      leftData: [
        {
          key: "aa",
          label: "备选1",
        },
        {
          key: "bb",
          label: "备选2",
        },
        {
          key: "cc",
          label: "备选3",
        },
      ],
      rightData: ["aa", "bb"], // 右侧被选中的值
      rightSelectItem: [], // 右侧复选框选中项,值为leftData的key
      rightSelectIndex: "", // 右侧列表被选中项的下标值
    };
  },
  methods: {
    // 右侧选中的复选框
    chooseRightBox(value) {
      this.rightSelectItem = value;
      console.log(value);
    },
    // 弹框关闭的回调
    handleClose() {
      this.$emit("closeTransferDialog");
    },
    // 右侧复选框上移
    handleUp() {
      if (this.rightSelectItem.length == 1) {
        this.rightData.find((val, indexs) => {
          if (val == this.rightSelectItem) {
            this.rightSelectIndex = indexs; // 数组项的下标就是我当前选中项的下标
          }
        });
        if (this.rightSelectIndex == 0) {
          return this.$message("没有上移的空间了");
        }
        // 上移-改变的数组（项和下标同时改变）
        let changeItem = JSON.parse(JSON.stringify(this.rightData[this.rightSelectIndex - 1]));
        console.log(changeItem);
        this.rightData.splice(this.rightSelectIndex - 1, 1);
        this.rightData.splice(this.rightSelectIndex, 0, changeItem);
        this.rightSelectIndex = this.rightSelectIndex - 1;
      } else {
        return this.$message.error("只能选择一条数据进行上下移动");
      }
    },
    // 右侧复选框下移
    handleDown() {
      if (this.rightSelectItem.length == 1) {
        this.rightData.find((val, indexs) => {
          if (val == this.rightSelectItem) {
            this.rightSelectIndex = indexs;
          }
        });
        if (this.rightSelectIndex == this.rightData.length - 1) {
          // 这里是length-1,因为下标值从0开始
          return this.$message("没有下移的空间了");
        }
        let changeItem = JSON.parse(JSON.stringify(this.rightData[this.rightSelectIndex]));
        this.rightData.splice(this.rightSelectIndex, 1);
        this.rightData.splice(this.rightSelectIndex + 1, 0, changeItem);
        this.rightSelectIndex = this.rightSelectIndex + 1;
      } else {
        return this.$message.error("只能选择一条数据进行上下移动");
      }
    },
  },
  props: {
    transferVisible: Boolean,
  },
};
</script>
<style lang="scss" scoped>
.content-header {
  margin: 10px 0;
}
</style>
```



