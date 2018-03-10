<template>
  <div class="project">
   <h1>{{text}}</h1>
   <p>Je suis un projet unique !</p>
   <iframe-project></iframe-project>
   <screen-project></screen-project>
  </div>
</template>

<script>
  import categories from '@/data/categories.json'
  import iframeProject from '@/components/iframeProject.vue'
  import screenProject from '@/components/screenProject.vue'

  export default {
    name: 'project',
    components: {iframeProject, screenProject},
    data () {
      return {
        text: 'Project',
        categoryIdent: this.$route.params.categoryIdent,
        projectIdent: this.$route.params.categoryIdent,
        id: this.$route.params.projectId
      }
    }
  }
</script>
