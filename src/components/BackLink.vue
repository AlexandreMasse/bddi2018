<template>
  <a href="" class="project__back-link fi flaticon-left-arrow action-back'">Back</a>
</template>
<script>
  export default {
    name: 'backLink'
  }
</script>

<style scoped lang="scss">
  .back-link {
    display: none;
    opacity: 0;
    position: fixed;
    left: 30px;
    top: 100px;
    font-family: $font-aileron-regular;
    text-transform: uppercase;
    letter-spacing: 4px;
    cursor: pointer;
  }
</style>
