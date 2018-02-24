<template>
  <div class="category">
   <h1>{{text}}</h1>
   <h2>Ident : {{categoryIdent}}</h2>
   <project-item v-for="project in projects" :key="project.id" :data=project></project-item>
  </div>
</template>

<script>
  import projectItem from '@/components/ProjectItem.vue'
  import categories from '@/data/categories.json' // To delete soon

  export default {
    name: 'category',
    components: {projectItem},
    data () {
      return {
        text: 'Category',
        categoryIdent: this.$route.params.ident
      }
    },
    computed: {
      projects () {
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].ident === this.categoryIdent) {
            return categories[i].projectsList
          } else if (i === categories.length || this.categoryIdent === 'default') {
            return categories[0].projectsList
          }
        }
      }
    }
  }
</script>
