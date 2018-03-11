<template>
 <div id="iframe">
   <span v-on:click="backToScreen">
      <router-link :to="backLinkSrc" class="back-link">
        <span class="fi flaticon-left-arrow">Back</span>
      </router-link>
   </span>
    <iframe :src='src' frameborder="0"></iframe>
  </div>
</template>
<script>
  export default {
    name: 'iframeProject',
    props: ['src', 'backLinkSrc'],
    methods: {
      backToScreen () {
        this.$emit('backToScreen')
      }
    }
  }
</script>

<style scoped lang="scss">
  #iframe {
    background-color: black;

    iframe {
      display: block;
      height: 100vh;
      width: 100vw;
      border: 0;
    }

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
  }

</style>
