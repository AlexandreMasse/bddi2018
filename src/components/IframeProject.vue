<template>
 <div id="iframe">
   <span v-on:click="backToScreen" class="back-link">
     <i class="icon-left-arrow">Back</i>
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
        this.$router.go(-1)
        this.$emit('backToScreen')
      }
    }
  }
</script>

<style scoped lang="scss">
  #iframe {
    //background-color: black;
    position: relative;
    z-index: 99999;

    iframe {
      display: block;
      height: 100vh;
      width: 100vw;
      border: 0;
    }

    .back-link {
      position: fixed;
      left: 15px;
      top: 15px;
      font-size: 18px;
      font-family: $font-aileron-regular;
      text-transform: uppercase;
      letter-spacing: 4px;
      cursor: pointer;
      text-decoration: none;
    }
  }

</style>
