<template>
 <div id="iframe">
    <back-link></back-link>
    <iframe :src='src' frameborder="0"></iframe>
  </div>
</template>
<script>
  import BackLink from '@/components/BackLink.vue'
  export default {
    name: 'iframeProject',
    props: ['src'],
    components: {BackLink}
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
