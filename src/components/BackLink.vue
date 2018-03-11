<template>
  <router-link :to="backLinkSrc" class="back-link">
    <span class="fi flaticon-left-arrow">Back</span>
  </router-link>
</template>
<script>
  export default {
    name: 'backLink',
    props : ['backLinkSrc']
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
