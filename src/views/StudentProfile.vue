<template>
  <section class="student">
    <div class="student__content">
      <div class="student__description">
        <intro :title="student.option" :backLinkSrc="'/bddi'"></intro>
        <h2>{{student.firstname}} {{student.lastname}}</h2>
        <p>Son parcours : {{student.studies}}</p>
        <p>Ses intérêts : {{interests}} </p>
        <p>Ses réseaux sociaux/sites : TODO</p>
        <h3>Ses projets</h3>
       </div>
    </div>
  </section>
</template>

<script>
  import studentList from '@/data/students.json'
  import categories from '@/data/categories.json'
  import intro from '@/components/Intro.vue'
  import projectItem from '@/components/ProjectItem.vue'

  export default {
    name: 'studentProfile',
    components: {intro, projectItem},
    data () {
      return {
        title: 'Profil',
        description: 'Découvrez nos talents tous très créatifs et  qui seront fraichement diplomés en 2018. Tous prêts à relever de nouveaux challenges et à penser autrement, n\'hésitez pas à les contacter si vous êtes porteurs d\'un projet.',
        studentId: parseInt(this.$route.params.studentId),
        studentFirstname: this.$route.params.studentFirstname.toString(),
        categoryIds: [],
        categoryIdents: [],
        studentList
      }
    },
    computed: {
      student () {
        for (let i = 0; i < studentList.length; i++) {
          if (studentList[i].id === this.studentId && studentList[i].firstname === this.studentFirstname) {
            return studentList[i]
          } else if (i === studentList.length - 1) {
            return null
          }
        }
      },
      interests () {
        return this.student.interests.join(', ')
      }
    },
    mounted () {
      if (!this.student) {
        this.$router.push('/')
      }
    }
  }

</script>

<style lang="scss" scoped>
.student {
    width: 940px;
    margin: 200px auto;
    .student__content {
      margin: 0 auto 60px;
      text-align: left;
      h1 {
        text-transform: uppercase;
        opacity: 0.5;
        font-family: $font-aileron-light;
        letter-spacing: 3px;
        font-size: 13px;
        text-align: left;
      }
      h2 {
        font-family: $font-walsheim-regular;
        font-size: 30px;
        font-weight: bold;
        text-align: left;
        margin: 0 auto 10px;
      }
    }
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
</style>
