<template>
  <div>
    <p v-mydirective="message"></p>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      message: "hello"
    };
  },

  directives: {
    'mydirective' (el, binding, vnode) {
      console.log(el)
      console.log(binding)
      console.log(vnode)

      el.innerHTML = binding.value.toUpperCase()
    }
  }
}

</script>
<style lang='less' scoped>
</style>
