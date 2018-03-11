<template>
   <router-link :to="backLinkSrc" class="fi flaticon-left-arrow action-back back"></router-link>
</template>

<script>
  export default {
    name: 'backLink',
    props: ['backLinkSrc']
  }
</script>

<style lang="scss" scoped>
  .fi {
    display: block;
    text-align: left;
    text-decoration: none;
    &:before {
      cursor: pointer;
      font-size: 20px;
      color: $color-purple;
    }
  }
</style>
