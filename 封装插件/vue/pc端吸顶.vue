/**
需要传入分值，需要
 */
<template>
	<view class="movie-score-wapper">
		<image 
			v-for="yellow in yelloScore"
      :key="yellow"
			src="../static/icos/star-yellow.png" 
			class="star-ico"></image>
			
		<image 
			v-for="(gray, index) in grayScore"
      :key="index"
			src="../static/icos/star-gray.png" 
			class="star-ico"></image>
			
		<view class="movie-score" v-if="showNum == 1">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "Stars",
		
		data() {
			return {
				yelloScore: 0,
				grayScore: 5
			};
		},
		
		props: {
			innerScore: 0,		// 定义外部传入的分数
			showNum: 0			// 是否需要显示具体的分数  1：显示  0：不显示
		},
		
		// 生命周期，组件创建完成后被调用
		created() {
			console.log("this.innerScore=" + this.innerScore)
			var tempScore = 0;
			if (this.innerScore != null && this.innerScore != undefined && this.innerScore != '') {
				tempScore = this.innerScore;
			}
			
			var yelloScore = parseInt(tempScore / 2);
			var grayScore = 5 - yelloScore;
			
			this.yelloScore = yelloScore;
			this.grayScore = grayScore;
		}
	}
</script>

<style lang="scss" scoped>
.movie-score-wapper {
  display: flex;
  .star-ico {
    width: 20rpx;
    height: 20rpx;
    margin-top: 6rpx;
  }
  .movie-score {
    font-size: 12px;
    color: grey;
    margin-left: 8rpx;
  }
}
</style>
