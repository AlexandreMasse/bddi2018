<template>
 <div id="iframe">
   <span v-on:click="backToScreen" >
      <back-link :backLinkSrc="backLinkSrc"></back-link>
   </span>
    <iframe :src='src' frameborder="0"></iframe>
  </div>
</template>
<script>
  import BackLink from '@/components/BackLink.vue'
  export default {
    name: 'iframeProject',
    props: ['src', 'backLinkSrc'],
    components: {BackLink},
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
  }
  iframe {
    display: block;
    height: 100vh;
    width: 100vw;
    border: 0;
  }

</style>
