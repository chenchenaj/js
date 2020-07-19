// 注册
在main.js中全局注册组件
import Loading from '@/components/Loading'
Vue.component('Loading',Loading);
// 组件中使用
<div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else>
        <ul>
            <li>
                <div class="pic_show"><img src="/images/movie_1.jpg"></div>
                <div class="info_list">
                    <h2>无名之辈</h2>
                    <p>观众评 <span class="grade">9.2</span></p>
                    <p>主演: 陈建斌,任素汐,潘斌龙</p>
                    <p>今天55家影院放映607场</p>
                </div>
                <div class="btn_mall">
                    购票
                </div>
            </li>
        </ul>
    </Scroller>
</div>

data(){
    return {
      isLoading : true, // 请求完成数据后设置为false即可
    }
},

<template>
    <div class="loader"></div>
</template>

<script>
export default {
    name : 'Loading'
}
</script>

<style scoped>
.loader {
  position: relative;
  width: 2.5em;
  height: 2.5em;
  transform: rotate(165deg);
}
.loader:before, .loader:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0.5em;
  height: 0.5em;
  border-radius: 0.25em;
  transform: translate(-50%, -50%);
}
.loader:before {
  animation: before 2s infinite;
}
.loader:after {
  animation: after 2s infinite;
}

@keyframes before {
  0% {
    width: 0.5em;
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }
  35% {
    width: 2.5em;
    box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
  }
  70% {
    width: 0.5em;
    box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
  }
  100% {
    box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
  }
}
@keyframes after {
  0% {
    height: 0.5em;
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }
  35% {
    height: 2.5em;
    box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
  }
  70% {
    height: 0.5em;
    box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
  }
  100% {
    box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
  }
}
/**
 * Attempt to center the whole thing!
 */
html,
body {
  height: 100%;
}

.loader {
  position: absolute;
  top: calc(50% - 1.25em);
  left: calc(50% - 1.25em);
}

</style>
