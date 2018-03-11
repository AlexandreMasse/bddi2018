<template>
  <div>
    <h1>Screens</h1>
    <div class="category__description">
        <intro :title="project.name" :description=" bam" :backHome="false"></intro>
    </div>
  </div>
</template>
<script>
  import intro from '@/components/Intro.vue'
  // import backLink from '@/components/BackLink.vue'
  export default {
    name: 'screenProject',
    props: ['project', 'students'],
    components: {intro}
  }
</script>

<style scoped lang="scss">
</style>
