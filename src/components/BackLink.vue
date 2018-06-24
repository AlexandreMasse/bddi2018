<template>
  <!-- if backLinkSrc -->
   <router-link v-if="backLinkSrc" :to="backLinkSrc" class="action-back back">
     <i class="icon-arrow-left"></i>
   </router-link>
  <!-- else -->
  <span v-else @click="goBack" class="action-back back">
      <i class="icon-arrow-left"></i>
   </span>
</template>

<script>
  export default {
    name: 'backLink',
    props: ['backLinkSrc'],
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  a,span {
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
