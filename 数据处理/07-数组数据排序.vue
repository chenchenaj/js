<template>
  <div>
    <button @click="sortList(0)">默认排序</button>
    <button @click="sortList(1)">向上排序</button>
    <button @click="sortList(2)">向下排序</button>
    <p v-for="item in filterList" :key="item.id">{{item.id}}-{{item.title}}</p>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      orderType: 0,
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
          "id": 40,
          "title": "甜品",
        },
        {
          "id": 15,
          "title": "美食",
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
      ],
    };
  },
  computed: {
    filterList () {
      let arr = [...this.list]
      if (this.orderType) {
        arr.sort((a, b) => {
          if (this.orderType === 1) { // 升序
            return a.id - b.id
          } else { // 降序
            return b.id - a.id
          }
        })
      }
      return arr
    }
  },
  methods: {
    sortList (type) {
      this.orderType = type
    }
  },
}

</script>
<style lang='less' scoped>
</style>