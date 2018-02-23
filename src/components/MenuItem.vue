<template>
  <div class="menu-item">
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: {
      text: {
        default: 'default value',
        type: String
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
