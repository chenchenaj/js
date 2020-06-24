https://www.bilibili.com/video/BV1ZC4y1s7US?p=63
<template>
<!-- 
  前台分页：
  一次性将所有的数据请求回来，需要将请求回来的数组切割成显示的段，例：第一页【0-9】，第二页【10-19】，通过slice方法计算显示的起始值和最终值，在显示数据的时候需要遍历显示当前页的数据而不是总数据
 -->
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
