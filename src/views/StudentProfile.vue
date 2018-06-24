<template>
  <section class="student">
    <div class="student__content">
      <intro :backLinkSrc="'/bddi'"/>
      <div class="student__content-info">
        <div class="student__content-info-main">
          <student-character :student="student"/>
          <h2>{{student.firstname}} {{student.lastname}}</h2>
          <h3>{{student.option}}</h3>
        </div>
        <div class="student__content-info-description">
          <h2>Son parcours :</h2>
          <p>{{student.studies}}</p>
          <h2>Ses intérêts :</h2>
          <p>{{interests}}</p>
          <h2>Retrouver ce talent :</h2>
          <p>
            <a :href="student.links.github" target="_blank" v-if="student.links.github" class="highlight-hover">Github</a>
            <a :href="student.links.codepen" target="_blank" v-if="student.links.codepen" class="highlight-hover">Codepen</a>
            <a :href="student.links.portfolio" target="_blank" v-if="student.links.portfolio" class="highlight-hover">Site perso</a>
            <a :href="student.links.behance" target="_blank" v-if="student.links.behance" class="highlight-hover">Behance</a>
            <a :href="student.links.dribbble" target="_blank" v-if="student.links.dribbble" class="highlight-hover">Dribbble</a>
            <a :href="student.links.instagram" target="_blank" v-if="student.links.instagram" class="highlight-hover">Instagram</a>
            <a :href="student.links.linkedin" target="_blank" v-if="student.links.linkedin" class="highlight-hover">LinkedIn</a>
          </p>
        </div>
      </div>
    </div>
    <div class="student__projects">
      <h2><span>Ses projets</span></h2>
      <project-item v-for="(project, index) in projects" :key="project.id" :data="project" :categoryIdent="categoryIdents[index]" :categoryId="categoryIds[index]" v-if="!project.hide"/>
    </div>
  </section>
</template>

<script>
  import studentList from '../data/students.json'
  import categories from '../data/categories.json'
  import intro from '../components/Intro.vue'
  import projectItem from '../components/ProjectItem.vue'
  import studentCharacter from '../components/StudentCharacter.vue'

  export default {
    name: 'studentProfile',
    components: {intro, projectItem, studentCharacter},
    data () {
      return {
        title: 'Profil',
        description: 'Découvrez nos talents tous très créatifs et  qui seront fraichement diplomés en 2018. Tous prêts à relever de nouveaux challenges et à penser autrement, n\'hésitez pas à les contacter si vous êtes porteurs d\'un projet.',
        studentId: parseInt(this.$route.params.studentId),
        studentFirstname: this.$route.params.studentFirstname.toString(),
        categoryIds: [],
        categoryIdents: [],
        projects: [],
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
      },
      styles () {
        let path = `${this.student.id}_${this.student.firstname.toLowerCase()}`
        let url = require(`../assets/images/students/${path}.png`)
        return {
          'background-image': `url(${url})`
        }
      }
    },
    mounted () {
      if (!this.student) {
        this.$router.push('/')
      }

      for (let i = 0; i < categories.length; i++) {
        let currentCategory = categories[i]
        if (currentCategory.option === this.student.option || currentCategory.option === 'mixed') {
          for (let j = 0; j < currentCategory.projectsList.length; j++) {
            let currentProject = currentCategory.projectsList[j]
            if (currentProject.studentsList.indexOf(this.student.id) !== -1) {
              this.projects.push(currentProject)
              this.categoryIds.push(currentCategory.id)
              this.categoryIdents.push(currentCategory.ident)
            }
          }
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
.student {
  width: 940px;
  margin: 200px auto;

  &__content {
    margin: 0 auto 60px;
    text-align: left;

    h2 {
      font-family: $font-walsheim-regular;
      margin-bottom: 0;
    }

    &-info {
      display: flex;
      &-main {
        width: 200px;
        margin: 0 80px;
        text-align: center;
        h3 {
          text-transform: uppercase;
          opacity: 0.5;
          font-family: $font-aileron-light;
          letter-spacing: 3px;
          font-size: 13px;
          text-align: center;
        }
      }
      &-description {
        p {
          font-family: $font-aileron-light;
        }
      }
    }
  }
}
@media screen and (max-width : 970px) {
  .student {
    width: initial;
    margin-top: 150px;
    margin-bottom: 0;
    padding: 30px;
    &__content {
      margin-bottom: 100px;
      &-info {
        display: block;
        &-main {
          margin: 0 auto;
          margin-bottom: 50px;
        }
        &-description {
          h2 {
            font-size: 20px;
          }
        }
      }
    }
    &__projects {
      h2 {
        text-transform: uppercase;
        letter-spacing: 5px;
        opacity: 0.8;
        margin-bottom: 50px;
        position: relative;
        span {
          &:after {
            content:'';
            width: 50px;
            height: 1px;
            background: white;
            position: absolute;
            bottom:-20px;
            left:50%;
            transform: translateX(-50%);
          }
        }
      }
      .projects__list-item {
        float: none;
        margin: 0 auto!important;
        width: initial;
      }
      .project__thumbnail {
        width: initial;
        .project__thumbnail-img {
          width: initial;
        }
      }
    }
  }
}
</style>
