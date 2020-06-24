### 组件中 v-model 绑定 vuex 的值

#### 方式一：input 不要直接绑定 v-model， 可以使用:value, 通过 @input 来检测值的改变来 $emit 到 vuex
```js
<input :value="stateValue" @input="changeInput"/>
methods:{
  changeInput(e){
    this.$emit('changeInput', e.target.value)
  }
}
```

#### 方式二：使用 v-model，通过 computed 来检测改变
```js
<input v-model="stateValue"/>
computed: {
  stateValue: {
    get () {
      return this.$store.state.stateValue
    },
    set (val) {
      this.SET_STATE_VALUE(val)
    }
  },
}
```