<template>
  <div class="category">
   <h1>{{text}}</h1>
   <h2>Ident : {{categoryIdent}}</h2>
   <project-item></project-item>
  </div>
</template>

<script>
  import projectItem from '@/components/ProjectItem.vue'
  export default {
    name: 'category',
    components: {projectItem},
    data () {
      return {
        text: 'Category',
        categoryIdent : this.$route.params.ident
      }
    }
  }
</script>
