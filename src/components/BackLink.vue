<template>
   <router-link :to="backLinkSrc" class="action-back back">
     <i class="icon-arrow-left"></i>
   </router-link>
</template>

<script>
  export default {
    name: 'backLink',
    props: ['backLinkSrc']
  }
</script>

<style lang="scss" scoped>
  a {
    display: block;
    text-align: left;
    text-decoration: none;
    .icon-arrow-left {
      &:before {
        cursor: pointer;
        font-size: 20px;
        color: $color-purple;
      }
    }
  }
</style>
