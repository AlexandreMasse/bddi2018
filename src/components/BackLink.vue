<template>
  <a href="" class="back-link fi flaticon-left-arrow">Back</a>
</template>
<script>
  export default {
    name: 'backLink'
  }
</script>

<style scoped lang="scss">
  .back-link {
    position: fixed;
    left: 30px;
    top: 100px;
    font-family: $font-aileron-regular;
    text-transform: uppercase;
    letter-spacing: 4px;
    cursor: pointer;
    text-decoration: none;
  }
</style>
