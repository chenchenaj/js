<template>
  <div>
    <el-input v-model="searchName"></el-input>
    <p v-for="item in filterList" :key="item.id">{{item.title}}</p>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      searchName: "",
      list: [
        {
          "id": 20,
          "title": "甜品饮品",
        },
        {
          "id": 10,
          "title": "商超便利",
        },
        {
          "id": 15,
          "title": "美食",
        },
        {
          "id": 40,
          "title": "甜品",
        },
        {
          "id": 50,
          "title": "便利",
        },
        {
          "id": 65,
          "title": "饮品",
        },
        {
          "id": 70,
          "title": "商超",
        },
        {
          "id": 80,
          "title": "鲜花",
        },
        {
          "id": 90,
          "title": "蛋糕",
        },
        {
          "id": 33,
          "title": "寿司",
        },
        {
          "id": 11,
          "title": "定食",
        },
        {
          "id": 36,
          "title": "泡菜",
        },
        {
          "id": 78,
          "title": "烤肉",
        },
        {
          "id": 26,
          "title": "日韩",
        },
        {
          "id": 34,
          "title": "料理",
        },
      ]
    };
  },
  computed: {
    filterList () {
      let arr = [...this.list]
      if (this.searchName.trim()) {
        arr = this.list.filter(item => item.title.indexOf(this.searchName) !== -1)
      }
      console.log(this.searchName, arr)
      return arr
    }
  },
}

</script>
<style lang='less' scoped>
</style>