<template>
  <div class="project">
   <iframe-project v-if="iframe" :src="srcIframe" :backLinkSrc="lastPath"/>
   <screen-project v-if="screen" :project="project" :students="studentListOutput" :categoryIdent="categoryIdent" :iframe="iframe" :src="srcScreen" :backLinkSrc="lastPath"/>
  </div>
</template>

<script>
  import categories from '../data/categories.json'
  import studentsList from '../data/students.json'
  import iframeProject from '../components/IframeProject.vue'
  import screenProject from '../components/ScreenProject.vue'

  export default {
    name: 'project',
    components: {iframeProject, screenProject},
    data () {
      return {
        baseUrl: process.env.BASE_URL,
        categoryIdent: this.$route.params.categoryIdent,
        projectIdent: this.$route.params.projectIdent,
        projectId: this.$route.params.projectId,
        lastPath: this.$route.params.lastPath
      }
    },
    computed: {
      category () {
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].ident === this.categoryIdent) {
            return categories[i]
          } else if (i === categories.length - 1) {
            return null
          }
        }
      },
      project () {
        const projectList = this.category.projectsList
        for (let i = 0; i < projectList.length; i++) {
          if (projectList[i].id === parseInt(this.projectId)) {
            return projectList[i]
          } else if (i === projectList.length - 1) {
            return null
          }
        }
      },
      studentListOutput () {
        var students = []
        for (let i = 0; i < this.project.studentsList.length; i++) {
          let student = this.project.studentsList[i]
          students.push(studentsList.filter(studentList => student === studentList.id))
          if (i === this.project.studentsList.length - 1) {
            return students
          }
        }
      },
      iframe () {
        return this.project.view === 'iframe'
      },
      srcIframe () {
        if (this.project.url) {
          return this.project.url
        } else {
          return `/static/projets/${this.categoryIdent}/${this.projectId}_${this.projectIdent}/code/`
        }
      },
      screen () {
        return this.project.view === 'screen' || this.project.view === 'both'
      },
      srcScreen () {
        return `/static/projets/${this.categoryIdent}/${this.projectId}_${this.projectIdent}/screens/`
      }
    },
    mounted () {
      if (!this.category || !this.project) {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  .project {
    /* position: relative;
    z-index: 2; */
  }
</style>
