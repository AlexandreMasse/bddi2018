<template>
  <div class="intro">
    <a v-if="backHome" href="/" class="fi flaticon-left-arrow action-back backhome"></a>
    <h1>{{title}}</h1>
    <p>{{description}}</p>
  </div>
</template>

<script>
  export default {
    name: 'intro',
    props: ['title', 'description', 'backHome']
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
</style>
