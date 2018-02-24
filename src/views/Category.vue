<template>
  <div class="category">
   <h1>{{text}}</h1>
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
        text: 'Category'
      }
    }
  }
</script>
