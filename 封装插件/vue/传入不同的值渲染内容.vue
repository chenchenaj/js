<template>
  <div class="music-item">
    <div class="pic">
      <img v-lazy="img" />
      <div class="desc-wrap">
        <span class="desc">{{desc}}</span>
      </div>
    </div>
    <p class="name">{{name}}</p>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: ['id', 'img', 'name', 'desc'],
}

</script>