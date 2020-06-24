<template>
  <div>
    <!-- change 用户确认选择日期时触发 -->
    ========================================================================
    <!-- 基础用法 -->
    <el-date-picker v-model="value1" type="date" placeholder="选择日期">
    </el-date-picker>

    ========================================================================
    <!-- 带有时间限制picker-options 和 面板宽度style 100%设置 和 面板内显示format'年月日' 和 输出的值value-format为 '2020-06-14T16:00:00.000Z' -->
    <el-date-picker
      v-model="form.departDate"
      type="date"
      placeholder="请选择日期"
      style="width: 100%;"
      :picker-options="pickerOptions"
      @change="handleDate"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      form: {
        departDate: ""
      },

      // 禁用日期选中
      pickerOptions: {
        // 【今天以前的日期不显示】
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },

        // 【今天以后的日期不显示】
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      }
    };
  },
  methods: {
    // 确认选择日期时触发
    handleDate(value) {
      // moment是一个方法，可以传递时间Date对象。如果不传递参数就会获取当前的时间
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    }
  }
};
</script>
<style lang="less" scoped></style>
