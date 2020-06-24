template 中 fetch-suggestions 属性：输入框文字变化时候就会触发
methods 中 监测输入框  输入事件【即fetch-suggestions后面跟的事件名】, 失去焦点事件@blur【如果不点击面板那么获取不到下拉列表的具体参数，这里取数组[0]来代替】, 选择下拉内容的事件@select
<template>
  <div>
    <!-- fetch-suggestions：输入框文字变化时候就会触发，类似input事件 -->
    <!-- select: 选中下拉列表数据时候触发 -->
    <el-autocomplete
      v-model="form.departCity"
      :fetch-suggestions="queryDepartSearch"
      placeholder="请搜索出发城市"
      @select="handleDepartSelect"
      class="el-autocomplete"
      @blur="handleDepartBlur"
    ></el-autocomplete>
  </div>
</template>
<
<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        departCity: "", // 出发城市
        departCode: "",
      },
      // 出发城市列表
      departCities: [],
    };
  },
  methods: {
    // 出发城市输入框的输入事件，根据输入的关键字请求接口返回相关城市
    // value: 是输入框的值
    // cb：是回调函数，调用函数时候必须要传入一个数组
    // cb参数的数组的元素 (必须是一个对象，对面里面必须包含value值)
    queryDepartSearch(value, cb) {
      // 如果输入框数据为空，返回空列表
      if (!value.trim()) {
        return cb([]);
      }

      // 发送请求
      this.$axios({
        url: "/airs/city",
        params: {name: value}
      }).then(res => {
        // data是城市列表
        const { data } = res.data
        this.departCities = data
        cb(this.departCities)
      })
    },
    
    // 出发城市输入框失去焦点时候触发【如果不点击面板那么获取不到下拉列表的具体参数，这里取数组[0]来代替】
    handleDepartBlur() {
      if (this.departCities.length === 0) return;
      // 用于认为输入是正确的，没有选中下拉框，所以需要默认选中第一个
      this.form.departCity = this.departCities[0].value;
      this.form.departCode = this.departCities[0].sort;
    },

    // 出发城市下拉选择时触发
    // item: 选中的下拉列表的数据
    handleDepartSelect(item) {
        this.form.departCity = item.value;
        this.form.departCode = item.sort;
    },
  }
};
</script>
