<template>
  <div class="intro">
    <back-link v-if="backLinkSrc" :backLinkSrc="backLinkSrc"></back-link>
    <h1 v-if="title">{{title}}</h1>
    <p v-if="description">{{description}}</p>
  </div>
</template>

<script>
  import backLink from '@/components/BackLink.vue'
  export default {
    name: 'intro',
    props: ['title', 'description', 'backLinkSrc'],
    components: {backLink}
  }
</script>

<style lang="scss" scoped>
  .intro {
    width: 80%;
    h1 {
      text-transform: uppercase;
      opacity: 0.5;
      font-family: $font-aileron-light;
      letter-spacing: 3px;
      font-size: 13px;
      text-align: left;
    }
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
    p {
      color: #fefefe;
      font-family: $font-walsheim-regular;
      font-size: 20px;
      text-align: left;
    }
  }
  @media screen and (max-width : 600px) {
    .intro {
      width: 100%;
    }
  }
</style>
