<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(item,index) in getStar" :key="index" :class="item"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed:{
    getStar(){
      // 计算能获得多少个星星
      const {score, starlist} = this
      const scoreInt = Math.floor(score)
      const starList = []
      
      // 全星
      for (let i = 0; i < scoreInt; i++) {
        starList.push('on')
      }
      // console.log(starList);

      // 半星
      if((score*10 - scoreInt*10) >= 5){
        starList.push('half')
      }

      // 灰星
      while(starList.length < 5){
          starList.push('off')
      }
      return starList
    }
  },
  props:{
    score:{
      type: Number
    },
    size:{
      type: Number
    },
  }
}
</script>
<style lang='less' scoped>
.star {
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 .star-item {
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;

    &:last-child {
      margin-right: 0;
    }

    &.on {
      background-image: url("./images/stars/star48_on@2x.png");
    }

    &.half {
      background-image: url("./images/stars/star48_half@2x.png");
    }

    &.off {
      background-image: url("./images/stars/star48_off@2x.png");
    }
  }

  &.star-36 .star-item {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;

    &:last-child {
      margin-right: 0;
    }

    &.on {
      background-image: url("./images/stars/star36_on@2x.png");
    }

    &.half {
      background-image: url("./images/stars/star36_half@2x.png");
    }

    &.off {
      background-image: url("./images/stars/star36_off@2x.png");
    }
  }

  &.star-24 .star-item {
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;

    &:last-child {
      margin-right: 0;
    }

    &.on {
      background-image: url("./images/stars/star24_on@2x.png");
    }

    &.half {
      background-image: url("./images/stars/star24_half@2x.png");
    }

    &.off {
      background-image: url("./images/stars/star24_off@2x.png");
    }
  }
}
</style>